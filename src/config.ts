/* ------------------------------------------------------------------ *
 * LRD Production — central site configuration
 * Everything Logan needs to tweak lives here (and is listed in README).
 * ------------------------------------------------------------------ */

/** Site-wide metadata. `url` should match `site` in astro.config.mjs. */
export const SITE = {
  name: "LRD Production",
  owner: "Logan Drafall",
  url: "https://lrd-production.vercel.app", // TODO: Logan — your real domain
  tagline: "Freelance audio engineer & music producer. The one who gets it done.",
  description:
    "LRD Production — freelance audio engineer & music producer Logan Drafall. Recording, mixing, and mastering for artists in any genre. Based in Aurora, Illinois.",
  defaultOgImage: "/og-image.png",
};

/**
 * Availability toggle.
 *   true  → "Currently taking projects"
 *   false → "Booked — check back soon."
 */
export const acceptingProjects = true;

/** Contact + social. */
export const CONTACT = {
  email: "Logan.Drafall@gmail.com",
  soundcloud: "https://soundcloud.com/d4ed41us",
  instagram: "#", // TODO: Logan — paste your Instagram profile URL
  spotify: "#", // TODO: Logan — paste your Spotify artist URL
};

/** Formspree endpoint id for the contact form. */
// TODO: Logan — create a free Formspree account and paste your form ID.
export const FORMSPREE_ID = "YOUR_FORMSPREE_ID";

/** Primary navigation, reused by header + footer. */
export const NAV = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ *
 * Portfolio tracks (by D4ed41us — Logan's artist alias)
 * TODO: Logan — fill in genre / role / year per track when ready.
 * ------------------------------------------------------------------ */
export interface Track {
  title: string;
  /** SoundCloud slug under soundcloud.com/d4ed41us/<slug> */
  slug: string;
  genre?: string;
  role?: string;
  year?: string;
  /** Future: drop a self-hosted file here to swap SoundCloud → wavesurfer.js */
  audioSrc?: string;
}

export const TRACKS: Track[] = [
  { title: "Cirrus", slug: "cirrus" },
  { title: "Sleep", slug: "sleep" },
  { title: "Beyond Thy Realm Part 1", slug: "beyond-thy-realm-part-1" },
  { title: "Beyond Thy Realm Part 2", slug: "beyond-thy-realm-part-2" },
  { title: "Falling Wings", slug: "falling-wings" },
];

/** The home page's featured track. */
export const FEATURED_TRACK_SLUG = "cirrus";

/** Build a brand-tinted, lazy-friendly SoundCloud embed URL from a slug. */
export function soundcloudEmbed(slug: string): string {
  const trackUrl = encodeURIComponent(`https://soundcloud.com/d4ed41us/${slug}`);
  // color=%23C25A2B (burnt-orange), auto_play off, show artist, hide related
  return `https://w.soundcloud.com/player/?url=${trackUrl}&color=%23C25A2B&auto_play=false&show_user=true&hide_related=true`;
}

/* ------------------------------------------------------------------ *
 * Before/After mix demos
 * Same clip, Raw vs Mixed, so visitors hear the engineering instantly.
 * The whole section only renders when this array is non-empty.
 * ------------------------------------------------------------------ */
export interface MixDemo {
  label: string;
  rawSrc: string;
  mixedSrc: string;
}

// TODO: add { label, rawSrc, mixedSrc } — drop the audio files in
// /public/audio/demos/ , e.g.:
//   { label: "Vocal chain", rawSrc: "/audio/demos/vocal-raw.mp3", mixedSrc: "/audio/demos/vocal-mixed.mp3" }
export const MIX_DEMOS: MixDemo[] = [];
