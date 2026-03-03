import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
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
  metadataBase: new URL("https://kellysmith.com"),
  title: "Kelly Smith",
  description:
    "Entrepreneur, product leader, and technologist based in Boise, Idaho.",
  openGraph: {
    title: "Kelly Smith",
    description:
      "Entrepreneur, product leader, and technologist based in Boise, Idaho.",
    url: "https://kellysmith.com",
    siteName: "Kelly Smith",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelly Smith",
    description:
      "Entrepreneur, product leader, and technologist based in Boise, Idaho.",
  },
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
        {children}
      </body>
    </html>
  );
}
