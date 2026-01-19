import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/utils/authHelper";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const id = request.nextUrl.searchParams.get('id');
        if (id) {
            const user = await User.findById(id).lean();
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
            return NextResponse.json({ ...user, id: user._id });
        }

        const allUsers = await User.find().lean();
        return NextResponse.json(allUsers.map((u: any) => ({ ...u, id: u._id })));
    } catch (error) {
        console.error('GET /api/users error', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { name, email, password, role } = await request.json();
        if (!name || !email || !password || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ name, email, password: hashedPassword, role });

        return NextResponse.json({ success: true, id: newUser._id });
    } catch (error) {
        if ((error as any).code === 11000) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }
        console.error('POST /api/users error', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const { id, name, email, password, role } = await request.json();
        if (!id || !name || !email || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const updateData: any = { name, email, role };
        if (password && password.trim() !== '') {
            updateData.password = await hashPassword(password);
        }

        await User.findByIdAndUpdate(id, updateData);
        return NextResponse.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('PUT /api/users error', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const id = request.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        await User.findByIdAndDelete(id);
        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('DELETE /api/users error', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}