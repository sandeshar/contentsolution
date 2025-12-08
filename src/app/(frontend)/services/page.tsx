import HeroSection from "@/components/ServicesPage/HeroSection";
import ServiceDetails from "@/components/ServicesPage/ServiceDetails";
import ProcessSection from "@/components/ServicesPage/ProcessSection";
import CTASection from "@/components/ServicesPage/CTASection";
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

    return (
        <main className="page-bg grow">
            <HeroSection data={data.hero} />
            <ServiceDetails services={data.details} />
            <ProcessSection section={data.processSection} steps={data.processSteps} />

            <CTASection data={data.cta} />
        </main>
    );
}
