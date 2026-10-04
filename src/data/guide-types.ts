export const guideCategories = ["Ingredient Guides", "Private Label & Packaging", "Sourcing & Documentation"] as const;
export type GuideCategory = typeof guideCategories[number];
export type GuideSummary = {
  slug: string; title: string; metaDescription: string; summary: string; category: GuideCategory;
  coverAlt: string; bodyAlt: string; status: "draft" | "published";
  reviewStatus: "pending" | "approved"; author: string | null; reviewer: string | null;
  createdAt: string; updatedAt: string; publishedAt: string | null; publicationAuthorization: string | null;
  relatedProducts: string[]; relatedGuides: string[];
};
export type Guide = GuideSummary & {
  lead: string;
  sections: {id: string; title: string; paragraphs: string[]; bullets?: string[]; table?: {headers: string[]; rows: string[][]}}[];
  references: {title: string; url: string; checkedAt: string; scope: string}[];
  pending: string[]; inquiryTemplate?: string;
};
export const guideImage = (slug: string, role: "cover" | "body") => `/guide-images/${slug}-${role}.webp`;
