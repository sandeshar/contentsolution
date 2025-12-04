import { Metadata, Viewport } from "next";
import { db } from "@/db";
import { storeSettings } from "@/db/schema";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
    try {
        const rows = await db.select().from(storeSettings).limit(1);
        const s = rows[0];
        if (!s) {
            return {
                title: "Content Store",
                description: "Powered by ContentSolution",
                robots: "index, follow",
            };
        }

        const title = s.meta_title || s.store_name || "Content Store";
        const description = s.meta_description || s.store_description || "";
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        return {
            title,
            description,
            keywords: s.meta_keywords || "",
            robots: "index, follow",
            creator: s.store_name,
            publisher: s.store_name,
            icons: s.favicon ? { icon: s.favicon } : undefined,
            openGraph: {
                type: "website",
                locale: "en_US",
                url: baseUrl,
                siteName: s.store_name,
                title,
                description,
                images: s.store_logo ? [{ url: s.store_logo, alt: s.store_name }] : [],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: s.store_logo ? [s.store_logo] : [],
            },
            alternates: {
                canonical: baseUrl,
            },
        };
    } catch {
        return {
            title: "Content Store",
            description: "",
        };
    }
}

export default async function FrontendLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const rows = await db.select().from(storeSettings).limit(1);
    const storeName = rows[0]?.store_name || "Content Solution Nepal";

    return (
        <>
            <NavBar storeName={storeName} />
            {children}
            <Footer storeName={storeName} />
        </>
    );
}
