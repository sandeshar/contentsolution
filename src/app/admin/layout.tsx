import SideBar from "@/components/Sidebar"
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { storeSettings, users } from "@/db/schema";
import { checkAuth } from "@/utils/authHelper";
import { count, inArray } from "drizzle-orm";

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

export default async function DashboardLayout({
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