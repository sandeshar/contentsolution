"use client";

import React, { useState } from 'react';
import CTAButton from '../shared/CTAButton';

interface ContactFormProps {
    data: {
        name_placeholder: string;
        email_placeholder: string;
        phone_placeholder?: string;
        subject_placeholder: string;
        message_placeholder: string;
        submit_button_text: string;
        success_message: string;
    };
}

const ContactForm = ({ data }: ContactFormProps) => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const formFields = [
        {
            id: 'name',
            label: 'Full Name',
            type: 'text',
            placeholder: data.name_placeholder,
            gridCol: 'col-span-1',
        },
        {
            id: 'email',
            label: 'Work Email',
            type: 'email',
            placeholder: data.email_placeholder,
            gridCol: 'col-span-1',
        },
        {
            id: 'phone',
            label: 'Phone Number',
            type: 'tel',
            placeholder: data.phone_placeholder || 'Your phone number',
            gridCol: 'col-span-1',
        },
        {
            id: 'subject',
            label: 'Subject',
            type: 'text',
            placeholder: data.subject_placeholder,
            gridCol: 'col-span-2',
        },
        {
            id: 'message',
            label: 'Your Message',
            type: 'textarea',
            placeholder: data.message_placeholder,
            rows: 5,
            gridCol: 'col-span-2',
        },
    ];

    const handleChange = (field: string, value: string) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    };

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

            setStatus({ type: 'success', message: data.success_message });
            setFormState({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
            setStatus({ type: 'error', message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {formFields.map((field) => (
                        <div key={field.id} className={field.gridCol}>
                            <label className="block text-sm font-medium text-slate-700" htmlFor={field.id}>
                                {field.label}
                            </label>
                            <div className="mt-1">
                                {field.type === 'textarea' ? (
                                    <textarea
                                        className="block w-full rounded-lg border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:ring-primary"
                                        id={field.id}
                                        name={field.id}
                                        placeholder={field.placeholder}
                                        value={(formState as any)[field.id]}
                                        onChange={(e) => handleChange(field.id, e.target.value)}
                                        rows={field.rows}
                                    />
                                ) : (
                                    <input
                                        className="block w-full rounded-lg border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:ring-primary"
                                        id={field.id}
                                        name={field.id}
                                        placeholder={field.placeholder}
                                        value={(formState as any)[field.id]}
                                        onChange={(e) => handleChange(field.id, e.target.value)}
                                        type={field.type}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <CTAButton
                        text={submitting ? 'Sending...' : data.submit_button_text}
                        variant="primary"
                        className="w-full"
                        type="submit"
                        disabled={submitting}
                    />
                </div>

                {status && (
                    <div
                        className={`rounded-lg px-4 py-3 text-sm ${status.type === 'success'
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                            }`}
                    >
                        {status.type === 'success' ? data.success_message : status.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ContactForm;
