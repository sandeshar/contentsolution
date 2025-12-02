import AboutHero from "@/components/AboutPage/AboutHero";
import AboutJourney from "@/components/AboutPage/AboutJourney";
import AboutPhilosophy from "@/components/AboutPage/AboutPhilosophy";
import TeamSection from "@/components/AboutPage/TeamSection";
import AboutCTA from "@/components/AboutPage/AboutCTA";

export default function AboutPage() {
    return (
        <main className="flex-grow page-bg">
            <AboutHero />
            <AboutJourney />
            <AboutPhilosophy />
            <TeamSection />
            <AboutCTA />
        </main>
    );
}
