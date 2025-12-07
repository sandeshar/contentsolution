import { returnRole, verifyJWT } from "@/utils/authHelper";
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const cookie = request.cookies.get('admin_auth')?.value || '';
    const role = returnRole(cookie);
    if (pathname.startsWith('/admin') && !cookie && !role) {

        return NextResponse.redirect(new URL('/login', request.url));
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