import SiteLink from "@/components/site-link";
import { brand, navigation } from "@/data/site";
import { sitePath } from "@/data/paths";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <SiteLink className="footer-wordmark" href={sitePath("/#top")} aria-label={`${brand.name}, back to home`}>
            <span className="footer-wordmark-main">{brand.name}</span>
            <span className="footer-wordmark-sub">{brand.descriptor}</span>
          </SiteLink>
          <p>Frozen berries, dried fruits, botanical ingredients and tea directions for food and beverage sourcing.</p>
        </div>
        <div className="footer-links">
          <span className="footer-label">Explore</span>
          {navigation.map((item) => <SiteLink href={sitePath(item.href)} key={item.label}>{item.label}</SiteLink>)}
        </div>
        <div className="footer-contact">
          <span className="footer-label">Connect</span>
          <SiteLink href={sitePath("/contact")}>Request a Quote <span aria-hidden="true">↗</span></SiteLink>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>{brand.businessName}</span>
        <span>Development preview · imagery is illustrative</span>
      </div>
    </footer>
  );
}
