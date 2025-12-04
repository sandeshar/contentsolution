import CTAButton from '../shared/CTAButton';

interface ContactSectionData {
    id: number;
    title: string;
    description: string;
    name_placeholder: string;
    email_placeholder: string;
    company_placeholder: string;
    message_placeholder: string;
    submit_button_text: string;
    is_active: number;
    updatedAt: Date;
}

interface ContactProps {
    data?: ContactSectionData | null;
}

const Contact = ({ data }: ContactProps) => {
    if (!data) {
        return null;
    }

    return (
        <section className="py-16 sm:py-24">
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white border border-slate-200 rounded-xl p-8 sm:p-12">
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900">{data.title}</h2>
                    <p className="text-slate-600 text-base">{data.description}</p>
                </div>
                <form className="flex flex-col gap-4">
                    <input
                        className="w-full h-12 px-4 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                        placeholder={data.name_placeholder} type="text" />
                    <input
                        className="w-full h-12 px-4 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                        placeholder={data.email_placeholder} type="email" />
                    <input
                        className="w-full h-12 px-4 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                        placeholder={data.company_placeholder} type="text" />
                    <textarea
                        className="w-full px-4 py-3 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                        placeholder={data.message_placeholder} rows={4}></textarea>
                    <CTAButton text={data.submit_button_text} variant="primary" className="w-full" />
                </form>
            </div>
        </section>
    );
};

export default Contact;