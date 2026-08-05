/**
 * Resolves a file in public/ against the deployment base path.
 *
 * Vite rewrites absolute asset URLs it finds in CSS and index.html, but not
 * string literals inside JSX. On GitHub Pages the site is served from
 * /chris-solutions/, so a hard-coded src="/images/logo.png" would 404. Every
 * public asset referenced from a component goes through here instead.
 *
 * import.meta.env.BASE_URL always ends in a slash.
 */
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
