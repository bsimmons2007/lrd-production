# LRD Production — website

Portfolio + services site for **LRD Production** (Logan Drafall) — freelance
audio engineer & music producer. Built with **Astro** (static) + **Tailwind CSS
v4**, animated with **Anime.js v4**, and ready to deploy on **Vercel**.

Warm analog / vintage aesthetic: cream paper, Fraunces + Inter, burnt-orange
accents, paper-grain texture, restrained "gear powering on" motion.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output → dist/
npm run preview    # preview the production build locally
```

Requires Node 18.20.8+, 20.3+, or 22+ (built and tested on Node 24 LTS).

> **Windows + Smart App Control:** the very first `npm run build` after install
> may fail once with _"An Application Control policy has blocked this file"_
> (Smart App Control vetting a freshly-downloaded native binary). Just run the
> command again — it succeeds once Windows has cleared the file. This does **not**
> affect Vercel, which builds on Linux.

---

## ✅ What Logan needs to swap in

Everything below is collected in **`src/config.ts`** unless noted. Each spot is
also marked with a `TODO` comment in the code.

| # | What | Where |
|---|------|-------|
| 1 | **Availability** — `true` shows "Currently taking projects", `false` shows "Booked — check back soon." | `acceptingProjects` in `src/config.ts` |
| 2 | **Formspree form ID** — create a free account at [formspree.io](https://formspree.io), make a form, paste its ID | `FORMSPREE_ID` in `src/config.ts` |
| 3 | **Instagram + Spotify links** — currently placeholder `#` | `CONTACT.instagram` / `CONTACT.spotify` in `src/config.ts` |
| 4 | **Per-track tags** — optional `genre` / `role` / `year` per track | `TRACKS` in `src/config.ts` |
| 5 | **Before/After mix demos** — add clip pairs (see below) | `MIX_DEMOS` in `src/config.ts` + files in `public/audio/demos/` |
| 6 | **About photo** — add `logan.jpg`, then swap the placeholder block | `public/images/logan.jpg` + `src/pages/about.astro` |
| 7 | **Production domain** — for correct canonical + social-preview URLs | `site` in `astro.config.mjs` and `SITE.url` in `src/config.ts` |

### 5 · Before / After mix demos

The whole "Before & after" section on `/portfolio` stays hidden until you add at
least one demo, so nothing ever ships broken. Drop two versions of the **same
short clip** into `public/audio/demos/`, then:

```ts
// src/config.ts
export const MIX_DEMOS: MixDemo[] = [
  {
    label: "Vocal chain",
    rawSrc: "/audio/demos/vocal-raw.mp3",
    mixedSrc: "/audio/demos/vocal-mixed.mp3",
  },
];
```

### 6 · About photo

Add `public/images/logan.jpg` (portrait, ~800×1000), then in
`src/pages/about.astro` replace the "Photo coming soon" placeholder `<div>` with:

```astro
<img
  src="/images/logan.jpg"
  alt="Logan Drafall"
  width="800"
  height="1000"
  class="aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-warm)]"
/>
```

---

## Deploy to Vercel

**One command (Vercel CLI):**

```bash
npm i -g vercel && vercel --prod
```

Accept the defaults — Vercel auto-detects Astro (build `astro build`, output
`dist`). No `vercel.json` needed.

**Or via Git:** push this folder to GitHub/GitLab, then "Add New… → Project" at
[vercel.com](https://vercel.com), import the repo, and deploy. Every push
auto-deploys.

After your domain is live, set it in `astro.config.mjs` (`site`) and
`src/config.ts` (`SITE.url`) so canonical URLs and social-share previews are
absolute and correct.

---

## Project structure

```
public/
  favicon.svg              LRD mark favicon
  apple-touch-icon.png     iOS home-screen icon
  icon-192/512.png         PWA / Android icons
  site.webmanifest         web app manifest
  robots.txt               crawler rules (+ sitemap link)
  og-image.png / .svg      1200×630 social-share image
  textures/                grain.svg (film) + paper.svg (surface speckle)
  images/                  → add logan.jpg here
  audio/demos/             → add before/after clips here
  (sitemap-index.xml is generated at build time)
src/
  config.ts                ⭐ single source of truth (see table above)
  layouts/Layout.astro     shared shell: head/SEO, header, footer, analytics
  components/
    TypeMark.astro         LRD PRODUCTION text logo
    Header.astro           sticky nav + mobile menu + scroll elevation
    Footer.astro           contact, socials, status echo, brand watermark
    StatusBadge.astro      availability pill
    SectionHeader.astro    numbered editorial section header
    Marquee.astro          seamless tape-strip marquee (genres)
    Equalizer.astro        animated bar motif
    Stat.astro             count-up metric
    TrackCard.astro        SoundCloud embed (wavesurfer-ready via audioSrc)
    ServiceCard.astro      services offering card
    BeforeAfter.astro      A/B raw-vs-mixed player
    CTABand.astro          dark closing call-to-action band
  scripts/motion.ts        Anime.js v4: hero entrance, scroll reveals,
                           word reveals, count-ups, magnetic buttons,
                           live equalizer, scroll-progress bar
  pages/                   index, portfolio, about, services, contact,
                           privacy, terms, 404
  styles/global.css        brand tokens, base styles, grain, motion gating
```

---

## Notes

- **Motion & accessibility:** all animation is gated behind
  `prefers-reduced-motion`. With reduced motion (or JS off), everything renders
  in its final, fully-visible state — no flashes, nothing hidden. Add
  `?stillshot` to any URL to preview that motion-off state in a normal browser.
- **Performance:** SoundCloud embeds are lazy-loaded; fonts use `preconnect` +
  `display=swap`; Anime.js ships only to pages that animate.
- **TrackCard is wavesurfer-ready:** pass an `audioSrc` to a track in `TRACKS`
  and the card swaps from the SoundCloud iframe to a self-hosted `<audio>` mount
  (marked for a future wavesurfer.js upgrade).
- **Analytics:** Vercel Web Analytics is wired in via `@vercel/analytics`. It's a
  no-op locally and starts collecting once deployed on Vercel.
- **Legal pages:** `/privacy` and `/terms` are plain-language *starter* templates
  tailored to what the site does. Review/adapt them to your situation (and confirm
  the governing-law state) — they're a starting point, not legal advice. Each has a
  `TODO` note at the top.
- **SEO:** sitemap auto-generated by `@astrojs/sitemap`; `robots.txt` links to it.
  Update the domain in `robots.txt` if you move off the Vercel URL.

© LRD Production
