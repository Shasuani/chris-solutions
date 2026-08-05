import React from "react";

/**
 * Inline SVG icon set.
 *
 * Used for the small UI markers (contact details, the "why us" list, social
 * links) where a photograph would be unreadable at 20–26px. Emoji were used
 * here originally, but they render as a different picture on every platform,
 * can't take brand colour, and sometimes fall back to a tofu box.
 *
 * Larger content slots — service and project cards — use real photography
 * instead; see Services.jsx and Projects.jsx.
 *
 * All glyphs share a 24×24 box and a 1.75 stroke so they read as one family.
 */

// Stroked line icons — the default.
const STROKE_PATHS = {
  phone: (
    <path d="M21.5 16.9v2.8a1.9 1.9 0 0 1-2.1 1.9 18.8 18.8 0 0 1-8.2-2.9 18.5 18.5 0 0 1-5.7-5.7A18.8 18.8 0 0 1 2.6 4.7 1.9 1.9 0 0 1 4.5 2.6h2.8a1.9 1.9 0 0 1 1.9 1.6c.1 1 .4 1.8.7 2.7a1.9 1.9 0 0 1-.4 2l-1.2 1.2a15.2 15.2 0 0 0 5.7 5.7l1.2-1.2a1.9 1.9 0 0 1 2-.4c.9.3 1.7.5 2.7.7a1.9 1.9 0 0 1 1.6 2Z" />
  ),

  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3.2 6 8.8 6.2L20.8 6" />
    </>
  ),

  pin: (
    <>
      <path d="M20.5 10.4c0 6.4-8.5 11.9-8.5 11.9s-8.5-5.5-8.5-11.9a8.5 8.5 0 0 1 17 0Z" />
      <circle cx="12" cy="10.2" r="3" />
    </>
  ),

  // Warning siren — used for the emergency call-out.
  siren: (
    <>
      <path d="M6 20.5v-3.9a6 6 0 0 1 12 0v3.9Z" />
      <path d="M3.5 20.5h17" />
      <path d="M12 2v2.6M4.9 5.4l1.8 1.8M19.1 5.4l-1.8 1.8M2.2 12.2h2.5M19.3 12.2h2.5" />
    </>
  ),

  shield: (
    <>
      <path d="M12 2.5 4.5 5.3v6c0 4.7 3.2 8.8 7.5 10.2 4.3-1.4 7.5-5.5 7.5-10.2v-6Z" />
      <path d="m9 11.8 2.1 2.1 4-4" />
    </>
  ),

  // Certification ribbon.
  certificate: (
    <>
      <circle cx="12" cy="8.5" r="5.8" />
      <path d="m8.4 13.6-1.2 8 4.8-2.8 4.8 2.8-1.2-8" />
      <path d="m10 8.4 1.5 1.5 2.8-2.8" />
    </>
  ),

  clock: (
    <>
      <circle cx="12" cy="12" r="9.3" />
      <path d="M12 6.4V12l3.7 2.2" />
    </>
  ),

  // Quality seal.
  medal: (
    <>
      <path d="M8.2 2.5 5 8.1M15.8 2.5 19 8.1" />
      <circle cx="12" cy="15.3" r="6.2" />
      <path d="m9.5 15.3 1.8 1.8 3.4-3.4" />
    </>
  ),
};

// Brand marks are solid shapes, not strokes. Rendered only for socials that
// have a URL configured in siteConfig.js.
const FILL_PATHS = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05a4.2 4.2 0 0 1 3.75-2C21 8.7 22 11 22 14.2V21h-4v-6c0-1.4 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V21h-4V9Z" />
  ),
  facebook: (
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.3 0-1.7.8-1.7 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
  ),
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.2 1 .47 1.4.9.44.43.7.83.9 1.4.18.42.37 1.06.43 2.25.06 1.28.07 1.66.07 4.88s0 3.6-.07 4.88c-.06 1.2-.25 1.83-.42 2.25-.2.57-.47.97-.9 1.4-.43.44-.83.7-1.4.9-.42.18-1.06.37-2.25.43-1.28.06-1.66.07-4.88.07s-3.6 0-4.88-.07c-1.2-.06-1.83-.25-2.25-.42-.57-.2-.97-.47-1.4-.9-.44-.43-.7-.83-.9-1.4-.18-.42-.37-1.06-.43-2.25C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.88c.06-1.2.25-1.83.42-2.25.2-.57.47-.97.9-1.4.43-.44.83-.7 1.4-.9.42-.18 1.06-.37 2.25-.43C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.16 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.22-.94.47-1.35.88-.4.4-.66.8-.87 1.34-.16.41-.35 1.03-.4 2.17C2.4 9.9 2.4 10.25 2.4 12s0 2.1.06 3.34c.05 1.14.24 1.76.4 2.17.22.55.47.94.88 1.35.4.4.8.66 1.34.87.41.16 1.03.35 2.17.4 1.24.06 1.6.06 4.75.06s3.5 0 4.74-.06c1.14-.05 1.76-.24 2.17-.4.55-.22.94-.47 1.35-.88.4-.4.66-.8.87-1.34.16-.41.35-1.03.4-2.17.06-1.24.06-1.6.06-3.34s0-2.1-.06-3.34c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.34-.87c-.41-.16-1.03-.35-2.17-.4C15.5 4 15.16 4 12 4Zm0 3.15a4.85 4.85 0 1 1 0 9.7 4.85 4.85 0 0 1 0-9.7Zm0 8a3.15 3.15 0 1 0 0-6.3 3.15 3.15 0 0 0 0 6.3Zm6.2-8.2a1.13 1.13 0 1 1-2.26 0 1.13 1.13 0 0 1 2.26 0Z" />
  ),
};

export default function Icon({ name, size = 24, className = "", ...rest }) {
  const filled = FILL_PATHS[name];
  const stroked = STROKE_PATHS[name];
  if (!filled && !stroked) return null;

  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? undefined : 1.75}
      strokeLinecap={filled ? undefined : "round"}
      strokeLinejoin={filled ? undefined : "round"}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {filled || stroked}
    </svg>
  );
}
