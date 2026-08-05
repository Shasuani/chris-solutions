import React, { useRef } from "react";
import { gsap, useReveal } from "../lib/motion";
import "./Hero.css";

// Positions are generated here rather than hard-coded as :nth-child rules, so
// the count can change without silently stacking unpositioned particles in the
// top-left corner (the previous code rendered 15 but only styled 10).
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  top: `${(i * 37) % 90 + 5}%`,
  left: `${(i * 53) % 88 + 6}%`,
  duration: `${11 + (i % 6) * 1.6}s`,
  delay: `${i * 0.4}s`,
}));

export default function Hero() {
  const heroRef = useRef(null);

  useReveal(heroRef, () => {
    gsap.from("[data-reveal]", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.18,
      ease: "power3.out",
    });
  });

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-content">
        <p className="hero-eyebrow" data-reveal>
          Gecertificeerd elektricien · Actief in heel België
        </p>
        <h1 data-reveal>Professionele elektrische oplossingen</h1>
        <p className="hero-lead" data-reveal>
          Wij leveren betrouwbare, veilige en innovatieve elektrische oplossingen
          voor residentiële, commerciële en industriële projecten in heel België.
        </p>
        <div className="hero-buttons" data-reveal>
          <button
            type="button"
            className="btn-red"
            onClick={() => scrollTo("contact")}
          >
            Gratis offerte aanvragen
          </button>
          <button
            type="button"
            className="btn-outline"
            onClick={() => scrollTo("services")}
          >
            Onze diensten
          </button>
        </div>
        <ul className="hero-trust" data-reveal>
          <li>24/7 nooddienst</li>
          <li>Gecertificeerde vakmensen</li>
          <li>Antwoord binnen 24u</li>
        </ul>
      </div>

      <div className="hero-particles" aria-hidden="true">
        {PARTICLES.map((particle, i) => (
          <span
            key={i}
            className="particle"
            style={{
              top: particle.top,
              left: particle.left,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>
    </section>
  );
}
