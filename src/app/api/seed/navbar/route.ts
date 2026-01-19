import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import NavbarItem from "@/models/Navbar";
import { ServiceCategory, ServiceSubcategory } from '@/models/Services';

export async function POST(request: Request) {
    try {
        await dbConnect();

        // Always clean the navbar items before seeding
        await NavbarItem.deleteMany({});

        // Seed default navbar items
        const defaultItems = [
            { label: 'Home', href: '/', order: 0, is_button: 0, is_active: 1 },
            { label: 'Services', href: '/services', order: 1, is_button: 0, is_active: 1, is_dropdown: 1 },
            { label: 'About Us', href: '/about', order: 2, is_button: 0, is_active: 1 },
            { label: 'Blog', href: '/blog', order: 3, is_button: 0, is_active: 1 },
            { label: 'FAQ', href: '/faq', order: 4, is_button: 0, is_active: 1 },
            { label: 'Contact', href: '/contact', order: 5, is_button: 0, is_active: 1 },
            { label: 'Terms', href: '/terms', order: 6, is_button: 0, is_active: 1 },
            { label: 'Get a Quote', href: '/contact', order: 7, is_button: 1, is_active: 1 },
        ];

        // Insert defaults
        for (let i = 0; i < defaultItems.length; i++) {
            const item = defaultItems[i];
            await NavbarItem.create({ ...item, order: i });
        }

        // Attach service categories as dropdown children under Services.
        const categories = await ServiceCategory.find();
        if (!categories || categories.length === 0) {
            return NextResponse.json({ message: 'No service categories found. Run /api/seed/services first' }, { status: 200 });
        }

        // Get the Services main nav ID
        const serviceNavRow = await NavbarItem.findOne({ href: '/services' });
        const servicesId = serviceNavRow?._id;
        if (!servicesId) {
            return NextResponse.json({ error: 'Services nav item not found' }, { status: 500 });
        }

        // Insert each category under Services
        for (let i = 0; i < categories.length; i++) {
            const cat = categories[i];
            const subs = await ServiceSubcategory.find({ category_id: cat._id });
            const catHasSub = subs.length > 0;

            let existingChild = await NavbarItem.findOne({
                href: `/services?category=${cat.slug}`,
                parent_id: servicesId
            });

            let catNavId = null;
            if (!existingChild) {
                const created = await NavbarItem.create({
                    label: cat.name,
                    href: `/services?category=${cat.slug}`,
                    order: i,
                    parent_id: servicesId,
                    is_button: 0,
                    is_active: 1,
                    is_dropdown: catHasSub ? 1 : 0,
                });
                catNavId = created._id;
            } else {
                catNavId = existingChild._id;
                // Update dropdown flag if it has subs
                if (catHasSub && existingChild.is_dropdown !== 1) {
                    existingChild.is_dropdown = 1;
                    await existingChild.save();
                }
            }

            if (catHasSub && catNavId) {
                for (let si = 0; si < subs.length; si++) {
                    const sub = subs[si];
                    let existingSub = await NavbarItem.findOne({
                        href: `/services?category=${cat.slug}&subcategory=${sub.slug}`,
                        parent_id: catNavId
                    });
                    if (!existingSub) {
                        await NavbarItem.create({
                            label: sub.name,
                            href: `/services?category=${cat.slug}&subcategory=${sub.slug}`,
                            order: si,
                            parent_id: catNavId,
                            is_button: 0,
                            is_active: 1,
                            is_dropdown: 0,
                        });
                    }
                }
            }
        }

        return NextResponse.json({ message: "Navbar items seeded successfully" });
    } catch (error) {
        console.error("Error seeding navbar items:", error);
        return NextResponse.json({ error: "Failed to seed navbar items" }, { status: 500 });
    }
}
