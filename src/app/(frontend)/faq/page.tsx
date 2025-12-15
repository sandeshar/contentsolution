import CTAButton from '@/components/shared/CTAButton';
import FAQSection from '@/components/FAQPage/FAQSection';
import Link from 'next/link';

interface FAQHeaderData {
    title: string;
    description: string;
    search_placeholder: string;
}

interface FAQCategory {
    id: number;
    name: string;
}

interface FAQItem {
    id: number;
    category_id: number;
    question: string;
    answer: string;
}

interface FAQCTAData {
    title: string;
    description: string;
    button_text: string;
    button_link: string;
}

async function getFAQData() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    try {
        const [headerRes, categoriesRes, itemsRes, ctaRes] = await Promise.all([
            fetch(`${baseUrl}/api/pages/faq/header`, { next: { tags: ['faq-header'] } }),
            fetch(`${baseUrl}/api/pages/faq/categories`, { next: { tags: ['faq-categories'] } }),
            fetch(`${baseUrl}/api/pages/faq/items`, { next: { tags: ['faq-items'] } }),
            fetch(`${baseUrl}/api/pages/faq/cta`, { next: { tags: ['faq-cta'] } })
        ]);

        const headerData = await headerRes.json();
        const categoriesData = await categoriesRes.json();
        const itemsData = await itemsRes.json();
        const ctaData = await ctaRes.json();

        return {
            header: headerData,
            categories: categoriesData,
            items: itemsData,
            cta: ctaData
        };
    } catch (error) {
        console.error('Error fetching FAQ page data:', error);
        return {
            header: null,
            categories: [],
            items: [],
            cta: null
        };
    }
}

export default async function FAQPage() {
    const data = await getFAQData();

    if (!data.header || !data.cta) {
        return <div>Loading...</div>;
    }

    return (
        <main className="flex flex-col items-center page-bg">
            <div className="flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex flex-col items-center text-center gap-3 p-4 mb-8">
                    <p className="text-slate-900 text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">
                        {data.header.title}
                    </p>
                    <p className="text-slate-500 text-lg font-normal leading-normal max-w-2xl">
                        {data.header.description}
                    </p>
                </div>

                <FAQSection
                    categories={data.categories}
                    items={data.items}
                    searchPlaceholder={data.header.search_placeholder}
                />

                {/* CTA Section */}
                <div className="bg-primary/10 rounded-xl my-10 p-8 sm:p-10 text-center flex flex-col items-center">
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">
                        {data.cta.title}
                    </h3>
                    <p className="text-slate-500 mb-8 max-w-md text-lg">
                        {data.cta.description}
                    </p>
                    <Link href={data.cta.button_link}>
                        <CTAButton text={data.cta.button_text} />
                    </Link>
                </div>
            </div>
        </main>
    );
}
