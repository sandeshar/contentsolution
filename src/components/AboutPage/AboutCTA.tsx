import CTAButton from '../shared/CTAButton';

interface AboutCTAData {
    id: number;
    title: string;
    description: string;
    primary_button_text: string;
    primary_button_link: string;
    secondary_button_text: string;
    secondary_button_link: string;
    is_active: number;
    updatedAt: Date;
}

interface AboutCTAProps {
    data?: AboutCTAData | null;
}

const AboutCTA = ({ data }: AboutCTAProps) => {
    if (!data) {
        return null;
    }

    return (
        <section className="w-full py-20 sm:py-32">
            <div className="mx-auto max-w-6xl">
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary to-primary/80 px-8 py-16 shadow-lg lg:px-16 lg:py-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                    <div className="relative z-10 mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-black leading-tight tracking-[-0.02em] text-white md:text-5xl">
                            {data.title}
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
                            {data.description}
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <CTAButton text={data.primary_button_text} variant="primary" className="bg-white/60 text-blue-700 hover:bg-white/90 shadow-xl" />
                            <CTAButton text={data.secondary_button_text} variant="outline" className="border-white text-white hover:bg-white hover:text-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCTA;
