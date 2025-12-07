import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        const results = {
            status: { success: false, message: '' },
            homepage: { success: false, message: '' },
            about: { success: false, message: '' },
            services: { success: false, message: '' },
            contact: { success: false, message: '' },
            faq: { success: false, message: '' },
            terms: { success: false, message: '' },
            blog: { success: false, message: '' },
            users: { success: false, message: '' },
        };

        // Seed Status (must be first for blog foreign key)
        try {
            const statusRes = await fetch(`${baseUrl}/api/seed/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const statusData = await statusRes.json();
            results.status = {
                success: statusRes.ok,
                message: statusData.message || statusData.error || 'Unknown error',
            };
        } catch (error) {
            results.status.message = error instanceof Error ? error.message : 'Failed to seed';
        }

        // Seed Users
        try {
            const usersRes = await fetch(`${baseUrl}/api/seed/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const usersData = await usersRes.json();
            results.users = {
                success: usersRes.ok,
                message: usersData.message || usersData.error || 'Unknown error',
            };
        } catch (error) {
            results.users.message = error instanceof Error ? error.message : 'Failed to seed';
        }

        // Seed Homepage
        try {
            const homepageRes = await fetch(`${baseUrl}/api/seed/homepage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const homepageData = await homepageRes.json();
            results.homepage = {
                success: homepageRes.ok,
                message: homepageData.message || homepageData.error || 'Unknown error',
            };
        } catch (error) {
            results.homepage.message = error instanceof Error ? error.message : 'Failed to seed';
        }

        // Seed About
        try {
            const aboutRes = await fetch(`${baseUrl}/api/seed/about`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const aboutData = await aboutRes.json();
            results.about = {
                success: aboutRes.ok,
                message: aboutData.message || aboutData.error || 'Unknown error',
            };
        } catch (error) {
            results.about.message = error instanceof Error ? error.message : 'Failed to seed';
        }

        // Seed Services
        try {
            const servicesRes = await fetch(`${baseUrl}/api/seed/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const servicesData = await servicesRes.json();
            results.services = {
                success: servicesRes.ok,
                message: servicesData.message || servicesData.error || 'Unknown error',
            };
        } catch (error) {
            results.services.message = error instanceof Error ? error.message : 'Failed to seed';
        }

        // Seed Contact
        try {
            const contactRes = await fetch(`${baseUrl}/api/seed/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const contactData = await contactRes.json();
            results.contact = {
                success: contactRes.ok,
                message: contactData.message || contactData.error || 'Unknown error',
            };
        } catch (error) {
            results.contact.message = error instanceof Error ? error.message : 'Failed to seed';
        }

        // Seed FAQ
        try {
            const faqRes = await fetch(`${baseUrl}/api/seed/faq`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const faqData = await faqRes.json();
            results.faq = {
                success: faqRes.ok,
                message: faqData.message || faqData.error || 'Unknown error',
            };
        } catch (error) {
            results.faq.message = error instanceof Error ? error.message : 'Failed to seed';
        }

        // Seed Terms
        try {
            const termsRes = await fetch(`${baseUrl}/api/seed/terms`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const termsData = await termsRes.json();
            results.terms = {
                success: termsRes.ok,
                message: termsData.message || termsData.error || 'Unknown error',
            };
        } catch (error) {
            results.terms.message = error instanceof Error ? error.message : 'Failed to seed';
        }

        // Seed Blog
        try {
            const blogRes = await fetch(`${baseUrl}/api/seed/blog`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const blogData = await blogRes.json();
            results.blog = {
                success: blogRes.ok,
                message: blogData.message || blogData.error || 'Unknown error',
            };
        } catch (error) {
            results.blog.message = error instanceof Error ? error.message : 'Failed to seed';
        }

        // Check if all succeeded
        const allSucceeded = Object.values(results).every(r => r.success);
        const successCount = Object.values(results).filter(r => r.success).length;
        const totalCount = Object.keys(results).length;

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
