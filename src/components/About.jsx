import React, { useRef } from "react";
import { gsap, useReveal } from "../lib/motion";
import Icon from "./Icon";
import { asset } from "../lib/asset";
import "./About.css";

const features = [
  {
    icon: "certificate",
    title: "Gecertificeerde professionals",
    desc: "Al onze elektriciens zijn volledig gecertificeerd en opgeleid",
  },
  {
    icon: "clock",
    title: "24/7 Nooddienst",
    desc: "Rond de klok beschikbaar voor dringende herstellingen",
  },
  {
    icon: "shield",
    title: "Veiligheid voorop",
    desc: "Strikte naleving van alle veiligheidsvoorschriften",
  },
  {
    icon: "medal",
    title: "Kwaliteit gegarandeerd",
    desc: "Al onze werken worden uitgevoerd met kwaliteitsgarantie",
  },
];

export default function About() {
  const sectionRef = useRef(null);

  useReveal(sectionRef, () => {
    const trigger = { trigger: sectionRef.current, start: "top 70%" };

    gsap.from(".about-text", { opacity: 0, x: -50, duration: 1, scrollTrigger: trigger });
    gsap.from(".about-image", { opacity: 0, x: 50, duration: 1, scrollTrigger: trigger });
    gsap.from(".feature-item", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
    });
  });

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-text" data-reveal>
          <h2 className="section-title">Over Chris Solutions</h2>
          <p>
            Met jarenlange ervaring in de elektriciteitssector heeft Chris
            Solutions zich gevestigd als een betrouwbare partner voor projecten
            van elke omvang in heel België.
          </p>
          <p>
            Ons team van gecertificeerde elektriciens combineert technische
            expertise met een sterke focus op veiligheid en klanttevredenheid,
            zodat elk project wordt uitgevoerd volgens de hoogste normen.
          </p>
          <div className="about-features">
            {features.map((feature) => (
              <div key={feature.title} className="feature-item" data-reveal>
                <div className="feature-icon">
                  <Icon name={feature.icon} size={26} />
                </div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-image" data-reveal>
          <img
            src={asset("/images/hero-panel.webp")}
            alt="Elektricien van Chris Solutions test een elektrisch verdeelbord"
            width="1290"
            height="708"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
