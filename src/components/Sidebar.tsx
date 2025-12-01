'use client'
import { useState } from 'react';

const SideBar = () => {
    const [isUIOpen, setIsUIOpen] = useState(true);
    const [isSEOOpen, setIsSEOOpen] = useState(false);

    const mainItems = [
        { name: 'Dashboard', icon: 'dashboard', href: '/admin' },
        { name: 'Users', icon: 'group', href: '/admin/users' },
        { name: 'Blog', icon: 'article', href: '/admin/blog' },
        { name: 'Store Setting', icon: 'settings', href: '/admin/store-setting' },
    ];

    const seoItems = [
        { name: 'Robots.txt', icon: 'smart_toy', href: '/admin/seo/robots' },
        { name: 'Sitemap', icon: 'map', href: '/admin/seo/sitemap' },
    ];

    const uiSubItems = [
        { name: 'Home', icon: 'home', href: '/admin/ui/home' },
        { name: 'Service', icon: 'service_toolbox', href: '/admin/ui/services' },
        { name: 'Contact', icon: 'contact_mail', href: '/admin/ui/contact' },
        { name: 'FaQ', icon: 'help_outline', href: '/admin/ui/faq' },
        { name: 'About', icon: 'info', href: '/admin/ui/about' },
        { name: 'Terms and Conditions', icon: 'description', href: '/admin/ui/termsandconditions' },
    ];

    return (
        <aside className="sticky top-0 flex h-screen w-64 flex-col justify-between border-r border-gray-700 bg-gray-900 p-4 shadow-sm">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3 px-2">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-white">
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>database</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white text-base font-bold leading-normal">Admin Panel</h1>
                        <p className="text-gray-400 text-sm font-normal leading-normal">WebApp</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-2">
                    {mainItems.map((item) => (
                        <a key={item.name} className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-white/10" href={item.href}>
                            <span className="material-symbols-outlined text-lg">{item.icon}</span>
                            <p className="text-sm font-medium leading-normal">{item.name}</p>
                        </a>
                    ))}

                    {/* SEO Tools with sub-navigation */}
                    <div className="flex flex-col">
                        <button
                            onClick={() => setIsSEOOpen(!isSEOOpen)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-white/10 w-full"
                        >
                            <span className="material-symbols-outlined text-lg">search</span>
                            <p className="text-sm font-medium leading-normal flex-1 text-left">SEO Tools</p>
                            <span className={`material-symbols-outlined text-lg transition-transform ${isSEOOpen ? 'rotate-180' : ''}`}>
                                expand_more
                            </span>
                        </button>

                        {isSEOOpen && (
                            <div className="flex flex-col gap-1 pl-6 mt-1">
                                {seoItems.map((item) => (
                                    <a key={item.name} className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-white/10 text-sm" href={item.href}>
                                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                                        <p className="text-xs font-medium leading-normal">{item.name}</p>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* UI Elements with sub-navigation */}
                    <div className="flex flex-col">
                        <button
                            onClick={() => setIsUIOpen(!isUIOpen)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-white/10 w-full"
                        >
                            <span className="material-symbols-outlined text-lg">widgets</span>
                            <p className="text-sm font-medium leading-normal flex-1 text-left">UI Elements</p>
                            <span className={`material-symbols-outlined text-lg transition-transform ${isUIOpen ? 'rotate-180' : ''}`}>
                                expand_more
                            </span>
                        </button>

                        {isUIOpen && (
                            <div className="flex flex-col gap-1 pl-6 mt-1">
                                {uiSubItems.map((item) => (
                                    <a key={item.name} className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-white/10 text-sm" href={item.href}>
                                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                                        <p className="text-xs font-medium leading-normal">{item.name}</p>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            </div>
            <div className="flex flex-col gap-1 border-t border-gray-700 pt-4">
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-white/10" href="#">
                    <span className="material-symbols-outlined text-lg">account_circle</span>
                    <p className="text-sm font-medium leading-normal">Profile</p>
                </a>
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-white/10" href="#">
                    <span className="material-symbols-outlined text-lg">logout</span>
                    <p className="text-sm font-medium leading-normal">Logout</p>
                </a>
            </div>
        </aside>
    );
};

export default SideBar;