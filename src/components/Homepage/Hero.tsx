import CTAButton from '../shared/CTAButton';

interface HeroData {
    id: number;
    title: string;
    subtitle: string;
    cta_text: string;
    cta_link: string;
    background_image: string;
    is_active: number;
    updatedAt: Date;
}

interface HeroProps {
    data?: HeroData | null;
}

const Hero = ({ data }: HeroProps) => {
    if (!data) {
        return null;
    }

    return (
        <section className="@container py-16 sm:py-24">
            <div className="flex flex-col gap-10 @[960px]:flex-row @[960px]:items-center">
                <div className="flex flex-col gap-6 text-left @[960px]:w-1/2">
                    <div className="flex flex-col gap-4">
                        <h1
                            className="text-slate-900 text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl">
                            {data.title}
                        </h1>
                        <h2 className="text-slate-600 text-base font-normal leading-normal @[480px]:text-lg">
                            {data.subtitle}
                        </h2>
                    </div>
                    <CTAButton text={data.cta_text} variant="primary" className="w-fit" />
                </div>
                <div className="w-full @[960px]:w-1/2 bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{ backgroundImage: `url("${data.background_image}")` }}>
                </div>
            </div>
        </section>
    );
};

export default Hero;