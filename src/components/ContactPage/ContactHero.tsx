import React from 'react';
import CTAButton from '../shared/CTAButton';

interface ContactHeroProps {
    data: {
        tagline: string;
        title: string;
        description: string;
    };
}

const ContactHero = ({ data }: ContactHeroProps) => {
    return (
        <div className="flex flex-col items-center text-center">
            {data.tagline && (
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                    {data.tagline}
                </p>
            )}
            <h1 className="mb-4 text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] text-[#111318]">
                {data.title || 'Contact Our Team'}
            </h1>
            <p className="mb-8 max-w-3xl mx-auto text-lg md:text-xl text-[#616f89]">
                {data.description || "Have a project in mind or just want to say hello? We'd love to connect. Reach out and let's create something amazing together."}
            </p>
            <CTAButton text="Start a Project With Us" className="px-6 mx-auto shadow-none hover:shadow-none" />
        </div>
    );
};

export default ContactHero;
