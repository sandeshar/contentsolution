import mongoose, { Schema } from 'mongoose';

const ReviewTestimonialSchema = new Schema({
    url: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    service: { type: Schema.Types.ObjectId, ref: 'ServicePost' },
    link: { type: String, default: 'homepage' },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

export const ReviewTestimonial = mongoose.models.ReviewTestimonial || mongoose.model('ReviewTestimonial', ReviewTestimonialSchema);

const ReviewTestimonialServiceSchema = new Schema({
    testimonialId: { type: Schema.Types.ObjectId, ref: 'ReviewTestimonial', required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'ServicePost', required: true },
});

export const ReviewTestimonialService = mongoose.models.ReviewTestimonialService || mongoose.model('ReviewTestimonialService', ReviewTestimonialServiceSchema);
