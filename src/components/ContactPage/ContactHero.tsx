import React from 'react';

const ContactHero = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="space-y-4">
                <span className="text-primary font-semibold uppercase tracking-wider">Contact Us</span>
                <h1 className="text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl text-slate-900">
                    Let's Start a Conversation
                </h1>
                <p className="max-w-xl text-lg text-slate-600">
                    We're here to help you with your content needs. Reach out to us, and we'll get back to you as soon as possible.
                </p>
            </div>
        </div>
    );
};

export default ContactHero;
