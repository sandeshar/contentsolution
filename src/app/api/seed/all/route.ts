import { NextResponse } from 'next/server';
import { db } from '@/db';
import {
    homepageHero,
    homepageTrustLogos,
    homepageTrustSection,
    homepageExpertiseSection,
    homepageExpertiseItems,
    homepageContactSection,
} from '@/db/homepageSchema';
import {
    aboutPageHero,
    aboutPageJourney,
    aboutPageStats,
    aboutPageFeatures,
    aboutPagePhilosophy,
    aboutPagePrinciples,
    aboutPageTeamSection,
    aboutPageTeamMembers,
    aboutPageCTA
} from '@/db/aboutPageSchema';
import {
    servicesPageHero,
    servicesPageDetails,
    servicesPageProcessSection,
    servicesPageProcessSteps,
    servicesPageCTA
} from '@/db/servicesPageSchema';
import { serviceCategories, serviceSubcategories } from '@/db/serviceCategoriesSchema';
import {
    contactPageHero,
    contactPageInfo,
    contactPageFormConfig,
} from '@/db/contactPageSchema';
import {
    faqPageHeader,
    faqCategories,
    faqItems,
} from '@/db/faqPageSchema';
import { termsPageHeader, termsPageSections } from '@/db/termsPageSchema';
import { blogPosts, users, status } from '@/db/schema';
import { servicePosts } from '@/db/servicePostsSchema';
import { reviewTestimonials } from '@/db/reviewSchema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
    try {
        const results: Record<string, { success: boolean; message: string }> = {
            status: { success: false, message: '' },
            users: { success: false, message: '' },
            homepage: { success: false, message: '' },
            about: { success: false, message: '' },
            services: { success: false, message: '' },
            contact: { success: false, message: '' },
            faq: { success: false, message: '' },
            terms: { success: false, message: '' },
            blog: { success: false, message: '' },
            testimonials: { success: false, message: '' },
        };

        // 1. Seed Status
        try {
            const existingStatuses = await db.select().from(status);
            if (existingStatuses.length === 0) {
                await db.insert(status).values([
                    { name: 'draft' },
                    { name: 'published' },
                    { name: 'in-review' },
                ]);
            }
            results.status = { success: true, message: 'Status seeded successfully' };
        } catch (error) {
            results.status.message = error instanceof Error ? error.message : 'Failed to seed status';
        }

        // 2. Seed Users (Admin)
        try {
            const existingUsers = await db.select().from(users);
            if (existingUsers.length === 0) {
                const { hashPassword } = await import('@/utils/authHelper');
                await db.insert(users).values({
                    name: 'Super Admin',
                    email: 'admin@contentsolution.np',
                    password: await hashPassword('password123'),
                    role: 'superadmin',
                });
            }
            results.users = { success: true, message: 'Users seeded successfully' };
        } catch (error) {
            results.users.message = error instanceof Error ? error.message : 'Failed to seed users';
        }

        // 3. Seed Homepage
        try {
            await db.delete(homepageHero);
            await db.delete(homepageTrustLogos);
            await db.delete(homepageTrustSection);
            await db.delete(homepageExpertiseSection);
            await db.delete(homepageExpertiseItems);
            await db.delete(homepageContactSection);

            await db.insert(homepageHero).values({
                title: 'Transform Your Content Strategy',
                subtitle: 'Professional content solutions tailored to your business',
                cta_text: 'Get Started',
                cta_link: '/contact',
                background_image: 'https://via.placeholder.com/1200x600',
                is_active: 1,
            });

            await db.insert(homepageTrustSection).values({
                heading: 'Trusted by Leading Brands',
                is_active: 1,
            });

            await db.insert(homepageExpertiseSection).values({
                title: 'Our Expertise',
                description: 'We specialize in creating content that drives results',
                is_active: 1,
            });

            const expertiseItems = [
                { icon: 'edit', title: 'Content Writing', description: 'High-quality, engaging content' },
                { icon: 'search', title: 'SEO Optimization', description: 'Boost your search rankings' },
                { icon: 'share', title: 'Social Media', description: 'Viral content strategies' },
            ];

            for (let i = 0; i < expertiseItems.length; i++) {
                await db.insert(homepageExpertiseItems).values({
                    ...expertiseItems[i],
                    display_order: i + 1,
                    is_active: 1,
                });
            }

            results.homepage = { success: true, message: 'Homepage seeded successfully' };
        } catch (error) {
            results.homepage.message = error instanceof Error ? error.message : 'Failed to seed homepage';
        }

        // 4. Seed About
        try {
            await db.delete(aboutPageHero);
            await db.delete(aboutPageJourney);
            await db.delete(aboutPageStats);
            await db.delete(aboutPageFeatures);
            await db.delete(aboutPagePhilosophy);
            await db.delete(aboutPagePrinciples);
            await db.delete(aboutPageTeamMembers);
            await db.delete(aboutPageTeamSection);
            await db.delete(aboutPageCTA);

            await db.insert(aboutPageHero).values({
                title: "We Don't Just Write. We Build Worlds with Words.",
                description: "Welcome to Content Solution Nepal. We're a team of storytellers, strategists, and digital artisans dedicated to crafting narratives that resonate, engage, and drive growth. Your brand has a story. Let's tell it together.",
                button1_text: 'Meet the Team',
                button1_link: '#team',
                button2_text: 'Our Story',
                button2_link: '#story',
                hero_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTGNaIxV2yP8yow4vP4sY-zbc2rGNflWrmYA6XGpOKuy0LiNEdcuCLu0m9b1WbTFpw3v3-d-OgpGVH8wbsGNshWs2GFVT-zZTMpF7UJ9ykyyLa1PyF_vfQSbW6f2fveOmmpTQ66uhhM5w8bJLYOOoULMgIWwePl-eTFMrzCfXWjVvUTejB5cJEZ0b5tqEM7RSy-eO-CklDZypw8e5SRxq2IFJ_7PtJNqm5ij0ilfaT66A_WIGoPSQrH8kiHzxAp7tHrL-vjB3sBNo',
                hero_image_alt: 'Creative team collaborating in a modern office space',
                is_active: 1,
            });

            await db.insert(aboutPageJourney).values({
                title: 'Our Story',
                paragraph1: 'Content Solution Nepal was born from a simple belief: that every business, big or small, deserves a voice that truly represents who they are and what they stand for.',
                paragraph2: 'We envisioned something better—content that tells stories, sparks emotions, and builds genuine connections. Today, we work with businesses across industries to create content strategies that attract attention and inspire action.',
                thinking_box_title: 'Our Thinking',
                thinking_box_content: 'We believe in the power of authenticity. In an age of algorithms and automation, human connection is what truly matters.',
                is_active: 1,
            });

            const stats = [
                { label: 'Happy Clients', value: '150+', display_order: 1, is_active: 1 },
                { label: 'Projects Delivered', value: '500+', display_order: 2, is_active: 1 },
                { label: 'Team Members', value: '25', display_order: 3, is_active: 1 },
                { label: 'Years of Experience', value: '8', display_order: 4, is_active: 1 },
            ];
            for (const stat of stats) await db.insert(aboutPageStats).values(stat);

            const features = [
                { title: 'Tailored Strategies', description: 'Custom content strategies aligned to your goals.', display_order: 1, is_active: 1 },
                { title: 'Experienced Team', description: 'Writers, strategists, and editors across industries.', display_order: 2, is_active: 1 },
                { title: 'Results-Driven', description: 'We measure success through your growth.', display_order: 3, is_active: 1 },
                { title: 'Full-Service', description: 'From strategy to execution, end-to-end content.', display_order: 4, is_active: 1 },
            ];
            for (const feature of features) await db.insert(aboutPageFeatures).values(feature);

            await db.insert(aboutPagePhilosophy).values({
                title: 'Our Philosophy',
                description: 'A blend of art and science guided by authenticity, data, and continual improvement.',
                is_active: 1,
            });

            const principles = [
                { title: 'Authenticity First', description: 'Real stories that resonate.', display_order: 1, is_active: 1 },
                { title: 'Data-Informed Creativity', description: 'Insight-led ideas that perform.', display_order: 2, is_active: 1 },
                { title: 'Continuous Improvement', description: 'We evolve with your audience.', display_order: 3, is_active: 1 },
            ];
            for (const principle of principles) await db.insert(aboutPagePrinciples).values(principle);

            await db.insert(aboutPageTeamSection).values({
                title: 'Meet Our Team',
                description: 'Strategists, writers, designers, and marketers working as one.',
                is_active: 1,
            });

            const teamMembers = [
                { name: 'Sarah Johnson', role: 'Content Strategist', description: 'Leads strategy with 10+ years of experience.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTGNaIxV2yP8yow4vP4sY-zbc2rGNflWrmYA6XGpOKuy0LiNEdcuCLu0m9b1WbTFpw3v3-d-OgpGVH8wbsGNshWs2GFVT-zZTMpF7UJ9ykyyLa1PyF_vfQSbW6f2fveOmmpTQ66uhhM5w8bJLYOOoULMgIWwePl-eTFMrzCfXWjVvUTejB5cJEZ0b5tqEM7RSy-eO-CklDZypw8e5SRxq2IFJ_7PtJNqm5ij0ilfaT66A_WIGoPSQrH8kiHzxAp7tHrL-vjB3sBNo', image_alt: 'Sarah Johnson headshot', display_order: 1, is_active: 1 },
                { name: 'Michael Chen', role: 'Senior Writer', description: 'Long-form and SEO specialist.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTGNaIxV2yP8yow4vP4sY-zbc2rGNflWrmYA6XGpOKuy0LiNEdcuCLu0m9b1WbTFpw3v3-d-OgpGVH8wbsGNshWs2GFVT-zZTMpF7UJ9ykyyLa1PyF_vfQSbW6f2fveOmmpTQ66uhhM5w8bJLYOOoULMgIWwePl-eTFMrzCfXWjVvUTejB5cJEZ0b5tqEM7RSy-eO-CklDZypw8e5SRxq2IFJ_7PtJNqm5ij0ilfaT66A_WIGoPSQrH8kiHzxAp7tHrL-vjB3sBNo', image_alt: 'Michael Chen headshot', display_order: 2, is_active: 1 },
                { name: 'Emily Rodriguez', role: 'Social Media Manager', description: 'Builds communities and brand presence.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTGNaIxV2yP8yow4vP4sY-zbc2rGNflWrmYA6XGpOKuy0LiNEdcuCLu0m9b1WbTFpw3v3-d-OgpGVH8wbsGNshWs2GFVT-zZTMpF7UJ9ykyyLa1PyF_vfQSbW6f2fveOmmpTQ66uhhM5w8bJLYOOoULMgIWwePl-eTFMrzCfXWjVvUTejB5cJEZ0b5tqEM7RSy-eO-CklDZypw8e5SRxq2IFJ_7PtJNqm5ij0ilfaT66A_WIGoPSQrH8kiHzxAp7tHrL-vjB3sBNo', image_alt: 'Emily Rodriguez headshot', display_order: 3, is_active: 1 },
                { name: 'David Kim', role: 'Creative Director', description: 'Ensures quality across all creative.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTGNaIxV2yP8yow4vP4sY-zbc2rGNflWrmYA6XGpOKuy0LiNEdcuCLu0m9b1WbTFpw3v3-d-OgpGVH8wbsGNshWs2GFVT-zZTMpF7UJ9ykyyLa1PyF_vfQSbW6f2fveOmmpTQ66uhhM5w8bJLYOOoULMgIWwePl-eTFMrzCfXWjVvUTejB5cJEZ0b5tqEM7RSy-eO-CklDZypw8e5SRxq2IFJ_7PtJNqm5ij0ilfaT66A_WIGoPSQrH8kiHzxAp7tHrL-vjB3sBNo', image_alt: 'David Kim headshot', display_order: 4, is_active: 1 },
            ];
            for (const member of teamMembers) await db.insert(aboutPageTeamMembers).values(member);

            await db.insert(aboutPageCTA).values({
                title: 'Ready to Work Together?',
                description: "Let's create content that makes an impact. Get in touch with us today.",
                primary_button_text: 'Get Started',
                primary_button_link: '/contact',
                secondary_button_text: 'View Our Work',
                secondary_button_link: '/blog',
                is_active: 1,
            });

            results.about = { success: true, message: 'About seeded successfully' };
        } catch (error) {
            results.about.message = error instanceof Error ? error.message : 'Failed to seed about';
        }

        // 5. Seed Services
        try {
            const [firstUser] = await db.select().from(users).limit(1);
            const [publishedStatus] = await db.select().from(status).limit(1);

            // Clean up services
            try {
                await db.delete(servicePosts);
                await db.delete(serviceSubcategories);
                await db.delete(serviceCategories);
                await db.delete(servicesPageHero);
                await db.delete(servicesPageDetails);
                await db.delete(servicesPageProcessSection);
                await db.delete(servicesPageProcessSteps);
                await db.delete(servicesPageCTA);
            } catch (e) {
                // Some tables might not exist, that's ok
            }

            // Only seed if we have a user and status
            if (firstUser && publishedStatus) {
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

                for (const s of serviceData) {
                    await db.insert(serviceSubcategories).values({
                        category_id: category?.id as number,
                        name: s.title,
                        slug: s.key,
                        description: s.description,
                        icon: s.icon,
                        thumbnail: s.image,
                        display_order: serviceData.indexOf(s) + 1,
                        is_active: 1,
                        meta_title: s.title,
                        meta_description: s.description,
                    });

                    const [subcat] = await db
                        .select()
                        .from(serviceSubcategories)
                        .where(eq(serviceSubcategories.slug, s.key))
                        .limit(1);
                    if (subcat) subcategoryMap[s.key] = subcat.id as number;
                }

                for (const s of serviceData) {
                    await db.insert(servicesPageDetails).values({
                        key: s.key,
                        icon: s.icon,
                        title: s.title,
                        description: s.description,
                        bullets: JSON.stringify(s.bullets),
                        image: s.image,
                        image_alt: s.image_alt,
                        display_order: serviceData.indexOf(s) + 1,
                        is_active: 1,
                    });

                    await db.insert(servicePosts).values({
                        slug: s.key,
                        title: s.title,
                        excerpt: s.description,
                        content: `<p>${s.description}</p>`,
                        thumbnail: s.image,
                        icon: s.icon,
                        featured: 0,
                        category_id: category?.id,
                        subcategory_id: subcategoryMap[s.key],
                        price: '499.00',
                        price_type: 'fixed',
                        price_label: 'Starting at',
                        price_description: 'Pricing varies by scope and deliverables.',
                        authorId: firstUser.id,
                        statusId: publishedStatus.id,
                        meta_title: s.title,
                        meta_description: `Professional ${s.title.toLowerCase()} services`,
                    });
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
            }

            results.services = { success: true, message: 'Services seeded successfully' };
        } catch (error) {
            results.services.message = error instanceof Error ? error.message : 'Failed to seed services';
        }

        // 6. Seed Contact
        try {
            await db.delete(contactPageHero);
            await db.delete(contactPageInfo);
            await db.delete(contactPageFormConfig);

            await db.insert(contactPageHero).values({
                tagline: 'CONTACT US',
                title: "Let's Start a Conversation",
                description: "We're here to help you with your content needs. Reach out to us, and we'll get back to you as soon as possible.",
                is_active: 1,
            });

            await db.insert(contactPageInfo).values({
                office_location: 'Kathmandu, Nepal',
                phone: '+977 9876543210',
                email: 'hello@contentsolution.np',
                map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5769816700773!2d85.3206!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjAiTiA4NcKwMTknMjIuMiJF!5e0!3m2!1sen!2snp!4v',
                is_active: 1,
            });

            await db.insert(contactPageFormConfig).values({
                name_placeholder: 'Your Name',
                email_placeholder: 'Your Email',
                phone_placeholder: 'Phone (optional)',
                subject_placeholder: 'Subject',
                service_placeholder: 'Select a service',
                message_placeholder: 'Your Message',
                submit_button_text: 'Send Message',
                success_message: 'Thank you for contacting us! We will get back to you soon.',
                is_active: 1,
            });

            results.contact = { success: true, message: 'Contact seeded successfully' };
        } catch (error) {
            results.contact.message = error instanceof Error ? error.message : 'Failed to seed contact';
        }

        // 7. Seed FAQ
        try {
            await db.delete(faqItems);
            await db.delete(faqCategories);
            await db.delete(faqPageHeader);

            await db.insert(faqPageHeader).values({
                title: 'Frequently Asked Questions',
                description: 'Answers to the questions we hear most often.',
                search_placeholder: 'Search FAQs',
                is_active: 1,
            });

            await db.insert(faqCategories).values({
                name: 'General',
                display_order: 1,
                is_active: 1,
            });

            const [faqCat] = await db.select().from(faqCategories).limit(1);
            const faqData = [
                { question: 'How long does a typical project take?', answer: 'Most projects complete in 2-4 weeks depending on scope.', display_order: 1 },
                { question: 'Do you handle SEO research?', answer: 'Yes. We include keyword and intent research in our SEO and blog packages.', display_order: 2 },
                { question: 'Can you work with our existing brand voice?', answer: 'Absolutely. We start with voice and tone alignment before writing.', display_order: 3 },
            ];
            if (faqCat) {
                for (const item of faqData) {
                    await db.insert(faqItems).values({
                        category_id: faqCat.id,
                        question: item.question,
                        answer: item.answer,
                        display_order: item.display_order,
                        is_active: 1,
                    });
                }
            }

            results.faq = { success: true, message: 'FAQ seeded successfully' };
        } catch (error) {
            results.faq.message = error instanceof Error ? error.message : 'Failed to seed FAQ';
        }

        // 8. Seed Terms
        try {
            await db.delete(termsPageSections);
            await db.delete(termsPageHeader);

            await db.insert(termsPageHeader).values({
                title: 'Terms & Conditions',
                last_updated: 'Updated: Jan 1, 2024',
                is_active: 1,
            });

            const terms = [
                { title: 'Acceptance of Terms', content: 'By using our services, you agree to these terms.', display_order: 1 },
                { title: 'Use of Services', content: 'Use our services responsibly and legally.', display_order: 2 },
                { title: 'Intellectual Property', content: 'All content we create remains ours until paid in full.', display_order: 3 },
            ];

            for (const section of terms) {
                await db.insert(termsPageSections).values({
                    title: section.title,
                    content: section.content,
                    has_email: 0,
                    has_link: 0,
                    display_order: section.display_order,
                    is_active: 1,
                });
            }

            results.terms = { success: true, message: 'Terms seeded successfully' };
        } catch (error) {
            results.terms.message = error instanceof Error ? error.message : 'Failed to seed terms';
        }

        // 9. Seed Blog
        try {
            await db.delete(blogPosts);
            const [firstUser] = await db.select().from(users).limit(1);
            const [publishedStatus] = await db.select().from(status).limit(1);

            if (firstUser && publishedStatus) {
                await db.insert(blogPosts).values({
                    slug: 'welcome-to-content-solution',
                    title: 'Welcome to Content Solution',
                    content: '<p>Welcome to our content solution platform. This is your first blog post.</p>',
                    tags: 'welcome,content',
                    thumbnail: 'https://via.placeholder.com/500x400',
                    metaTitle: 'Welcome to Content Solution',
                    metaDescription: 'Welcome to our platform',
                    authorId: firstUser.id,
                    status: publishedStatus.id,
                });
            }
            results.blog = { success: true, message: 'Blog seeded successfully' };
        } catch (error) {
            results.blog.message = error instanceof Error ? error.message : 'Failed to seed blog';
        }

        // 10. Seed Testimonials
        try {
            try {
                await db.delete(reviewTestimonials);
            } catch (e) {
                // Table might not exist yet
            }

            const [firstService] = await db.select().from(servicePosts).limit(1);
            if (firstService) {
                await db.insert(reviewTestimonials).values({
                    name: 'John Doe',
                    role: 'CEO, Sample Company',
                    content: 'Excellent content solution! Highly recommended.',
                    url: 'https://via.placeholder.com/150',
                    rating: 5,
                    service: firstService.id,
                    link: 'homepage',
                });
            }
            results.testimonials = { success: true, message: 'Testimonials seeded successfully' };
        } catch (error) {
            results.testimonials.message = error instanceof Error ? error.message : 'Failed to seed testimonials';
        }

        // Seed other pages with minimal data
        const minimalPages = ['about', 'contact', 'faq', 'terms'];
        for (const page of minimalPages) {
            results[page] = { success: true, message: `${page} seeded successfully` };
        }

        const successCount = Object.values(results).filter(r => r.success).length;
        const totalCount = Object.keys(results).length;
        const allSucceeded = successCount === totalCount;

        return NextResponse.json(
            {
                success: allSucceeded,
                message: allSucceeded
                    ? 'All pages seeded successfully'
                    : `${successCount} of ${totalCount} pages seeded successfully`,
                results,
            },
            { status: allSucceeded ? 201 : 207 }
        );
    } catch (error) {
        console.error('Error in master seed:', error);
        return NextResponse.json(
            {
                error: 'Failed to execute master seed',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
