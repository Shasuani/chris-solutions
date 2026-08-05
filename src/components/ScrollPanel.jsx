import React, { useEffect, useState } from "react";
import "./ScrollPanel.css";

// Each breaker flips on once its section has been reached.
const STAGES = [
  { id: "about", label: "Over ons" },
  { id: "services", label: "Diensten" },
  { id: "projects", label: "Projecten" },
];

const ORDER = ["home", "about", "services", "projects", "contact"];

/**
 * Decorative breaker panel that fills up as the visitor scrolls.
 *
 * Previously this used six GSAP ScrollTriggers — four of them empty tweens
 * used only as scroll observers, plus two that animated `opacity` from the
 * same trigger in opposite directions and fought each other. None were ever
 * cleaned up, so StrictMode stacked duplicates. An IntersectionObserver does
 * the same job with one observer and a guaranteed teardown.
 */
export default function ScrollPanel() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ORDER.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const reachedIndex = ORDER.indexOf(activeSection);
  const lights = STAGES.map((_, i) => reachedIndex >= i + 1);
  const visible = activeSection !== "home";

  // Needle sweeps from rest to full as the visitor moves down the page.
  const needleAngle = -45 + (Math.max(reachedIndex, 0) / (ORDER.length - 1)) * 90;

  return (
    <div
      className={`scroll-panel ${visible ? "is-visible" : ""}`}
      aria-hidden="true"
    >
      <div className="panel-container">
        <div className="panel-header">
          <span className="panel-brand">Chris Solutions</span>
        </div>

        <div className="panel-body">
          <div className="breaker-switches">
            {STAGES.map((stage, i) => (
              <div key={stage.id} className={`breaker ${lights[i] ? "active" : ""}`}>
                <div className="breaker-switch" />
                <span className="breaker-label">{stage.label}</span>
              </div>
            ))}
          </div>

          <div className="indicator-lights">
            {lights.map((on, i) => (
              <div key={i} className={`indicator ${on ? "on" : "off"}`}>
                <div className="light-glow" />
              </div>
            ))}
          </div>
        </div>

        <div className="voltage-meter">
          <div
            className="meter-needle"
            style={{ transform: `rotate(${needleAngle}deg)` }}
          />
          <span className="meter-label">STROOM</span>
        </div>
      </div>
    </div>
  );
}
