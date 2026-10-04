import type { Metadata } from "next";
import { pageMetadata } from "@/data/metadata";
import { brand } from "@/data/site";
import { InquiryProvider } from "@/components/inquiry-draft";
import "./globals.css";
import "@/components/inquiry.css";

export const metadata: Metadata = {
  ...pageMetadata("Fruit & Botanical Ingredients for Your Business", `Explore frozen berries, dried fruits, floral ingredients, tea blends and private label project directions with ${brand.businessName}.`),
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><InquiryProvider>{children}</InquiryProvider></body>
    </html>
  );
}
