import mongoose, { Schema } from 'mongoose';

const FAQPageHeaderSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    search_placeholder: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const FAQPageHeader = mongoose.models.FAQPageHeader || mongoose.model('FAQPageHeader', FAQPageHeaderSchema);

const FAQCategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    display_order: { type: Number, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const FAQCategory = mongoose.models.FAQCategory || mongoose.model('FAQCategory', FAQCategorySchema);

const FAQItemSchema = new Schema({
    category_id: { type: Schema.Types.ObjectId, ref: 'FAQCategory', required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    display_order: { type: Number, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const FAQItem = mongoose.models.FAQItem || mongoose.model('FAQItem', FAQItemSchema);

const FAQPageCTASchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    button_text: { type: String, required: true },
    button_link: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const FAQPageCTA = mongoose.models.FAQPageCTA || mongoose.model('FAQPageCTA', FAQPageCTASchema);
