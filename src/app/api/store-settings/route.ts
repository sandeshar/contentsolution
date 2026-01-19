import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import { StoreSettings, FooterSection, FooterLink } from '@/models/StoreSettings';

// Map camelCase payload to snake_case DB columns (kept snake_case for Mongoose simple migration)
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
        theme: payload.theme ?? 'default',
        hide_site_name: payload.hideSiteName ? 1 : 0,
        hide_site_name_on_mobile: payload.hideSiteNameOnMobile ? 1 : 0,
    };
}

// Map Mongoose doc to camelCase API shape
function fromDb(row: any) {
    if (!row) return null;
    return {
        id: row._id,
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
        theme: row.theme,
        hideSiteName: !!row.hide_site_name,
        hideSiteNameOnMobile: !!row.hide_site_name_on_mobile,
        updatedAt: row.updatedAt,
    };
}

export async function GET() {
    try {
        await dbConnect();
        const row = await StoreSettings.findOne({}).lean();
        const data = row ? fromDb(row) : null;

        // Load footer sections + links if we have a store row
        if (data && row?._id) {
            const secs = await FooterSection.find({ store_id: row._id }).sort({ order: 1 }).lean();
            const sections: any[] = [];
            for (const s of secs) {
                const links = await FooterLink.find({ section_id: s._id }).sort({ order: 1 }).lean();
                sections.push({
                    id: s._id,
                    title: s.title,
                    order: s.order,
                    links: links.map((l: any) => ({ id: l._id, label: l.label, href: l.href, isExternal: !!l.is_external, order: l.order })),
                });
            }
            (data as any).footerSections = sections;
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('GET /api/store-settings error', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch store settings' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const update = toDb(body);

        // Read current row (single row table semantics)
        let row = await StoreSettings.findOne({});

        if (!row) {
            row = await StoreSettings.create(update);
        } else {
            await StoreSettings.findByIdAndUpdate(row._id, update);
        }

        const id = row._id;

        // If footer sections were provided in the payload, replace existing sections/links
        if (body.footerSections && Array.isArray(body.footerSections)) {
            // Delete existing sections + links for this store
            const existing = await FooterSection.find({ store_id: id });
            for (const ex of existing) {
                await FooterLink.deleteMany({ section_id: ex._id });
                await FooterSection.findByIdAndDelete(ex._id);
            }

            // Insert new sections and links
            for (const [sIdx, sec] of body.footerSections.entries()) {
                const newSec = await FooterSection.create({
                    store_id: id,
                    title: sec.title || '',
                    order: sec.order ?? sIdx
                });
                const newSecId = newSec._id;
                if (sec.links && Array.isArray(sec.links)) {
                    for (const [lIdx, ln] of sec.links.entries()) {
                        await FooterLink.create({
                            section_id: newSecId,
                            label: ln.label || '',
                            href: ln.href || '#',
                            is_external: ln.isExternal ? 1 : 0,
                            order: ln.order ?? lIdx,
                        });
                    }
                }
            }
        }

        const updated = await StoreSettings.findById(id).lean();
        try { revalidateTag('store-settings'); } catch (e) { /* ignore */ }

        // Re-fetch footer sections so response includes them
        const data = fromDb(updated);
        if (data) {
            const secs = await FooterSection.find({ store_id: id }).sort({ order: 1 }).lean();
            const sections: any[] = [];
            for (const s of secs) {
                const links = await FooterLink.find({ section_id: s._id }).sort({ order: 1 }).lean();
                sections.push({
                    id: s._id,
                    title: s.title,
                    order: s.order,
                    links: links.map((l: any) => ({
                        id: l._id,
                        label: l.label,
                        href: l.href,
                        isExternal: !!l.is_external,
                        order: l.order
                    }))
                });
            }
            (data as any).footerSections = sections;
        }

        return NextResponse.json({ success: true, message: 'Store settings updated', data });
    } catch (error) {
        console.error('PUT /api/store-settings error', error);
        return NextResponse.json({ success: false, error: 'Failed to save store settings' }, { status: 500 });
    }
}
