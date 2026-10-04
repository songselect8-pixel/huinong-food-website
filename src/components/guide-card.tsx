import SiteLink from "./site-link";
import { guideImage, type GuideSummary } from "@/data/guide-types";
import { sitePath } from "@/data/paths";

export function GuideCard({guide}: {guide: GuideSummary}) {
  const href = `/resources/${guide.slug}`;
  return <article className="guide-card">
    <SiteLink className="guide-card-image" href={href} aria-label={`Read Guide: ${guide.title}`}><img src={sitePath(guideImage(guide.slug,"cover"))} alt={guide.coverAlt} width={1672} height={941} loading="lazy" /><span>Illustrative Concept</span></SiteLink>
    <div className="guide-card-copy"><span className="mini-label">{guide.category}</span><h2><SiteLink href={href}>{guide.title}</SiteLink></h2><p>{guide.summary}</p><div className="guide-card-bottom">{guide.status === "draft" && <span className="guide-draft">Draft · for review</span>}<SiteLink className="text-link" href={href}>Read Guide <span aria-hidden="true">↗</span></SiteLink></div></div>
  </article>;
}
