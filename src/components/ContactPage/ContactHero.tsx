import React from 'react';

interface ContactHeroProps {
    data: {
        tagline: string;
        title: string;
        description: string;
    };
}

const ContactHero = ({ data }: ContactHeroProps) => {
    return (
        <div className="flex flex-col gap-8">
            <div className="space-y-4">
                <span className="text-primary font-semibold uppercase tracking-wider">{data.tagline}</span>
                <h1 className="text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl text-slate-900">
                    {data.title}
                </h1>
                <p className="max-w-xl text-lg text-slate-600">
                    {data.description}
                </p>
            </div>
        </div>
    );
};

export default ContactHero;
