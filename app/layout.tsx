import type { Metadata, Viewport } from "next";
import { Syne, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import F1Loader from "@/components/ui/F1Loader";
import Background from "@/components/Background";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Dellano Samuel Fernandez | Systems Architect",
    template: "%s | Dellano Samuel Fernandez"
  },
  description: "Portfolio of Dellano Samuel Fernandez - Systems Architect specializing in High-Performance Computing, AI Kernels, and Scalable Web Infrastructure.",
  keywords: [
    "Dellano Samuel Fernandez", 
    "Systems Architect", 
    "Full Stack Developer", 
    "High-Performance Computing", 
    "AI Kernels", 
    "Next.js", 
    "React", 
    "Three.js", 
    "WebGL", 
    "Software Engineer", 
    "Chennai", 
    "India"
  ],
  authors: [{ name: "Dellano Samuel Fernandez", url: "https://dellano.dev" }],
  creator: "Dellano Samuel Fernandez",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dellano.dev",
    title: "Dellano Samuel Fernandez | Systems Architect",
    description: "Architecting performance. High-performance computing, AI kernels, and scalable web infrastructure.",
    siteName: "Dellano Samuel Fernandez",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: "Dellano Samuel Fernandez Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dellano Samuel Fernandez | Systems Architect",
    description: "Architecting performance. High-performance computing, AI kernels, and scalable web infrastructure.",
    images: ["/og-image.png"],
    creator: "@dellano_dev", // Update with actual handle if available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${syne.variable} ${interTight.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="bg-void text-secondary antialiased selection:bg-neon/20 overflow-x-hidden">
        <F1Loader />
        <ScrollProgress />
        <Background />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
