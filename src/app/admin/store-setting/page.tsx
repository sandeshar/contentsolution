"use client";

import { useEffect, useState } from "react";

export default function StoreSettingPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        storeName: "",
        storeDescription: "",
        contactEmail: "",
        contactPhone: "",
        address: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        footerText: "",
        logo: "",
        favicon: "",
    });

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/store-settings', { cache: 'no-store' });
                const json = await res.json();
                if (json?.success && json.data) {
                    const d = json.data;
                    setFormData({
                        storeName: d.storeName || "",
                        storeDescription: d.storeDescription || "",
                        contactEmail: d.contactEmail || "",
                        contactPhone: d.contactPhone || "",
                        address: d.address || "",
                        facebook: d.facebook || "",
                        twitter: d.twitter || "",
                        instagram: d.instagram || "",
                        linkedin: d.linkedin || "",
                        metaTitle: d.metaTitle || "",
                        metaDescription: d.metaDescription || "",
                        metaKeywords: d.metaKeywords || "",
                        footerText: d.footerText || "",
                        logo: d.storeLogo || "",
                        favicon: d.favicon || "",
                    });
                }
            } catch (e) {
                console.error('Failed to load store settings', e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                storeName: formData.storeName,
                storeDescription: formData.storeDescription,
                storeLogo: formData.logo,
                favicon: formData.favicon,
                contactEmail: formData.contactEmail,
                contactPhone: formData.contactPhone,
                address: formData.address,
                facebook: formData.facebook,
                twitter: formData.twitter,
                instagram: formData.instagram,
                linkedin: formData.linkedin,
                metaTitle: formData.metaTitle,
                metaDescription: formData.metaDescription,
                metaKeywords: formData.metaKeywords,
                footerText: formData.footerText,
            };
            const res = await fetch('/api/store-settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const json = await res.json();
            if (!res.ok || !json?.success) {
                throw new Error(json?.error || 'Failed to save');
            }
            alert('Settings saved successfully');
        } catch (e: any) {
            console.error('Save failed', e);
            alert(e.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="flex-1 flex flex-col">
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Store Settings</h1>
                        <p className="text-slate-500 mt-1">Manage your store information, contact details, and preferences.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {loading && (
                            <div className="text-slate-500">Loading current settings…</div>
                        )}
                        {/* General Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="px-6 py-4 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined">store</span>
                                    General Information
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label htmlFor="storeName" className="block text-sm font-medium text-slate-700 mb-2">
                                        Store Name
                                    </label>
                                    <input
                                        type="text"
                                        id="storeName"
                                        value={formData.storeName}
                                        onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="Enter store name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="storeDescription" className="block text-sm font-medium text-slate-700 mb-2">
                                        Store Description
                                    </label>
                                    <textarea
                                        id="storeDescription"
                                        rows={3}
                                        value={formData.storeDescription}
                                        onChange={(e) => setFormData({ ...formData, storeDescription: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="Brief description of your store"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="logo" className="block text-sm font-medium text-slate-700 mb-2">
                                            Store Logo
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    id="logo"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const url = URL.createObjectURL(file);
                                                            setFormData({ ...formData, logo: url });
                                                        }
                                                    }}
                                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-indigo-700"
                                                />
                                            </div>
                                            {formData.logo && (
                                                <img src={formData.logo} alt="Logo preview" className="w-16 h-16 object-contain border border-slate-200 rounded-lg" />
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="favicon" className="block text-sm font-medium text-slate-700 mb-2">
                                            Favicon
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    id="favicon"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const url = URL.createObjectURL(file);
                                                            setFormData({ ...formData, favicon: url });
                                                        }
                                                    }}
                                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-indigo-700"
                                                />
                                            </div>
                                            {formData.favicon && (
                                                <img src={formData.favicon} alt="Favicon preview" className="w-8 h-8 object-contain border border-slate-200 rounded-lg" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="px-6 py-4 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined">contact_mail</span>
                                    Contact Information
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="contactEmail" className="block text-sm font-medium text-slate-700 mb-2">
                                            Contact Email
                                        </label>
                                        <input
                                            type="email"
                                            id="contactEmail"
                                            value={formData.contactEmail}
                                            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="contact@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contactPhone" className="block text-sm font-medium text-slate-700 mb-2">
                                            Contact Phone
                                        </label>
                                        <input
                                            type="tel"
                                            id="contactPhone"
                                            value={formData.contactPhone}
                                            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        id="address"
                                        rows={2}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="Street address, City, State, Zip"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="px-6 py-4 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined">share</span>
                                    Social Media Links
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="facebook" className="block text-sm font-medium text-slate-700 mb-2">
                                            Facebook
                                        </label>
                                        <input
                                            type="url"
                                            id="facebook"
                                            value={formData.facebook}
                                            onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="https://facebook.com/yourpage"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="twitter" className="block text-sm font-medium text-slate-700 mb-2">
                                            Twitter
                                        </label>
                                        <input
                                            type="url"
                                            id="twitter"
                                            value={formData.twitter}
                                            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="https://twitter.com/yourhandle"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="instagram" className="block text-sm font-medium text-slate-700 mb-2">
                                            Instagram
                                        </label>
                                        <input
                                            type="url"
                                            id="instagram"
                                            value={formData.instagram}
                                            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="https://instagram.com/yourprofile"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="linkedin" className="block text-sm font-medium text-slate-700 mb-2">
                                            LinkedIn
                                        </label>
                                        <input
                                            type="url"
                                            id="linkedin"
                                            value={formData.linkedin}
                                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="https://linkedin.com/company/yourcompany"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Settings */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="px-6 py-4 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined">search</span>
                                    SEO Settings
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label htmlFor="metaTitle" className="block text-sm font-medium text-slate-700 mb-2">
                                        Meta Title
                                    </label>
                                    <input
                                        type="text"
                                        id="metaTitle"
                                        value={formData.metaTitle}
                                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="Page title for search engines"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="metaDescription" className="block text-sm font-medium text-slate-700 mb-2">
                                        Meta Description
                                    </label>
                                    <textarea
                                        id="metaDescription"
                                        rows={3}
                                        value={formData.metaDescription}
                                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="Brief description for search engines"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="metaKeywords" className="block text-sm font-medium text-slate-700 mb-2">
                                        Meta Keywords
                                    </label>
                                    <input
                                        type="text"
                                        id="metaKeywords"
                                        value={formData.metaKeywords}
                                        onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="keyword1, keyword2, keyword3"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Settings */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="px-6 py-4 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined">settings</span>
                                    Additional Settings
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label htmlFor="footerText" className="block text-sm font-medium text-slate-700 mb-2">
                                        Footer Text
                                    </label>
                                    <input
                                        type="text"
                                        id="footerText"
                                        value={formData.footerText}
                                        onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="Copyright text or footer message"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pb-8">
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60"
                            >
                                <span className="material-symbols-outlined text-lg">save</span>
                                {saving ? 'Saving…' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}