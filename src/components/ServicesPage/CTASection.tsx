const CTASection = () => {
    return (
        <section className="py-20 sm:py-32">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-xl bg-slate-800 p-8 text-center md:p-12">
                    <div className="absolute -top-12 -right-12 size-48 rounded-full bg-primary/20" />
                    <div className="absolute -bottom-24 -left-12 size-64 rounded-full bg-primary/10" />
                    <div className="relative flex flex-col items-center gap-4">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Elevate Your Content?</h2>
                        <p className="max-w-2xl text-base text-slate-300 sm:text-lg">Let&apos;s talk about how our content solutions can help you achieve your business goals. Get in touch for a free consultation.</p>
                        <button className="mt-4 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold shadow-sm transition-all hover:bg-primary/90">
                            <span className="truncate">Schedule a Free Call</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
