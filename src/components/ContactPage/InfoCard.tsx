import React from 'react';

interface InfoCardProps {
    icon: React.ReactNode;
    heading: string;
    text: string;
}

const InfoCard = ({ icon, heading, text }: InfoCardProps) => {
    return (
        <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-slate-900">{heading}</h3>
                <p className="text-slate-600">{text}</p>
            </div>
        </div>
    );
};

export default InfoCard;
