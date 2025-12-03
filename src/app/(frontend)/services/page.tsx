import HeroSection from "@/components/ServicesPage/HeroSection";
import ServiceDetails from "@/components/ServicesPage/ServiceDetails";
import ProcessSection from "@/components/ServicesPage/ProcessSection";
import CTASection from "@/components/ServicesPage/CTASection";

export default function ServicesPage() {
    return (
        <main className="page-bg grow">
            <HeroSection />
            <ServiceDetails />
            <ProcessSection />
            <CTASection />
        </main>
    );
}
