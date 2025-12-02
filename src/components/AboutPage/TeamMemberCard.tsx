import React from 'react';

interface TeamMemberCardProps {
    name: string;
    role: string;
    description: string;
    image: string;
    alt: string;
}

const TeamMemberCard = ({ name, role, description, image, alt }: TeamMemberCardProps) => {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md">
            <div className="flex items-center gap-4">
                <img
                    className="h-20 w-20 flex-shrink-0 rounded-full object-cover"
                    src={image}
                    alt={alt}
                />
                <div>
                    <h3 className="text-lg font-bold text-slate-900">{name}</h3>
                    <p className="text-sm font-semibold text-primary">{role}</p>
                </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{description}</p>
        </div>
    );
};

export default TeamMemberCard;
