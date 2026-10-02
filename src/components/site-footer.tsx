import { company, navigation } from "@/data/site";
import { sitePath } from "@/data/paths";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <a className="footer-wordmark" href={sitePath("/#top")}>{company.wordmark}</a>
          <p>Dried fruits, frozen berries, botanical ingredients and tea directions for a clearer sourcing conversation.</p>
        </div>
        <div className="footer-links">
          <span className="footer-label">Explore</span>
          {navigation.map((item) => <a href={sitePath(item.href)} key={item.label}>{item.label}</a>)}
        </div>
        <div className="footer-contact">
          <span className="footer-label">Connect</span>
          <a href={sitePath("/#quote")}>Request a Quote <span aria-hidden="true">↗</span></a>
          <a href={company.storefront} target="_blank" rel="noopener noreferrer">
            Alibaba storefront <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {company.name}</span>
        <span>Development preview · imagery is illustrative</span>
      </div>
    </footer>
  );
}
