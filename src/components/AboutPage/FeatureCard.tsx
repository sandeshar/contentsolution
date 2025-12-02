import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            {icon && <div className="mb-3">{icon}</div>}
            <h4 className="text-sm font-bold tracking-wide text-primary uppercase">{title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
        </div>
    );
};

export default FeatureCard;
