"use client";

import { useState, useEffect } from "react";

export default function ServicesPageUI() {
    const [activeTab, setActiveTab] = useState("hero");
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    // --- State Management ---
    const [heroData, setHeroData] = useState<any>({});
    const [servicesList, setServicesList] = useState<any[]>([]);
    const [processSection, setProcessSection] = useState<any>({});
    const [processSteps, setProcessSteps] = useState<any[]>([]);
    const [ctaData, setCtaData] = useState<any>({});

    // Track deleted items
    const [deletedServices, setDeletedServices] = useState<number[]>([]);
    const [deletedProcessSteps, setDeletedProcessSteps] = useState<number[]>([]);

    // --- Fetch Data ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [heroRes, servicesRes, procSecRes, procStepsRes, ctaRes] = await Promise.all([
                    fetch('/api/pages/services/hero'),
                    fetch('/api/pages/services/details'),
                    fetch('/api/pages/services/process-section'),
                    fetch('/api/pages/services/process-steps'),
                    fetch('/api/pages/services/cta'),
                ]);

                if (heroRes.ok) setHeroData(await heroRes.json());
                if (servicesRes.ok) {
                    const services = await servicesRes.json();
                    // Parse bullets if they are strings
                    setServicesList(services.map((s: any) => ({
                        ...s,
                        bullets: typeof s.bullets === 'string' ? JSON.parse(s.bullets) : s.bullets
                    })));
                }
                if (procSecRes.ok) setProcessSection(await procSecRes.json());
                if (procStepsRes.ok) setProcessSteps(await procStepsRes.json());
                if (ctaRes.ok) setCtaData(await ctaRes.json());

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // --- Handlers ---
    const handleSave = async () => {
        setSaving(true);
        try {
            const saveSection = async (url: string, data: any) => {
                const method = data.id ? 'PUT' : 'POST';
                const res = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                if (!res.ok) throw new Error(`Failed to save ${url}`);
                return res.json();
            };

            const saveList = async (url: string, items: any[], deletedIds: number[]) => {
                for (const id of deletedIds) {
                    await fetch(`${url}?id=${id}`, { method: 'DELETE' });
                }
                for (const item of items) {
                    // Stringify bullets for services
                    const payload = { ...item };
                    if (Array.isArray(payload.bullets)) {
                        payload.bullets = JSON.stringify(payload.bullets);
                    }
                    await saveSection(url, payload);
                }
            };

            await Promise.all([
                saveSection('/api/pages/services/hero', heroData),
                saveList('/api/pages/services/details', servicesList, deletedServices),
                saveSection('/api/pages/services/process-section', processSection),
                saveList('/api/pages/services/process-steps', processSteps, deletedProcessSteps),
                saveSection('/api/pages/services/cta', ctaData),
            ]);

            setDeletedServices([]);
            setDeletedProcessSteps([]);

            alert("Settings saved successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error saving settings:", error);
            alert("Failed to save settings. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    // Generic List Handlers
    const addItem = (list: any[], setList: any, defaultItem: any) => {
        setList([...list, { ...defaultItem, display_order: list.length + 1, is_active: 1 }]);
    };

    const updateItem = (index: number, field: string, value: any, list: any[], setList: any) => {
        const newList = [...list];
        newList[index] = { ...newList[index], [field]: value };
        setList(newList);
    };

    const tabs = [
        { id: "hero", label: "Hero" },
        { id: "services", label: "Service Details" },
        { id: "process", label: "Process" },
        { id: "cta", label: "CTA" },
    ];

    if (loading) return <div className="p-10 text-center">Loading...</div>;

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
                                    <span className="material-symbols-outlined text-indigo-500">web_asset</span>
                                    Hero Configuration
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Tagline" value={heroData.tagline || ''} onChange={(v) => setHeroData({ ...heroData, tagline: v })} />
                                    <InputGroup label="Title" value={heroData.title || ''} onChange={(v) => setHeroData({ ...heroData, title: v })} />
                                    <TextAreaGroup label="Description" value={heroData.description || ''} onChange={(v) => setHeroData({ ...heroData, description: v })} />
                                    
                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Section</span>
                                        <Toggle checked={heroData.is_active === 1} onChange={(c) => setHeroData({ ...heroData, is_active: c ? 1 : 0 })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SERVICES DETAILS SECTION */}
                    {activeTab === "services" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-500">design_services</span>
                                    Service Details
                                </h2>
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-sm text-gray-500">Manage detailed service listings</p>
                                    <button onClick={() => addItem(servicesList, setServicesList, { key: "", icon: "", title: "", description: "", bullets: [], image: "", image_alt: "" })} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Service
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {servicesList.map((service, idx) => (
                                        <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">{idx + 1}</span>
                                                <button 
                                                    onClick={() => {
                                                        if (service.id) setDeletedServices([...deletedServices, service.id]);
                                                        setServicesList(servicesList.filter((_, i) => i !== idx));
                                                    }}
                                                    className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Key (Unique ID)" value={service.key || ''} onChange={(v) => updateItem(idx, 'key', v, servicesList, setServicesList)} />
                                                    <InputGroup label="Icon (Material Symbol)" value={service.icon || ''} onChange={(v) => updateItem(idx, 'icon', v, servicesList, setServicesList)} />
                                                </div>
                                                <InputGroup label="Title" value={service.title || ''} onChange={(v) => updateItem(idx, 'title', v, servicesList, setServicesList)} />
                                                <TextAreaGroup label="Description" value={service.description || ''} onChange={(v) => updateItem(idx, 'description', v, servicesList, setServicesList)} />
                                                
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Bullets (Comma separated)</label>
                                                    <textarea
                                                        value={Array.isArray(service.bullets) ? service.bullets.join('\n') : (service.bullets || '')}
                                                        onChange={(e) => updateItem(idx, 'bullets', e.target.value.split('\n'), servicesList, setServicesList)}
                                                        rows={3}
                                                        className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-200 py-2.5 px-4 resize-none"
                                                        placeholder="Enter each bullet point on a new line"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Image URL" value={service.image || ''} onChange={(v) => updateItem(idx, 'image', v, servicesList, setServicesList)} />
                                                    <InputGroup label="Image Alt Text" value={service.image_alt || ''} onChange={(v) => updateItem(idx, 'image_alt', v, servicesList, setServicesList)} />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Display Order" value={String(service.display_order || '')} onChange={(v) => updateItem(idx, 'display_order', Number(v), servicesList, setServicesList)} />
                                                    <div className="flex items-end">
                                                        <Toggle checked={service.is_active === 1} onChange={(c) => updateItem(idx, 'is_active', c ? 1 : 0, servicesList, setServicesList)} />
                                                    </div>
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
                                    <span className="material-symbols-outlined text-green-500">settings_suggest</span>
                                    Process Section
                                </h2>
                                <div className="space-y-5 mb-8">
                                    <InputGroup label="Title" value={processSection.title || ''} onChange={(v) => setProcessSection({ ...processSection, title: v })} />
                                    <TextAreaGroup label="Description" value={processSection.description || ''} onChange={(v) => setProcessSection({ ...processSection, description: v })} />
                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Section</span>
                                        <Toggle checked={processSection.is_active === 1} onChange={(c) => setProcessSection({ ...processSection, is_active: c ? 1 : 0 })} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-6 pt-6 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">Manage Process Steps</p>
                                    <button onClick={() => addItem(processSteps, setProcessSteps, { step_number: processSteps.length + 1, title: "", description: "" })} className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Step
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {processSteps.map((step, idx) => (
                                        <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500">{idx + 1}</span>
                                                <button 
                                                    onClick={() => {
                                                        if (step.id) setDeletedProcessSteps([...deletedProcessSteps, step.id]);
                                                        setProcessSteps(processSteps.filter((_, i) => i !== idx));
                                                    }}
                                                    className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-4 gap-4">
                                                    <div className="col-span-1">
                                                        <InputGroup label="Step #" value={String(step.step_number || '')} onChange={(v) => updateItem(idx, 'step_number', Number(v), processSteps, setProcessSteps)} />
                                                    </div>
                                                    <div className="col-span-3">
                                                        <InputGroup label="Title" value={step.title || ''} onChange={(v) => updateItem(idx, 'title', v, processSteps, setProcessSteps)} />
                                                    </div>
                                                </div>
                                                <TextAreaGroup label="Description" value={step.description || ''} onChange={(v) => updateItem(idx, 'description', v, processSteps, setProcessSteps)} />
                                                
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Display Order" value={String(step.display_order || '')} onChange={(v) => updateItem(idx, 'display_order', Number(v), processSteps, setProcessSteps)} />
                                                    <div className="flex items-end">
                                                        <Toggle checked={step.is_active === 1} onChange={(c) => updateItem(idx, 'is_active', c ? 1 : 0, processSteps, setProcessSteps)} />
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
                                    <span className="material-symbols-outlined text-purple-500">campaign</span>
                                    CTA Section
                                </h2>
                                <div className="space-y-5">
                                    <InputGroup label="Title" value={ctaData.title || ''} onChange={(v) => setCtaData({ ...ctaData, title: v })} />
                                    <TextAreaGroup label="Description" value={ctaData.description || ''} onChange={(v) => setCtaData({ ...ctaData, description: v })} />
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputGroup label="Button Text" value={ctaData.button_text || ''} onChange={(v) => setCtaData({ ...ctaData, button_text: v })} />
                                        <InputGroup label="Button Link" value={ctaData.button_link || ''} onChange={(v) => setCtaData({ ...ctaData, button_link: v })} />
                                    </div>

                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-6">
                                        <span className="text-sm font-medium text-gray-700">Enable Section</span>
                                        <Toggle checked={ctaData.is_active === 1} onChange={(c) => setCtaData({ ...ctaData, is_active: c ? 1 : 0 })} />
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
