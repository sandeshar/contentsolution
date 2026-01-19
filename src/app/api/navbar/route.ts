import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import NavbarItem from "@/models/Navbar";

export async function GET() {
    try {
        await dbConnect();
        const items = await NavbarItem.find({}).sort({ order: 1 }).lean();
        const formattedItems = items.map((item: any) => ({
            ...item,
            id: item._id,
        }));
        return NextResponse.json(formattedItems);
    } catch (error) {
        console.error("Error fetching navbar items:", error);
        return NextResponse.json({ error: "Failed to fetch navbar items" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { label, href, order, parent_id, is_button, is_active, is_dropdown } = body;

        if (!label || !href) {
            return NextResponse.json({ error: "Label and href are required" }, { status: 400 });
        }

        // Check for duplicate by href and parent_id to avoid duplicate creation
        const existing = await NavbarItem.findOne({
            href,
            parent_id: parent_id || null,
            is_button: is_button || 0
        });

        if (existing) {
            return NextResponse.json({ id: existing._id, message: "Navbar item already exists", existing: true }, { status: 200 });
        }

        try {
            const newItem = await NavbarItem.create({
                label,
                href,
                order: order || 0,
                parent_id: parent_id || null,
                is_button: is_button || 0,
                is_active: is_active !== undefined ? is_active : 1,
                is_dropdown: is_dropdown || 0,
            });
            return NextResponse.json({ id: newItem._id, message: "Navbar item created successfully" }, { status: 201 });
        } catch (err: any) {
            if (err.code === 11000) {
                return NextResponse.json({ error: 'Duplicate navbar item', details: String(err?.message || err) }, { status: 409 });
            }
            throw err;
        }
    } catch (error) {
        console.error("Error creating navbar item:", error);
        return NextResponse.json({ error: "Failed to create navbar item" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, label, href, order, parent_id, is_button, is_active, is_dropdown } = body;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await NavbarItem.findByIdAndUpdate(id, {
            label,
            href,
            order,
            parent_id: parent_id || null,
            is_button,
            is_active,
            is_dropdown,
        });

        return NextResponse.json({ message: "Navbar item updated successfully" });
    } catch (error) {
        console.error("Error updating navbar item:", error);
        return NextResponse.json({ error: "Failed to update navbar item" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await NavbarItem.findByIdAndDelete(id);

        return NextResponse.json({ message: "Navbar item deleted successfully" });
    } catch (error) {
        console.error("Error deleting navbar item:", error);
        return NextResponse.json({ error: "Failed to delete navbar item" }, { status: 500 });
    }
}
