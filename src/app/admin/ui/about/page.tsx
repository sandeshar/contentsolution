"use client";

import { useState } from "react";

export default function AboutPageUI() {
    const [activeTab, setActiveTab] = useState("hero");
    const [saving, setSaving] = useState(false);

    // --- Hero Section State ---
    const [heroData, setHeroData] = useState({
        title: "About Us",
        description: "We are a team of passionate creators...",
        button1Text: "Meet the Team",
        button1Link: "#team",
        button2Text: "Our Story",
        button2Link: "#story",
        heroImage: "",
        heroImageAlt: "",
        isActive: true
    });

    // --- Journey Section State ---
    const [journeyData, setJourneyData] = useState({
        title: "Our Journey",
        paragraph1: "From humble beginnings to industry leaders...",
        paragraph2: "We continue to evolve and innovate...",
        thinkingBoxTitle: "Our Vision",
        thinkingBoxContent: "To transform the way businesses communicate...",
        stats: [
            { id: 1, label: "Years Experience", value: "10+", displayOrder: 1, isActive: true },
            { id: 2, label: "Projects Delivered", value: "500+", displayOrder: 2, isActive: true }
        ],
        features: [
            { id: 1, title: "Client-Focused", description: "Your success is our priority", displayOrder: 1, isActive: true }
        ]
    });

    // --- Philosophy Section State ---
    const [philosophyData, setPhilosophyData] = useState({
        title: "Our Philosophy",
        description: "We believe in quality over quantity...",
        principles: [
            { id: 1, title: "Innovation", description: "Always pushing boundaries", displayOrder: 1, isActive: true }
        ]
    });

    // --- Team Section State ---
    const [teamMembers, setTeamMembers] = useState([
        { id: 1, name: "John Doe", role: "CEO", image: "", imageAlt: "", bio: "Visionary leader...", displayOrder: 1, isActive: true }
    ]);

    // --- CTA Section State ---
    const [ctaData, setCtaData] = useState({
        title: "Join Our Team",
        description: "We are always looking for talent...",
        primaryButtonText: "Start a Project",
        primaryButtonLink: "/contact",
        secondaryButtonText: "View Our Work",
        secondaryButtonLink: "/portfolio",
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

    // Team Handlers
    const addTeamMember = () => {
        setTeamMembers([...teamMembers, {
            id: Date.now(),
            name: "",
            role: "",
            image: "",
            imageAlt: "",
            bio: "",
            displayOrder: teamMembers.length + 1,
            isActive: true
        }]);
    };
    const removeTeamMember = (id: number) => setTeamMembers(teamMembers.filter(m => m.id !== id));
    const updateTeamMember = (id: number, field: string, value: any) => {
        setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, [field]: value } : m));
    };

    const tabs = [
        { id: "hero", label: "Hero" },
        { id: "journey", label: "Journey" },
        { id: "philosophy", label: "Philosophy" },
        { id: "team", label: "Team" },
        { id: "cta", label: "CTA" },
    ];

    return (
        <div className="w-full min-h-screen bg-white pb-20">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-full mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">About Page</h1>
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
                                    <span className="material-symbols-outlined text-indigo-500">flag</span>
                                    Hero Configuration
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Title" value={heroData.title} onChange={(v) => setHeroData({ ...heroData, title: v })} />
                                    <TextAreaGroup label="Description" value={heroData.description} onChange={(v) => setHeroData({ ...heroData, description: v })} />

                                    <div className="grid grid-cols-2 gap-5">
                                        <InputGroup label="Primary Button Text" value={heroData.button1Text} onChange={(v) => setHeroData({ ...heroData, button1Text: v })} />
                                        <InputGroup label="Primary Button Link" value={heroData.button1Link} onChange={(v) => setHeroData({ ...heroData, button1Link: v })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputGroup label="Secondary Button Text" value={heroData.button2Text} onChange={(v) => setHeroData({ ...heroData, button2Text: v })} />
                                        <InputGroup label="Secondary Button Link" value={heroData.button2Link} onChange={(v) => setHeroData({ ...heroData, button2Link: v })} />
                                    </div>

                                    <ImageUploader label="Hero Image" value={heroData.heroImage} onChange={(v) => setHeroData({ ...heroData, heroImage: v })} folder="about" />
                                    <InputGroup label="Hero Image Alt Text" value={heroData.heroImageAlt} onChange={(v) => setHeroData({ ...heroData, heroImageAlt: v })} />

                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Section</span>
                                        <Toggle checked={heroData.isActive} onChange={(c) => setHeroData({ ...heroData, isActive: c })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* JOURNEY SECTION */}
                    {activeTab === "journey" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-purple-500">timeline</span>
                                    Journey Section
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Title" value={journeyData.title} onChange={(v) => setJourneyData({ ...journeyData, title: v })} />
                                    <TextAreaGroup label="Paragraph 1" value={journeyData.paragraph1} onChange={(v) => setJourneyData({ ...journeyData, paragraph1: v })} />
                                    <TextAreaGroup label="Paragraph 2" value={journeyData.paragraph2} onChange={(v) => setJourneyData({ ...journeyData, paragraph2: v })} />
                                    <InputGroup label="Thinking Box Title" value={journeyData.thinkingBoxTitle} onChange={(v) => setJourneyData({ ...journeyData, thinkingBoxTitle: v })} />
                                    <TextAreaGroup label="Thinking Box Content" value={journeyData.thinkingBoxContent} onChange={(v) => setJourneyData({ ...journeyData, thinkingBoxContent: v })} />
                                </div>

                                {/* Stats List */}
                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Stats</h3>
                                        <button onClick={() => setJourneyData({ ...journeyData, stats: [...journeyData.stats, { id: Date.now(), label: "", value: "", displayOrder: (journeyData.stats?.length || 0) + 1, isActive: true }] })} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Stat
                                        </button>
                                    </div>
                                    {(journeyData.stats || []).map((stat: any, idx: number) => (
                                        <div key={stat.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">{idx + 1}</span>
                                                <button onClick={() => setJourneyData({ ...journeyData, stats: (journeyData.stats || []).filter((s: any) => s.id !== stat.id) })} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputGroup label="Label" value={stat.label} onChange={(v) => setJourneyData({ ...journeyData, stats: (journeyData.stats || []).map((s: any) => s.id === stat.id ? { ...s, label: v } : s) })} />
                                                <InputGroup label="Value" value={stat.value} onChange={(v) => setJourneyData({ ...journeyData, stats: (journeyData.stats || []).map((s: any) => s.id === stat.id ? { ...s, value: v } : s) })} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                <InputGroup label="Display Order" value={String(stat.displayOrder)} onChange={(v) => setJourneyData({ ...journeyData, stats: (journeyData.stats || []).map((s: any) => s.id === stat.id ? { ...s, displayOrder: Number(v) } : s) })} />
                                                <div className="flex items-end">
                                                    <Toggle checked={stat.isActive} onChange={(c) => setJourneyData({ ...journeyData, stats: (journeyData.stats || []).map((s: any) => s.id === stat.id ? { ...s, isActive: c } : s) })} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Features List */}
                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Features</h3>
                                        <button onClick={() => setJourneyData({ ...journeyData, features: [...(journeyData.features || []), { id: Date.now(), title: "", description: "", displayOrder: (journeyData.features?.length || 0) + 1, isActive: true }] })} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Feature
                                        </button>
                                    </div>
                                    {(journeyData.features || []).map((feature: any, idx: number) => (
                                        <div key={feature.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">{idx + 1}</span>
                                                <button onClick={() => setJourneyData({ ...journeyData, features: (journeyData.features || []).filter((f: any) => f.id !== feature.id) })} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <InputGroup label="Title" value={feature.title} onChange={(v) => setJourneyData({ ...journeyData, features: (journeyData.features || []).map((f: any) => f.id === feature.id ? { ...f, title: v } : f) })} />
                                                <TextAreaGroup label="Description" value={feature.description} onChange={(v) => setJourneyData({ ...journeyData, features: (journeyData.features || []).map((f: any) => f.id === feature.id ? { ...f, description: v } : f) })} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Display Order" value={String(feature.displayOrder)} onChange={(v) => setJourneyData({ ...journeyData, features: (journeyData.features || []).map((f: any) => f.id === feature.id ? { ...f, displayOrder: Number(v) } : f) })} />
                                                    <div className="flex items-end">
                                                        <Toggle checked={feature.isActive} onChange={(c) => setJourneyData({ ...journeyData, features: (journeyData.features || []).map((f: any) => f.id === feature.id ? { ...f, isActive: c } : f) })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PHILOSOPHY SECTION */}
                    {activeTab === "philosophy" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500">psychology</span>
                                    Philosophy
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Title" value={philosophyData.title} onChange={(v) => setPhilosophyData({ ...philosophyData, title: v })} />
                                    <TextAreaGroup label="Description" value={philosophyData.description} onChange={(v) => setPhilosophyData({ ...philosophyData, description: v })} />
                                </div>

                                {/* Principles List */}
                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Principles</h3>
                                        <button onClick={() => setPhilosophyData({ ...philosophyData, principles: [...(philosophyData.principles || []), { id: Date.now(), title: "", description: "", displayOrder: (philosophyData.principles?.length || 0) + 1, isActive: true }] })} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Principle
                                        </button>
                                    </div>
                                    {(philosophyData.principles || []).map((p: any, idx: number) => (
                                        <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">{idx + 1}</span>
                                                <button onClick={() => setPhilosophyData({ ...philosophyData, principles: (philosophyData.principles || []).filter((x: any) => x.id !== p.id) })} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <InputGroup label="Title" value={p.title} onChange={(v) => setPhilosophyData({ ...philosophyData, principles: (philosophyData.principles || []).map((x: any) => x.id === p.id ? { ...x, title: v } : x) })} />
                                                <TextAreaGroup label="Description" value={p.description} onChange={(v) => setPhilosophyData({ ...philosophyData, principles: (philosophyData.principles || []).map((x: any) => x.id === p.id ? { ...x, description: v } : x) })} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Display Order" value={String(p.displayOrder)} onChange={(v) => setPhilosophyData({ ...philosophyData, principles: (philosophyData.principles || []).map((x: any) => x.id === p.id ? { ...x, displayOrder: Number(v) } : x) })} />
                                                    <div className="flex items-end">
                                                        <Toggle checked={p.isActive} onChange={(c) => setPhilosophyData({ ...philosophyData, principles: (philosophyData.principles || []).map((x: any) => x.id === p.id ? { ...x, isActive: c } : x) })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TEAM SECTION */}
                    {activeTab === "team" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-indigo-500">groups</span>
                                    Team Members
                                </h2>
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-sm text-gray-500">Manage your team profiles</p>
                                    <button onClick={addTeamMember} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Member
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {teamMembers.map((member, idx) => (
                                        <div key={member.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">{idx + 1}</span>
                                                <button onClick={() => removeTeamMember(member.id)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Name" value={member.name} onChange={(v) => updateTeamMember(member.id, 'name', v)} />
                                                    <InputGroup label="Role" value={member.role} onChange={(v) => updateTeamMember(member.id, 'role', v)} />
                                                </div>
                                                <ImageUploader label="Image" value={member.image} onChange={(v) => updateTeamMember(member.id, 'image', v)} folder="about/team" />
                                                <InputGroup label="Image Alt Text" value={member.imageAlt} onChange={(v) => updateTeamMember(member.id, 'imageAlt', v)} />
                                                <TextAreaGroup label="Bio" value={member.bio} onChange={(v) => updateTeamMember(member.id, 'bio', v)} />
                                                <Checkbox label="Active" checked={member.isActive} onChange={(c) => updateTeamMember(member.id, 'isActive', c)} />
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
                                        <InputGroup label="Primary Button Text" value={ctaData.primaryButtonText} onChange={(v) => setCtaData({ ...ctaData, primaryButtonText: v })} />
                                        <InputGroup label="Primary Button Link" value={ctaData.primaryButtonLink} onChange={(v) => setCtaData({ ...ctaData, primaryButtonLink: v })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputGroup label="Secondary Button Text" value={ctaData.secondaryButtonText} onChange={(v) => setCtaData({ ...ctaData, secondaryButtonText: v })} />
                                        <InputGroup label="Secondary Button Link" value={ctaData.secondaryButtonLink} onChange={(v) => setCtaData({ ...ctaData, secondaryButtonLink: v })} />
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
