import Contact from "@/components/Homepage/Contact";
import Expertise from "@/components/Homepage/Expertise";
import Hero from "@/components/Homepage/Hero";
import Trust from "@/components/Homepage/Trust";

export default async function Home() {
    return (
        <main className="flex flex-col items-center page-bg">
            <div className="flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
                <Hero />
                <Trust />
                <Expertise />
                <Contact />
            </div>
        </main>
    );
}
