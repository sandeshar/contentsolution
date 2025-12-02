import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { db } from "@/db";
import { storeSettings } from "@/db/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const rows = await db.select().from(storeSettings).limit(1);
    const s = rows[0];
    if (!s) {
      return {
        title: "Content Store",
        description: "Powered by ContentSolution",
        robots: "index, follow",
      };
    }

    const title = s.meta_title || s.store_name || "Content Store";
    const description = s.meta_description || s.store_description || "";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    return {
      title,
      description,
      keywords: s.meta_keywords || "",
      robots: "index, follow",
      creator: s.store_name,
      publisher: s.store_name,
      icons: s.favicon ? { icon: s.favicon } : undefined,
      openGraph: {
        type: "website",
        locale: "en_US",
        url: baseUrl,
        siteName: s.store_name,
        title,
        description,
        images: s.store_logo ? [{ url: s.store_logo, alt: s.store_name }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: s.store_logo ? [s.store_logo] : [],
      },
      alternates: {
        canonical: baseUrl,
      },
    };
  } catch {
    return {
      title: "Content Store",
      description: "",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rows = await db.select().from(storeSettings).limit(1);
  const s = rows[0];

  // JSON-LD structured data for Organization
  const jsonLd = s ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": s.store_name,
    "description": s.store_description,
    "url": process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    "logo": s.store_logo || undefined,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": s.contact_email,
      "telephone": s.contact_phone,
      "contactType": "customer service"
    },
    "address": s.address ? {
      "@type": "PostalAddress",
      "addressLocality": s.address
    } : undefined,
    "sameAs": [
      s.facebook,
      s.twitter,
      s.instagram,
      s.linkedin
    ].filter(Boolean)
  } : null;

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        {s?.favicon ? (<link rel="icon" href={s.favicon} />) : null}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-display antialiased`}>
        {children}
      </body>
    </html>
  );
}
