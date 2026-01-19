import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { StoreSettings, FooterSection, FooterLink } from "@/models/StoreSettings";

export async function POST() {
    try {
        await dbConnect();

        const store = await StoreSettings.findOne();
        if (!store) return NextResponse.json({ success: false, error: "No store settings found. Seed store settings first." }, { status: 400 });

        await FooterLink.deleteMany({});
        await FooterSection.deleteMany({});

        const defaultSections = [
            {
                title: "Solutions",
                links: [
                    { label: "Content Strategy", href: "/services" },
                    { label: "SEO Writing", href: "/services" },
                    { label: "Copywriting", href: "/services" },
                    { label: "Social Media", href: "/services" },
                ],
            },
            {
                title: "Company",
                links: [
                    { label: "About Us", href: "/about" },
                    { label: "FAQ", href: "/faq" },
                    { label: "Terms", href: "/terms" },
                    { label: "Contact", href: "/contact" },
                ],
            },
        ];

        for (const [sIdx, sec] of defaultSections.entries()) {
            const section = await FooterSection.create({
                store_id: store._id,
                title: sec.title || "",
                order: sIdx
            });

            if (sec.links && sec.links.length) {
                for (const [lIdx, link] of sec.links.entries()) {
                    await FooterLink.create({
                        section_id: section._id,
                        label: link.label,
                        href: link.href,
                        is_external: 0,
                        order: lIdx
                    });
                }
            }
        }

        if (!store.footer_text) {
            store.footer_text = "© " + new Date().getFullYear() + " " + (store.store_name || "Your Store") + ". All rights reserved.";
            await store.save();
        }

        return NextResponse.json({ success: true, message: "Footer collection seeded successfully" });
    } catch (err) {
        console.error("Error seeding footer:", err);
        return NextResponse.json({ success: false, error: "Failed to seed footer collection" }, { status: 500 });
    }
}
