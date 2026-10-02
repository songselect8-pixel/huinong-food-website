import { brand, navigation } from "@/data/site";
import { sitePath } from "@/data/paths";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <a className="footer-wordmark" href={sitePath("/#top")} aria-label={`${brand.name}, back to home`}>
            <span className="footer-wordmark-main">{brand.name}</span>
            <span className="footer-wordmark-sub">{brand.descriptor}</span>
          </a>
          <p>Frozen berries, dried fruits, botanical ingredients and tea directions for food and beverage sourcing.</p>
        </div>
        <div className="footer-links">
          <span className="footer-label">Explore</span>
          {navigation.map((item) => <a href={sitePath(item.href)} key={item.label}>{item.label}</a>)}
        </div>
        <div className="footer-contact">
          <span className="footer-label">Connect</span>
          <a href={sitePath("/#quote")}>Request a Quote <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>{brand.businessName}</span>
        <span>Development preview · imagery is illustrative</span>
      </div>
    </footer>
  );
}
