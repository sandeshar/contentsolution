"use client";

import { useState } from "react";

export default function AddUserPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "Viewer",
        status: "Active",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Add user:", formData);
        // TODO: Add user creation logic
    };

    return (
        <main className="flex-1 flex flex-col">
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Add New User</h1>
                        <p className="text-slate-500 mt-1">Create a new user account with role and permissions.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                        <form onSubmit={handleSubmit}>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="user@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                    >
                                        <option value="Administrator">Administrator</option>
                                        <option value="Editor">Editor</option>
                                        <option value="Viewer">Viewer</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Banned">Banned</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="avatar" className="block text-sm font-medium text-slate-700 mb-2">
                                        Avatar URL
                                    </label>
                                    <input
                                        type="url"
                                        id="avatar"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="https://example.com/avatar.jpg"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Optional: Provide a URL to the user's profile picture</p>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 rounded-b-lg">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-white"
                                >
                                    <span className="material-symbols-outlined text-lg">person_add</span>
                                    Add User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
