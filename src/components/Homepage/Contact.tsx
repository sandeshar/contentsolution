import ContactFormSection from '../shared/ContactFormSection';

interface ContactSectionData {
    id: number;
    title: string;
    description: string;
    name_placeholder: string;
    email_placeholder: string;
    phone_placeholder?: string;
    service_placeholder: string;
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white border border-slate-200 rounded-xl p-8 sm:p-12">
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900">{data.title}</h2>
                    <p className="text-slate-600 text-base">{data.description}</p>
                </div>
                <ContactFormSection
                    namePlaceholder={data.name_placeholder}
                    emailPlaceholder={data.email_placeholder}
                    phonePlaceholder={data.phone_placeholder}
                    servicePlaceholder={data.service_placeholder}
                    messagePlaceholder={data.message_placeholder}
                    submitButtonText={data.submit_button_text}
                    variant="labeled"
                />
            </div>
        </section>
    );
};

export default Contact;