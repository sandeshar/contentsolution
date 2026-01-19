import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Status from '@/models/Status';
import User from '@/models/User';
import { HomepageHero as Homepage, HomepageTrustLogo, HomepageExpertiseItem } from '@/models/Homepage';
import { 
    AboutPageHero as AboutHero, 
    AboutPageJourney as AboutJourney, 
    AboutPageStat as AboutStat, 
    AboutPageFeature as AboutFeature, 
    AboutPagePhilosophy as AboutPhilosophy, 
    AboutPagePrinciple as AboutPrinciple, 
    AboutPageTeamSection as AboutTeamSection, 
    AboutPageTeamMember as AboutTeamMember, 
    AboutPageCTA as AboutCTA 
} from '@/models/AboutPage';
import { 
    ServiceCategory, 
    ServiceSubcategory, 
    ServicePost, 
    ServicePageHero as ServicesPageHero, 
    ServicePageDetail as ServicesPageDetail, 
    ServicePageProcessSection as ServicesPageProcessSection, 
    ServicePageProcessStep as ServicesPageProcessStep, 
    ServicePageCTA as ServicesPageCTA 
} from '@/models/Services';
import { ContactPageHero as ContactPage, ContactPageInfo as ContactInfo, ContactPageFormConfig as ContactFormConfig } from '@/models/ContactPage';
import { TermsPageHeader as Term, TermsPageSection as TermSection, BlogPageHero, BlogPageCTA } from '@/models/Pages';
import BlogPost from '@/models/BlogPost';
import { FAQPageHeader as FAQPage, FAQCategory, FAQItem } from '@/models/FAQPage';
import { ReviewTestimonial } from '@/models/Review';
import { StoreSettings, FooterSection, FooterLink } from '@/models/StoreSettings';
import NavbarItem from '@/models/Navbar';

export async function POST() {
    try {
        await dbConnect();
        
        const results: Record<string, { success: boolean; message: string }> = {
            status: { success: false, message: '' },
            users: { success: false, message: '' },
            storeSettings: { success: false, message: '' },
            homepage: { success: false, message: '' },
            about: { success: false, message: '' },
            services: { success: false, message: '' },
            contact: { success: false, message: '' },
            faq: { success: false, message: '' },
            terms: { success: false, message: '' },
            blog: { success: false, message: '' },
            testimonials: { success: false, message: '' },
            navbar: { success: false, message: '' },
            footer: { success: false, message: '' },
        };

        // 1. Seed Status
        try {
            const count = await Status.countDocuments();
            if (count === 0) {
                await Status.create([
                    { name: 'draft' },
                    { name: 'published' },
                    { name: 'in-review' },
                ]);
            }
            results.status = { success: true, message: 'Status seeded successfully' };
        } catch (error: any) {
            results.status.message = error.message;
        }

        // 2. Seed Users
        let adminUser: any = null;
        try {
            adminUser = await User.findOne({ email: 'admin@contentsolution.np' });
            if (!adminUser) {
                const { hashPassword } = await import('@/utils/authHelper');
                adminUser = await User.create({
                    name: 'Super Admin',
                    email: 'admin@contentsolution.np',
                    password: await hashPassword('password123'),
                    role: 'superadmin',
                });
            }
            results.users = { success: true, message: 'Users seeded successfully' };
        } catch (error: any) {
            results.users.message = error.message;
        }

        // 3. Seed Store Settings
        let store: any = null;
        try {
            store = await StoreSettings.findOne();
            if (!store) {
                store = await StoreSettings.create({
                    store_name: 'Content Solution',
                    store_description: 'Strategic writing, SEO, and social storytelling.',
                    store_logo: 'https://via.placeholder.com/150',
                    favicon: 'https://via.placeholder.com/32',
                    contact_email: 'info@contentsolution.np',
                    contact_phone: '+977-1-4000000',
                    address: 'Kathmandu, Nepal',
                    facebook: 'https://facebook.com/contentsolution',
                    twitter: 'https://twitter.com/contentsolution',
                    instagram: 'https://instagram.com/contentsolution',
                    linkedin: 'https://linkedin.com/company/contentsolution',
                    meta_title: 'Content Solution | Professional Writing Services',
                    meta_description: 'Expert content strategy and writing in Nepal.',
                    meta_keywords: 'content, seo, writing, strategy',
                    footer_text: '© 2026 Content Solution Nepal. All rights reserved.',
                    theme: 'light',
                    hide_site_name: 0,
                    hide_site_name_on_mobile: 0,
                });
            }
            results.storeSettings = { success: true, message: 'Store settings seeded successfully' };
        } catch (error: any) {
            results.storeSettings.message = error.message;
        }

        // 4. Seed Homepage
        try {
            await Homepage.deleteMany({});
            await HomepageTrustLogo.deleteMany({});
            await HomepageExpertiseItem.deleteMany({});

            await Homepage.create({
                title: 'Drive Real Business Growth Through Powerful Content',
                subtitle: 'We craft content strategies that captivate your audience, boost your rankings, and convert readers into loyal customers.',
                cta_text: 'Schedule a Free Consultation',
                cta_link: '/contact',
                background_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
                hero_image_alt: 'Hero background showing team collaboration',
                badge_text: 'Accepting new projects',
                highlight_text: 'Powerful Content',
                float_top_enabled: 1,
                float_top_icon: 'trending_up',
                float_top_title: 'Growth',
                float_top_value: '+240% ROI',
                float_bottom_enabled: 1,
                float_bottom_icon: 'check_circle',
                float_bottom_title: 'Ranking',
                float_bottom_value: '#1 Result',
                secondary_cta_text: 'View Our Work',
                secondary_cta_link: '/work',
                rating_text: 'Trusted by modern teams',
                is_active: 1,
            });

            await HomepageTrustLogo.insertMany([
                { alt_text: 'Company logo 1', logo_url: 'https://via.placeholder.com/120x40', display_order: 1, is_active: 1 },
                { alt_text: 'Company logo 2', logo_url: 'https://via.placeholder.com/120x40', dark_invert: 1, display_order: 2, is_active: 1 },
                { alt_text: 'Company logo 3', logo_url: 'https://via.placeholder.com/120x40', dark_invert: 1, display_order: 3, is_active: 1 },
                { alt_text: 'Company logo 4', logo_url: 'https://via.placeholder.com/120x40', dark_invert: 1, display_order: 4, is_active: 1 },
                { alt_text: 'Company logo 5', logo_url: 'https://via.placeholder.com/120x40', dark_invert: 1, display_order: 5, is_active: 1 },
                { alt_text: 'Company logo 6', logo_url: 'https://via.placeholder.com/120x40', dark_invert: 1, display_order: 6, is_active: 1 },
            ]);

            await HomepageExpertiseItem.insertMany([
                { icon: 'explore', title: 'Content Strategy', description: 'Developing a roadmap to create, publish, and govern your content.', display_order: 1, is_active: 1 },
                { icon: 'search', title: 'SEO Writing', description: 'Crafting high-quality content that ranks on search engines.', display_order: 2, is_active: 1 },
                { icon: 'edit', title: 'Copywriting', description: 'Writing persuasive copy that converts for your website.', display_order: 3, is_active: 1 },
                { icon: 'group', title: 'Social Media Marketing', description: 'Engaging your community with compelling content.', display_order: 4, is_active: 1 },
            ]);

            results.homepage = { success: true, message: 'Homepage seeded successfully' };
        } catch (error: any) {
            results.homepage.message = error.message;
        }

        // 5. Seed About
        try {
            await AboutHero.deleteMany({});
            await AboutJourney.deleteMany({});
            await AboutStat.deleteMany({});
            await AboutFeature.deleteMany({});
            await AboutPhilosophy.deleteMany({});
            await AboutPrinciple.deleteMany({});
            await AboutTeamSection.deleteMany({});
            await AboutTeamMember.deleteMany({});
            await AboutCTA.deleteMany({});

            await AboutHero.create({
                title: "We Don't Just Write. We Build Worlds with Words.",
                description: "Welcome to Content Solution Nepal.",
                button1_text: 'Meet the Team',
                button1_link: '#team',
                button2_text: 'Our Story',
                button2_link: '#story',
                hero_image: 'https://via.placeholder.com/800x600',
                hero_image_alt: 'Our team working',
                is_active: 1,
            });

            await AboutJourney.create({
                title: 'Our Story',
                paragraph1: 'Content Solution Nepal was born from a simple belief that great content changes everything.',
                paragraph2: 'We started in a small room and now we are leading content strategy for top brands.',
                thinking_box_title: 'Our Vision',
                thinking_box_content: 'To be the ultimate choice for content creators and businesses alike.',
                is_active: 1,
            });

            await AboutStat.insertMany([
                { label: 'Happy Clients', value: '150+', display_order: 1, is_active: 1 },
                { label: 'Projects Delivered', value: '500+', display_order: 2, is_active: 1 },
                { label: 'Team Members', value: '25', display_order: 3, is_active: 1 },
                { label: 'Years of Experience', value: '8', display_order: 4, is_active: 1 },
            ]);

            await AboutTeamMember.insertMany([
                { 
                    name: 'Sarah Johnson', 
                    role: 'Content Strategist', 
                    description: 'Expert in strategic content planning.',
                    image: 'https://via.placeholder.com/300',
                    image_alt: 'Sarah Johnson',
                    display_order: 1,
                    is_active: 1
                },
                { 
                    name: 'Michael Chen', 
                    role: 'Senior Writer', 
                    description: 'Passionate about storytelling.',
                    image: 'https://via.placeholder.com/300',
                    image_alt: 'Michael Chen',
                    display_order: 2,
                    is_active: 1
                }
            ]);

            await AboutCTA.create({
                title: 'Ready to Tell Your Story?',
                description: "Let's work together to create content that makes a difference.",
                primary_button_text: 'Get in Touch',
                primary_button_link: '/contact',
                secondary_button_text: 'View Services',
                secondary_button_link: '/services',
                is_active: 1,
            });

            results.about = { success: true, message: 'About seeded successfully' };
        } catch (error: any) {
            results.about.message = error.message;
        }

        // 6. Seed Services
        let subcategoryMap: Record<string, any> = {};
        try {
            await ServicePost.deleteMany({});
            await ServiceSubcategory.deleteMany({});
            await ServiceCategory.deleteMany({});
            await ServicesPageHero.deleteMany({});
            await ServicesPageDetail.deleteMany({});

            const publishedStatus = await Status.findOne({ name: 'published' });

            await ServicesPageHero.create({
                tagline: 'Strategic Content That Converts',
                title: 'Strategic Content That Converts',
                description: "We don't just write words; we craft experiences.",
                is_active: 1,
            });

            const category = await ServiceCategory.create({
                name: 'Content Services',
                slug: 'content-services',
                description: 'Strategic writing, SEO, and social storytelling.',
                display_order: 1,
                is_active: 1,
            });

            const sub1 = await ServiceSubcategory.create({
                category_id: category._id,
                name: 'SEO Content',
                slug: 'seo-content',
                description: 'Search-optimized articles.',
                display_order: 1,
                is_active: 1,
            });
            subcategoryMap['seo'] = sub1._id;

            results.services = { success: true, message: 'Services seeded successfully' };
        } catch (error: any) {
            results.services.message = error.message;
        }

        // 7. Seed Contact
        try {
            await ContactPage.deleteMany({});
            await ContactPage.create({
                tagline: 'GET IN TOUCH',
                title: 'Get in Touch',
                description: "We'd love to hear from you. Let's discuss your next project.",
                is_active: 1,
            });
            results.contact = { success: true, message: 'Contact seeded successfully' };
        } catch (error: any) {
            results.contact.message = error.message;
        }

        // 8. Seed FAQ
        try {
            await FAQPage.deleteMany({});
            await FAQCategory.deleteMany({});
            await FAQItem.deleteMany({});

            await FAQPage.create({
                title: 'Frequently Asked Questions',
                description: 'Find answers to common questions about our services.',
                search_placeholder: 'Search for a question...',
                is_active: 1,
            });

            const faqCat = await FAQCategory.create({ name: 'General', slug: 'general', display_order: 1, is_active: 1 });
            await FAQItem.create({
                category_id: faqCat._id,
                question: 'What services do you offer?',
                answer: 'We offer a wide range of content services including SEO articles, copywriting, and social media management.',
                display_order: 1,
                is_active: 1
            });

            results.faq = { success: true, message: 'FAQ seeded successfully' };
        } catch (error: any) {
            results.faq.message = error.message;
        }

        // 9. Seed Terms
        try {
            await Term.deleteMany({});
            await TermSection.deleteMany({});

            const term = await Term.create({
                title: 'Terms of Service',
                last_updated: new Date().toLocaleDateString(),
                is_active: 1
            });

            await TermSection.create({
                title: '1. Introduction',
                content: 'Welcome to Content Solution. By using our services, you agree to these terms.',
                display_order: 1,
                is_active: 1
            });

            results.terms = { success: true, message: 'Terms seeded successfully' };
        } catch (error: any) {
            results.terms.message = error.message;
        }

        // 10. Seed Blog
        try {
            await BlogPageHero.deleteMany({});
            await BlogPageCTA.deleteMany({});
            await BlogPost.deleteMany({});

            const publishedStatus = await Status.findOne({ name: 'published' });

            await BlogPageHero.create({
                title: 'The Content Solution Blog',
                subtitle: 'Expert insights on content marketing and SEO.',
                background_image: 'https://via.placeholder.com/1200x400',
                is_active: 1
            });

            await BlogPost.create({
                title: 'A Modern Content Marketing Strategy',
                slug: 'modern-strategy',
                content: '<p>Content implementation is key to modern marketing...</p>',
                authorId: adminUser?._id,
                status: publishedStatus?._id,
            });

            results.blog = { success: true, message: 'Blog seeded successfully' };
        } catch (error: any) {
            results.blog.message = error.message;
        }

        // 11. Seed Testimonials
        try {
            await ReviewTestimonial.deleteMany({});
            if (subcategoryMap['seo']) {
                await ReviewTestimonial.create({
                    name: 'John Doe',
                    role: 'CEO',
                    content: 'Excellent content solution for our SEO needs!',
                    url: 'https://via.placeholder.com/150',
                    rating: 5,
                });
            }
            results.testimonials = { success: true, message: 'Testimonials seeded successfully' };
        } catch (error: any) {
            results.testimonials.message = error.message;
        }

        // 12. Seed Navbar
        try {
            await NavbarItem.deleteMany({});
            
            const defaultItems = [
                { label: 'Home', href: '/', order: 0, is_active: 1 },
                { label: 'Services', href: '/services', order: 1, is_dropdown: 1, is_active: 1 },
                { label: 'About Us', href: '/about', order: 2, is_active: 1 },
                { label: 'Blog', href: '/blog', order: 3, is_active: 1 },
                { label: 'FAQ', href: '/faq', order: 4, is_active: 1 },
                { label: 'Contact', href: '/contact', order: 5, is_active: 1 },
                { label: 'Terms', href: '/terms', order: 6, is_active: 1 },
                { label: 'Get a Quote', href: '/contact', order: 7, is_button: 1, is_active: 1 },
            ];

            for (const item of defaultItems) {
                const created = await NavbarItem.create(item);
                
                // If it's services, add categories
                if (item.href === '/services') {
                    const categories = await ServiceCategory.find().limit(5);
                    for (const [idx, cat] of categories.entries()) {
                        await NavbarItem.create({
                            label: cat.name,
                            href: `/services?category=${cat.slug}`,
                            order: idx,
                            parent_id: created._id,
                            is_active: 1
                        });
                    }
                }
            }
            results.navbar = { success: true, message: 'Navbar seeded successfully' };
        } catch (error: any) {
            results.navbar.message = error.message;
        }

        // 13. Seed Footer
        try {
            await FooterSection.deleteMany({});
            await FooterLink.deleteMany({});

            if (store) {
                const sec1 = await FooterSection.create({ store_id: store._id, title: 'Solutions', order: 1 });
                await FooterLink.create({ section_id: sec1._id, label: 'Content Strategy', href: '/services', order: 1, is_active: 1 });
                
                const sec2 = await FooterSection.create({ store_id: store._id, title: 'Company', order: 2 });
                await FooterLink.create({ section_id: sec2._id, label: 'About Us', href: '/about', order: 1, is_active: 1 });
                await FooterLink.create({ section_id: sec2._id, label: 'Contact', href: '/contact', order: 2, is_active: 1 });
            }
            results.footer = { success: true, message: 'Footer seeded successfully' };
        } catch (error: any) {
            results.footer.message = error.message;
        }

        const successCount = Object.values(results).filter(r => r.success).length;
        const totalCount = Object.keys(results).length;
        const allSucceeded = successCount === totalCount;

        return NextResponse.json({
            success: allSucceeded,
            message: allSucceeded ? 'All seeded successfully' : `${successCount}/${totalCount} seeded`,
            results
        }, { status: allSucceeded ? 201 : 207 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
