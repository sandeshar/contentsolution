const AboutCTA = () => {
    return (
        <section className="w-full py-20 lg:py-32">
            <div className="mx-auto max-w-6xl px-4">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-8 py-16 shadow-lg lg:px-16 lg:py-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                    <div className="relative z-10 mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-black leading-tight tracking-[-0.02em] text-white md:text-5xl">
                            Let's Build Something Great Together
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
                            Whether you need a single landing page or a full-scale content ecosystem, we're ready to collaborate. Let's turn your vision into results-driven narratives.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <button className="flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-bold text-primary tracking-[0.015em] transition-all hover:bg-white/90 hover:shadow-xl">
                                <span className="truncate">Start a Project</span>
                            </button>
                            <button className="flex h-12 items-center justify-center rounded-lg border-2 border-white px-8 text-base font-bold text-white tracking-[0.015em] transition-all hover:bg-white hover:text-primary">
                                <span className="truncate">View Our Work</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCTA;
