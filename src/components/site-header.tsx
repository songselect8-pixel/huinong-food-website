"use client";

import { useEffect, useState } from "react";
import { company, navigation } from "@/data/site";
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
        <a className="wordmark" href={sitePath("/#top")} onClick={() => setMenuOpen(false)} aria-label="Huinong Food, back to home">
          <span className="wordmark-main">{company.wordmark}</span>
          <span className="wordmark-sub">FRUIT · FLOWERS · TEA</span>
        </a>

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
            <a href={sitePath(item.href)} key={item.label} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="mobile-quote" href={sitePath("/#quote")} onClick={() => setMenuOpen(false)}>
            Request a Quote <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <a className="header-quote button button-dark" href={sitePath("/#quote")}>
          Request a Quote <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
