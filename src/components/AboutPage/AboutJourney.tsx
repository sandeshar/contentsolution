import React from 'react';
import StatCard from './StatCard';
import FeatureCard from './FeatureCard';

interface AboutJourneySectionData {
    id: number;
    title: string;
    paragraph1: string;
    paragraph2: string;
    thinking_box_title: string;
    thinking_box_content: string;
    is_active: number;
    updatedAt: Date;
}

interface AboutStatData {
    id: number;
    label: string;
    value: string;
    display_order: number;
    is_active: number;
    createdAt: Date;
    updatedAt: Date;
}

interface AboutFeatureData {
    id: number;
    title: string;
    description: string;
    display_order: number;
    is_active: number;
    createdAt: Date;
    updatedAt: Date;
}

interface AboutJourneyProps {
    section?: AboutJourneySectionData | null;
    stats?: AboutStatData[];
    features?: AboutFeatureData[];
}

const AboutJourney = ({ section, stats = [], features = [] }: AboutJourneyProps) => {
    if (!section) {
        return null;
    }

    return (
        <section className="w-full py-16 sm:py-24">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-black leading-tight tracking-[-0.02em] text-slate-900 md:text-5xl">{section.title}</h2>
                        <p className="text-lg leading-relaxed text-slate-600">
                            {section.paragraph1}
                        </p>
                        <p className="text-lg leading-relaxed text-slate-600">
                            {section.paragraph2}
                        </p>
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            {stats.map((s) => (
                                <StatCard key={s.id} value={s.value} label={s.label} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                            <h3 className="text-xl font-bold text-slate-900">{section.thinking_box_title}</h3>
                            <p className="mt-3 text-slate-600 leading-relaxed text-base">
                                {section.thinking_box_content}
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {features.map((feature) => (
                                <FeatureCard key={feature.id} title={feature.title} description={feature.description} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutJourney;
