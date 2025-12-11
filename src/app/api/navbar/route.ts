import { NextResponse } from "next/server";
import { db } from "@/db";
import { navbarItems } from "@/db/navbarSchema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
    try {
        const items = await db.select().from(navbarItems).orderBy(asc(navbarItems.order));
        return NextResponse.json(items);
    } catch (error) {
        console.error("Error fetching navbar items:", error);
        return NextResponse.json({ error: "Failed to fetch navbar items" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { label, href, order, parent_id, is_button, is_active } = body;

        if (!label || !href) {
            return NextResponse.json({ error: "Label and href are required" }, { status: 400 });
        }

        const result = await db.insert(navbarItems).values({
            label,
            href,
            order: order || 0,
            parent_id: parent_id || null,
            is_button: is_button || 0,
            is_active: is_active !== undefined ? is_active : 1,
        });

        return NextResponse.json({ id: result[0].insertId, message: "Navbar item created successfully" });
    } catch (error) {
        console.error("Error creating navbar item:", error);
        return NextResponse.json({ error: "Failed to create navbar item" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, label, href, order, parent_id, is_button, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await db.update(navbarItems)
            .set({
                label,
                href,
                order,
                parent_id: parent_id || null,
                is_button,
                is_active,
                updated_at: new Date(),
            })
            .where(eq(navbarItems.id, id));

        return NextResponse.json({ message: "Navbar item updated successfully" });
    } catch (error) {
        console.error("Error updating navbar item:", error);
        return NextResponse.json({ error: "Failed to update navbar item" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await db.delete(navbarItems).where(eq(navbarItems.id, id));
        return NextResponse.json({ message: "Navbar item deleted successfully" });
    } catch (error) {
        console.error("Error deleting navbar item:", error);
        return NextResponse.json({ error: "Failed to delete navbar item" }, { status: 500 });
    }
}
