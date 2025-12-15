import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/app/components/SmoothScroll";
import CookieConsent from "@/app/components/layout/CookieConsent";

const ebGaramond = localFont({
  src: "./fonts/EBGaramond-VariableFont.ttf",
  variable: "--font-garamond",
  display: "swap",
});

const lato = localFont({
  src: [
    {
      path: "./fonts/Lato-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Lato-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Lato-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-lato",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0f1110",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://thundervoyage.com'),

  title: {
    default: "ThunderVoyage | Luxury Nature Hotel & Resort",
    template: "%s | ThunderVoyage",
  },
  
  description: "Experience the solitude of the Canadian wilderness. ThunderVoyage offers exclusive cinematic expeditions, deep work retreats, and private luxury accommodations in Canmore, Alberta.",
  
  keywords: [
    "Luxury Hotel Canmore", 
    "Banff Luxury Resort", 
    "Deep Work Retreat", 
    "Biohacking Hotel", 
    "Canadian Wilderness Expeditions", 
    "Private Nature Retreat",
    "Digital Detox Canada"
  ],

  authors: [{ name: "ThunderVoyage Team", url: "https://thundervoyage.com" }],
  creator: "ThunderVoyage",
  publisher: "ThunderVoyage Inc.",
  
  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: "ThunderVoyage | Solitude is the New Luxury",
    description: "Embark on a cinematic journey in the Canadian wilderness. A sanctuary for deep work and biological optimization.",
    url: "https://thundervoyage.com",
    siteName: "ThunderVoyage",
    images: [
      {
        url: "/images/hero/hero4.webp",
        width: 1920,
        height: 1080,
        alt: "ThunderVoyage Base Camp in Canmore",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: 'summary_large_image',
    title: "ThunderVoyage | Luxury Nature Resort",
    description: "Solitude is the new luxury. Discover our expeditions in Canmore, AB.",
    images: ['/images/hero/hero4.webp'],
    creator: "@thundervoyage", 
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", 
  },

  manifest: "/site.webmanifest", 

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Resort", 
  "name": "ThunderVoyage",
  "image": [
    "https://thundervoyage.com/images/hero/hero4.webp",
    "https://thundervoyage.com/images/hero/hero1.webp"
  ],
  "description": "A sanctuary for deep work and biological optimization in the heart of the Canadian wilderness.",
  "url": "https://thundervoyage.com",
  "telephone": "+14036092292",
  "email": "book@thundervoyage.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "306 Bow Valley Trail, Unit 201B",
    "addressLocality": "Canmore",
    "addressRegion": "AB",
    "postalCode": "T1W 0N2",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.089, 
    "longitude": -115.359
  },
  "priceRange": "$$$$",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Starlink WiFi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Nordic Spa", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Private Chef", "value": true }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
     
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      {/* --- Google tag (gtag.js) --- */}
       
      <meta name="google-site-verification" content="gytb-g1pmVNPzp1qaO5u7fsTh0Lsyx4okJ4QfFwlcEY" />


      </head>
      <body
        className={`
          ${lato.variable} 
          ${ebGaramond.variable} 
          antialiased 
          bg-ivory 
          text-forest
          selection:bg-terra selection:text-white
        `}
      >
        <SmoothScroll />
        
        {children}

        <CookieConsent />
      </body>
    </html>
  );
}

