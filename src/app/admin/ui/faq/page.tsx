"use client";

import { useState } from "react";

export default function FAQPageUI() {
    const [activeTab, setActiveTab] = useState("header");
    const [saving, setSaving] = useState(false);

    // --- Header Section State ---
    const [headerData, setHeaderData] = useState({
        title: "Frequently Asked Questions",
        description: "Find answers to common questions about our services.",
        searchPlaceholder: "Search for answers...",
        isActive: true,
    });

    // --- Categories State ---
    const [categories, setCategories] = useState([
        { id: 1, name: "General", displayOrder: 1, isActive: true },
        { id: 2, name: "Services", displayOrder: 2, isActive: true }
    ]);

    // --- FAQ Items State ---
    const [faqItems, setFaqItems] = useState([
        { id: 1, question: "What services do you offer?", answer: "We offer...", categoryId: 1, displayOrder: 1, isActive: true }
    ]);

    // --- CTA Section State ---
    const [ctaData, setCtaData] = useState({
        title: "Still have questions?",
        description: "Can't find the answer you're looking for? Please chat to our friendly team.",
        buttonText: "Get in touch",
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

    // Category Handlers
    const addCategory = () => {
        setCategories([
            ...categories,
            { id: Date.now(), name: "", displayOrder: categories.length + 1, isActive: true },
        ]);
    };
    const removeCategory = (id: number) => setCategories(categories.filter(c => c.id !== id));
    const updateCategory = (id: number, field: string, value: any) => {
        setCategories(categories.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    // FAQ Item Handlers
    const addFaqItem = () => {
        setFaqItems([
            ...faqItems,
            {
                id: Date.now(),
                question: "",
                answer: "",
                categoryId: categories[0]?.id || 0,
                displayOrder: faqItems.length + 1,
                isActive: true,
            },
        ]);
    };
    const removeFaqItem = (id: number) => setFaqItems(faqItems.filter(i => i.id !== id));
    const updateFaqItem = (id: number, field: string, value: any) => {
        setFaqItems(faqItems.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    const tabs = [
        { id: "header", label: "Header" },
        { id: "categories", label: "Categories" },
        { id: "items", label: "FAQ Items" },
        { id: "cta", label: "CTA" },
    ];

    return (
        <div className="w-full min-h-screen bg-white pb-20">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-full mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">FAQ Page</h1>
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
                                    <TextAreaGroup label="Description" value={headerData.description} onChange={(v) => setHeaderData({ ...headerData, description: v })} />
                                    <InputGroup label="Search Placeholder" value={headerData.searchPlaceholder} onChange={(v) => setHeaderData({ ...headerData, searchPlaceholder: v })} />
                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Section</span>
                                        <Toggle checked={headerData.isActive} onChange={(c) => setHeaderData({ ...headerData, isActive: c })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CATEGORIES SECTION */}
                    {activeTab === "categories" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-purple-500">category</span>
                                    Categories
                                </h2>
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-sm text-gray-500">Organize your FAQs</p>
                                    <button onClick={addCategory} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Category
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {categories.map((category, idx) => (
                                        <div key={category.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">{idx + 1}</span>
                                                <button onClick={() => removeCategory(category.id)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputGroup label="Name" value={category.name} onChange={(v) => updateCategory(category.id, 'name', v)} />
                                                <InputGroup label="Display Order" value={String(category.displayOrder)} onChange={(v) => updateCategory(category.id, 'displayOrder', Number(v))} />
                                                <Checkbox label="Active" checked={category.isActive} onChange={(c) => updateCategory(category.id, 'isActive', c)} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FAQ ITEMS SECTION */}
                    {activeTab === "items" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500">quiz</span>
                                    FAQ Items
                                </h2>
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-sm text-gray-500">Manage questions and answers</p>
                                    <button onClick={addFaqItem} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Question
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {faqItems.map((item, idx) => (
                                        <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">{idx + 1}</span>
                                                <button onClick={() => removeFaqItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                                                    <select
                                                        value={item.categoryId}
                                                        onChange={(e) => updateFaqItem(item.id, 'categoryId', parseInt(e.target.value))}
                                                        className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-200 py-2.5 px-4"
                                                    >
                                                        {categories.map(c => (
                                                            <option key={c.id} value={c.id}>{c.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <InputGroup label="Question" value={item.question} onChange={(v) => updateFaqItem(item.id, 'question', v)} />
                                                <TextAreaGroup label="Answer" value={item.answer} onChange={(v) => updateFaqItem(item.id, 'answer', v)} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Display Order" value={String(item.displayOrder)} onChange={(v) => updateFaqItem(item.id, 'displayOrder', Number(v))} />
                                                    <div className="flex items-end">
                                                        <Checkbox label="Active" checked={item.isActive} onChange={(c) => updateFaqItem(item.id, 'isActive', c)} />
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
