'use client';

import React, { useEffect, useState } from 'react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    url: string;
    rating: number;
    date: string;
}

interface TestimonialSliderProps {
    title?: string;
    subtitle?: string;
    filter?: string; // 'homepage', 'about', or service ID
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
    title = "Don't Just Take Our Word For It",
    subtitle = "We've helped businesses of all sizes achieve their content marketing goals. Here's what they have to say about our work.",
    filter = 'homepage',
}) => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, [filter]);

    const fetchTestimonials = async () => {
        try {
            let url = '/api/testimonial';

            // Check if filter is a service ID (numeric)
            if (!isNaN(Number(filter)) && Number(filter) > 0) {
                url += `?service=${filter}`;
            } else {
                // It's a page filter like 'homepage' or 'about'
                url += `?homepage=false&limit=10`;
            }

            const response = await fetch(url);
            const data = await response.json();

            // Filter by link/placement if it's not a service filter
            let filtered = data;
            if (isNaN(Number(filter))) {
                filtered = data.filter((t: Testimonial & { link?: string }) =>
                    t.link?.split(',').map(l => l.trim()).includes(filter)
                );
            }

            setTestimonials(filtered);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return null;
    }

    // Duplicate testimonials multiple times for infinite loop effect
    // Repeat 4 times to ensure smooth scrolling even with few testimonials
    const duplicatedTestimonials = [
        ...testimonials,
        ...testimonials,
        ...testimonials,
        ...testimonials
    ];

    return (
        <section className="py-16 sm:py-24 overflow-hidden">
            <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-4 text-center items-center">
                    <h2 className="text-slate-900 text-3xl font-bold tracking-tight md:text-4xl md:font-black max-w-2xl">
                        {title}
                    </h2>
                    <p className="text-slate-600 text-lg font-normal leading-relaxed max-w-3xl">
                        {subtitle}
                    </p>
                </div>

                <div className="relative mask-gradient">
                    <div className="flex gap-8 animate-scroll">
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial.id}-${index}`}
                                className="shrink-0 w-[90vw] md:w-[45vw] lg:w-[30vw] flex flex-col justify-between gap-6 p-6 rounded-xl bg-white border border-slate-200"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-0.5 text-yellow-500">
                                        {Array.from({ length: 5 }).map((_, idx) => (
                                            <span
                                                key={idx}
                                                className="material-symbols-outlined text-xl"
                                                style={{
                                                    fontVariationSettings: idx < testimonial.rating ? "'FILL' 1" : "'FILL' 0"
                                                }}
                                            >
                                                star
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-lg font-medium leading-relaxed">
                                        "{testimonial.content}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img
                                        alt={testimonial.name}
                                        className="h-10 w-10 rounded-full object-cover grayscale"
                                        src={testimonial.url}
                                    />
                                    <div>
                                        <p className="font-bold text-slate-900">{testimonial.name}</p>
                                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-25%);
                    }
                }

                .animate-scroll {
                    animation: scroll 15s linear infinite;
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }

                .mask-gradient {
                    position: relative;
                }

                .mask-gradient::before,
                .mask-gradient::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 150px;
                    z-index: 10;
                    pointer-events: none;
                }

                .mask-gradient::before {
                    left: 0;
                    background: linear-gradient(to right, white, transparent);
                }

                .mask-gradient::after {
                    right: 0;
                    background: linear-gradient(to left, white, transparent);
                }
            `}</style>
        </section>
    );
};

export default TestimonialSlider;
