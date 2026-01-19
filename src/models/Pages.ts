import mongoose, { Schema } from 'mongoose';

const TermsPageHeaderSchema = new Schema({
    title: { type: String, required: true },
    last_updated: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const TermsPageHeader = mongoose.models.TermsPageHeader || mongoose.model('TermsPageHeader', TermsPageHeaderSchema);

const TermsPageSectionSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    has_email: { type: Number, default: 0 },
    display_order: { type: Number, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const TermsPageSection = mongoose.models.TermsPageSection || mongoose.model('TermsPageSection', TermsPageSectionSchema);

const BlogPageHeroSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    background_image: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const BlogPageHero = mongoose.models.BlogPageHero || mongoose.model('BlogPageHero', BlogPageHeroSchema);

const BlogPageCTASchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    button_text: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const BlogPageCTA = mongoose.models.BlogPageCTA || mongoose.model('BlogPageCTA', BlogPageCTASchema);
