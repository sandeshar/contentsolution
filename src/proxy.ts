import { returnRole } from "@/utils/authHelper";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const cookie = request.cookies.get('admin_auth')?.value || '';
    const role = returnRole(cookie);
    if (pathname.startsWith('/admin') && !cookie && !role) {

        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow public contact form submissions
    if (pathname.startsWith('/api/pages/contact/submissions') && request.method === 'POST') {
        return NextResponse.next();
    }

    // Allow seed operations if no users exist (initial setup)
    if (pathname.startsWith('/api/seed')) {
        try {
            const userCount = await db.select().from(users).limit(1);
            const hasUsers = userCount.length > 0;

            if (hasUsers && role !== 'superadmin') {
                return NextResponse.json(
                    { error: 'Forbidden: Only superadmins can seed data' },
                    { status: 403 }
                );
            }
        } catch (error) {
            // If database check fails, allow it to proceed (might be initial setup)
        }
        return NextResponse.next();
    }

    if (pathname.startsWith('/api') && (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE')) {
        if (!role) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            );
        }
    }
    if ((pathname.startsWith('/api/users') || pathname.startsWith('/api/store-setting') || pathname.startsWith('/api/pages') || pathname.startsWith('/api/seed')) && role !== 'superadmin' && request.method !== 'GET') {
        return NextResponse.json(
            { error: 'Forbidden: Insufficient permissions' },
            { status: 403 }
        );
    }

    return NextResponse.next();
}