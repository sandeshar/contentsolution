import mongoose, { Schema } from 'mongoose';

const ServiceCategorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    icon: { type: String },
    thumbnail: { type: String },
    display_order: { type: Number, default: 0 },
    is_active: { type: Number, default: 1 },
    meta_title: { type: String },
    meta_description: { type: String },
}, { timestamps: true });

export const ServiceCategory = mongoose.models.ServiceCategory || mongoose.model('ServiceCategory', ServiceCategorySchema);

const ServiceSubcategorySchema = new Schema({
    category_id: { type: Schema.Types.ObjectId, ref: 'ServiceCategory', required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    icon: { type: String },
    thumbnail: { type: String },
    display_order: { type: Number, default: 0 },
    is_active: { type: Number, default: 1 },
    meta_title: { type: String },
    meta_description: { type: String },
}, { timestamps: true });

export const ServiceSubcategory = mongoose.models.ServiceSubcategory || mongoose.model('ServiceSubcategory', ServiceSubcategorySchema);

const ServicePostSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String },
    icon: { type: String },
    featured: { type: Number, default: 0 },
    category_id: { type: Schema.Types.ObjectId, ref: 'ServiceCategory' },
    subcategory_id: { type: Schema.Types.ObjectId, ref: 'ServiceSubcategory' },
    price: { type: Number },
    price_type: { type: String, default: 'fixed' },
    price_label: { type: String },
    price_description: { type: String },
    currency: { type: String, default: 'USD' },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    statusId: { type: Schema.Types.ObjectId, ref: 'Status', required: true },
    meta_title: { type: String },
    meta_description: { type: String },
}, { timestamps: true });

export const ServicePost = mongoose.models.ServicePost || mongoose.model('ServicePost', ServicePostSchema);

const ServicePageHeroSchema = new Schema({
    tagline: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    badge_text: { type: String, default: '' },
    highlight_text: { type: String, default: '' },
    primary_cta_text: { type: String, default: '' },
    primary_cta_link: { type: String, default: '' },
    secondary_cta_text: { type: String, default: '' },
    secondary_cta_link: { type: String, default: '' },
    background_image: { type: String, default: '' },
    hero_image_alt: { type: String, default: '' },
    stat1_value: { type: String, default: '' },
    stat1_label: { type: String, default: '' },
    stat2_value: { type: String, default: '' },
    stat2_label: { type: String, default: '' },
    stat3_value: { type: String, default: '' },
    stat3_label: { type: String, default: '' },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const ServicePageHero = mongoose.models.ServicePageHero || mongoose.model('ServicePageHero', ServicePageHeroSchema);

const ServicePageDetailSchema = new Schema({
    key: { type: String, required: true, unique: true },
    slug: { type: String },
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    bullets: { type: String, required: true }, // JSON array stored as string or we can use [String]
    image: { type: String, required: true },
    image_alt: { type: String, required: true },
    display_order: { type: Number, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const ServicePageDetail = mongoose.models.ServicePageDetail || mongoose.model('ServicePageDetail', ServicePageDetailSchema);

const ServicePageProcessSectionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const ServicePageProcessSection = mongoose.models.ServicePageProcessSection || mongoose.model('ServicePageProcessSection', ServicePageProcessSectionSchema);

const ServicePageProcessStepSchema = new Schema({
    step_number: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    display_order: { type: Number, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const ServicePageProcessStep = mongoose.models.ServicePageProcessStep || mongoose.model('ServicePageProcessStep', ServicePageProcessStepSchema);

const ServicePageCTASchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    button_text: { type: String, required: true },
    button_link: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const ServicePageCTA = mongoose.models.ServicePageCTA || mongoose.model('ServicePageCTA', ServicePageCTASchema);
