interface ServicesHeroData {
    id: number;
    tagline: string;
    title: string;
    description: string;
    is_active: number;
    updatedAt: Date;
}

interface HeroSectionProps {
    data?: ServicesHeroData | null;
}

const HeroSection = ({ data }: HeroSectionProps) => {
    if (!data) {
        return null;
    }

    return (
        <section className="py-20 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center flex flex-col items-center">
                    <p className="text-base font-semibold uppercase tracking-wider text-primary">{data.tagline}</p>
                    <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{data.title}</h1>
                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">{data.description}</p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
