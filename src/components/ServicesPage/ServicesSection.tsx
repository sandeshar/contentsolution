const ServicesSection = () => {
    const services = [
        {
            icon: "search",
            title: "SEO Content",
            description: "Boost your search engine rankings with high-quality, keyword-optimized content that attracts organic traffic."
        },
        {
            icon: "thumb_up",
            title: "Social Media Content",
            description: "Engage your audience and build a loyal community with creative and consistent social media content."
        },
        {
            icon: "language",
            title: "Website Copy",
            description: "Convert visitors into customers with compelling and persuasive copy for your website pages."
        },
        {
            icon: "article",
            title: "Blog Writing",
            description: "Establish your authority and provide value to your audience with well-researched, informative blog articles."
        }
    ];

    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Our Content Marketing Services
                    </h2>
                    <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
                        We offer a comprehensive suite of content services designed to elevate your brand&apos;s online presence and drive measurable growth.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-4 rounded-xl bg-slate-50 p-6 text-center transition-shadow hover:shadow-xl"
                        >
                            <div className="flex size-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined text-3xl" data-icon="">
                                    {service.icon}
                                </span>
                            </div>
                            <div>
                                <p className="text-lg font-bold">{service.title}</p>
                                <p className="text-sm text-slate-600">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
