import { NextResponse } from 'next/server';
import { db } from '@/db';
import {
    contactPageHero,
    contactPageInfo,
    contactPageFormConfig
} from '@/db/contactPageSchema';

export async function POST() {
    try {
        // Seed Hero Section
        await db.insert(contactPageHero).values({
            tagline: 'CONTACT US',
            title: "Let's Start a Conversation",
            description: "We're here to help you with your content needs. Reach out to us, and we'll get back to you as soon as possible.",
            is_active: 1,
        });

        // Seed Contact Info
        await db.insert(contactPageInfo).values({
            office_location: 'Kathmandu, Nepal',
            phone: '+977 9876543210',
            email: 'hello@contentsolution.np',
            map_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiFTLaRUOW5mjSaoIEkUFTyi4xKz9-qYf_QF1iCeo0qHrpZpgyOmVzH4MyUE8mqWN4-R186bFaehsXx3uw4VEssmzCZrk9lstEmusWqRoylYx4_vO1YCHJ5HruL8RvDpBQmbDLFZT8sHwcEfLMd90smmbFeIc4fjSmYdws0dScLUnl-G9V9YYmuUvDB3nESBrClJly_3F-3UMNmP_Ebnj_Fy_ere901i_xPLFP4XtnVT4jj0ZwX82UL-nYxu8oFpM4CHC9OXWttTk',
            map_image_alt: 'A map showing the location of the office in a city.',
            is_active: 1,
        });

        // Seed Form Configuration
        await db.insert(contactPageFormConfig).values({
            name_placeholder: 'Your Name',
            email_placeholder: 'Your Email',
            subject_placeholder: 'Subject',
            message_placeholder: 'Your Message',
            submit_button_text: 'Send Message',
            success_message: 'Thank you for contacting us! We will get back to you soon.',
            is_active: 1,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Contact page seeded successfully with default values',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error seeding contact page:', error);
        return NextResponse.json(
            {
                error: 'Failed to seed contact page',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
