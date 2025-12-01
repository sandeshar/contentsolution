import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { storeSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Map camelCase payload to snake_case DB columns
function toDb(payload: any) {
    return {
        store_name: payload.storeName ?? '',
        store_description: payload.storeDescription ?? '',
        store_logo: payload.storeLogo ?? payload.logo ?? '',
        favicon: payload.favicon ?? '',
        contact_email: payload.contactEmail ?? '',
        contact_phone: payload.contactPhone ?? '',
        address: payload.address ?? '',
        facebook: payload.facebook ?? '',
        twitter: payload.twitter ?? '',
        instagram: payload.instagram ?? '',
        linkedin: payload.linkedin ?? '',
        meta_title: payload.metaTitle ?? '',
        meta_description: payload.metaDescription ?? '',
        meta_keywords: payload.metaKeywords ?? '',
        footer_text: payload.footerText ?? '',
    };
}

// Map DB row to camelCase API shape
function fromDb(row: any) {
    if (!row) return null;
    return {
        id: row.id,
        storeName: row.store_name,
        storeDescription: row.store_description,
        storeLogo: row.store_logo,
        favicon: row.favicon,
        contactEmail: row.contact_email,
        contactPhone: row.contact_phone,
        address: row.address,
        facebook: row.facebook,
        twitter: row.twitter,
        instagram: row.instagram,
        linkedin: row.linkedin,
        metaTitle: row.meta_title,
        metaDescription: row.meta_description,
        metaKeywords: row.meta_keywords,
        footerText: row.footer_text,
        updatedAt: row.updated_at,
    };
}

export async function GET() {
    try {
        const rows = await db.select().from(storeSettings).limit(1);
        const data = rows.length ? fromDb(rows[0]) : null;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('GET /api/store-settings error', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch store settings' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const update = toDb(body);

        // Read current row (single row table semantics)
        const rows = await db.select().from(storeSettings).limit(1);

        if (rows.length === 0) {
            const result: any = await db.insert(storeSettings).values(update);
            // MySQL2 drizzle returns insertId on result[0].insertId sometimes when not typed; try both
            const insertedId = Array.isArray(result) ? result[0]?.insertId : (result as any)?.insertId;
            const created = await db.select().from(storeSettings).limit(1);
            return NextResponse.json({ success: true, message: 'Store settings created', data: fromDb(created[0]), id: insertedId });
        }

        const id = rows[0].id;
        await db.update(storeSettings).set(update).where(eq(storeSettings.id, id));

        const updated = await db.select().from(storeSettings).where(eq(storeSettings.id, id)).limit(1);
        return NextResponse.json({ success: true, message: 'Store settings updated', data: fromDb(updated[0]) });
    } catch (error) {
        console.error('PUT /api/store-settings error', error);
        return NextResponse.json({ success: false, error: 'Failed to save store settings' }, { status: 500 });
    }
}
