import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { site } from "../siteConfig";
import Icon from "./Icon";
import "./Contact.css";

const SERVICES = [
  { value: "installation", label: "Elektrische installatie" },
  { value: "lighting", label: "Verlichtingsoplossingen" },
  { value: "maintenance", label: "Onderhoud & herstellingen" },
  { value: "commercial", label: "Commerciële projecten" },
  { value: "emergency", label: "Nooddienst" },
  { value: "other", label: "Andere" },
];

/** Opens the visitor's mail client with the enquiry pre-filled. */
function sendByMail(data) {
  const service =
    SERVICES.find((s) => s.value === data.service)?.label || data.service;
  const body = [
    `Naam: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefoon: ${data.phone}`,
    `Dienst: ${service}`,
    "",
    data.message,
  ].join("\n");

  window.location.href =
    `${site.email.href}?subject=${encodeURIComponent(
      `Offerteaanvraag — ${data.name}`
    )}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Honeypot: bots fill hidden fields, humans never see this one.
    if (data.company) return;

    setStatus("sending");

    // Without a configured endpoint the enquiry would previously vanish into
    // console.log. Fall back to the visitor's mail client so it always lands
    // somewhere, and surface a real error if the request fails.
    if (!site.contactEndpoint) {
      sendByMail(data);
      setStatus("sent");
      reset();
      return;
    }

    try {
      const response = await fetch(site.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-wrapper">
        <div className="contact-header">
          <h2 className="section-title centered">Vraag uw gratis offerte aan</h2>
          <p>
            Klaar om uw elektrisch project te starten? Vul het formulier hieronder
            in en wij nemen binnen 24 uur contact met u op.
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info-side">
            <div className="info-block">
              <div className="info-icon">
                <Icon name="phone" size={26} />
              </div>
              <div className="info-content">
                <h3>Bel ons</h3>
                <a href={site.phone.href}>{site.phone.display}</a>
                <span className="info-note">{site.hours}</span>
              </div>
            </div>

            <div className="info-block">
              <div className="info-icon">
                <Icon name="mail" size={26} />
              </div>
              <div className="info-content">
                <h3>E-mail ons</h3>
                <a href={site.email.href}>{site.email.display}</a>
                <span className="info-note">Wij antwoorden binnen 24u</span>
              </div>
            </div>

            <div className="info-block">
              <div className="info-icon">
                <Icon name="pin" size={26} />
              </div>
              <div className="info-content">
                <h3>Locatie</h3>
                <p>
                  {site.address.city}, {site.address.country}
                </p>
                <span className="info-note">{site.address.area}</span>
              </div>
            </div>

            <div className="emergency-card">
              <div className="emergency-header">
                <Icon name="siren" size={30} className="emergency-icon" />
                <h3>Nooddienst</h3>
              </div>
              <p>24/7 beschikbaar voor dringende elektrische problemen</p>
              <a href={site.phone.href} className="emergency-btn">
                Bel de noodlijn
              </a>
            </div>
          </div>

          <div className="contact-form-side">
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
              {/* Honeypot — hidden from users and assistive tech, bait for bots. */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="honeypot"
                {...register("company")}
              />

              <div className="form-group">
                <label htmlFor="contact-name">Volledige naam *</label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jan Jansen"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  className={errors.name ? "error-input" : ""}
                  {...register("name", { required: "Naam is verplicht" })}
                />
                {errors.name && (
                  <span className="error-msg" id="err-name">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-email">E-mail *</label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="jan@example.com"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    className={errors.email ? "error-input" : ""}
                    {...register("email", {
                      required: "E-mail is verplicht",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Ongeldig e-mailadres",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="error-msg" id="err-email">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-phone">Telefoon *</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+32 489 98 95 75"
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "err-phone" : undefined}
                    className={errors.phone ? "error-input" : ""}
                    {...register("phone", {
                      required: "Telefoonnummer is verplicht",
                      pattern: {
                        // Digits, spaces, dots, dashes, brackets and a leading +.
                        value: /^\+?[\d\s.()-]{8,20}$/,
                        message: "Ongeldig telefoonnummer",
                      },
                    })}
                  />
                  {errors.phone && (
                    <span className="error-msg" id="err-phone">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-service">Type dienst *</label>
                <select
                  id="contact-service"
                  aria-invalid={errors.service ? "true" : "false"}
                  aria-describedby={errors.service ? "err-service" : undefined}
                  className={errors.service ? "error-input" : ""}
                  {...register("service", { required: "Selecteer een dienst" })}
                >
                  <option value="">Selecteer een dienst...</option>
                  {SERVICES.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span className="error-msg" id="err-service">
                    {errors.service.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Projectdetails *</label>
                <textarea
                  id="contact-message"
                  rows="4"
                  placeholder="Vertel ons meer over uw elektrisch project..."
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "err-message" : undefined}
                  className={errors.message ? "error-input" : ""}
                  {...register("message", {
                    required: "Beschrijf uw project",
                    minLength: {
                      value: 20,
                      message: "Gelieve meer details te geven (min. 20 tekens)",
                    },
                  })}
                />
                {errors.message && (
                  <span className="error-msg" id="err-message">
                    {errors.message.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Verzenden..." : "Aanvraag versturen"}
              </button>

              {/* aria-live so screen readers announce the outcome. */}
              <div aria-live="polite">
                {status === "sent" && (
                  <div className="form-message success-message">
                    ✓ Bedankt! Wij nemen binnen 24 uur contact met u op.
                  </div>
                )}
                {status === "error" && (
                  <div className="form-message error-message">
                    Er ging iets mis bij het verzenden. Bel ons op{" "}
                    <a href={site.phone.href}>{site.phone.display}</a> of mail naar{" "}
                    <a href={site.email.href}>{site.email.display}</a>.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
