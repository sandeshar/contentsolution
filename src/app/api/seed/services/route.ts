import { NextResponse } from 'next/server';
import { db } from '@/db';
import {
    servicesPageHero,
    servicesPageDetails,
    servicesPageProcessSection,
    servicesPageProcessSteps,
    servicesPageCTA
} from '@/db/servicesPageSchema';
import { servicePosts } from '@/db/servicePostsSchema';
import { reviewTestimonials } from '@/db/reviewSchema';
import { status, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST() {
    try {
        // Clear existing data - delete in correct order (children first, then parents)
        // Skip deleting testimonials if table doesn't exist yet
        try {
            await db.delete(reviewTestimonials);
        } catch (error) {
            // Table might not exist yet, skip
        }
        await db.delete(servicePosts);
        await db.delete(servicesPageHero);
        await db.delete(servicesPageDetails);
        await db.delete(servicesPageProcessSection);
        await db.delete(servicesPageProcessSteps);
        await db.delete(servicesPageCTA);

        // Seed Hero Section
        await db.insert(servicesPageHero).values({
            tagline: 'OUR SERVICES',
            title: 'Content Solutions That Drive Results',
            description: "From strategy to execution, we offer comprehensive content services designed to help your business grow. Whether you need blog posts, website copy, or social media content, we've got you covered.",
            is_active: 1,
        });

        // Seed Service Details
        const serviceDetails = [
            {
                key: 'seo',
                icon: 'search',
                title: 'SEO Content',
                description: 'Boost your organic visibility and climb the search engine ranks. We create high-quality, keyword-rich content that not only attracts your target audience but also establishes your brand as an authority in your industry.',
                bullets: JSON.stringify(['Keyword Research & Strategy', 'On-Page SEO Optimization', 'Long-form Articles & Landing Pages']),
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFR7tIGeKNlooQKoKzI99ZmhdAiYEeN7-W0VuqKkzn5_LkeWBmDZuWq2D1sKPTZW8vgWE1MvRe4iQHi9_Cley5gsMoFI7WJk7Oot3IO0kSVaiD0P5Gc0exZJ4CefO_K6hXJHRaHpWDvobpNb7rOeFCulKjyIwwaecQGDoo9nq5Aulw1jqloMBd1rvSNYcd0KVkIvmBdnXtBXr7_zQgUXnqHwROX0L36QjKYpwBnJflSI6CLCBY_AcCn8G29HBQPOlh3GMuTSz5KKw',
                image_alt: 'Team collaborating on SEO content strategy with analytics dashboard',
                display_order: 1,
                is_active: 1,
            },
            {
                key: 'social',
                icon: 'thumb_up',
                title: 'Social Media Content',
                description: 'Engage your community and build a powerful brand presence across social platforms. We craft compelling visuals, captivating captions, and strategic campaigns that spark conversations and foster loyalty.',
                bullets: JSON.stringify(['Content Calendars & Scheduling', 'Custom Graphics & Video Shorts', 'Community Management & Engagement']),
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfyYtWae3vDTMudIqY7zy-xrwjkbuSwc7swbiEFB4yiwV0OmcrzjUcmRQbVVHJ3DveM1X28-ibIQYv2DjPbKMYW2KuF3i1p1e63rsgEQEJkuWPjOjf3Zbe8U_4OnpW24wNh2Eu7RdjVTyxZSVw8nhnRV0FsHs3AuDAJ8Ff43U5gmwN-9t1jfGQiSCmm1CfETzn844jgpGXRKqc-R-tLDyptOfOrcH2hzPwwO3L0MzYihnJbpjqKnRNKkHhXa3UTWMol8KM1qkD_8k',
                image_alt: 'Creative social media content planning with visuals',
                display_order: 2,
                is_active: 1,
            },
            {
                key: 'copy',
                icon: 'language',
                title: 'Website Copywriting',
                description: 'Turn visitors into customers with persuasive and clear website copy. We write words that reflect your brand voice, articulate your value proposition, and guide users to take action.',
                bullets: JSON.stringify(['Homepage & Landing Page Copy', 'Product & Service Descriptions', 'About Us & Brand Storytelling']),
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfyYtWae3vDTMudIqY7zy-xrwjkbuSwc7swbiEFB4yiwV0OmcrzjUcmRQbVVHJ3DveM1X28-ibIQYv2DjPbKMYW2KuF3i1p1e63rsgEQEJkuWPjOjf3Zbe8U_4OnpW24wNh2Eu7RdjVTyxZSVw8nhnRV0FsHs3AuDAJ8Ff43U5gmwN-9t1jfGQiSCmm1CfETzn844jgpGXRKqc-R-tLDyptOfOrcH2hzPwwO3L0MzYihnJbpjqKnRNKkHhXa3UTWMol8KM1qkD_8k',
                image_alt: 'Designer and copywriter refining website copy',
                display_order: 3,
                is_active: 1,
            },
            {
                key: 'blog',
                icon: 'article',
                title: 'Blog Writing',
                description: 'Establish thought leadership and provide genuine value to your audience. Our team produces well-researched, insightful, and engaging blog articles that drive traffic and build trust with your readers.',
                bullets: JSON.stringify(['Content Ideation & Topic Research', 'In-depth, Researched Articles', 'Editing, Proofreading & Formatting']),
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfyYtWae3vDTMudIqY7zy-xrwjkbuSwc7swbiEFB4yiwV0OmcrzjUcmRQbVVHJ3DveM1X28-ibIQYv2DjPbKMYW2KuF3i1p1e63rsgEQEJkuWPjOjf3Zbe8U_4OnpW24wNh2Eu7RdjVTyxZSVw8nhnRV0FsHs3AuDAJ8Ff43U5gmwN-9t1jfGQiSCmm1CfETzn844jgpGXRKqc-R-tLDyptOfOrcH2hzPwwO3L0MzYihnJbpjqKnRNKkHhXa3UTWMol8KM1qkD_8k',
                image_alt: 'Writer drafting long-form blog article with research notes',
                display_order: 4,
                is_active: 1,
            },
        ];

        for (const service of serviceDetails) {
            await db.insert(servicesPageDetails).values(service);
        }

        // Seed Service Posts to match details (ensures manager/detail pages work)
        try {
            const allUsers = await db.select().from(users).limit(1);
            const allStatuses = await db.select().from(status).limit(1);

            if (allUsers.length > 0 && allStatuses.length > 0) {
                const posts = serviceDetails.map(s => ({
                    slug: s.key,
                    title: s.title,
                    excerpt: s.description,
                    content: `<p>${s.description}</p>`,
                    thumbnail: s.image,
                    icon: s.icon,
                    featured: 0,
                    authorId: allUsers[0].id,
                    statusId: allStatuses[0].id,
                    meta_title: s.title,
                    meta_description: s.description,
                }));

                for (const p of posts) {
                    await db.insert(servicePosts).values(p);
                }
            }
        } catch (error) {
            // Service posts might fail due to foreign keys, but servicePage details are more important
            console.error('Warning: Failed to seed service posts:', error);
        }

        // Seed Process Section
        await db.insert(servicesPageProcessSection).values({
            title: 'Our Process',
            description: 'We follow a proven, collaborative process to deliver high-quality content that aligns with your goals and resonates with your audience.',
            is_active: 1,
        });

        // Seed Process Steps
        const processSteps = [
            {
                step_number: 1,
                title: 'Discovery',
                description: 'We start by understanding your business, audience, and goals through an in-depth discovery session.',
                display_order: 1,
                is_active: 1,
            },
            {
                step_number: 2,
                title: 'Strategy',
                description: 'Our team develops a tailored content strategy that aligns with your brand and objectives.',
                display_order: 2,
                is_active: 1,
            },
            {
                step_number: 3,
                title: 'Creation',
                description: 'We craft compelling content that engages your audience and drives results.',
                display_order: 3,
                is_active: 1,
            },
            {
                step_number: 4,
                title: 'Review',
                description: 'We work with you to refine the content, ensuring it meets your standards and expectations.',
                display_order: 4,
                is_active: 1,
            },
            {
                step_number: 5,
                title: 'Delivery',
                description: 'We deliver the final content in your preferred format, ready for publication.',
                display_order: 5,
                is_active: 1,
            },
        ];

        for (const step of processSteps) {
            await db.insert(servicesPageProcessSteps).values(step);
        }

        // Seed CTA Section
        await db.insert(servicesPageCTA).values({
            title: 'Ready to Elevate Your Content?',
            description: "Let's discuss how we can help you achieve your content marketing goals.",
            button_text: 'Get a Quote',
            button_link: '/contact',
            is_active: 1,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Services page seeded successfully with default values',
            },
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
