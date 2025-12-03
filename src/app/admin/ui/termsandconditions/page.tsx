"use client";

import { useState } from "react";

export default function TermsPageUI() {
    const [activeTab, setActiveTab] = useState("header");
    const [saving, setSaving] = useState(false);

    // --- Header Section State ---
    const [headerData, setHeaderData] = useState({
        title: "Terms & Conditions",
        lastUpdated: "2024-01-01",
        isActive: true,
    });

    // --- Sections State ---
    const [sections, setSections] = useState([
        { id: 1, title: "1. Introduction", content: "Welcome to our website...", hasEmail: false, hasLink: false, displayOrder: 1, isActive: true }
    ]);

    // --- Handlers ---
    const handleSave = async () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            alert("Settings saved successfully!");
        }, 1000);
    };

    // Section Handlers
    const addSection = () => {
        setSections([...sections, {
            id: Date.now(),
            title: "",
            content: "",
            hasEmail: false,
            hasLink: false,
            displayOrder: sections.length + 1,
            isActive: true,
        }]);
    };
    const removeSection = (id: number) => setSections(sections.filter(s => s.id !== id));
    const updateSection = (id: number, field: string, value: any) => {
        setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const tabs = [
        { id: "header", label: "Header" },
        { id: "sections", label: "Content Sections" },
    ];

    return (
        <div className="w-full min-h-screen bg-white pb-20">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-full mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Terms & Conditions</h1>
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

                    {/* HEADER SECTION */}
                    {activeTab === "header" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-indigo-500">article</span>
                                    Header Configuration
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Title" value={headerData.title} onChange={(v) => setHeaderData({ ...headerData, title: v })} />
                                    <InputGroup label="Last Updated Date" value={headerData.lastUpdated} onChange={(v) => setHeaderData({ ...headerData, lastUpdated: v })} placeholder="YYYY-MM-DD" />
                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Page</span>
                                        <Toggle checked={headerData.isActive} onChange={(c) => setHeaderData({ ...headerData, isActive: c })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTIONS */}
                    {activeTab === "sections" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-purple-500">description</span>
                                    Content Sections
                                </h2>
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-sm text-gray-500">Manage individual clauses and sections</p>
                                    <button onClick={addSection} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Section
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {sections.map((section, idx) => (
                                        <div key={section.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">Section {idx + 1}</span>
                                                <button onClick={() => removeSection(section.id)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <InputGroup label="Section Title" value={section.title} onChange={(v) => updateSection(section.id, 'title', v)} placeholder="e.g. 1. Introduction" />
                                                <TextAreaGroup label="Content" value={section.content} onChange={(v) => updateSection(section.id, 'content', v)} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex items-end">
                                                        <Checkbox label="Contains Email Address" checked={section.hasEmail} onChange={(c) => updateSection(section.id, 'hasEmail', c)} />
                                                    </div>
                                                    <div className="flex items-end">
                                                        <Checkbox label="Contains Links" checked={section.hasLink} onChange={(c) => updateSection(section.id, 'hasLink', c)} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Display Order" value={String(section.displayOrder)} onChange={(v) => updateSection(section.id, 'displayOrder', Number(v))} />
                                                    <div className="flex items-end">
                                                        <Checkbox label="Active" checked={section.isActive} onChange={(c) => updateSection(section.id, 'isActive', c)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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

function TextAreaGroup({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={5}
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
