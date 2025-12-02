type ServiceItem = {
    key: string;
    icon: string;
    title: string;
    description: string;
    bullets: string[];
    image: string;
    imageAlt: string;
};

const services: ServiceItem[] = [
    {
        key: "seo",
        icon: "search",
        title: "SEO Content",
        description:
            "Boost your organic visibility and climb the search engine ranks. We create high-quality, keyword-rich content that not only attracts your target audience but also establishes your brand as an authority in your industry.",
        bullets: ["Keyword Research & Strategy", "On-Page SEO Optimization", "Long-form Articles & Landing Pages"],
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCFR7tIGeKNlooQKoKzI99ZmhdAiYEeN7-W0VuqKkzn5_LkeWBmDZuWq2D1sKPTZW8vgWE1MvRe4iQHi9_Cley5gsMoFI7WJk7Oot3IO0kSVaiD0P5Gc0exZJ4CefO_K6hXJHRaHpWDvobpNb7rOeFCulKjyIwwaecQGDoo9nq5Aulw1jqloMBd1rvSNYcd0KVkIvmBdnXtBXr7_zQgUXnqHwROX0L36QjKYpwBnJflSI6CLCBY_AcCn8G29HBQPOlh3GMuTSz5KKw",
        imageAlt: "Team collaborating on SEO content strategy with analytics dashboard"
    },
    {
        key: "social",
        icon: "thumb_up",
        title: "Social Media Content",
        description:
            "Engage your community and build a powerful brand presence across social platforms. We craft compelling visuals, captivating captions, and strategic campaigns that spark conversations and foster loyalty.",
        bullets: ["Content Calendars & Scheduling", "Custom Graphics & Video Shorts", "Community Management & Engagement"],
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBfyYtWae3vDTMudIqY7zy-xrwjkbuSwc7swbiEFB4yiwV0OmcrzjUcmRQbVVHJ3DveM1X28-ibIQYv2DjPbKMYW2KuF3i1p1e63rsgEQEJkuWPjOjf3Zbe8U_4OnpW24wNh2Eu7RdjVTyxZSVw8nhnRV0FsHs3AuDAJ8Ff43U5gmwN-9t1jfGQiSCmm1CfETzn844jgpGXRKqc-R-tLDyptOfOrcH2hzPwwO3L0MzYihnJbpjqKnRNKkHhXa3UTWMol8KM1qkD_8k",
        imageAlt: "Creative social media content planning with visuals"
    },
    {
        key: "copy",
        icon: "language",
        title: "Website Copywriting",
        description:
            "Turn visitors into customers with persuasive and clear website copy. We write words that reflect your brand voice, articulate your value proposition, and guide users to take action.",
        bullets: ["Homepage & Landing Page Copy", "Product & Service Descriptions", "About Us & Brand Storytelling"],
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBfyYtWae3vDTMudIqY7zy-xrwjkbuSwc7swbiEFB4yiwV0OmcrzjUcmRQbVVHJ3DveM1X28-ibIQYv2DjPbKMYW2KuF3i1p1e63rsgEQEJkuWPjOjf3Zbe8U_4OnpW24wNh2Eu7RdjVTyxZSVw8nhnRV0FsHs3AuDAJ8Ff43U5gmwN-9t1jfGQiSCmm1CfETzn844jgpGXRKqc-R-tLDyptOfOrcH2hzPwwO3L0MzYihnJbpjqKnRNKkHhXa3UTWMol8KM1qkD_8k",
        imageAlt: "Designer and copywriter refining website copy"
    },
    {
        key: "blog",
        icon: "article",
        title: "Blog Writing",
        description:
            "Establish thought leadership and provide genuine value to your audience. Our team produces well-researched, insightful, and engaging blog articles that drive traffic and build trust with your readers.",
        bullets: ["Content Ideation & Topic Research", "In-depth, Researched Articles", "Editing, Proofreading & Formatting"],
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBfyYtWae3vDTMudIqY7zy-xrwjkbuSwc7swbiEFB4yiwV0OmcrzjUcmRQbVVHJ3DveM1X28-ibIQYv2DjPbKMYW2KuF3i1p1e63rsgEQEJkuWPjOjf3Zbe8U_4OnpW24wNh2Eu7RdjVTyxZSVw8nhnRV0FsHs3AuDAJ8Ff43U5gmwN-9t1jfGQiSCmm1CfETzn844jgpGXRKqc-R-tLDyptOfOrcH2hzPwwO3L0MzYihnJbpjqKnRNKkHhXa3UTWMol8KM1qkD_8k",
        imageAlt: "Writer drafting long-form blog article with research notes"
    }
];

const ServiceDetails = () => {
    return (
        <section className="py-20 sm:py-32 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-16 lg:gap-24">
                    {services.map((s, idx) => {
                        const isReversed = idx % 2 === 1;
                        return (
                            <div key={s.key} className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 ${isReversed ? '' : ''}`}>
                                {/* Image */}
                                <div className={isReversed ? 'order-1 lg:order-2' : 'order-1'}>
                                    <div className="w-full overflow-hidden rounded-xl shadow-lg ring-1 ring-slate-200">
                                        <div
                                            className="aspect-video w-full bg-cover bg-center"
                                            style={{ backgroundImage: `url('${s.image}')` }}
                                            data-alt={s.imageAlt}
                                        />
                                    </div>
                                </div>
                                {/* Text */}
                                <div className={isReversed ? 'order-2 lg:order-1' : 'order-2'}>
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                                        </div>
                                        <h2 className="text-3xl font-bold tracking-tight">{s.title}</h2>
                                    </div>
                                    <p className="mt-4 text-lg text-slate-600">{s.description}</p>
                                    <ul className="mt-6 space-y-4 text-slate-600">
                                        {s.bullets.map(b => (
                                            <li key={b} className="flex items-start gap-3">
                                                <span className="material-symbols-outlined mt-1 text-lg text-primary">check_circle</span>
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="#" className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary/90">
                                        Learn More <span className="material-symbols-outlined ml-2">arrow_forward</span>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServiceDetails;
