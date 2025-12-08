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

            {/* Service Posts Section */}
            {posts.length > 0 && (
                <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Our Service Offerings</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Explore detailed information about each of our services</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <a
                                key={post.id}
                                href={`/services/${post.slug}`}
                                className="group rounded-lg overflow-hidden border border-slate-200 bg-white hover:shadow-lg hover:border-primary/30 transition-all duration-200"
                            >
                                {post.thumbnail && (
                                    <div className="overflow-hidden h-48 bg-slate-100">
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    {post.icon && (
                                        <span className="material-symbols-outlined text-primary text-3xl mb-3 block">
                                            {post.icon}
                                        </span>
                                    )}
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm line-clamp-3">{post.excerpt}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            <CTASection data={data.cta} />
        </main>
    );
}
