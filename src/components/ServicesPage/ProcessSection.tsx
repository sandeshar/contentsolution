import ProcessStep from './ProcessStep';

const ProcessSection = () => {
    const steps = [
        {
            number: 1,
            title: "Discover",
            description: "We start by understanding your brand, audience, and goals."
        },
        {
            number: 2,
            title: "Strategize",
            description: "We develop a tailored content plan to achieve your objectives."
        },
        {
            number: 3,
            title: "Create",
            description: "Our expert writers and creators produce high-quality content."
        },
        {
            number: 4,
            title: "Deliver",
            description: "We deliver content on schedule and measure its performance."
        }
    ];

    return (
        <section className="py-20 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Our Simple, Effective Process
                    </h2>
                    <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
                        We follow a proven four-step process to ensure your content strategy is a success from start to finish.
                    </p>
                </div>
                <div className="relative mt-12">
                    <div className="absolute top-1/2 -mt-px hidden w-full border-t-2 border-dashed border-slate-300 lg:block" />
                    <div className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step) => (
                            <ProcessStep
                                key={step.number}
                                number={step.number}
                                title={step.title}
                                description={step.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
