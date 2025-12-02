import React from 'react';

const formFields = [
    {
        id: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'John Doe',
        gridCol: 'col-span-1',
    },
    {
        id: 'email',
        label: 'Work Email',
        type: 'email',
        placeholder: 'you@example.com',
        gridCol: 'col-span-1',
    },
    {
        id: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'Content Strategy Inquiry',
        gridCol: 'col-span-2',
    },
    {
        id: 'message',
        label: 'Your Message',
        type: 'textarea',
        placeholder: "Hi, I'd like to inquire about...",
        rows: 5,
        gridCol: 'col-span-2',
    },
];

const ContactForm = () => {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
            <form action="#" className="space-y-6">
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
                                        rows={field.rows}
                                    />
                                ) : (
                                    <input
                                        className="block w-full rounded-lg border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:ring-primary"
                                        id={field.id}
                                        name={field.id}
                                        placeholder={field.placeholder}
                                        type={field.type}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <button
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                        type="submit"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
