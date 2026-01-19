import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from '@/utils/authHelper';

export async function POST() {
    try {
        await dbConnect();

        // Only seed a Super Admin if no users exist
        const count = await User.countDocuments();
        if (count === 0) {
            await User.create({
                name: 'Super Admin',
                email: 'admin@contentsolution.np',
                password: await hashPassword('password123'),
                role: 'superadmin',
            });

            return NextResponse.json(
                {
                    success: true,
                    message: 'Users seeded successfully',
                },
                { status: 201 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Users already exist, not modified',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error seeding users:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to seed users',
            },
            { status: 500 }
        );
    }
}
