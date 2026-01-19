import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { ReviewTestimonial, ReviewTestimonialService } from "@/models/Review";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const service = searchParams.get('service');
        const id = searchParams.get('id');
        const homepage = searchParams.get('homepage');
        const limitStr = searchParams.get('limit');
        const limitValue = limitStr ? parseInt(limitStr) : 0;

        if (homepage === '1' || homepage === 'true') {
            const response = await ReviewTestimonial.find().sort({ date: -1 }).limit(limitValue || 3).lean();
            return NextResponse.json(response.map((r: any) => ({ ...r, id: r._id })));
        }

        if (id) {
            const one = await ReviewTestimonial.findById(id).lean();
            if (!one) return NextResponse.json([]);
            const withServiceIds = await attachServiceIds([one]);
            return NextResponse.json(withServiceIds);
        }

        if (service && service !== '0') {
            const mappings = await ReviewTestimonialService.find({ serviceId: service }).lean();
            const testimonialIds = mappings.map((m: any) => m.testimonialId);

            const testimonials = await ReviewTestimonial.find({ _id: { $in: testimonialIds } })
                .sort({ date: -1 })
                .limit(limitValue || 10)
                .lean();

            const withServiceIds = await attachServiceIds(testimonials);
            return NextResponse.json(withServiceIds);
        }

        // Return all testimonials if no specific filter
        const all = await ReviewTestimonial.find().sort({ date: -1 }).lean();
        const withServiceIds = await attachServiceIds(all);
        return NextResponse.json(withServiceIds);
    } catch (error) {
        console.error('GET /api/testimonial error', error);
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { name, url, role, content, rating, serviceIds, link } = await request.json();

        // Basic validation
        if (!name || !url || !role || !content || !rating) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const testimonial = await ReviewTestimonial.create({
            name,
            url,
            role,
            content,
            rating: Number(rating),
            service: (Array.isArray(serviceIds) && serviceIds.length > 0) ? serviceIds[0] : null,
            link: link || 'homepage'
        });

        if (Array.isArray(serviceIds) && serviceIds.length > 0) {
            const cleanIds = serviceIds.filter(id => id && id !== '0');
            if (cleanIds.length > 0) {
                await ReviewTestimonialService.insertMany(
                    cleanIds.map((serviceId: string) => ({ testimonialId: testimonial._id, serviceId }))
                );
            }
        }

        return NextResponse.json({ success: true, id: testimonial._id });
    } catch (error) {
        console.error('POST /api/testimonial error', error);
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const { id, name, url, role, content, rating, serviceIds, link } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (name) updateData.name = name;
        if (url) updateData.url = url;
        if (role) updateData.role = role;
        if (content) updateData.content = content;
        if (rating) updateData.rating = Number(rating);
        if (link) updateData.link = link;
        if (Array.isArray(serviceIds) && serviceIds.length > 0) {
            updateData.service = serviceIds[0];
        }

        await ReviewTestimonial.findByIdAndUpdate(id, updateData);

        // Replace service mappings
        if (Array.isArray(serviceIds)) {
            await ReviewTestimonialService.deleteMany({ testimonialId: id });
            const cleanIds = serviceIds.filter(sid => sid && sid !== '0');
            if (cleanIds.length > 0) {
                await ReviewTestimonialService.insertMany(
                    cleanIds.map((serviceId: string) => ({ testimonialId: id, serviceId }))
                );
            }
        }

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('PUT /api/testimonial error', error);
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const token = request.cookies.get('admin_auth')?.value;
        const id = request.nextUrl.searchParams.get('id');

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await ReviewTestimonial.findByIdAndDelete(id);
        await ReviewTestimonialService.deleteMany({ testimonialId: id });

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('DELETE /api/testimonial error', error);
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}

async function attachServiceIds(testimonials: any[]) {
    if (!testimonials.length) return testimonials;
    const ids = testimonials.map((t) => t._id);
    const mappings = await ReviewTestimonialService.find({ testimonialId: { $in: ids } }).lean();

    const map = new Map<string, string[]>();
    mappings.forEach((m: any) => {
        const testimonialId = m.testimonialId.toString();
        const arr = map.get(testimonialId) ?? [];
        arr.push(m.serviceId.toString());
        map.set(testimonialId, arr);
    });

    return testimonials.map((t) => ({
        ...t,
        id: t._id,
        serviceIds: map.get(t._id.toString()) ?? []
    }));
}