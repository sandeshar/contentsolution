import AboutHero from "@/components/AboutPage/AboutHero";
import AboutJourney from "@/components/AboutPage/AboutJourney";
import AboutPhilosophy from "@/components/AboutPage/AboutPhilosophy";
import TeamSection from "@/components/AboutPage/TeamSection";
import AboutCTA from "@/components/AboutPage/AboutCTA";
import TestimonialSlider from "@/components/shared/TestimonialSlider";

async function getAboutPageData() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    try {
        const [
            heroRes,
            journeyRes,
            statsRes,
            featuresRes,
            philosophyRes,
            principlesRes,
            teamSectionRes,
            teamMembersRes,
            ctaRes
        ] = await Promise.all([
            fetch(`${baseUrl}/api/pages/about/hero`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/about/journey`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/about/stats`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/about/features`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/about/philosophy`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/about/principles`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/about/team-section`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/about/team-members`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/pages/about/cta`, { cache: 'no-store' }),
        ]);

        const hero = heroRes.ok ? await heroRes.json() : null;
        const journey = journeyRes.ok ? await journeyRes.json() : null;
        const stats = statsRes.ok ? await statsRes.json() : [];
        const features = featuresRes.ok ? await featuresRes.json() : [];
        const philosophy = philosophyRes.ok ? await philosophyRes.json() : null;
        const principles = principlesRes.ok ? await principlesRes.json() : [];
        const teamSection = teamSectionRes.ok ? await teamSectionRes.json() : null;
        const teamMembers = teamMembersRes.ok ? await teamMembersRes.json() : [];
        const cta = ctaRes.ok ? await ctaRes.json() : null;

        return {
            hero,
            journey,
            stats,
            features,
            philosophy,
            principles,
            teamSection,
            teamMembers,
            cta,
        };
    } catch (error) {
        console.error('Error fetching about page data:', error);
        return {
            hero: null,
            journey: null,
            stats: [],
            features: [],
            philosophy: null,
            principles: [],
            teamSection: null,
            teamMembers: [],
            cta: null,
        };
    }
}

export default async function AboutPage() {
    const data = await getAboutPageData();

    return (
        <main className="grow page-bg">
            <AboutHero data={data.hero} />
            <AboutJourney section={data.journey} stats={data.stats} features={data.features} />
            <AboutPhilosophy section={data.philosophy} principles={data.principles} />
            <TeamSection section={data.teamSection} members={data.teamMembers} />
            <TestimonialSlider
                filter="about"
                title="Trusted by Industry Leaders"
                subtitle="See what our partners and clients have to say about working with us"
            />
            <AboutCTA data={data.cta} />
        </main>
    );
}
