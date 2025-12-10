'use client';

import React from 'react';

interface TestimonialCardProps {
    name: string;
    role: string;
    content: string;
    image: string;
    rating: number;
    date?: string;
}

const TestimonialCard = ({
    name,
    role,
    content,
    image,
    rating,
    date,
}: TestimonialCardProps) => {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md">
            {/* Rating */}
            <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <span
                        key={index}
                        className={`material-symbols-outlined text-xl ${index < rating
                            ? 'text-yellow-400'
                            : 'text-slate-300'
                            }`}
                        style={{
                            fontVariationSettings: index < rating ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400"
                        }}
                    >
                        star
                    </span>
                ))}
            </div>

            {/* Content */}
            <p className="text-sm leading-relaxed text-slate-600">{content}</p>

            {/* Author */}
            <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <img
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                    src={image}
                    alt={name}
                />
                <div>
                    <h4 className="text-sm font-bold text-slate-900">{name}</h4>
                    <p className="text-xs text-slate-500">{role}</p>
                    {date && (
                        <p className="text-xs text-slate-400">
                            {new Date(date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
