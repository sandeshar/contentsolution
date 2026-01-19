import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import Status from "@/models/Status";

export async function POST() {
    try {
        await dbConnect();

        // Delete existing status entries
        await Status.deleteMany({});

        // Insert status values (use lowercase to match other lookups)
        await Status.insertMany([
            { name: 'draft' },
            { name: 'published' },
            { name: 'in-review' },
        ]);

        return NextResponse.json({
            success: true,
            message: 'Status collection seeded successfully'
        });
    } catch (error) {
        console.error('Error seeding status:', error);
        return NextResponse.json(
            { error: 'Failed to seed status collection' },
            { status: 500 }
        );
    }
}
