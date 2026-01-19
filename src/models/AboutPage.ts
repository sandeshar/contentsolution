import mongoose, { Schema } from 'mongoose';

const AboutPageHeroSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    button1_text: { type: String, required: true },
    button1_link: { type: String, required: true },
    button2_text: { type: String, required: true },
    button2_link: { type: String, required: true },
    hero_image: { type: String, required: true },
    hero_image_alt: { type: String, required: true },
    badge_text: { type: String, default: '' },
    highlight_text: { type: String, default: '' },
    float_top_enabled: { type: Number, default: 1 },
    float_top_icon: { type: String, default: 'trending_up' },
    float_top_title: { type: String, default: 'Traffic Growth' },
    float_top_value: { type: String, default: '+145%' },
    float_bottom_enabled: { type: Number, default: 1 },
    float_bottom_icon: { type: String, default: 'article' },
    float_bottom_title: { type: String, default: 'Content Pieces' },
    float_bottom_value: { type: String, default: '5k+' },
    rating_text: { type: String, default: '' },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const AboutPageHero = mongoose.models.AboutPageHero || mongoose.model('AboutPageHero', AboutPageHeroSchema);

const AboutPageJourneySchema = new Schema({
    title: { type: String, required: true },
    paragraph1: { type: String, required: true },
    paragraph2: { type: String, required: true },
    thinking_box_title: { type: String, required: true },
    thinking_box_content: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const AboutPageJourney = mongoose.models.AboutPageJourney || mongoose.model('AboutPageJourney', AboutPageJourneySchema);

const AboutPageStatSchema = new Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    display_order: { type: Number, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const AboutPageStat = mongoose.models.AboutPageStat || mongoose.model('AboutPageStat', AboutPageStatSchema);

const AboutPageFeatureSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    display_order: { type: Number, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const AboutPageFeature = mongoose.models.AboutPageFeature || mongoose.model('AboutPageFeature', AboutPageFeatureSchema);

const AboutPagePhilosophySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const AboutPagePhilosophy = mongoose.models.AboutPagePhilosophy || mongoose.model('AboutPagePhilosophy', AboutPagePhilosophySchema);

const AboutPagePrincipleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    display_order: { type: Number, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const AboutPagePrinciple = mongoose.models.AboutPagePrinciple || mongoose.model('AboutPagePrinciple', AboutPagePrincipleSchema);

const AboutPageTeamSectionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const AboutPageTeamSection = mongoose.models.AboutPageTeamSection || mongoose.model('AboutPageTeamSection', AboutPageTeamSectionSchema);

const AboutPageTeamMemberSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    image_alt: { type: String, required: true },
    display_order: { type: Number, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const AboutPageTeamMember = mongoose.models.AboutPageTeamMember || mongoose.model('AboutPageTeamMember', AboutPageTeamMemberSchema);

const AboutPageCTASchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    primary_button_text: { type: String, required: true },
    primary_button_link: { type: String, required: true },
    secondary_button_text: { type: String, required: true },
    secondary_button_link: { type: String, required: true },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export const AboutPageCTA = mongoose.models.AboutPageCTA || mongoose.model('AboutPageCTA', AboutPageCTASchema);
