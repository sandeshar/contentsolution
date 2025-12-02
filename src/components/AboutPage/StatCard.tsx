import React from 'react';

interface StatCardProps {
    value: string;
    label: string;
}

const StatCard = ({ value, label }: StatCardProps) => {
    return (
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-6 text-center shadow-sm">
            <div className="text-2xl font-extrabold tracking-tight text-slate-900">{value}</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
        </div>
    );
};

export default StatCard;
