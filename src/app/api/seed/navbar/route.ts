import { NextResponse } from "next/server";
import { db } from "@/db";
import { navbarItems } from "@/db/navbarSchema";
import { serviceCategories, serviceSubcategories } from '@/db/serviceCategoriesSchema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
    try {
        // Don't read existing here - we will handle clean/no-clean below
        const url = new URL(request.url);
        // Clean is true by default; pass clean=false to skip deletion.
        const clean = url.searchParams.get('clean') !== 'false';
        if (clean) {
            // Delete everything - reset navbar
            await db.delete(navbarItems);
        }

        // Seed default navbar items
        const defaultItems = [
            { label: 'Home', href: '/', order: 0, is_button: 0, is_active: 1 },
            { label: 'Services', href: '/services', order: 1, is_button: 0, is_active: 1, is_dropdown: 1 },
            { label: 'About Us', href: '/about', order: 2, is_button: 0, is_active: 1 },
            { label: 'Blog', href: '/blog', order: 3, is_button: 0, is_active: 1 },
            { label: 'FAQ', href: '/faq', order: 4, is_button: 0, is_active: 1 },
            { label: 'Contact', href: '/contact', order: 5, is_button: 0, is_active: 1 },
            { label: 'Get a Quote', href: '/contact', order: 6, is_button: 1, is_active: 1 },
        ];

        if (clean) {
            // Table is cleared; insert defaults unconditionally
            for (const item of defaultItems) {
                await db.insert(navbarItems).values(item);
            }
        } else {
            // Insert missing defaults if not present
            for (const item of defaultItems) {
                const [found] = await db
                    .select()
                    .from(navbarItems)
                    .where(eq(navbarItems.href, item.href), eq(navbarItems.parent_id, null), eq(navbarItems.is_button, item.is_button || 0))
                    .limit(1);
                if (!found) {
                    await db.insert(navbarItems).values(item);
                }
            }
        }

        // Note: default items were already handled above; do not insert them again here.

        // Attach service categories as dropdown children under Services.
        const categories = await db.select().from(serviceCategories);
        if (categories.length === 0) {
            // Not seeding categories automatically — return helpful message
            return NextResponse.json({ message: 'No service categories found. Run /api/seed/services first' }, { status: 200 });
        }
        if (categories.length > 0) {
            // Get the services item id
            const servicesRow = await db.select().from(navbarItems).where(eq(navbarItems.href, '/services')).limit(1);
            const servicesId = servicesRow[0]?.id;
            if (servicesId) {
                // If not clean and children already exist, skip adding children
                if (!clean) {
                    const existingChildren = await db.select().from(navbarItems).where(eq(navbarItems.parent_id, servicesId));
                    if (existingChildren.length > 0) {
                        return NextResponse.json({ message: 'Navbar items already seeded' });
                    }
                }

                for (let i = 0; i < categories.length; i++) {
                    const cat = categories[i];
                    const catHasSub = (await db.select().from(serviceSubcategories).where(eq(serviceSubcategories.category_id, cat.id)).limit(1)).length > 0;
                    // Avoid duplicates for category children under services
                    const [existingChild] = await db
                        .select()
                        .from(navbarItems)
                        .where(eq(navbarItems.href, `/services?category=${cat.slug}`), eq(navbarItems.parent_id, servicesId), eq(navbarItems.is_button, 0))
                        .limit(1);
                    if (!existingChild) {
                        await db.insert(navbarItems).values({
                            label: cat.name,
                            href: `/services?category=${cat.slug}`,
                            order: i,
                            parent_id: servicesId,
                            is_button: 0,
                            is_active: 1,
                            is_dropdown: catHasSub ? 1 : 0,
                        });
                        // after creating the category nav item, create subcategories under it
                        if (catHasSub) {
                            // get the newly created nav id
                            const catInsertResult = await db.select().from(navbarItems).where(eq(navbarItems.href, `/services?category=${cat.slug}`), eq(navbarItems.parent_id, servicesId)).limit(1);
                            const catNavId = catInsertResult[0]?.id;
                            if (catNavId) {
                                const subs = await db.select().from(serviceSubcategories).where(eq(serviceSubcategories.category_id, cat.id));
                                for (let si = 0; si < subs.length; si++) {
                                    const sub = subs[si];
                                    const [existingSub] = await db
                                        .select()
                                        .from(navbarItems)
                                        .where(eq(navbarItems.href, `/services?category=${cat.slug}&subcategory=${sub.slug}`), eq(navbarItems.parent_id, catNavId), eq(navbarItems.is_button, 0))
                                        .limit(1);
                                    if (!existingSub) {
                                        await db.insert(navbarItems).values({
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
                    } else {
                        // existing category nav found - still create any missing subcategories under it
                        const catNavId = existingChild.id;
                        if (catHasSub && catNavId) {
                            const subs = await db.select().from(serviceSubcategories).where(eq(serviceSubcategories.category_id, cat.id));
                            for (let si = 0; si < subs.length; si++) {
                                const sub = subs[si];
                                const [existingSub] = await db
                                    .select()
                                    .from(navbarItems)
                                    .where(eq(navbarItems.href, `/services?category=${cat.slug}&subcategory=${sub.slug}`), eq(navbarItems.parent_id, catNavId), eq(navbarItems.is_button, 0))
                                    .limit(1);
                                if (!existingSub) {
                                    await db.insert(navbarItems).values({
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
                }
            }
        }

        return NextResponse.json({ message: "Navbar items seeded successfully" });
    } catch (error) {
        console.error("Error seeding navbar items:", error);
        return NextResponse.json({ error: "Failed to seed navbar items" }, { status: 500 });
    }
}
