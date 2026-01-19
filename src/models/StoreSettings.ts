import mongoose, { Schema } from 'mongoose';

const StoreSettingsSchema = new Schema({
    store_name: { type: String, required: true },
    store_description: { type: String, required: true },
    store_logo: { type: String, required: true },
    favicon: { type: String, required: true },
    contact_email: { type: String, required: true },
    contact_phone: { type: String, required: true },
    address: { type: String, required: true },
    facebook: { type: String, required: true },
    twitter: { type: String, required: true },
    instagram: { type: String, required: true },
    linkedin: { type: String, required: true },
    meta_title: { type: String, required: true },
    meta_description: { type: String, required: true },
    meta_keywords: { type: String, required: true },
    footer_text: { type: String, required: true },
    theme: { type: String, default: 'light' },
    hide_site_name: { type: Number, default: 0 },
    hide_site_name_on_mobile: { type: Number, default: 0 },
}, { timestamps: true });

export const StoreSettings = mongoose.models.StoreSettings || mongoose.model('StoreSettings', StoreSettingsSchema);

const FooterSectionSchema = new Schema({
    store_id: { type: Schema.Types.ObjectId, ref: 'StoreSettings' },
    title: { type: String, required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export const FooterSection = mongoose.models.FooterSection || mongoose.model('FooterSection', FooterSectionSchema);

const FooterLinkSchema = new Schema({
    section_id: { type: Schema.Types.ObjectId, ref: 'FooterSection', required: true },
    label: { type: String, required: true },
    href: { type: String, required: true },
    is_external: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export const FooterLink = mongoose.models.FooterLink || mongoose.model('FooterLink', FooterLinkSchema);
