import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { AboutPageTeamMember } from '@/models/AboutPage';
import { revalidateTag } from 'next/cache';

// GET - Fetch team members
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            const member = await AboutPageTeamMember.findById(id).lean();

            if (!member) {
                return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
            }

            return NextResponse.json({ ...member, id: member._id });
        }

        const members = await AboutPageTeamMember.find({ is_active: 1 })
            .sort({ display_order: 1 })
            .lean();

        return NextResponse.json(members.map((m: any) => ({ ...m, id: m._id })));
    } catch (error) {
        console.error('Error fetching team members:', error);
        return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
    }
}

// POST - Create team member
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { name, role, description, image, image_alt, display_order, is_activeValue = 1 } = body;

        if (!name || !role || !description || !image || !image_alt || display_order === undefined) {
            return NextResponse.json(
                { error: 'Name, role, description, image, image_alt, and display_order are required' },
                { status: 400 }
            );
        }

        const result = await AboutPageTeamMember.create({
            name,
            role,
            description,
            image,
            image_alt,
            display_order,
            is_active: is_activeValue ? 1 : 0,
        });

        try { revalidateTag('about-team-members'); } catch (e) {}

        return NextResponse.json(
            { success: true, message: 'Team member created successfully', id: result._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating team member:', error);
        return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
    }
}

// PUT - Update team member
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, name, role, description, image, image_alt, display_order, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (role !== undefined) updateData.role = role;
        if (description !== undefined) updateData.description = description;
        if (image !== undefined) updateData.image = image;
        if (image_alt !== undefined) updateData.image_alt = image_alt;
        if (display_order !== undefined) updateData.display_order = display_order;
        if (is_active !== undefined) updateData.is_active = is_active ? 1 : 0;

        await AboutPageTeamMember.findByIdAndUpdate(id, updateData);

        try { revalidateTag('about-team-members'); } catch (e) {}

        return NextResponse.json({ success: true, message: 'Team member updated successfully' });
    } catch (error) {
        console.error('Error updating team member:', error);
        return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
    }
}

// DELETE - Delete team member
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await AboutPageTeamMember.findByIdAndDelete(id);

        try { revalidateTag('about-team-members'); } catch (e) {}

        return NextResponse.json({ success: true, message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Error deleting team member:', error);
        return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
    }
}
