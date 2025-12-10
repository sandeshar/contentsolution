import HeroSection from "@/components/ServicesPage/HeroSection";
import ServiceDetails from "@/components/ServicesPage/ServiceDetails";
import ProcessSection from "@/components/ServicesPage/ProcessSection";
import CTASection from "@/components/ServicesPage/CTASection";
import TestimonialSlider from "@/components/shared/TestimonialSlider";
import { db } from "@/db";
import { servicePosts } from "@/db/servicePostsSchema";
import { desc, eq } from "drizzle-orm";

async function getServicesPageData() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    try {
        const [
            heroRes,
            detailsRes,
            processSectionRes,
            processStepsRes,
            ctaRes
        ] = await Promise.all([
            fetch(`${baseUrl}/api/pages/services/hero`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/services/details`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/services/process-section`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/services/process-steps`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/services/cta`, { cache: 'no-store' }),
        ]);

        const hero = heroRes.ok ? await heroRes.json() : null;
        const details = detailsRes.ok ? await detailsRes.json() : [];
        const processSection = processSectionRes.ok ? await processSectionRes.json() : null;
        const processSteps = processStepsRes.ok ? await processStepsRes.json() : [];
        const cta = ctaRes.ok ? await ctaRes.json() : null;

        return {
            hero,
            details,
            processSection,
            processSteps,
            cta,
        };
    } catch (error) {
        console.error('Error fetching services page data:', error);
        return {
            hero: null,
            details: [],
            processSection: null,
            processSteps: [],
            cta: null,
        };
    }
}

function mergeServiceDetailsWithPosts(details: any[], posts: any[]) {
    const normalizedDetails = (details || []).map((detail) => ({
        ...detail,
        // Ensure bullets stays a JSON string for the ServiceDetails component
        bullets: typeof detail.bullets === 'string'
            ? detail.bullets
            : JSON.stringify(detail.bullets || []),
    }));

    const existingSlugs = new Set(
        normalizedDetails.map((d) => (d.slug || d.key || '').toLowerCase())
    );

    const fallbackFromPosts = (posts || [])
        // Keep only published/active posts (statusId 2 is "Published")
        .filter((p) => p.statusId === 2)
        // Avoid duplicating services that already have page details
        .filter((p) => !existingSlugs.has((p.slug || '').toLowerCase()))
        .map((p, idx) => ({
            // Map to the shape ServiceDetails expects
            id: p.id,
            key: p.slug,
            slug: p.slug,
            icon: p.icon || 'design_services',
            title: p.title,
            description: p.excerpt,
            bullets: '[]',
            image: p.thumbnail || '',
            image_alt: p.title,
            // Append after any existing detailed services
            display_order: normalizedDetails.length + idx + 1,
            is_active: 1,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
        }));

    return [...normalizedDetails, ...fallbackFromPosts];
}

async function getServicePosts() {
    try {
        const posts = await db
            .select()
            .from(servicePosts)
            .where(eq(servicePosts.statusId, 2))
            .orderBy(desc(servicePosts.createdAt));
        return posts;
    } catch (error) {
        console.error('Error fetching service posts:', error);
        return [];
    }
}

export default async function ServicesPage() {
    const [data, posts] = await Promise.all([
        getServicesPageData(),
        getServicePosts()
    ]);

    const services = mergeServiceDetailsWithPosts(data.details, posts);

    return (
        <main className="page-bg grow">
            <HeroSection data={data.hero} />
            <ServiceDetails services={services} />
            <ProcessSection section={data.processSection} steps={data.processSteps} />
            <TestimonialSlider
                filter="services"
                title="Client Success Stories"
                subtitle="Discover how we've helped businesses achieve their goals"
            />
            <CTASection data={data.cta} />
        </main>
    );
}
