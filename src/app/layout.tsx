import type { Metadata } from "next";
import { pageMetadata } from "@/data/metadata";
import { brand } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  ...pageMetadata("Fruit & Botanical Ingredients for Your Business", `Explore frozen berries, dried fruits, floral ingredients, tea blends and private label project directions with ${brand.businessName}.`),
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
