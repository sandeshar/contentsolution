import ContactHero from "@/components/ContactPage/ContactHero";
import ContactInfo from "@/components/ContactPage/ContactInfo";
import ContactForm from "@/components/ContactPage/ContactForm";

export default function ContactPage() {
    return (
        <main className="flex-grow">
            <section className="w-full py-16 sm:py-24 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="flex flex-col gap-8">
                            <ContactHero />
                            <ContactInfo />
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </section>
            <section className="w-full">
                <div className="aspect-[16/6] w-full">
                    <img
                        alt="A map showing the location of the office in a city."
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiFTLaRUOW5mjSaoIEkUFTyi4xKz9-qYf_QF1iCeo0qHrpZpgyOmVzH4MyUE8mqWN4-R186bFaehsXx3uw4VEssmzCZrk9lstEmusWqRoylYx4_vO1YCHJ5HruL8RvDpBQmbDLFZT8sHwcEfLMd90smmbFeIc4fjSmYdws0dScLUnl-G9V9YYmuUvDB3nESBrClJly_3F-3UMNmP_Ebnj_Fy_ere901i_xPLFP4XtnVT4jj0ZwX82UL-nYxu8oFpM4CHC9OXWttTk"
                    />
                </div>
            </section>
        </main>
    );
}
