import { NextRequest, NextResponse } from 'next/server';
import { eq, desc } from 'drizzle-orm';
import { db } from '@/db';
import { contactFormSubmissions } from '@/db/contactPageSchema';

// GET - Fetch form submissions
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        const status = searchParams.get('status');

        if (id) {
            const submission = await db.select().from(contactFormSubmissions).where(eq(contactFormSubmissions.id, parseInt(id))).limit(1);

            if (submission.length === 0) {
                return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
            }

            return NextResponse.json(submission[0]);
        }

        let submissions;

        if (status) {
            submissions = await db.select().from(contactFormSubmissions)
                .where(eq(contactFormSubmissions.status, status))
                .orderBy(desc(contactFormSubmissions.createdAt));
        } else {
            submissions = await db.select().from(contactFormSubmissions)
                .orderBy(desc(contactFormSubmissions.createdAt));
        }

        return NextResponse.json(submissions);
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
    }
}

// POST - Create form submission
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message, status = 'new' } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
        }

        const result = await db.insert(contactFormSubmissions).values({
            name,
            email,
            subject: subject || null,
            message,
            status,
        });

        return NextResponse.json(
            { success: true, message: 'Submission created successfully', id: result[0].insertId },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating submission:', error);
        return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
    }
}

// PUT - Update form submission (mainly for status updates)
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (status !== undefined) updateData.status = status;

        await db.update(contactFormSubmissions).set(updateData).where(eq(contactFormSubmissions.id, id));

        return NextResponse.json({ success: true, message: 'Submission updated successfully' });
    } catch (error) {
        console.error('Error updating submission:', error);
        return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
    }
}

// DELETE - Delete form submission
export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await db.delete(contactFormSubmissions).where(eq(contactFormSubmissions.id, parseInt(id)));

        return NextResponse.json({ success: true, message: 'Submission deleted successfully' });
    } catch (error) {
        console.error('Error deleting submission:', error);
        return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 });
    }
}
