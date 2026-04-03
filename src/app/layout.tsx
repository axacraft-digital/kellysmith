import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { buildMetadata } from "@/lib/metadata";
import { buildWebSiteSchema, buildPersonSchema } from "@/lib/seo-schema";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Kelly Smith",
    description:
      "Entrepreneur, product leader, and technologist based in Boise, Idaho.",
    path: "/",
  }),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} antialiased`}
      >
        <JsonLd data={[buildWebSiteSchema(), buildPersonSchema()]} />
        {children}
      </body>
    </html>
  );
}
