
import { notFound } from "next/navigation";
import { db } from "@/db";
import { servicePosts } from "@/db/servicePostsSchema";
import { servicesPageDetails } from "@/db/servicesPageSchema";
import { eq } from "drizzle-orm";
import TestimonialSlider from "@/components/shared/TestimonialSlider";

// Ensure Node runtime (needed for mysql2)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ServiceRecord = {
    id?: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    thumbnail?: string | null;
    icon?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
};

type ServiceDetail = {
    title: string;
    bullets: string;
};

type ServicePostPageProps = {
    params: Promise<{ slug: string }>;
};

async function getServicePost(slug: string): Promise<ServiceRecord | null> {
    // 1) Primary: service_posts
    const post = await db
        .select()
        .from(servicePosts)
        .where(eq(servicePosts.slug, slug))
        .limit(1);

    if (post.length) {
        const p = post[0];
        return {
            id: p.id,
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            content: p.content,
            thumbnail: p.thumbnail,
            icon: p.icon,
            meta_title: p.meta_title,
            meta_description: p.meta_description,
        };
    }

    // 2) Fallback: services_page_details by slug
    const detailBySlug = await db
        .select()
        .from(servicesPageDetails)
        .where(eq(servicesPageDetails.slug, slug))
        .limit(1);

    if (detailBySlug.length) {
        return normalizeDetail(detailBySlug[0], slug);
    }

    // 3) Fallback: services_page_details by key
    const detailByKey = await db
        .select()
        .from(servicesPageDetails)
        .where(eq(servicesPageDetails.key, slug))
        .limit(1);

    if (detailByKey.length) {
        return normalizeDetail(detailByKey[0], slug);
    }

    return null;
}

function normalizeDetail(detail: any, fallbackSlug: string): ServiceRecord {
    return {
        slug: detail?.slug || detail?.key || fallbackSlug,
        title: detail?.title || "Service",
        excerpt: detail?.description || "",
        content: detail?.content || `<p>${detail?.description || ""}</p>`,
        thumbnail: detail?.image || null,
        icon: detail?.icon || null,
        meta_title: detail?.meta_title || detail?.title || null,
        meta_description: detail?.meta_description || detail?.description || null,
    };
}

async function getServiceDetailBySlug(slug: string): Promise<ServiceDetail | null> {
    try {
        // Try to find by slug first
        const detailBySlug = await db
            .select({
                title: servicesPageDetails.title,
                bullets: servicesPageDetails.bullets,
            })
            .from(servicesPageDetails)
            .where(eq(servicesPageDetails.slug, slug))
            .limit(1);

        if (detailBySlug.length) {
            return detailBySlug[0];
        }

        // Fallback to key
        const detailByKey = await db
            .select({
                title: servicesPageDetails.title,
                bullets: servicesPageDetails.bullets,
            })
            .from(servicesPageDetails)
            .where(eq(servicesPageDetails.key, slug))
            .limit(1);

        if (detailByKey.length) {
            return detailByKey[0];
        }

        return null;
    } catch (error) {
        console.error('Error fetching service detail:', error);
        return null;
    }
}

export default async function ServicePostPage({ params }: ServicePostPageProps) {
    const { slug } = await params;
    const [post, serviceDetail] = await Promise.all([
        getServicePost(slug),
        getServiceDetailBySlug(slug)
    ]);

    if (!post) notFound();

    return (
        <main className="flex flex-col items-center page-bg">
            <div className="flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
                {/* Hero Section */}
                <section className="relative py-16 sm:py-24">
                    <div className="absolute inset-0 -z-10 bg-linear-to-br from-slate-50 to-slate-100" />
                    <div className="mx-auto w-full max-w-6xl">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            {/* Left Content */}
                            <div className="flex-1">
                                {post.icon && (
                                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl mb-6">
                                        <span className="material-symbols-outlined text-4xl md:text-5xl text-primary">{post.icon}</span>
                                    </div>
                                )}
                                <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4 leading-tight">
                                    {post.title}
                                </h1>
                                <p className="text-lg text-[#4b5563] leading-relaxed mb-8">
                                    {post.excerpt}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="/contact"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
                                    >
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                        Get Started
                                    </a>
                                    <a
                                        href="#details"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-[#0f172a] font-semibold rounded-lg hover:bg-slate-50 transition"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>
                            {/* Right Image */}
                            {post.thumbnail && (
                                <div className="flex-1">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl -z-10" />
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="w-full rounded-2xl shadow-2xl"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Details Section */}
                <section id="details" className="py-16 sm:py-24">
                    <div className="mx-auto w-full max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
                            {/* Main Content */}
                            <div className="space-y-12">
                                {/* About Section */}
                                <div>
                                    <h2 className="text-3xl font-bold text-[#0f172a] mb-6">How It Works</h2>
                                    <div
                                        className="prose prose-lg max-w-none 
                                            prose-headings:font-bold prose-headings:text-[#0f172a] prose-headings:mt-6 prose-headings:mb-3
                                            prose-p:text-[#475569] prose-p:mb-4
                                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                            prose-strong:text-[#0f172a] prose-strong:font-semibold
                                            prose-li:text-[#475569] prose-li:marker:text-primary"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                </div>
                            </div>
                            {/* Sidebar */}
                            <aside className="space-y-6 sticky top-24">
                                {/* Quick Action Card */}
                                <div className="bg-linear-to-br from-primary to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                                    <h3 className="text-xl font-bold mb-2">Ready?</h3>
                                    <p className="text-white/90 text-sm mb-6">Let's discuss your project needs.</p>
                                    <a
                                        href="/contact"
                                        className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 bg-white text-primary font-semibold rounded-lg hover:shadow-lg transition"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">call</span>
                                        Contact Us
                                    </a>
                                </div>
                                {/* Service Benefits */}
                                {serviceDetail && (() => {
                                    let bullets: string[] = [];
                                    try {
                                        bullets = JSON.parse(serviceDetail.bullets);
                                    } catch (e) {
                                        console.error('Error parsing bullets:', e);
                                    }
                                    if (bullets.length > 0) {
                                        return (
                                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                                <h4 className="text-sm font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary">star</span>
                                                    Key Benefits
                                                </h4>
                                                <ul className="space-y-3 text-sm text-[#475569]">
                                                    {bullets.map((bullet, idx) => (
                                                        <li key={idx} className="flex gap-3">
                                                            <span className="material-symbols-outlined text-primary text-base shrink-0">check_circle</span>
                                                            <span>{bullet}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    }
                                    return null;
                                })()}
                            </aside>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                {post.id && (
                    <section className="py-16 sm:py-24">
                        <TestimonialSlider
                            filter={String(post.id)}
                            title={`Success Stories for ${post.title}`}
                            subtitle="See how we've helped clients succeed with this service"
                        />
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-16 sm:py-24 bg-linear-to-r from-primary/5 to-indigo-500/5 border-y border-slate-200">
                    <div className="mx-auto w-full max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
                            Let's Bring Your Vision to Life
                        </h2>
                        <p className="text-lg text-[#4b5563] mb-8">
                            Schedule a free consultation to explore how {post.title} can benefit your business.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition shadow-lg"
                        >
                            <span className="material-symbols-outlined">calendar_month</span>
                            Schedule Consultation
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}

export async function generateMetadata({ params }: ServicePostPageProps) {
    const { slug } = await params;
    const post = await getServicePost(slug);

    if (!post) {
        return { title: "Service Not Found" };
    }

    return {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
    };
}
