import TeamMemberCard from './TeamMemberCard';

const TeamSection = () => {
    const team = [
        {
            name: "Anjali Sharma",
            role: "Founder & CEO",
            description: "Anjali is the visionary behind our agency, with over a decade of experience in digital marketing and brand strategy. She founded Content Solution Nepal with a mission to elevate storytelling standards across industries.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv8ZtQkLWouyWCBZj09kioNdfVhvGK9QinYGw-htJe-v9xhLPzHJoPEAUqfQ16IDCLUvyZy5frmNpGoXfB7ZF4Snfld4vihMXFWInnvzoRAFFr-3qhmfy3z0oKMF54oDhlEUNjq-z1GxnlFtGc3vJLJewOVswmEJpM8dLkrq8YEtzpPWJQwZe2K50VwmvFXMaAljm3RbbMiPZgoE6BBkX-CtJH9x1k1PAtXct_4W6XuShO0SIPAox4byDJzjnA2VAuUdB1l1AbTGM",
            alt: "Professional headshot of Anjali Sharma"
        },
        {
            name: "Bikram Thapa",
            role: "Head of Content",
            description: "Bikram leads our creative team, ensuring every piece of content is engaging, impactful, and perfectly aligned with client goals. His editorial instincts and strategic mindset shape every campaign we deliver.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIZghx4jkBaP_SBUZ8-aNKYuyn9yqIaYstzp7usJjiuyJvbgIOHC5NfFCF2ycAdyzbydlLDPkDveoJchQeCAfWr73hweMzAOuLptEp9QUre8DxqGcplf8LkfD76dWIp22MxrCrTgbnejdwx7h9_Zkix7OH1HsCNyFfzk8UOXTomPSIn8f1TxBhketRuJ_rJZw0gWMOdjgmOOmmHr04ffWIy6PGZVaAryZrDMs9XW2wm2l3pM9AxrgrjtcRR46qCDZt6v1LmY2H8NU",
            alt: "Professional headshot of Bikram Thapa"
        },
        {
            name: "Sunita Gurung",
            role: "SEO & Analytics Lead",
            description: "Sunita is our data guru, using insights to drive strategy and ensure our content reaches the right audience at the right time. She translates analytics into action, optimizing discoverability without sacrificing creativity.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB85pn7eu2BGY38Se1FJgDCBAs2wTNQKcfXrbonZjZeUuZBuGQXk6cD_Es1qB0_87QBHfIX7d3sOJVup7--AxjHLeL_XtEg7dDTQlm26nh4W9-iTcfFYio35hzpuuuaVmdOws8j5EeQ46Pgzh4VEeIFs-U3d0_meRXqyJ1O7GBSoziqUYBxyND8PpgrZXTcz1P4z-r3HtoL0_cvgdGywimYMxEEyICvmILhDZvmcOl2eqiNmFlhBUqJT-lHSNFoGsCgQBI4-ra18xA",
            alt: "Professional headshot of Sunita Gurung"
        },
        {
            name: "Rajesh Lama",
            role: "Lead Visual Designer",
            description: "Rajesh transforms ideas into stunning visuals, from compelling infographics to captivating video content. He ensures every design element enhances storytelling and strengthens brand identity.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_NVCv5f5L3LzqOn8TuX78NJ5AOBM6i0uTr9GHOh497prt19xvWskzseSdvwaiSqoITvfTpN95cQXmfAve2Shw3FVVwL1z4TdwmluuDH46-mr8vsrpm-eKgNFKSdQW6DsFpdPvvWvIAk8sYW9Z5l9paTBRb4zyMwwf1vqxE8wriaj0scFzp0Fh9tiY7E0uZehYphNcCZ-n4ApK464--DuclK2Jy-eYMGGl0JYl0JC6sjKWJiJ6QCLdIfd4RkS8kOwY3v9dXRvP6Xg",
            alt: "Professional headshot of Rajesh Lama"
        }
    ];

    return (
        <section className="w-full py-20 lg:py-32">
            <div className="mx-auto max-w-6xl px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-black leading-tight tracking-[-0.02em] text-slate-900 md:text-5xl">
                        Meet the Team
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                        We're a collective of thinkers, writers, and strategists. Each of us brings a unique skill set—and a shared commitment to quality, curiosity, and client success.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {team.map((member, index) => (
                        <TeamMemberCard
                            key={index}
                            name={member.name}
                            role={member.role}
                            description={member.description}
                            image={member.image}
                            alt={member.alt}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
