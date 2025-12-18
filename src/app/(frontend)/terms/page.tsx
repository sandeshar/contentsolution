import type { TermsHeaderData, TermsSectionData } from '@/types/pages';

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
    const { header, sections } = data;

    return (
        <main className="flex flex-col items-center page-bg">
            <div className="flex flex-col w-full max-w-7xl py-5">
                <div className="flex flex-col items-center text-center">
                    {header ? (
                        <>
                            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                                {header.title}
                            </h1>
                            <p className="mt-4 text-lg text-slate-600">
                                {header.last_updated}
                            </p>
                        </>
                    ) : (
                        <div className="mx-auto animate-pulse space-y-3">
                            <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto" />
                            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
                        </div>
                    )}
                </div>

                <div className="prose prose-slate mx-auto mt-16 max-w-none prose-headings:font-semibold prose-headings:text-slate-800 prose-p:text-slate-700 prose-a:text-primary hover:prose-a:underline">
                    {sections && sections.length > 0 ? (
                        sections.map((section: TermsSectionData) => (
                            <section key={section.id}>
                                <h2 className="text-2xl font-bold">{section.title}</h2>
                                <p>
                                    {section.content}
                                </p>
                            </section>
                        ))
                    ) : (
                        <div className="space-y-6">
                            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
