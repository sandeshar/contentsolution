import React from 'react';
import StatCard from './StatCard';
import FeatureCard from './FeatureCard';

const stats = [
    { label: 'Happy Clients', value: '120+' },
    { label: 'Projects Completed', value: '450+' },
    { label: 'Years of Experience', value: '8+' },
];

const features = [
    {
        title: 'Process',
        description: 'Research, outline, draft, refine. Each step has defined quality checks ensuring consistency and clarity.',
    },
    {
        title: 'Collaboration',
        description: 'We operate as an extension of your team—transparent in communication, proactive in problem solving.',
    },
    {
        title: 'Adaptability',
        description: 'Market trends shift fast. Our frameworks allow content ecosystems to evolve without losing coherence.',
    },
    {
        title: 'Performance',
        description: 'We track impact beyond surface metrics—engagement depth, keyword momentum, conversion assist, and brand lift.',
    },
];

const AboutJourney = () => {
    return (
        <section className="w-full py-20 lg:py-32">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-black leading-tight tracking-[-0.02em] text-slate-900 md:text-5xl">Our Journey</h2>
                        <p className="text-lg leading-relaxed text-slate-600">
                            What began as a small content studio has evolved into a strategic brand partner for businesses across industries. We learned early that effective content isn&apos;t just about words—it&apos;s about timing, relevance, structure, and emotional connection. Every project sharpened our process. Every client taught us something new.
                        </p>
                        <p className="text-lg leading-relaxed text-slate-600">
                            Today, we blend editorial craftsmanship with data-driven precision. Whether it&apos;s a conversion-focused landing page, a thought leadership article, or a full-scale website narrative—our approach is intentional, collaborative, and scalable.
                        </p>
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            {stats.map((s) => (
                                <StatCard key={s.label} value={s.value} label={s.label} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                            <h3 className="text-xl font-bold text-slate-900">How We Think</h3>
                            <p className="mt-3 text-slate-600 leading-relaxed text-base">
                                Content must earn its place. We evaluate audience intent, distribution channels, lifecycle purpose, and measurable outcomes before a single headline is written. This keeps strategy and creativity in sync.
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {features.map((feature) => (
                                <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutJourney;
