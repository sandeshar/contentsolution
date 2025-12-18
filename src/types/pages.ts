export interface ContactHeroData {
    tagline: string;
    title: string;
    description: string;
}

export interface ContactInfoData {
    office_location: string;
    phone: string;
    email: string;
    map_url: string;
}

export interface ContactFormConfigData {
    name_placeholder: string;
    email_placeholder: string;
    phone_placeholder?: string;
    subject_placeholder: string;
    service_placeholder?: string;
    message_placeholder: string;
    submit_button_text: string;
    success_message: string;
}

// Terms page types
export interface TermsHeaderData {
    title: string;
    last_updated: string;
}

export interface TermsSectionData {
    id: number;
    title: string;
    content: string;
    has_email: number;
    has_link: number;
}

// FAQ page types
export interface FAQHeaderData {
    title: string;
    description: string;
    search_placeholder: string;
}

export interface FAQCategory {
    id: number;
    name: string;
}

export interface FAQItem {
    id: number;
    category_id: number;
    question: string;
    answer: string;
}

export interface FAQCTAData {
    title: string;
    description: string;
    button_text: string;
    button_link: string;
}

// Service page types
export type ServiceRecord = {
    id?: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    thumbnail?: string | null;
    icon?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    price?: string | null;
    currency?: string | null;
    price_type?: string | null;
    price_label?: string | null;
    price_description?: string | null;
};

export type ServiceDetail = {
    title: string;
    bullets: string;
};

export type ServicePostPageProps = {
    params: Promise<{ slug: string }>;
};

// Blog post page types
export interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}
