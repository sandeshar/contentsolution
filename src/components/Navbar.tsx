'use client';
import { useState } from 'react';

interface NavBarProps {
    storeName: string;
}

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
];

const NavBar = ({ storeName }: NavBarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                className="text-sm font-medium leading-normal text-slate-700 hover:text-primary transition-colors"
                                href={link.href}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                    <a
                        href="/contact"
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                        <span className="truncate">Get a Quote</span>
                    </a>
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
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                className="text-sm font-medium leading-normal text-slate-700 hover:text-primary hover:bg-slate-100 px-4 py-3 rounded-lg transition-colors"
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="/contact"
                            className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-4 mt-2 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="truncate">Get a Quote</span>
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default NavBar;