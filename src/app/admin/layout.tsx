import SideBar from "@/components/Sidebar"
import type { Metadata } from "next";
import { db } from "@/db";
import { storeSettings } from "@/db/schema";

export async function generateMetadata(): Promise<Metadata> {
    try {
        const rows = await db.select().from(storeSettings).limit(1);
        const s = rows[0];
        const siteName = s?.store_name || "Content Store";
        return {
            title: `Admin | ${siteName}`,
            description: `Admin dashboard for ${siteName}`,
            robots: "noindex, nofollow",
            creator: siteName,
            publisher: siteName,
        };
    } catch {
        return {
            title: "Admin | Content Store",
            robots: "noindex, nofollow",
        };
    }
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <SideBar />
            {children}
        </div>

    )
}