"use client";

import { useEffect, useState } from "react";

export default function RobotsPage() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/seo/robots');
                const json = await res.json();
                if (json?.success) {
                    setContent(json.content || "");
                }
            } catch (e) {
                console.error('Failed to load robots.txt', e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/seo/robots', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content }),
            });
            const json = await res.json();
            if (!res.ok || !json?.success) {
                throw new Error(json?.error || 'Failed to save');
            }
            alert('robots.txt saved successfully');
        } catch (e: any) {
            console.error('Save failed', e);
            alert(e.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        const defaultRobots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${window.location.origin}/sitemap.xml`;
        setContent(defaultRobots);
    };

    return (
        <main className="flex-1 flex flex-col">
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Robots.txt Editor</h1>
                        <p className="text-slate-500 mt-1">Configure how search engine crawlers interact with your site.</p>
                    </div>

                    {loading ? (
                        <div className="text-slate-500">Loading...</div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <div className="mb-4">
                                <label htmlFor="robots-content" className="block text-sm font-medium text-slate-700 mb-2">
                                    robots.txt Content
                                </label>
                                <textarea
                                    id="robots-content"
                                    rows={15}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary font-mono text-sm"
                                    placeholder="User-agent: *&#10;Allow: /"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Edit the robots.txt directives. Common directives: User-agent, Allow, Disallow, Sitemap.
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-4 py-2 text-sm border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100"
                                >
                                    Reset to Default
                                </button>
                                <div className="flex gap-3">
                                    <a
                                        href="/robots.txt"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 text-sm border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100"
                                    >
                                        Preview
                                    </a>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-indigo-700 disabled:opacity-60"
                                    >
                                        <span className="material-symbols-outlined text-lg">save</span>
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
