import React, { useRef } from "react";
import { gsap, useReveal } from "../lib/motion";
import "./Projects.css";

const projects = [
  {
    type: "Residentieel",
    image: "/images/project-residentieel.jpg",
    alt: "Moderne woonkamer met ingebouwde spots in het plafond",
    title: "Moderne woninginstallatie",
    description:
      "Volledige elektrische installatie voor een moderne woning van 250 m² in Brussel.",
  },
  {
    type: "Commercieel",
    image: "/images/project-commercieel.jpg",
    alt: "Verlichte kantoorverdiepingen in een kantoorgebouw bij avond",
    title: "Heraanleg kantoorgebouw",
    description:
      "Volledige upgrade van het elektrisch systeem voor een kantoorgebouw van 5 verdiepingen.",
  },
  {
    type: "Industrieel",
    image: "/images/project-industrieel.jpg",
    alt: "Productiehal met machines en industriële installaties",
    title: "Fabrieksinstallatie",
    description:
      "Elektrische installatie met hoge capaciteit voor een productieomgeving.",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useReveal(sectionRef, () => {
    gsap.from(".project-card", {
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });
  });

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <h2 className="section-title centered">Recente projecten</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card" data-reveal>
            <div className="project-image">
              <img
                src={project.image}
                alt={project.alt}
                width="900"
                height="630"
                loading="lazy"
                decoding="async"
              />
              <span className="project-type">{project.type}</span>
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
