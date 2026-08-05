import React from "react";
import { site, nav } from "../siteConfig";
import Icon from "./Icon";
import "./Footer.css";

const SOCIAL_LABELS = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Only render socials that actually have a URL — the previous href="#" links
  // sent visitors back to the top of the page.
  const socials = Object.entries(site.socials).filter(([, url]) => url);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-about">
          <img
            src="/images/logo.png"
            alt={`${site.name} logo`}
            className="footer-logo"
            width="720"
            height="480"
            loading="lazy"
          />
          <p>
            {site.name} is uw betrouwbare partner voor alle elektrische projecten.
            Wij combineren expertise, veiligheid en innovatie om uitzonderlijke
            resultaten te leveren.
          </p>
          {socials.length > 0 && (
            <div className="footer-socials">
              {socials.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  aria-label={SOCIAL_LABELS[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={key} size={20} />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className="footer-links" aria-label="Footernavigatie">
          <h2>Snelkoppelingen</h2>
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-contact">
          <h2>Contacteer ons</h2>
          <div className="contact-info">
            <div className="icon">
              <Icon name="phone" size={20} />
            </div>
            <div>
              <p>Telefoon</p>
              <strong>
                <a href={site.phone.href}>{site.phone.display}</a>
              </strong>
            </div>
          </div>
          <div className="contact-info">
            <div className="icon">
              <Icon name="mail" size={20} />
            </div>
            <div>
              <p>E-mail</p>
              <strong>
                <a href={site.email.href}>{site.email.display}</a>
              </strong>
            </div>
          </div>
          <div className="contact-info">
            <div className="icon">
              <Icon name="pin" size={20} />
            </div>
            <div>
              <p>Werkgebied</p>
              <strong>{site.address.area}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} {site.name} | Alle rechten voorbehouden | Gemaakt door
          DeviPix
        </p>
      </div>
    </footer>
  );
}
