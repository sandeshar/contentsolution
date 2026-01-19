import mongoose, { Schema } from 'mongoose';

const ContactPageHeroSchema = new Schema({
    tagline: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const ContactPageHero = mongoose.models.ContactPageHero || mongoose.model('ContactPageHero', ContactPageHeroSchema);

const ContactPageInfoSchema = new Schema({
    office_location: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    map_url: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const ContactPageInfo = mongoose.models.ContactPageInfo || mongoose.model('ContactPageInfo', ContactPageInfoSchema);

const ContactPageFormConfigSchema = new Schema({
    name_placeholder: { type: String, required: true },
    email_placeholder: { type: String, required: true },
    phone_placeholder: { type: String },
    subject_placeholder: { type: String, required: true },
    service_placeholder: { type: String, required: true },
    message_placeholder: { type: String, required: true },
    submit_button_text: { type: String, required: true },
    success_message: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const ContactPageFormConfig = mongoose.models.ContactPageFormConfig || mongoose.model('ContactPageFormConfig', ContactPageFormConfigSchema);

const ContactFormSubmissionSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    service: { type: String },
    message: { type: String, required: true },
    status: { type: String, default: 'new', required: true },
}, { timestamps: true });

export const ContactFormSubmission = mongoose.models.ContactFormSubmission || mongoose.model('ContactFormSubmission', ContactFormSubmissionSchema);
