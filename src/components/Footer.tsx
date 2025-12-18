interface FooterProps {
    storeName: string;
}

const footerLinks = [
    {
        title: 'Solutions',
        links: [
            { label: 'Content Strategy', href: '/services' },
            { label: 'SEO Writing', href: '/services' },
            { label: 'Copywriting', href: '/services' },
            { label: 'Social Media', href: '/services' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About Us', href: '/about' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Terms', href: '/terms' },
            { label: 'Contact', href: '/contact' },
        ],
    },
    {
        title: 'Connect',
        links: [
            { label: 'Twitter', href: '#' },
            { label: 'LinkedIn', href: '#' },
            { label: 'Facebook', href: '#' },
        ],
    },
];

const Footer = ({ storeName }: FooterProps) => {
    return (
        <footer className="bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-2xl">hub</span>
                            <h2 className="text-base font-bold text-slate-900">{storeName}</h2>
                        </div>
                        <p className="mt-4 text-sm text-slate-500">Crafting content that converts.</p>
                    </div>
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold text-slate-600 tracking-wider uppercase">
                                {section.title}
                            </h3>
                            <ul className="mt-4 space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            className="text-sm text-slate-500 hover:text-primary"
                                            href={link.href}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div
                    className="mt-8 border-t border-slate-200 pt-8 text-sm text-slate-500 text-center">
                    <p>© {new Date().getFullYear()} {storeName}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;