import SearchBar from '@/components/shared/SearchBar';
import CTAButton from '@/components/shared/CTAButton';

export default function FAQPage() {
    const categories = ['General', 'Services', 'Pricing', 'Process'];

    const faqs = [
        {
            question: 'What is content marketing and why is it important?',
            answer: 'Content marketing is a strategic marketing approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience — and, ultimately, to drive profitable customer action. It helps build trust, generate leads, and establish your brand as an authority in your industry.'
        },
        {
            question: 'What types of content do you create?',
            answer: 'We specialize in a wide range of content formats, including blog posts, articles, website copy, social media content, email newsletters, case studies, and white papers. We tailor the content type to your specific goals and target audience.'
        },
        {
            question: 'How do you determine the pricing for your services?',
            answer: 'Our pricing is based on the scope of the project, including the type and volume of content, the level of research required, and the overall strategy involved. We offer project-based pricing as well as monthly retainer packages. Contact us for a custom quote.'
        },
        {
            question: 'What is your content creation process like?',
            answer: 'Our process begins with a discovery call to understand your business and goals. We then move to strategy and planning, followed by content creation, editing, and your review. Once approved, we help with publishing and promotion.'
        },
        {
            question: 'Can I request revisions to the content you provide?',
            answer: 'Absolutely. We value your feedback. All of our packages include a set number of revision rounds to ensure the final content aligns perfectly with your vision and brand voice.'
        },
        {
            question: 'Do you offer SEO services with your content?',
            answer: 'Yes, all our content is created with SEO best practices in mind. This includes keyword research, on-page optimization, and creating content that is structured to rank well in search engines.'
        }
    ];

    return (
        <main className="flex grow justify-center py-10 sm:py-16">
            <div className="flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center gap-3 p-4 mb-8">
                    <p className="text-slate-900 text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">
                        Frequently Asked Questions
                    </p>
                    <p className="text-slate-500 text-lg font-normal leading-normal max-w-2xl">
                        Answers to common questions about our content marketing services. Find what you're looking for or get in touch with our team.
                    </p>
                </div>

                <div className="px-4 py-6 max-w-2xl mx-auto w-full">
                    <SearchBar placeholder="Search for a question..." />
                </div>

                <div className="flex justify-center gap-2 sm:gap-3 p-3 flex-wrap mb-8">
                    {categories.map((category, index) => (
                        <button
                            key={category}
                            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 ${index === 0
                                    ? 'bg-primary'
                                    : 'bg-white hover:bg-slate-100 transition-colors shadow-sm'
                                }`}
                        >
                            <p className={`text-sm font-medium leading-normal ${index === 0 ? 'text-white' : 'text-slate-700'
                                }`}>
                                {category}
                            </p>
                        </button>
                    ))}
                </div>

                {/* FAQ Items */}
                <div className="flex flex-col gap-4 p-4 max-w-3xl mx-auto w-full">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group rounded-xl bg-white p-6 shadow-sm border-l-4 border-transparent"
                            {...(index === 0 ? { open: true } : {})}
                        >
                            <summary className="flex cursor-pointer items-center justify-between gap-6">
                                <h3 className="text-slate-800 text-lg font-semibold leading-normal">
                                    {faq.question}
                                </h3>
                                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <div className="absolute h-4 w-0.5 bg-primary transition-transform duration-300 group-open:rotate-90"></div>
                                    <div className="h-0.5 w-4 bg-primary"></div>
                                </div>
                            </summary>
                            <div className="overflow-hidden transition-all duration-500 ease-in-out">
                                <p className="text-slate-500 text-base font-normal leading-relaxed mt-4">
                                    {faq.answer}
                                </p>
                            </div>
                        </details>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="bg-primary/10 rounded-xl my-10 p-8 sm:p-10 text-center flex flex-col items-center">
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">
                        Still have questions?
                    </h3>
                    <p className="text-slate-500 mb-8 max-w-md text-lg">
                        Can't find the answer you're looking for? Please chat to our friendly team.
                    </p>
                    <CTAButton text="Get in Touch" />
                </div>
            </div>
        </main>
    );
}
