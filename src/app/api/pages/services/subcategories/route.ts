import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { ServiceSubcategory } from "@/models/Services";

export async function GET() {
    try {
        await dbConnect();
        const subcategories = await ServiceSubcategory.find().sort({ display_order: 1 }).lean();
        return NextResponse.json(subcategories.map((s: any) => ({ ...s, id: s._id })));
    } catch (error) {
        console.error("Error fetching service subcategories:", error);
        return NextResponse.json({ error: "Failed to fetch subcategories" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { category_id, name, slug, description } = body;

        if (!category_id || !name || !slug) {
            return NextResponse.json({ error: "Category ID, name, and slug are required" }, { status: 400 });
        }

        const result = await ServiceSubcategory.create({
            category_id,
            name,
            slug,
            description: description || null,
        });

        return NextResponse.json({ id: result._id, message: "Subcategory created successfully" });
    } catch (error) {
        console.error("Error creating subcategory:", error);
        return NextResponse.json({ error: "Failed to create subcategory" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, category_id, name, slug, description } = body;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await ServiceSubcategory.findByIdAndUpdate(id, {
            category_id,
            name,
            slug,
            description: description || null,
        });

        return NextResponse.json({ message: "Subcategory updated successfully" });
    } catch (error) {
        console.error("Error updating subcategory:", error);
        return NextResponse.json({ error: "Failed to update subcategory" }, { status: 500 });
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

        await ServiceSubcategory.findByIdAndDelete(id);
        return NextResponse.json({ message: "Subcategory deleted successfully" });
    } catch (error) {
        console.error("Error deleting subcategory:", error);
        return NextResponse.json({ error: "Failed to delete subcategory" }, { status: 500 });
    }
}
