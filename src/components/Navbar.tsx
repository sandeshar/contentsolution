'use client';
import { useState, useEffect } from 'react';

interface NavBarProps {
    storeName: string;
}

type NavbarItem = {
    id: number;
    label: string;
    href: string;
    order: number;
    parent_id?: number | null;
    is_button: number;
    is_active: number;
};

const NavBar = ({ storeName }: NavBarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [navLinks, setNavLinks] = useState<NavbarItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [mobileOpenDropdown, setMobileOpenDropdown] = useState<number | null>(null);

    useEffect(() => {
        const fetchNavItems = async () => {
            try {
                const response = await fetch('/api/navbar');
                if (response.ok) {
                    const items = await response.json();
                    // Filter only active items and sort by order
                    const activeItems = items
                        .filter((item: NavbarItem) => item.is_active === 1)
                        .sort((a: NavbarItem, b: NavbarItem) => a.order - b.order);
                    setNavLinks(activeItems);
                }
            } catch (error) {
                console.error('Error fetching navbar items:', error);
                // Fallback to default links if fetch fails
                setNavLinks([
                    { id: 1, label: 'Home', href: '/', order: 0, is_button: 0, is_active: 1 },
                    { id: 2, label: 'Services', href: '/services', order: 1, is_button: 0, is_active: 1 },
                    { id: 3, label: 'About Us', href: '/about', order: 2, is_button: 0, is_active: 1 },
                    { id: 4, label: 'Blog', href: '/blog', order: 3, is_button: 0, is_active: 1 },
                    { id: 5, label: 'FAQ', href: '/faq', order: 4, is_button: 0, is_active: 1 },
                    { id: 6, label: 'Contact', href: '/contact', order: 5, is_button: 0, is_active: 1 },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchNavItems();
    }, []);

    // Get children for a parent item
    const getChildren = (parentId: number) => {
        return navLinks.filter(item => item.parent_id === parentId && item.is_button === 0);
    };

    // Check if item has children
    const hasChildren = (itemId: number) => {
        return navLinks.some(item => item.parent_id === itemId);
    };

    return (
        <header
            className="sticky top-0 z-50 flex items-center justify-center border-b border-solid border-slate-200/80 bg-background-light/80 backdrop-blur-sm">
            <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-6 lg:px-8 py-3 w-full max-w-7xl">
                <a href="/" className="flex items-center gap-4 text-slate-900 hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined text-primary text-3xl">hub</span>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">{storeName}</h2>
                </a>
                <div className="hidden md:flex flex-1 justify-end gap-8">
                    <nav className="flex items-center gap-9">
                        {navLinks.filter(link => link.is_button === 0 && !link.parent_id).map((link) => {
                            const children = getChildren(link.id);
                            const hasDropdown = children.length > 0;

                            return (
                                <div
                                    key={link.id}
                                    className="relative"
                                    onMouseEnter={() => hasDropdown && setOpenDropdown(link.id)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <a
                                        className="text-sm font-medium leading-normal text-slate-700 hover:text-primary transition-colors flex items-center gap-1"
                                        href={link.href}
                                    >
                                        {link.label}
                                        {hasDropdown && (
                                            <span className="material-symbols-outlined text-sm">expand_more</span>
                                        )}
                                    </a>

                                    {hasDropdown && openDropdown === link.id && (
                                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                                            {children.map((child) => (
                                                <a
                                                    key={child.id}
                                                    href={child.href}
                                                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors"
                                                >
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                    {navLinks.filter(link => link.is_button === 1).map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                        >
                            <span className="truncate">{link.label}</span>
                        </a>
                    ))}
                </div>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center justify-center p-2 rounded-lg hover:bg-slate-200 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-slate-800">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background-light/95 backdrop-blur-sm border-b border-slate-200/80 shadow-lg">
                    <nav className="flex flex-col px-4 py-4 gap-1">
                        {navLinks.filter(link => link.is_button === 0 && !link.parent_id).map((link) => {
                            const children = getChildren(link.id);
                            const hasDropdown = children.length > 0;
                            const isExpanded = mobileOpenDropdown === link.id;

                            return (
                                <div key={link.id}>
                                    <div className="flex items-center justify-between">
                                        <a
                                            className="flex-1 text-sm font-medium leading-normal text-slate-700 hover:text-primary hover:bg-slate-100 px-4 py-3 rounded-lg transition-colors"
                                            href={link.href}
                                            onClick={() => !hasDropdown && setIsMenuOpen(false)}
                                        >
                                            {link.label}
                                        </a>
                                        {hasDropdown && (
                                            <button
                                                onClick={() => setMobileOpenDropdown(isExpanded ? null : link.id)}
                                                className="px-2 py-3 text-slate-700 hover:text-primary"
                                            >
                                                <span className="material-symbols-outlined text-sm">
                                                    {isExpanded ? 'expand_less' : 'expand_more'}
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                    {hasDropdown && isExpanded && (
                                        <div className="pl-4 mt-1 flex flex-col gap-1">
                                            {children.map((child) => (
                                                <a
                                                    key={child.id}
                                                    href={child.href}
                                                    className="text-sm text-slate-600 hover:text-primary hover:bg-slate-100 px-4 py-2 rounded-lg transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {navLinks.filter(link => link.is_button === 1).map((link) => (
                            <a
                                key={link.id}
                                href={link.href}
                                className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-4 mt-2 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="truncate">{link.label}</span>
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default NavBar;