import { verifyJWT } from "@/utils/authHelper";
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const cookie = request.cookies.get('admin_auth')?.value || '';

    if (!cookie) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const verified = verifyJWT(cookie);

    if (!verified) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow the request to proceed if authenticated
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/admin'],
};
