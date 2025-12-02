const expertiseItems = [
    {
        icon: 'explore',
        title: 'Content Strategy',
        description: 'Developing a roadmap to create, publish, and govern your content.',
    },
    {
        icon: 'search',
        title: 'SEO Writing',
        description: 'Crafting high-quality content that ranks on search engines and drives organic traffic.',
    },
    {
        icon: 'edit',
        title: 'Copywriting',
        description: 'Writing persuasive copy that converts for your website, ads, and emails.',
    },
    {
        icon: 'group',
        title: 'Social Media Marketing',
        description: 'Engaging your community with compelling content across all social platforms.',
    },
];

const Expertise = () => {
    return (
        <section className="flex flex-col gap-10 py-16 sm:py-24 @container">
            <div className="flex flex-col gap-4 text-center items-center">
                <h1
                    className="text-slate-900 tracking-light text-3xl font-bold leading-tight @[480px]:text-4xl @[480px]:font-black max-w-2xl">
                    Our Expertise
                </h1>
                <p className="text-slate-600 text-base font-normal leading-normal max-w-2xl">
                    From strategy to execution, we provide end-to-end content solutions designed to meet your business
                    objectives.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-0">
                {expertiseItems.map((item) => (
                    <div
                        key={item.title}
                        className="flex flex-1 gap-4 rounded-xl border border-slate-200 bg-white p-6 flex-col"
                    >
                        <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-slate-900 text-lg font-bold leading-tight">{item.title}</h2>
                            <p className="text-slate-600 text-sm font-normal leading-normal">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Expertise;