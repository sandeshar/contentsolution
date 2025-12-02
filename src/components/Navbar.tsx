const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
];

const NavBar = () => {
    return (
        <header
            className="sticky top-0 z-50 flex items-center justify-center border-b border-solid border-slate-200/80 bg-background-light/80 backdrop-blur-sm">
            <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-6 lg:px-8 py-3 w-full max-w-7xl">
                <a href="/" className="flex items-center gap-4 text-slate-900 hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined text-primary text-3xl">hub</span>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Content Solution Nepal</h2>
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
                    <button className="flex items-center justify-center p-2 rounded-lg hover:bg-slate-200">
                        <span className="material-symbols-outlined text-slate-800">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default NavBar;