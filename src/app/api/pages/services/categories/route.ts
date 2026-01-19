import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { ServiceCategory } from "@/models/Services";

export async function GET() {
    try {
        await dbConnect();
        const categories = await ServiceCategory.find().sort({ display_order: 1 }).lean();
        return NextResponse.json(categories.map((c: any) => ({ ...c, id: c._id })));
    } catch (error) {
        console.error("Error fetching service categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { name, slug, description, icon } = body;

        if (!name || !slug) {
            return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
        }

        const result = await ServiceCategory.create({
            name,
            slug,
            description: description || null,
            icon: icon || null,
        });

        return NextResponse.json({ id: result._id, message: "Category created successfully" });
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, name, slug, description, icon } = body;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await ServiceCategory.findByIdAndUpdate(id, {
            name,
            slug,
            description: description || null,
            icon: icon || null,
        });

        return NextResponse.json({ message: "Category updated successfully" });
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
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

        await ServiceCategory.findByIdAndDelete(id);
        return NextResponse.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
