import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Huinong Food | Dried Fruits & Herbal Teas for Your Business",
  description: "Explore dried fruit slices, frozen berry ingredients, botanicals and tea directions with Jiaxing Huinong Food Co., Ltd. Share a sourcing brief in our website preview.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
