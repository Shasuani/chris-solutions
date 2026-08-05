# Chris Solutions

Marketing site for Chris Solutions, an electrical contractor based in Hasselt,
Belgium. React + Vite, no backend.

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the built site
npm run lint
```

## Editing business details

Phone number, e-mail, address, opening hours, social links and the navigation
items all live in one place:

**`src/siteConfig.js`**

Change them there — every component reads from it. Don't hard-code contact
details in components again; they had drifted out of sync between the contact
section and the footer.

## Contact form

By default the form opens the visitor's mail client with the enquiry
pre-filled. That always works, but it depends on the visitor having a mail
client configured.

To receive submissions directly instead, create a `.env` file:

```
VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

Any endpoint that accepts a JSON `POST` works (Formspree, Web3Forms, Netlify
Forms, your own handler). The form posts `{ name, email, phone, service,
message }`. If the request fails, the visitor is shown the phone number and
e-mail address as a fallback.

## Images

Site images live in `public/images/` and are referenced as `/images/...`.
`design-source/` holds the full-resolution logo master (1536×1024). It is not
part of the build — `public/images/logo.png` is the optimised 720px copy the
site actually loads.

The service and project photos are placeholders from **Pexels**, whose licence
allows free commercial use with no attribution required. Source photo IDs:

| File | Pexels photo |
|---|---|
| `service-installaties.jpg` | [5691588](https://www.pexels.com/photo/5691588/) |
| `service-verlichting.jpg` | [5561129](https://www.pexels.com/photo/5561129/) |
| `service-onderhoud.jpg` | [34054464](https://www.pexels.com/photo/34054464/) |
| `service-commercieel.jpg` | [7653461](https://www.pexels.com/photo/7653461/) |
| `project-residentieel.jpg` | [280239](https://www.pexels.com/photo/280239/) |
| `project-commercieel.jpg` | [13219418](https://www.pexels.com/photo/13219418/) |
| `project-industrieel.jpg` | [34718930](https://www.pexels.com/photo/34718930/) |

Replace these with photos of Chris Solutions' own work as soon as they are
available — real project photos convert far better than stock. Keep the same
filenames and nothing in the code needs to change. Recommended size: 900×630
(3:2), which is the aspect ratio both card grids crop to.
