const AboutHero = () => {
    return (
        <section className="w-full py-20 lg:py-32">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-slate-900 md:text-6xl">
                            We Don't Just Write. We Build Worlds with Words.
                        </h1>
                        <p className="text-lg leading-relaxed text-slate-600">
                            Welcome to Content Solution Nepal. We're a team of storytellers, strategists, and digital artisans dedicated to crafting narratives that resonate, engage, and drive growth. Your brand has a story. Let's tell it together.
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <button className="flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white tracking-[0.015em] transition-colors hover:bg-primary/90">
                                <span className="truncate">Meet the Team</span>
                            </button>
                            <button className="flex h-12 items-center justify-center rounded-lg bg-slate-200 px-6 text-base font-bold text-slate-900 tracking-[0.015em] transition-colors hover:bg-slate-300">
                                <span className="truncate">Our Story</span>
                            </button>
                        </div>
                    </div>
                    <div className="relative h-80 w-full overflow-hidden rounded-xl lg:h-[420px]">
                        <img
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTGNaIxV2yP8yow4vP4sY-zbc2rGNflWrmYA6XGpOKuy0LiNEdcuCLu0m9b1WbTFpw3v3-d-OgpGVH8wbsGNshWs2GFVT-zZTMpF7UJ9ykyyLa1PyF_vfQSbW6f2fveOmmpTQ66uhhM5w8bJLYOOoULMgIWwePl-eTFMrzCfXWjVvUTejB5cJEZ0b5tqEM7RSy-eO-CklDZypw8e5SRxq2IFJ_7PtJNqm5ij0ilfaT66A_WIGoPSQrH8kiHzxAp7tHrL-vjB3sBNo"
                            alt="Creative team collaborating in a modern office space"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
