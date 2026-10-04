"use client";
import SiteLink from "@/components/site-link";

import { useEffect, useState } from "react";
import { brand, navigation } from "@/data/site";
import { sitePath } from "@/data/paths";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner shell">
        <SiteLink className="wordmark" href={sitePath("/#top")} onClick={() => setMenuOpen(false)} aria-label={`${brand.name}, back to home`}>
          <span className="wordmark-main">{brand.name}</span>
          <span className="wordmark-sub">{brand.descriptor}</span>
        </SiteLink>

        <button
          type="button"
          className="menu-toggle"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav id="primary-navigation" className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <SiteLink href={sitePath(item.href)} key={item.label} onClick={() => setMenuOpen(false)}>
              {item.label}
            </SiteLink>
          ))}
          <SiteLink className="mobile-quote" href={sitePath("/contact")} onClick={() => setMenuOpen(false)}>
            Request a Quote <span aria-hidden="true">↗</span>
          </SiteLink>
        </nav>

        <SiteLink className="header-quote button button-dark" href={sitePath("/contact")}>
          Request a Quote <span aria-hidden="true">↗</span>
        </SiteLink>
      </div>
    </header>
  );
}
