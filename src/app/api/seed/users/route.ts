import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { hashPassword } from '@/utils/authHelper';

export async function POST() {
    try {
        // Clear existing users
        await db.delete(users);

        // Seed Super Admin
        await db.insert(users).values({
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
