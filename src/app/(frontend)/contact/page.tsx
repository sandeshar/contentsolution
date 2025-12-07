import ContactHero from "@/components/ContactPage/ContactHero";
import ContactInfo from "@/components/ContactPage/ContactInfo";
import ContactForm from "@/components/ContactPage/ContactForm";

interface ContactHeroData {
    tagline: string;
    title: string;
    description: string;
}

interface ContactInfoData {
    office_location: string;
    phone: string;
    email: string;
    map_url: string;
}

interface ContactFormConfigData {
    name_placeholder: string;
    email_placeholder: string;
    subject_placeholder: string;
    message_placeholder: string;
    submit_button_text: string;
    success_message: string;
}

async function getContactData() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    try {
        const [heroRes, infoRes, formConfigRes] = await Promise.all([
            fetch(`${baseUrl}/api/pages/contact/hero`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/contact/info`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/contact/form-config`, { cache: 'no-store' })
        ]);

        const heroData = await heroRes.json();
        const infoData = await infoRes.json();
        const formConfigData = await formConfigRes.json();

        return {
            hero: heroData,
            info: infoData,
            formConfig: formConfigData
        };
    } catch (error) {
        console.error('Error fetching contact page data:', error);
        return {
            hero: null,
            info: null,
            formConfig: null
        };
    }
}

export default async function ContactPage() {
    const data = await getContactData();

    if (!data.hero || !data.info || !data.formConfig) {
        return <div>Loading...</div>;
    }

    return (
        <main className="grow">
            <section className="w-full py-16 sm:py-24 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="flex flex-col gap-8">
                            <ContactHero data={data.hero} />
                            <ContactInfo data={data.info} />
                        </div>
                        <ContactForm data={data.formConfig} />
                    </div>
                </div>
            </section>
            <section className="w-full">
                <div className="w-full h-[450px]">
                    <iframe
                        src={data.info.map_url}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location"
                    />
                </div>
            </section>
        </main>
    );
}
