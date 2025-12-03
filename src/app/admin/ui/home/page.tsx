"use client";

import { useState } from "react";

export default function HomePageUI() {
    const [activeTab, setActiveTab] = useState("hero");
    const [saving, setSaving] = useState(false);

    // --- State Management (Same as before) ---
    const [heroData, setHeroData] = useState({
        title: "",
        subtitle: "",
        ctaText: "",
        ctaLink: "",
        backgroundImage: "",
        isActive: true
    });

    const [trustHeading, setTrustHeading] = useState("TRUSTED BY INDUSTRY LEADERS");
    const [trustLogos, setTrustLogos] = useState([
        { id: 1, altText: "", logoUrl: "", darkInvert: false, displayOrder: 1, isActive: true }
    ]);

    const [expertiseData, setExpertiseData] = useState({
        title: "Our Expertise",
        description: "From strategy to execution, we provide end-to-end content solutions designed to meet your business objectives."
    });
    const [expertiseItems, setExpertiseItems] = useState([
        { id: 1, icon: "explore", title: "Content Strategy", description: "", displayOrder: 1, isActive: true }
    ]);

    const [contactData, setContactData] = useState({
        title: "Ready to Grow Your Business?",
        description: "Let's talk about how our content solutions can help you achieve your goals. Fill out the form, and we'll get back to you within 24 hours.",
        namePlaceholder: "Name",
        emailPlaceholder: "Email",
        companyPlaceholder: "Company",
        messagePlaceholder: "Message",
        submitButtonText: "Submit",
        isActive: true
    });

    // --- Handlers ---
    const handleSave = async () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            alert("Settings saved successfully!");
        }, 1000);
    };

    const addTrustLogo = () => {
        setTrustLogos([...trustLogos, {
            id: Date.now(),
            altText: "",
            logoUrl: "",
            darkInvert: false,
            displayOrder: trustLogos.length + 1,
            isActive: true
        }]);
    };
    const removeTrustLogo = (id: number) => setTrustLogos(trustLogos.filter(l => l.id !== id));
    const updateTrustLogo = (id: number, field: string, value: any) => {
        setTrustLogos(trustLogos.map(l => l.id === id ? { ...l, [field]: value } : l));
    };

    const addExpertiseItem = () => {
        setExpertiseItems([...expertiseItems, {
            id: Date.now(),
            icon: "",
            title: "",
            description: "",
            displayOrder: expertiseItems.length + 1,
            isActive: true
        }]);
    };
    const removeExpertiseItem = (id: number) => setExpertiseItems(expertiseItems.filter(i => i.id !== id));
    const updateExpertiseItem = (id: number, field: string, value: any) => {
        setExpertiseItems(expertiseItems.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    const tabs = [
        { id: "hero", label: "Hero" },
        { id: "trust", label: "Trust" },
        { id: "expertise", label: "Expertise" },
        { id: "contact", label: "Contact" },
    ];

    return (
        <div className="w-full min-h-screen bg-white pb-20">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-full mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Homepage</h1>
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
                                    <span className="material-symbols-outlined text-indigo-500">panorama</span>
                                    Hero Configuration
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Title" value={heroData.title} onChange={(v) => setHeroData({ ...heroData, title: v })} placeholder="Enter main headline..." />
                                    <TextAreaGroup label="Subtitle" value={heroData.subtitle} onChange={(v) => setHeroData({ ...heroData, subtitle: v })} placeholder="Enter supporting text..." />
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputGroup label="CTA Text" value={heroData.ctaText} onChange={(v) => setHeroData({ ...heroData, ctaText: v })} placeholder="e.g. Get Started" />
                                        <InputGroup label="CTA Link" value={heroData.ctaLink} onChange={(v) => setHeroData({ ...heroData, ctaLink: v })} placeholder="e.g. /contact" />
                                    </div>
                                    <ImageUploader label="Background Image" value={heroData.backgroundImage} onChange={(v) => setHeroData({ ...heroData, backgroundImage: v })} folder="home/hero" />

                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Section</span>
                                        <Toggle checked={heroData.isActive} onChange={(c) => setHeroData({ ...heroData, isActive: c })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TRUST SECTION */}
                    {activeTab === "trust" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-purple-500">verified</span>
                                    Trust Indicators
                                </h2>
                                <InputGroup label="Section Heading" value={trustHeading} onChange={setTrustHeading} />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-2">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Partner Logos</h3>
                                    <button onClick={addTrustLogo} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Logo
                                    </button>
                                </div>
                                {trustLogos.map((logo, idx) => (
                                    <div key={logo.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">{idx + 1}</span>
                                            <button onClick={() => removeTrustLogo(logo.id)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputGroup label="Alt Text" value={logo.altText} onChange={(v) => updateTrustLogo(logo.id, 'altText', v)} />
                                            <ImageUploader label="Logo Image" value={logo.logoUrl} onChange={(v) => updateTrustLogo(logo.id, 'logoUrl', v)} folder="home/trust" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <InputGroup label="Display Order" value={String(logo.displayOrder)} onChange={(v) => updateTrustLogo(logo.id, 'displayOrder', Number(v))} />
                                            <div />
                                        </div>
                                        <div className="mt-4 flex items-center gap-6">
                                            <Checkbox label="Invert in Dark Mode" checked={logo.darkInvert} onChange={(c) => updateTrustLogo(logo.id, 'darkInvert', c)} />
                                            <Checkbox label="Active" checked={logo.isActive} onChange={(c) => updateTrustLogo(logo.id, 'isActive', c)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* EXPERTISE SECTION */}
                    {activeTab === "expertise" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500">lightbulb</span>
                                    Expertise Section
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Title" value={expertiseData.title} onChange={(v) => setExpertiseData({ ...expertiseData, title: v })} />
                                    <TextAreaGroup label="Description" value={expertiseData.description} onChange={(v) => setExpertiseData({ ...expertiseData, description: v })} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-2">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Expertise Items</h3>
                                    <button onClick={addExpertiseItem} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Item
                                    </button>
                                </div>
                                {expertiseItems.map((item, idx) => (
                                    <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">{idx + 1}</span>
                                            <button onClick={() => removeExpertiseItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputGroup label="Icon Name" value={item.icon} onChange={(v) => updateExpertiseItem(item.id, 'icon', v)} placeholder="e.g. explore" />
                                                <InputGroup label="Title" value={item.title} onChange={(v) => updateExpertiseItem(item.id, 'title', v)} />
                                            </div>
                                            <TextAreaGroup label="Description" value={item.description} onChange={(v) => updateExpertiseItem(item.id, 'description', v)} />
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputGroup label="Display Order" value={String(item.displayOrder)} onChange={(v) => updateExpertiseItem(item.id, 'displayOrder', Number(v))} />
                                                <div className="flex items-end">
                                                    <Checkbox label="Active" checked={item.isActive} onChange={(c) => updateExpertiseItem(item.id, 'isActive', c)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CONTACT SECTION */}
                    {activeTab === "contact" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-500">contact_mail</span>
                                    Contact CTA
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Title" value={contactData.title} onChange={(v) => setContactData({ ...contactData, title: v })} />
                                    <TextAreaGroup label="Description" value={contactData.description} onChange={(v) => setContactData({ ...contactData, description: v })} />

                                    <div className="grid grid-cols-2 gap-5">
                                        <InputGroup label="Name Placeholder" value={contactData.namePlaceholder} onChange={(v) => setContactData({ ...contactData, namePlaceholder: v })} />
                                        <InputGroup label="Email Placeholder" value={contactData.emailPlaceholder} onChange={(v) => setContactData({ ...contactData, emailPlaceholder: v })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputGroup label="Company Placeholder" value={contactData.companyPlaceholder} onChange={(v) => setContactData({ ...contactData, companyPlaceholder: v })} />
                                        <InputGroup label="Message Placeholder" value={contactData.messagePlaceholder} onChange={(v) => setContactData({ ...contactData, messagePlaceholder: v })} />
                                    </div>
                                    <InputGroup label="Submit Button Text" value={contactData.submitButtonText} onChange={(v) => setContactData({ ...contactData, submitButtonText: v })} />

                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Section</span>
                                        <Toggle checked={contactData.isActive} onChange={(c) => setContactData({ ...contactData, isActive: c })} />
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
