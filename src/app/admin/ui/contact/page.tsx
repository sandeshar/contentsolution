"use client";

import { useState } from "react";

export default function ContactPageUI() {
    const [activeTab, setActiveTab] = useState("hero");
    const [saving, setSaving] = useState(false);

    // --- Hero Section State ---
    const [heroData, setHeroData] = useState({
        tagline: "Contact Us",
        title: "Let's Start a Conversation",
        description: "We'd love to hear from you and discuss how we can help.",
        isActive: true
    });

    // --- Contact Info State ---
    const [contactInfo, setContactInfo] = useState({
        officeLocation: "123 Business St, Tech City",
        phone: "+1 (555) 123-4567",
        email: "hello@example.com",
        mapImage: "",
        mapImageAlt: "",
        isActive: true,
    });

    // --- Form Configuration State ---
    const [formConfig, setFormConfig] = useState({
        namePlaceholder: "Your Name",
        emailPlaceholder: "your@email.com",
        subjectPlaceholder: "Subject",
        messagePlaceholder: "How can we help you?",
        submitButtonText: "Send Message",
        successMessage: "Thank you! We'll be in touch soon.",
        isActive: true,
    });

    // --- Handlers ---
    const handleSave = async () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            alert("Settings saved successfully!");
        }, 1000);
    };

    // (Removed) Highlights state — not used on frontend

    const tabs = [
        { id: "hero", label: "Hero" },
        { id: "info", label: "Contact Info" },

        { id: "form", label: "Form Config" },
    ];

    return (
        <div className="w-full min-h-screen bg-white pb-20">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-full mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Contact Page</h1>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <span className="material-symbols-outlined text-[18px]">save</span>
                        )}
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <div className="w-full mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="flex justify-center mb-10">
                    <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 inline-flex gap-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                    ? "bg-gray-900 text-white shadow-md"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto">

                    {/* HERO SECTION */}
                    {activeTab === "hero" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-indigo-500">contact_page</span>
                                    Hero Configuration
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Tagline" value={heroData.tagline} onChange={(v) => setHeroData({ ...heroData, tagline: v })} placeholder="e.g. Contact Us" />
                                    <InputGroup label="Title" value={heroData.title} onChange={(v) => setHeroData({ ...heroData, title: v })} />
                                    <TextAreaGroup label="Description" value={heroData.description} onChange={(v) => setHeroData({ ...heroData, description: v })} />

                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Section</span>
                                        <Toggle checked={heroData.isActive} onChange={(c) => setHeroData({ ...heroData, isActive: c })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CONTACT INFO SECTION */}
                    {activeTab === "info" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-purple-500">info</span>
                                    Contact Information
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Office Location" value={contactInfo.officeLocation} onChange={(v) => setContactInfo({ ...contactInfo, officeLocation: v })} />
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputGroup label="Phone" value={contactInfo.phone} onChange={(v) => setContactInfo({ ...contactInfo, phone: v })} />
                                        <InputGroup label="Email" value={contactInfo.email} onChange={(v) => setContactInfo({ ...contactInfo, email: v })} />
                                    </div>
                                    <ImageUploader label="Map Image" value={contactInfo.mapImage} onChange={(v) => setContactInfo({ ...contactInfo, mapImage: v })} folder="contact" />
                                    <InputGroup label="Map Image Alt Text" value={contactInfo.mapImageAlt} onChange={(v) => setContactInfo({ ...contactInfo, mapImageAlt: v })} />
                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Section</span>
                                        <Toggle checked={contactInfo.isActive} onChange={(c) => setContactInfo({ ...contactInfo, isActive: c })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* (Removed) HIGHLIGHTS SECTION */}

                    {/* FORM CONFIG SECTION */}
                    {activeTab === "form" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500">edit_note</span>
                                    Form Configuration
                                </h2>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputGroup label="Name Placeholder" value={formConfig.namePlaceholder} onChange={(v) => setFormConfig({ ...formConfig, namePlaceholder: v })} />
                                        <InputGroup label="Email Placeholder" value={formConfig.emailPlaceholder} onChange={(v) => setFormConfig({ ...formConfig, emailPlaceholder: v })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputGroup label="Subject Placeholder" value={formConfig.subjectPlaceholder} onChange={(v) => setFormConfig({ ...formConfig, subjectPlaceholder: v })} />
                                        <InputGroup label="Message Placeholder" value={formConfig.messagePlaceholder} onChange={(v) => setFormConfig({ ...formConfig, messagePlaceholder: v })} />
                                    </div>
                                    <InputGroup label="Submit Button Text" value={formConfig.submitButtonText} onChange={(v) => setFormConfig({ ...formConfig, submitButtonText: v })} />
                                    <InputGroup label="Success Message" value={formConfig.successMessage} onChange={(v) => setFormConfig({ ...formConfig, successMessage: v })} />
                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Form</span>
                                        <Toggle checked={formConfig.isActive} onChange={(c) => setFormConfig({ ...formConfig, isActive: c })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Reusable Components ---

function InputGroup({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-200 py-2.5 px-4"
            />
        </div>
    );
}

function TextAreaGroup({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={3}
                className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-200 py-2.5 px-4 resize-none"
            />
        </div>
    );
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: (c: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
        >
            <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
            />
        </button>
    );
}

function Checkbox({ label, checked, onChange }: { label: string, checked: boolean, onChange: (c: boolean) => void }) {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">{label}</span>
        </label>
    );
}

import ImageUploader from "@/components/shared/ImageUploader";
