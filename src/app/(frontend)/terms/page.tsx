interface TermsHeaderData {
    title: string;
    last_updated: string;
}


interface TermsSectionData {
    id: number;
    title: string;
    content: string;
    has_email: number;
    has_link: number;
}

async function getTermsData() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    try {
        const [headerRes, sectionsRes] = await Promise.all([
            fetch(`${baseUrl}/api/pages/terms/header`, { next: { tags: ['terms-header'] } }),
            fetch(`${baseUrl}/api/pages/terms/sections`, { next: { tags: ['terms-sections'] } })
        ]);

        const headerData = await headerRes.json();
        const sectionsData = await sectionsRes.json();

        return {
            header: headerData,
            sections: sectionsData
        };
    } catch (error) {
        console.error('Error fetching terms page data:', error);
        return {
            header: null,
            sections: []
        };
    }
}

export default async function TermsPage() {
    const data = await getTermsData();

    if (!data.header) {
        return <div>Loading...</div>;
    }

    return (
        <main className="flex flex-col items-center page-bg">
            <div className="flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        {data.header.title}
                    </h1>
                    <p className="mt-4 text-lg text-slate-600">
                        {data.header.last_updated}
                    </p>
                </div>
                <div className="prose prose-slate mx-auto mt-16 max-w-none prose-headings:font-semibold prose-headings:text-slate-800 prose-p:text-slate-700 prose-a:text-primary hover:prose-a:underline">
                    {data.sections.map((section: TermsSectionData) => (
                        <section key={section.id}>
                            <h2 className="text-2xl font-bold">{section.title}</h2>
                            <p>
                                {section.content}
                            </p>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
