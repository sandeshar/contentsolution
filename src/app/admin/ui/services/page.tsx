"use client";

import { useState } from "react";

export default function ServicesPageUI() {
    const [activeTab, setActiveTab] = useState("hero");
    const [saving, setSaving] = useState(false);

    // --- Hero Section State ---
    const [heroData, setHeroData] = useState({
        tagline: "Our Services",
        title: "Comprehensive content solutions tailored to your needs.",
        description: "We specialize in creating powerful content that drives results.",
        isActive: true
    });

    // (Removed) Services Section (Grid) — not used on frontend

    // --- Service Details State ---
    const [servicesList, setServicesList] = useState([
        { id: 1, key: "strategy", icon: "strategy", title: "Content Strategy", description: "Developing a roadmap...", bullets: ["Audit", "Planning"], image: "", imageAlt: "", displayOrder: 1, isActive: true }
    ]);

    // --- Process Section State ---
    const [processSection, setProcessSection] = useState({
        title: "Our Process",
        description: "How we deliver consistent results.",
        isActive: true,
    });
    const [processSteps, setProcessSteps] = useState([
        { id: 1, stepNumber: 1, title: "Discovery", description: "Understanding your goals...", displayOrder: 1, isActive: true }
    ]);

    // --- CTA Section State ---
    const [ctaData, setCtaData] = useState({
        title: "Ready to Start?",
        description: "Let's build something great together.",
        buttonText: "Get a Quote",
        buttonLink: "/contact",
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

    // Service Handlers
    const addService = () => {
        setServicesList([...servicesList, {
            id: Date.now(),
            key: "",
            icon: "",
            title: "",
            description: "",
            bullets: [],
            image: "",
            imageAlt: "",
            displayOrder: servicesList.length + 1,
            isActive: true,
        }]);
    };
    const removeService = (id: number) => setServicesList(servicesList.filter(s => s.id !== id));
    const updateService = (id: number, field: string, value: any) => {
        setServicesList(servicesList.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    // Process Handlers
    const addProcessStep = () => {
        setProcessSteps([...processSteps, {
            id: Date.now(),
            stepNumber: processSteps.length + 1,
            title: "",
            description: "",
            displayOrder: processSteps.length + 1,
            isActive: true,
        }]);
    };
    const removeProcessStep = (id: number) => setProcessSteps(processSteps.filter(p => p.id !== id));
    const updateProcessStep = (id: number, field: string, value: any) => {
        setProcessSteps(processSteps.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const tabs = [
        { id: "hero", label: "Hero" },
        { id: "services", label: "Service Details" },
        { id: "process", label: "Process" },
        { id: "cta", label: "CTA" },
    ];

    return (
        <div className="w-full min-h-screen bg-white pb-20">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-full mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Services Page</h1>
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
                                    <span className="material-symbols-outlined text-indigo-500">heroes</span>
                                    Hero Configuration
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Tagline" value={heroData.tagline} onChange={(v) => setHeroData({ ...heroData, tagline: v })} placeholder="e.g. Our Services" />
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

                    {/* (Removed) SERVICES SECTION (GRID) */}

                    {/* SERVICE DETAILS SECTION */}
                    {activeTab === "services" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-purple-500">list_alt</span>
                                    Service Details
                                </h2>
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-sm text-gray-500">Manage individual service offerings</p>
                                    <button onClick={addService} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Service
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {servicesList.map((service, idx) => (
                                        <div key={service.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">{idx + 1}</span>
                                                <button onClick={() => removeService(service.id)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Unique Key" value={service.key} onChange={(v) => updateService(service.id, 'key', v)} placeholder="e.g. strategy" />
                                                    <InputGroup label="Icon" value={service.icon} onChange={(v) => updateService(service.id, 'icon', v)} placeholder="e.g. strategy" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Title" value={service.title} onChange={(v) => updateService(service.id, 'title', v)} />
                                                    <InputGroup label="Display Order" value={String(service.displayOrder)} onChange={(v) => updateService(service.id, 'displayOrder', Number(v))} />
                                                </div>
                                                <TextAreaGroup label="Description" value={service.description} onChange={(v) => updateService(service.id, 'description', v)} />
                                                <TextAreaGroup label="Bullets (comma separated)" value={service.bullets.join(', ')} onChange={(v) => updateService(service.id, 'bullets', v.split(',').map((s: string) => s.trim()).filter(Boolean))} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <ImageUploader label="Image" value={service.image} onChange={(v) => updateService(service.id, 'image', v)} folder="services" />
                                                    <InputGroup label="Image Alt Text" value={service.imageAlt} onChange={(v) => updateService(service.id, 'imageAlt', v)} />
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm font-medium text-gray-700">Active</span>
                                                    <Toggle checked={service.isActive} onChange={(c) => updateService(service.id, 'isActive', c)} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PROCESS SECTION */}
                    {activeTab === "process" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500">timeline</span>
                                    Process Steps
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Section Title" value={processSection.title} onChange={(v) => setProcessSection({ ...processSection, title: v })} />
                                    <TextAreaGroup label="Section Description" value={processSection.description} onChange={(v) => setProcessSection({ ...processSection, description: v })} />
                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Section</span>
                                        <Toggle checked={processSection.isActive} onChange={(c) => setProcessSection({ ...processSection, isActive: c })} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-sm text-gray-500">Define your workflow steps</p>
                                    <button onClick={addProcessStep} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Step
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {processSteps.map((step, idx) => (
                                        <div key={step.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">Step {step.stepNumber}</span>
                                                <button onClick={() => removeProcessStep(step.id)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <InputGroup label="Step Title" value={step.title} onChange={(v) => updateProcessStep(step.id, 'title', v)} />
                                                <TextAreaGroup label="Step Description" value={step.description} onChange={(v) => updateProcessStep(step.id, 'description', v)} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Display Order" value={String(step.displayOrder)} onChange={(v) => updateProcessStep(step.id, 'displayOrder', Number(v))} />
                                                    <div className="flex items-end">
                                                        <Toggle checked={step.isActive} onChange={(c) => updateProcessStep(step.id, 'isActive', c)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CTA SECTION */}
                    {activeTab === "cta" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-500">campaign</span>
                                    CTA Section
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Title" value={ctaData.title} onChange={(v) => setCtaData({ ...ctaData, title: v })} />
                                    <TextAreaGroup label="Description" value={ctaData.description} onChange={(v) => setCtaData({ ...ctaData, description: v })} />
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputGroup label="Button Text" value={ctaData.buttonText} onChange={(v) => setCtaData({ ...ctaData, buttonText: v })} />
                                        <InputGroup label="Button Link" value={ctaData.buttonLink} onChange={(v) => setCtaData({ ...ctaData, buttonLink: v })} />
                                    </div>

                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Section</span>
                                        <Toggle checked={ctaData.isActive} onChange={(c) => setCtaData({ ...ctaData, isActive: c })} />
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

import ImageUploader from "@/components/shared/ImageUploader";
