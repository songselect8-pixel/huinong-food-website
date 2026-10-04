// Server-only filesystem content. Never import guide bodies into a client component.
import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Guide, GuideSummary } from "./guide-types";

export const localGuidePreview = process.env.CONTENT_PREVIEW === "local";
if (localGuidePreview && process.env.CI) throw new Error("Local editorial previews cannot be built in CI.");

export function getGuides(): Guide[] {
  const directory = path.join(process.cwd(), "content/guides");
  return fs.readdirSync(directory).filter(file => file.endsWith(".json")).sort().flatMap(file => {
    const guide = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8")) as Guide;
    const published = guide.status === "published" && guide.reviewStatus === "approved" && guide.publishedAt && guide.publicationAuthorization;
    return localGuidePreview || published ? [guide] : [];
  });
}
export function guideSummary({sections, references, pending, lead, inquiryTemplate, ...summary}: Guide): GuideSummary {
  void sections; void references; void pending; void lead; void inquiryTemplate;
  return summary;
}
