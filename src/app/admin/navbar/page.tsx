"use client";

import { useEffect, useState } from "react";

type NavbarItem = {
    id?: number;
    label: string;
    href: string;
    order: number;
    parent_id?: number | null;
    is_button: number;
    is_active: number;
    isNew?: boolean;
};

export default function NavbarManagerPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [navbarItems, setNavbarItems] = useState<NavbarItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<NavbarItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/navbar');
            if (response.ok) {
                const items = await response.json();
                setNavbarItems(items);
            }
        } catch (error) {
            console.error('Error fetching navbar items:', error);
        } finally {
            setLoading(false);
        }
    };

    const addItem = () => {
        setSelectedItem({
            label: "",
            href: "",
            order: navbarItems.length,
            parent_id: null,
            is_button: 0,
            is_active: 1,
            isNew: true,
        });
        setIsModalOpen(true);
    };

    const saveItem = async () => {
        if (!selectedItem) return;

        setSaving(true);
        try {
            const method = selectedItem.isNew ? 'POST' : 'PUT';
            const response = await fetch('/api/navbar', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedItem),
            });

            if (!response.ok) throw new Error('Failed to save navbar item');

            alert('Navbar item saved successfully!');
            setIsModalOpen(false);
            setSelectedItem(null);
            fetchData();
        } catch (error) {
            console.error('Error saving navbar item:', error);
            alert('Failed to save navbar item. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const deleteItem = async (id: number) => {
        if (!confirm('Are you sure you want to delete this navbar item?')) return;

        setSaving(true);
        try {
            const response = await fetch('/api/navbar', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) throw new Error('Failed to delete navbar item');

            alert('Navbar item deleted successfully!');
            fetchData();
        } catch (error) {
            console.error('Error deleting navbar item:', error);
            alert('Failed to delete navbar item. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const moveItem = async (id: number, direction: 'up' | 'down') => {
        const index = navbarItems.findIndex(item => item.id === id);
        if (index === -1) return;
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === navbarItems.length - 1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const newItems = [...navbarItems];
        [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];

        // Update order values
        const updates = newItems.map((item, idx) => ({
            ...item,
            order: idx,
        }));

        setNavbarItems(updates);

        // Save the reordered items
        try {
            await Promise.all(
                updates.map(item =>
                    fetch('/api/navbar', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item),
                    })
                )
            );
        } catch (error) {
            console.error('Error reordering items:', error);
            fetchData(); // Reload on error
        }
    };

    const filteredItems = navbarItems.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.href.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-3">
                    <span className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-600 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-bold text-slate-900">Navbar</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage navigation menu items</p>
                </div>
            </div>

            <div className="w-full mx-auto px-6 py-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    {/* Search and Add */}
                    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                        <div className="flex-1">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    search
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search navbar items..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        <button
                            onClick={addItem}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Add Navbar Item
                        </button>
                    </div>

                    {/* Items List */}
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-slate-300">
                            <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">menu</span>
                            <p className="text-slate-500 text-sm">No navbar items found</p>
                            <button
                                onClick={addItem}
                                className="mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                            >
                                Create your first navbar item
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-200">
                            {filteredItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`p-4 hover:bg-slate-50 transition-colors ${item.is_active === 0 ? 'opacity-50' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Reorder Buttons */}
                                        <div className="flex flex-col gap-1">
                                            <button
                                                onClick={() => item.id && moveItem(item.id, 'up')}
                                                disabled={index === 0}
                                                className="p-1 text-slate-600 hover:bg-slate-200 rounded disabled:opacity-30"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                                            </button>
                                            <button
                                                onClick={() => item.id && moveItem(item.id, 'down')}
                                                disabled={index === filteredItems.length - 1}
                                                className="p-1 text-slate-600 hover:bg-slate-200 rounded disabled:opacity-30"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                                            </button>
                                        </div>

                                        {/* Item Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-base font-semibold text-slate-900">{item.label}</h3>
                                                {item.is_button === 1 && (
                                                    <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded">
                                                        Button
                                                    </span>
                                                )}
                                                {item.is_active === 0 && (
                                                    <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded">
                                                        Hidden
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-500">{item.href}</p>
                                            {item.parent_id && (
                                                <p className="text-xs text-slate-400 mt-1">
                                                    Submenu item (Parent ID: {item.parent_id})
                                                </p>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => {
                                                    setSelectedItem(item);
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                            <button
                                                onClick={() => item.id && deleteItem(item.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* EDIT MODAL */}
            {isModalOpen && selectedItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
                        <div className="px-6 py-4 border-b border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900">
                                {selectedItem.isNew ? "New Navbar Item" : "Edit Navbar Item"}
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Label</label>
                                <input
                                    type="text"
                                    value={selectedItem.label}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, label: e.target.value })}
                                    placeholder="Home"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Link (href)</label>
                                <input
                                    type="text"
                                    value={selectedItem.href}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, href: e.target.value })}
                                    placeholder="/"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
                                    <input
                                        type="number"
                                        value={selectedItem.order}
                                        onChange={(e) => setSelectedItem({ ...selectedItem, order: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Parent ID (optional)</label>
                                    <input
                                        type="number"
                                        value={selectedItem.parent_id || ''}
                                        onChange={(e) => setSelectedItem({ ...selectedItem, parent_id: e.target.value ? Number(e.target.value) : null })}
                                        placeholder="Leave empty"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-8 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedItem.is_button === 1}
                                        onChange={(e) => setSelectedItem({ ...selectedItem, is_button: e.target.checked ? 1 : 0 })}
                                        className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-slate-700">Display as Button</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedItem.is_active === 1}
                                        onChange={(e) => setSelectedItem({ ...selectedItem, is_active: e.target.checked ? 1 : 0 })}
                                        className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-slate-700">Active (Visible)</span>
                                </label>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
                            <button
                                onClick={saveItem}
                                disabled={saving}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Item'}
                            </button>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedItem(null);
                                }}
                                disabled={saving}
                                className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
