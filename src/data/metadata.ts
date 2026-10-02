import type { Metadata } from "next";
import { brand, siteIdentity } from "@/data/site";
import { sitePath } from "@/data/paths";

export function pageMetadata(title: string, description: string): Metadata {
  const fullTitle = `${title} | ${brand.name}`;
  const shareImage = siteIdentity.siteUrl
    ? new URL(sitePath(brand.shareImage), siteIdentity.siteUrl).toString()
    : undefined;

  return {
    title: fullTitle,
    description,
    openGraph: { title: fullTitle, description, type: "website", images: shareImage ? [shareImage] : undefined },
    twitter: { card: shareImage ? "summary_large_image" : "summary", title: fullTitle, description, images: shareImage ? [shareImage] : undefined },
  };
}
