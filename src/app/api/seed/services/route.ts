import { NextResponse } from 'next/server';
import { db } from '@/db';
import {
    servicesPageHero,
    servicesPageDetails,
    servicesPageProcessSection,
    servicesPageProcessSteps,
    servicesPageCTA,
} from '@/db/servicesPageSchema';
import { servicePosts } from '@/db/servicePostsSchema';
import { serviceCategories, serviceSubcategories } from '@/db/serviceCategoriesSchema';
import { reviewTestimonials } from '@/db/reviewSchema';
import { status, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST() {
    try {
        // Clean existing data (children first)
        try {
            await db.delete(reviewTestimonials);
        } catch (error) {
            // Table might not exist yet; ignore
        }
        await db.delete(servicePosts);
        await db.delete(serviceSubcategories);
        await db.delete(serviceCategories);
        await db.delete(servicesPageHero);
        await db.delete(servicesPageDetails);
        await db.delete(servicesPageProcessSection);
        await db.delete(servicesPageProcessSteps);
        await db.delete(servicesPageCTA);

        const [firstUser] = await db.select().from(users).limit(1);
        const [publishedStatus] = await db.select().from(status).limit(1);

        const generateLongContent = (title: string, paragraphs = 20) => {
            let out = `<h1>${title}</h1>`;
            out += `<p>${title} — an extended guide covering principles, recommended workflows, examples, and step-by-step implementation details. The focus is on clear examples and advice tailored for Nepali businesses but also applicable globally.</p>`;
            for (let i = 1; i <= paragraphs; i++) {
                out += `<h2>Section ${i}</h2>`;
                out += `<p>${title} — paragraph ${i}. This text expands on relevant industry best practices, case study summaries, and suggested tactics that teams can adopt today. It includes examples, local context, and actionable steps that teams can follow. Where possible, add references to data, frameworks, or tested patterns and include links to resources and templates.</p>`;
            }
            out += `<h2>Conclusion</h2><p>Final summary and next steps.</p>`;
            return out;
        };

        await db.insert(servicesPageHero).values({
            tagline: 'OUR SERVICES',
            title: 'Content Solutions That Drive Results',
            description: 'Comprehensive content services designed to help your business grow.',
            is_active: 1,
        });

        const categorySlug = 'content-services';
        await db.insert(serviceCategories).values({
            name: 'Content Services',
            slug: categorySlug,
            description: 'Strategic writing, SEO, and social storytelling crafted for measurable growth.',
            icon: 'category',
            thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
            display_order: 1,
            is_active: 1,
            meta_title: 'Content Services',
            meta_description: 'Explore SEO content, social media, website copy, and blog writing services.',
        });

        const [category] = await db
            .select()
            .from(serviceCategories)
            .where(eq(serviceCategories.slug, categorySlug))
            .limit(1);

        const serviceData = [
            {
                key: 'seo',
                icon: 'search',
                title: 'SEO Content',
                description: 'Search-optimized articles and landing pages that pair audience intent with brand authority to rank and convert.',
                bullets: ['Search intent research and briefs', 'On-page structure, schema, and internal links', 'Long-form pages that convert and rank'],
                image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1400&q=80',
                image_alt: 'Content strategist reviewing SEO metrics on a laptop',
            },
            {
                key: 'social',
                icon: 'thumb_up',
                title: 'Social Media Content',
                description: 'Channel-ready posts, short-form video hooks, and visuals that earn saves, shares, and clicks.',
                bullets: ['Monthly content calendars with hooks and CTAs', 'Platform-native short video scripts and captions', 'Design kits for carousels, stories, and ads'],
                image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80',
                image_alt: 'Team planning social content with phones and laptops',
            },
            {
                key: 'copy',
                icon: 'language',
                title: 'Website Copywriting',
                description: 'Conversion-focused messaging that clarifies your offer and guides visitors to act on key pages.',
                bullets: ['Value-prop and messaging frameworks', 'Landing and product pages with A/B testable sections', 'Microcopy for forms, nav, and CTAs'],
                image: 'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=1400&q=80',
                image_alt: 'Copywriter drafting website copy next to design mockups',
            },
            {
                key: 'blog',
                icon: 'article',
                title: 'Blog Writing',
                description: 'Research-backed articles that build trust, answer intent, and drive subscribers and leads.',
                bullets: ['Audience and keyword-led topic ideation', 'SME interviews and sourced insights', 'Editorial polish: structure, voice, and SEO basics'],
                image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80',
                image_alt: 'Writer working on a long-form article with notes and laptop',
            },
        ];

        const subcategoryMap: Record<string, number> = {};

        for (const [index, s] of serviceData.entries()) {
            await db.insert(serviceSubcategories).values({
                category_id: category?.id as number,
                name: s.title,
                slug: s.key,
                description: s.description,
                icon: s.icon,
                thumbnail: s.image,
                display_order: index + 1,
                is_active: 1,
                meta_title: s.title,
                meta_description: s.description,
            });

            const [subcat] = await db
                .select()
                .from(serviceSubcategories)
                .where(eq(serviceSubcategories.slug, s.key))
                .limit(1);
            if (subcat?.id) subcategoryMap[s.key] = subcat.id as number;
        }

        for (const [index, s] of serviceData.entries()) {
            await db.insert(servicesPageDetails).values({
                key: s.key,
                icon: s.icon,
                title: s.title,
                description: s.description,
                bullets: JSON.stringify(s.bullets),
                image: s.image,
                image_alt: s.image_alt,
                display_order: index + 1,
                is_active: 1,
            });

            if (firstUser && publishedStatus) {
                const contentMap: Record<string, string> = {
                    seo: `
                        <p>SEO Content services focus on ranking and conversion. We conduct keyword research tailored to Nepal's market to identify queries with the right intent. Our long-form articles are structured with clear H2/H3 headings, a table of contents, and internal links to strengthen topical authority.</p>
                        <p>Deliverables include a content brief, SEO meta optimization, on-page schema where relevant, and 2000+ word pillar content as needed. We also provide optional research-backed statistics and client interview integration to establish trust and back claims.</p>
                        <h3>Package & Pricing</h3>
                        <p>Our base package starts with a discovery call and a 1,200–1,500 word article. Larger pillar pages and content clusters are priced per scope and research needs.</p>
                    `,
                    social: `
                        <p>Social Media Content services deliver platform-ready posts designed to build community. We create monthly calendars, short-form video hooks, caption variations, and design assets for carousels and stories.</p>
                        <p>We focus on localized content for Nepali audiences that respects cultural moments and optimizes for engagement—shares, saves, and comments—while aligning with conversion goals.</p>
                        <h3>Package & Pricing</h3>
                        <p>Packages are typically retainer-based and include content strategy, production, and monthly performance reporting.</p>
                    `,
                    copy: `
                        <p>Website Copywriting services aim to convert visitors into customers through persuasive messaging. We create clear value propositions, headlines, and microcopy that support user flows across your site.</p>
                        <p>Our process includes stakeholder interviews, competitor analysis, and iterative drafting. We craft landing pages, product descriptions, and contact flows optimized for clarity and action.</p>
                        <h3>Package & Pricing</h3>
                        <p>One-time projects like a landing page start with a brief and testing round. Ongoing content refinement is available as a retainer.</p>
                    `,
                    blog: `
                        <p>Blog Writing services focus on long-form content that builds organic visibility, educates your audience, and captures leads. Our articles include SEO research, expert interviews, images, and a clear CTA to guide conversions.</p>
                        <p>We emphasize editorial quality, readability, and strategic linking to convert readers into leads or subscribers.</p>
                        <h3>Package & Pricing</h3>
                        <p>Standard packages include topic ideation, a 1,200–2,000 word article, and basic optimization for search engines.</p>
                    `,
                };

                const postVariants = [
                    { suffix: 'guide', paragraphs: 20 },
                    { suffix: 'advanced-techniques', paragraphs: 30 },
                    { suffix: 'case-study', paragraphs: 24 },
                ];

                for (const [vIndex, variant] of postVariants.entries()) {
                    const variantContent = contentMap[s.key]
                        ? generateLongContent(`${s.title} — ${variant.suffix}`, variant.paragraphs)
                        : generateLongContent(`${s.title} — ${variant.suffix}`, variant.paragraphs);

                    await db.insert(servicePosts).values({
                        slug: `${s.key}-${variant.suffix}`,
                        title: `${s.title} — ${variant.suffix.replace(/-/g, ' ')}`,
                        excerpt: s.description,
                        content: variantContent,
                        thumbnail: s.image,
                        icon: s.icon,
                        featured: index === 0 && vIndex === 0 ? 1 : 0,
                        category_id: category?.id,
                        subcategory_id: subcategoryMap[s.key],
                        price: '499.00',
                        price_type: 'fixed',
                        price_label: 'Starting at',
                        price_description: 'Pricing varies by scope and deliverables.',
                        currency: 'USD',
                        authorId: firstUser.id,
                        statusId: publishedStatus.id,
                        meta_title: `${s.title} — ${variant.suffix.replace(/-/g, ' ')}`,
                        meta_description: `Professional ${s.title.toLowerCase()} services`,
                    });
                }
                // Insert a base post with the default slug (e.g., 'seo') so /services/[slug] resolves to a long post
                const basePostContent = contentMap[s.key]
                    ? generateLongContent(s.title, 28)
                    : generateLongContent(s.title, 28);
                await db.insert(servicePosts).values({
                    slug: s.key,
                    title: s.title,
                    excerpt: s.description,
                    content: basePostContent,
                    thumbnail: s.image,
                    icon: s.icon,
                    featured: index === 0 ? 1 : 0,
                    category_id: category?.id,
                    subcategory_id: subcategoryMap[s.key],
                    price: '499.00',
                    price_type: 'fixed',
                    price_label: 'Starting at',
                    price_description: 'Pricing varies by scope and deliverables.',
                    currency: 'USD',
                    authorId: firstUser.id,
                    statusId: publishedStatus.id,
                    meta_title: s.title,
                    meta_description: `Professional ${s.title.toLowerCase()} services`,
                });
            }
        }

        await db.insert(servicesPageProcessSection).values({
            title: 'Our Process',
            description: 'We follow a proven, collaborative process to deliver high-quality content.',
            is_active: 1,
        });

        const processSteps = [
            { step_number: 1, title: 'Discovery', description: 'Understanding your needs', display_order: 1 },
            { step_number: 2, title: 'Strategy', description: 'Developing a tailored strategy', display_order: 2 },
            { step_number: 3, title: 'Creation', description: 'Creating compelling content', display_order: 3 },
        ];

        for (const step of processSteps) {
            await db.insert(servicesPageProcessSteps).values({
                ...step,
                is_active: 1,
            });
        }

        await db.insert(servicesPageCTA).values({
            title: 'Ready to Elevate Your Content?',
            description: "Let's discuss how we can help you achieve your goals.",
            button_text: 'Get a Quote',
            button_link: '/contact',
            is_active: 1,
        });

        return NextResponse.json(
            { success: true, message: 'Services seeded successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error seeding services page:', error);
        return NextResponse.json(
            {
                error: 'Failed to seed services page',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
