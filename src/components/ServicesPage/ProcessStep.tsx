import React from 'react';

interface ProcessStepProps {
    number: number;
    title: string;
    description: string;
}

const ProcessStep = ({ number, title, description }: ProcessStepProps) => {
    return (
        <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex size-12 items-center justify-center rounded-full border-2 border-primary bg-white font-bold text-primary shadow-sm">
                {number}
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-slate-600">{description}</p>
        </div>
    );
};

export default ProcessStep;
