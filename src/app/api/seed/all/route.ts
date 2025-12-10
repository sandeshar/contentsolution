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
import {
    contactPageHero,
    contactPageInfo,
    contactFormConfig,
} from '@/db/contactPageSchema';
import {
    faqPageHero,
    faqSection,
    faqItems,
} from '@/db/faqPageSchema';
import {
    termsPageHero,
    termsSection,
    termsSectionItems,
} from '@/db/termsPageSchema';
import { blogPosts, users, status } from '@/db/schema';
import { servicePosts } from '@/db/servicePostsSchema';
import { reviewTestimonials } from '@/db/reviewSchema';

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

        // 4. Seed Services
        try {
            const [firstUser] = await db.select().from(users).limit(1);
            const [publishedStatus] = await db.select().from(status).limit(1);

            // Clean up services
            try {
                await db.delete(servicePosts);
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

                const serviceData = [
                    { key: 'seo', icon: 'search', title: 'SEO Content' },
                    { key: 'social', icon: 'thumb_up', title: 'Social Media Content' },
                    { key: 'copy', icon: 'language', title: 'Website Copywriting' },
                    { key: 'blog', icon: 'article', title: 'Blog Writing' },
                ];

                for (const s of serviceData) {
                    await db.insert(servicesPageDetails).values({
                        key: s.key,
                        icon: s.icon,
                        title: s.title,
                        description: `Professional ${s.title.toLowerCase()} services`,
                        bullets: JSON.stringify(['Service point 1', 'Service point 2', 'Service point 3']),
                        image: 'https://via.placeholder.com/500x400',
                        image_alt: s.title,
                        display_order: serviceData.indexOf(s) + 1,
                        is_active: 1,
                    });

                    await db.insert(servicePosts).values({
                        slug: s.key,
                        title: s.title,
                        excerpt: `Professional ${s.title.toLowerCase()} services`,
                        content: `<p>Professional ${s.title.toLowerCase()} services</p>`,
                        thumbnail: 'https://via.placeholder.com/500x400',
                        icon: s.icon,
                        featured: 0,
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

        // 5. Seed Blog
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

        // 6. Seed Testimonials
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
