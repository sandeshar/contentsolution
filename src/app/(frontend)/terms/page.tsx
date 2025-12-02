const termsSections = [
    {
        title: '1. Introduction',
        content: 'Welcome to Content Solution Nepal. By accessing our website, you agree to be bound by these terms and conditions. Please read them carefully. The services offered by us are subject to your acceptance without modification of all of the terms and conditions contained herein.',
    },
    {
        title: '2. User Agreement & Conduct',
        content: 'You agree not to use the website for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the website in any way that could damage the website, the services, or the general business of Content Solution Nepal. This includes committing to not violate any local, state, national, or international law or regulation through your use of the site.',
    },
    {
        title: '3. Intellectual Property Rights',
        content: 'All content on this website, including text, graphics, logos, and images, is the property of Content Solution Nepal or its content suppliers and is protected by international copyright laws. Unauthorized use of any materials on this site may violate copyright, trademark, and other laws. You may view, copy, and print documents and graphics incorporated in these documents from the website subject to the following: (1) the documents may be used solely for personal, informational, non-commercial purposes; and (2) the documents may not be modified or altered in any way.',
    },
    {
        title: '4. Limitation of Liability',
        content: 'Content Solution Nepal will not be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, the site or materials on the site, even if Content Solution Nepal has been advised of the possibility of such damages. The information on this website is provided "as is" with all faults and without warranty of any kind, expressed or implied.',
    },
    {
        title: '5. Privacy Policy Summary',
        content: 'Our Privacy Policy, which is incorporated into these Terms of Service, describes how we collect, protect, and use your personal information. We are committed to protecting your privacy and security. By using this service, you agree to the terms of the Privacy Policy. You can find the full policy document here.',
        hasLink: true,
    },
    {
        title: '6. Governing Law',
        content: 'These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of Nepal. Any disputes will be handled in the jurisdiction of Kathmandu, Nepal.',
    },
    {
        title: '7. Contact Information',
        content: 'Questions about the Terms of Service should be sent to us at contact@contentsolution.np. We are available to address any of your concerns.',
        hasEmail: true,
    },
];

export default function TermsPage() {
    return (
        <main className="w-full grow bg-white">
            <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Terms &amp; Conditions
                    </h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Last updated on October 26, 2023
                    </p>
                </div>
                <div className="prose prose-slate mx-auto mt-16 max-w-none prose-headings:font-semibold prose-headings:text-slate-800 prose-p:text-slate-700 prose-a:text-primary hover:prose-a:underline">
                    {termsSections.map((section, index) => (
                        <section key={index}>
                            <h2 className="text-2xl font-bold">{section.title}</h2>
                            <p>
                                {section.hasEmail ? (
                                    <>
                                        Questions about the Terms of Service should be sent to us at{' '}
                                        <a href="mailto:contact@contentsolution.np">contact@contentsolution.np</a>.
                                        We are available to address any of your concerns.
                                    </>
                                ) : section.hasLink ? (
                                    <>
                                        {section.content.substring(0, section.content.indexOf('here'))}
                                        <a href="#">here</a>.
                                    </>
                                ) : (
                                    section.content
                                )}
                            </p>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
