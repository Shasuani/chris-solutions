// Single source of truth for all business details.
// Was previously duplicated across Contact.jsx / Footer.jsx with conflicting values.
export const site = {
  name: "Chris Solutions",
  tagline: "Elektrotechnische installaties in heel België",

  phone: {
    display: "+32 489 98 95 75",
    href: "tel:+32489989575",
  },
  email: {
    display: "chris.solutions@gmail.com",
    href: "mailto:chris.solutions@gmail.com",
  },
  address: {
    city: "Hasselt",
    region: "Limburg",
    country: "België",
    area: "Actief in heel België",
  },
  hours: "Ma–Vr: 8u – 18u",

  // Leave a value empty to hide that social icon entirely.
  socials: {
    linkedin: "",
    facebook: "",
    instagram: "",
  },

  // Endpoint that receives the contact form (e.g. a Formspree / Web3Forms URL).
  // Set VITE_CONTACT_ENDPOINT in a .env file. Without it the form falls back to
  // opening the visitor's mail client so no lead is ever silently dropped.
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || "",
};

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "Over ons" },
  { id: "services", label: "Diensten" },
  { id: "projects", label: "Projecten" },
  { id: "contact", label: "Contact" },
];
