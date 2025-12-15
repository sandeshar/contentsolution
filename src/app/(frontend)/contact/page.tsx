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
    phone_placeholder?: string;
    subject_placeholder: string;
    service_placeholder?: string;
    message_placeholder: string;
    submit_button_text: string;
    success_message: string;
}

async function getContactData() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    try {
        const [heroRes, infoRes, formConfigRes] = await Promise.all([
            fetch(`${baseUrl}/api/pages/contact/hero`, { next: { tags: ['contact-hero'] } }),
            fetch(`${baseUrl}/api/pages/contact/info`, { next: { tags: ['contact-info'] } }),
            fetch(`${baseUrl}/api/pages/contact/form-config`, { next: { tags: ['contact-form-config'] } })
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

    const mapUrl = data.info.map_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.77259250663!2d85.33749181506213!3d27.6934339828003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1999f82d1c07%3A0x6b69b5033a763c6c!2sNew%20Baneshwor%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1678886450123!5m2!1sen!2sus';

    return (
        <main className="flex flex-col items-center page-bg">
            <div className="flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
                <section className="w-full bg-white py-16 sm:py-24">
                    <div className="text-center">
                        <ContactHero data={data.hero} />
                    </div>
                </section>

                <section className="py-16 sm:py-24">
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
                        <ContactInfo data={data.info} />
                        <ContactForm data={data.formConfig} />
                    </div>
                </section>

                <section className="py-16 sm:py-24">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                        <div className="overflow-hidden rounded-lg">
                            <iframe
                                src={mapUrl}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps Location"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
