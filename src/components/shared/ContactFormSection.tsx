"use client";

import { useState } from 'react';
import CTAButton from './CTAButton';

interface ContactFormSectionProps {
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder?: string;
    servicePlaceholder: string;
    messagePlaceholder: string;
    submitButtonText: string;
    successMessage?: string;
    className?: string;
    variant?: 'simple' | 'labeled'; // simple for homepage, labeled for contact page
}

const ContactFormSection = ({
    namePlaceholder,
    emailPlaceholder,
    phonePlaceholder,
    servicePlaceholder,
    messagePlaceholder,
    submitButtonText,
    successMessage = 'Thank you for contacting us! We will get back to you soon.',
    className = '',
    variant = 'simple'
}: ContactFormSectionProps) => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(null);
        setSubmitting(true);

        try {
            const res = await fetch('/api/pages/contact/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus({ type: 'success', message: successMessage });
            setFormState({ name: '', email: '', phone: '', service: '', message: '' });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
            setStatus({ type: 'error', message });
        } finally {
            setSubmitting(false);
        }
    };

    if (variant === 'labeled') {
        return (
            <form className={`flex flex-col gap-6 ${className}`} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <label className="flex flex-col">
                        <p className="pb-2 text-sm font-medium leading-normal text-[#111318]">Full Name</p>
                        <input
                            className="form-input flex h-12 w-full resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-base font-normal leading-normal text-[#111318] placeholder:text-[#616f89] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50"
                            placeholder={namePlaceholder}
                            type="text"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            required
                        />
                    </label>
                    <label className="flex flex-col">
                        <p className="pb-2 text-sm font-medium leading-normal text-[#111318]">Work Email</p>
                        <input
                            className="form-input flex h-12 w-full resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-base font-normal leading-normal text-[#111318] placeholder:text-[#616f89] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50"
                            placeholder={emailPlaceholder}
                            type="email"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            required
                        />
                    </label>
                </div>
                <label className="flex flex-col">
                    <p className="pb-2 text-sm font-medium leading-normal text-[#111318]">Phone Number</p>
                    <input
                        className="form-input flex h-12 w-full resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-base font-normal leading-normal text-[#111318] placeholder:text-[#616f89] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50"
                        placeholder={phonePlaceholder || 'Enter your phone number'}
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                </label>
                <label className="flex flex-col">
                    <p className="pb-2 text-sm font-medium leading-normal text-[#111318]">Service of Interest</p>
                    <select
                        className="form-select flex h-12 w-full resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-base font-normal leading-normal text-[#111318] placeholder:text-[#616f89] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50"
                        value={formState.service}
                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                        required
                    >
                        <option value="">{servicePlaceholder || 'Select a service'}</option>
                        <option value="content-writing">Content Writing</option>
                        <option value="seo-services">SEO Services</option>
                        <option value="web-development">Web Development</option>
                        <option value="consulting">Consulting</option>
                    </select>
                </label>
                <label className="flex flex-col">
                    <p className="pb-2 text-sm font-medium leading-normal text-[#111318]">Your Message</p>
                    <textarea
                        className="form-textarea flex min-h-36 w-full resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-base font-normal leading-normal text-[#111318] placeholder:text-[#616f89] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50"
                        placeholder={messagePlaceholder}
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        required
                    />
                </label>

                <CTAButton
                    text={submitting ? 'Sending...' : submitButtonText}
                    variant="primary"
                    className="w-full shadow-none hover:shadow-none"
                    type="submit"
                    disabled={submitting}
                />

                {status && (
                    <div
                        className={`rounded-lg border px-4 py-3 text-sm ${status.type === 'success'
                            ? 'border-green-200 bg-green-50 text-green-800'
                            : 'border-red-200 bg-red-50 text-red-800'
                            }`}
                    >
                        {status.message}
                    </div>
                )}
            </form>
        );
    }

    return (
        <form className={`flex flex-col gap-4 ${className}`} onSubmit={handleSubmit}>
            <input
                className="w-full h-12 px-4 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                placeholder={namePlaceholder}
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
            />
            <input
                className="w-full h-12 px-4 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                placeholder={emailPlaceholder}
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
            />
            <input
                className="w-full h-12 px-4 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                placeholder={phonePlaceholder || 'Phone Number'}
                type="tel"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
            />
            <select
                className="w-full h-12 px-4 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                value={formState.service}
                onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                required
            >
                <option value="">{servicePlaceholder || 'Select a service'}</option>
                <option value="content-writing">Content Writing</option>
                <option value="seo-services">SEO Services</option>
                <option value="web-development">Web Development</option>
                <option value="consulting">Consulting</option>
            </select>
            <textarea
                className="w-full px-4 py-3 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                placeholder={messagePlaceholder}
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
            />
            <CTAButton
                text={submitting ? 'Sending...' : submitButtonText}
                variant="primary"
                className="w-full shadow-none hover:shadow-none"
                type="submit"
                disabled={submitting}
            />
            {status && (
                <div
                    className={`rounded-lg px-4 py-3 text-sm ${status.type === 'success'
                        ? 'border border-green-200 bg-green-50 text-green-800'
                        : 'border border-red-200 bg-red-50 text-red-800'
                        }`}
                >
                    {status.message}
                </div>
            )}
        </form>
    );
};

export default ContactFormSection;
