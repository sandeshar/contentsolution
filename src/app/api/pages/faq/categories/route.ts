import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { FAQCategory } from '@/models/FAQPage';
import { revalidateTag } from 'next/cache';

// GET - List all categories
export async function GET() {
    try {
        await dbConnect();
        
        // Find all categories, sorted by display_order
        const categories = await FAQCategory.find().sort({ display_order: 1 });
        
        // Convert to the format expected by the frontend (with numeric IDs)
        const formattedCategories = categories.map((cat: any) => ({
            id: cat._id.toString(),
            name: cat.name,
            display_order: cat.display_order,
            is_active: cat.is_active,
            createdAt: cat.createdAt,
            updatedAt: cat.updatedAt
        }));

        return NextResponse.json(formattedCategories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

// POST - Create category
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { name, display_order, is_active } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const newCategory = await FAQCategory.create({
            name,
            display_order: display_order || 0,
            is_active: is_active !== undefined ? is_active : 1,
        });

        revalidateTag('faq');

        return NextResponse.json(
            { success: true, message: 'Category created successfully', id: newCategory._id.toString() },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating category:', error);
        
        if (error.code === 11000) {
            return NextResponse.json({ error: 'A category with this name already exists' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}

// PUT - Update category
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, name, display_order, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (display_order !== undefined) updateData.display_order = display_order;
        if (is_active !== undefined) updateData.is_active = is_active;

        const updatedCategory = await FAQCategory.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedCategory) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        revalidateTag('faq');

        return NextResponse.json({ success: true, message: 'Category updated successfully' });
    } catch (error: any) {
        console.error('Error updating category:', error);

        if (error.code === 11000) {
            return NextResponse.json({ error: 'A category with this name already exists' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

// DELETE - Delete category
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const result = await FAQCategory.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        revalidateTag('faq');

        return NextResponse.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
