import CTAButton from '../shared/CTAButton';

interface AboutHeroData {
    id: number;
    title: string;
    description: string;
    button1_text: string;
    button1_link: string;
    button2_text: string;
    button2_link: string;
    hero_image: string;
    hero_image_alt: string;
    is_active: number;
    updatedAt: Date;
}

interface AboutHeroProps {
    data?: AboutHeroData | null;
}

const AboutHero = ({ data }: AboutHeroProps) => {
    if (!data) {
        return null;
    }

    return (
        <section className="w-full py-20 lg:py-32">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-slate-900 md:text-6xl">
                            {data.title}
                        </h1>
                        <p className="text-lg leading-relaxed text-slate-600">
                            {data.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <CTAButton text={data.button1_text} variant="primary" />
                            <CTAButton text={data.button2_text} variant="secondary" />
                        </div>
                    </div>
                    <div className="relative h-80 w-full overflow-hidden rounded-xl lg:h-[420px]">
                        <img
                            className="h-full w-full object-cover"
                            src={data.hero_image}
                            alt={data.hero_image_alt}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
