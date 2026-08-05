import React, { useState, useEffect, useRef } from "react";
import { site, nav } from "../siteConfig";
import { asset } from "../lib/asset";
import Icon from "./Icon";
import "./Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const headerRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight the nav item for whichever section is currently in view.
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape or on a click outside the header.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header ref={headerRef} className={scrolled ? "scrolled" : ""}>
      <a
        className="logo-link"
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("home");
        }}
      >
        <img
          src={asset("/images/logo.png")}
          alt={`${site.name} — startpagina`}
          className="logo"
          width="720"
          height="480"
          fetchPriority="high"
        />
      </a>

      <div className="header-right">
        <nav
          id="primary-navigation"
          className={menuOpen ? "active" : ""}
          aria-label="Hoofdnavigatie"
        >
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              className={active === item.id ? "is-active" : ""}
              aria-current={active === item.id ? "page" : undefined}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <a className="header-cta" href={site.phone.href}>
          <Icon name="phone" size={17} />
          <span>{site.phone.display}</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Navigatie sluiten" : "Navigatie openen"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          <span className={`burger ${menuOpen ? "open" : ""}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}
