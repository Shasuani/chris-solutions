import React, { useRef } from "react";
import { gsap, useReveal } from "../lib/motion";
import { asset } from "../lib/asset";
import "./Services.css";

const services = [
  {
    image: "/images/service-installaties.jpg",
    alt: "Elektricien sluit stopcontacten en schakelaars aan op een wand",
    title: "Elektrische installaties",
    description:
      "Volledige elektrische installaties voor nieuwbouw en renovaties met gecertificeerde kwaliteit.",
  },
  {
    image: "/images/service-verlichting.jpg",
    alt: "Hanglampen met warme gloeilampen in een modern interieur",
    title: "Verlichtingsoplossingen",
    description:
      "Modern lichtontwerp en installatie, inclusief LED-systemen en integratie van smart home technologie.",
  },
  {
    image: "/images/service-onderhoud.jpg",
    alt: "Elektricien meet spanningen in een schakelkast met een multimeter",
    title: "Onderhoud & herstellingen",
    description:
      "Regelmatig onderhoud en noodreparaties om uw elektrische systemen veilig te laten functioneren.",
  },
  {
    image: "/images/service-commercieel.jpg",
    alt: "Modern kantoorlandschap met professionele verlichting",
    title: "Commerciële projecten",
    description:
      "Gespecialiseerde elektrische oplossingen voor kantoren, winkels en industriële gebouwen.",
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useReveal(sectionRef, () => {
    gsap.from(".service-card", {
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });
  });

  return (
    <section className="services" id="services" ref={sectionRef}>
      <h2 className="section-title centered">Onze diensten</h2>
      <div className="service-grid">
        {services.map((service) => (
          <article key={service.title} className="service-card" data-reveal>
            <div className="service-media">
              <img
                src={asset(service.image)}
                alt={service.alt}
                width="900"
                height="630"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="service-body">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
