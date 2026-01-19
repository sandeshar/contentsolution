import mongoose, { Schema, Document } from 'mongoose';

const HomepageHeroSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    cta_text: { type: String, required: true },
    cta_link: { type: String, required: true },
    background_image: { type: String, required: true },
    hero_image_alt: { type: String, default: '' },
    badge_text: { type: String, default: '' },
    highlight_text: { type: String, default: '' },
    colored_word: { type: String, default: '' },
    float_top_enabled: { type: Number, default: 1 },
    float_top_icon: { type: String, default: 'trending_up' },
    float_top_title: { type: String, default: 'Growth' },
    float_top_value: { type: String, default: '+240% ROI' },
    float_bottom_enabled: { type: Number, default: 1 },
    float_bottom_icon: { type: String, default: 'check_circle' },
    float_bottom_title: { type: String, default: 'Ranking' },
    float_bottom_value: { type: String, default: '#1 Result' },
    secondary_cta_text: { type: String, default: '' },
    secondary_cta_link: { type: String, default: '' },
    rating_text: { type: String, default: '' },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const HomepageHero = mongoose.models.HomepageHero || mongoose.model('HomepageHero', HomepageHeroSchema);

const HomepageTrustLogoSchema = new Schema({
    alt_text: { type: String, required: true },
    logo_url: { type: String, required: true },
    dark_invert: { type: Number, default: 0 },
    display_order: { type: Number, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const HomepageTrustLogo = mongoose.models.HomepageTrustLogo || mongoose.model('HomepageTrustLogo', HomepageTrustLogoSchema);

const HomepageTrustSectionSchema = new Schema({
    heading: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const HomepageTrustSection = mongoose.models.HomepageTrustSection || mongoose.model('HomepageTrustSection', HomepageTrustSectionSchema);

const HomepageExpertiseSectionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const HomepageExpertiseSection = mongoose.models.HomepageExpertiseSection || mongoose.model('HomepageExpertiseSection', HomepageExpertiseSectionSchema);

const HomepageExpertiseItemSchema = new Schema({
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    display_order: { type: Number, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const HomepageExpertiseItem = mongoose.models.HomepageExpertiseItem || mongoose.model('HomepageExpertiseItem', HomepageExpertiseItemSchema);

const HomepageContactSectionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    name_placeholder: { type: String, required: true },
    email_placeholder: { type: String, required: true },
    phone_placeholder: { type: String },
    service_placeholder: { type: String, required: true },
    message_placeholder: { type: String, required: true },
    submit_button_text: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const HomepageContactSection = mongoose.models.HomepageContactSection || mongoose.model('HomepageContactSection', HomepageContactSectionSchema);
