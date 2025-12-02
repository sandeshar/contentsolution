import React from 'react';
import PrincipleCard from './PrincipleCard';

const principles = [
    {
        title: 'Clarity Over Cleverness',
        description: 'A great message doesn\'t need to be cryptic. We prioritize precision and readability. Clever turns of phrase are welcome—but never at the expense of understanding.',
    },
    {
        title: 'Strategy Before Storytelling',
        description: 'Every piece of content has a purpose. Whether it\'s nurturing trust, generating leads, or educating an audience—we define goals upfront and reverse-engineer narratives that deliver.',
    },
    {
        title: 'Humans First, Algorithms Second',
        description: 'We write for people, not bots. SEO and technical optimization are essential—but they serve readability, not replace it. The reader always comes first.',
    },
];

const AboutPhilosophy = () => {
    return (
        <section className="w-full bg-slate-50 py-20 lg:py-32">
            <div className="mx-auto max-w-6xl px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-black leading-tight tracking-[-0.02em] text-slate-900 md:text-5xl">
                        Our Philosophy
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                        We believe in a content approach that balances creativity with accountability. Here are the principles that guide every project.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {principles.map((principle, index) => (
                        <PrincipleCard
                            key={index}
                            number={index + 1}
                            title={principle.title}
                            description={principle.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutPhilosophy;
