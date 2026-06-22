/* ------------------------------------------------------------------ *
 * Anime.js v4 motion — restrained, warm, "analog gear powering on".
 *
 * Every entry point bails out under prefers-reduced-motion, leaving the
 * markup in its final, fully-visible state (initial hidden states live
 * behind `.motion-ok`, which is only set when motion is welcome).
 *
 * Imported only by pages that animate, so anime.js isn't shipped elsewhere.
 * ------------------------------------------------------------------ */
import { animate, createTimeline, stagger, onScroll, svg } from "animejs";

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll reveals: each `.reveal-group` staggers its `.reveal` children up
 * and in as it enters the viewport (groups already in view play on load).
 */
export function initReveals() {
  if (prefersReduced()) return;

  document.querySelectorAll<HTMLElement>(".reveal-group").forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>(".reveal");
    if (!items.length) return;

    const anim = animate(items, {
      y: [26, 0],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(90),
      ease: "outExpo",
      autoplay: false,
    });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      anim.play();
    };

    const rect = group.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

    if (alreadyInView) {
      play();
    } else {
      // Fire once as the group scrolls into view; never reverse (no vanishing).
      onScroll({ target: group, onEnter: play });
    }
  });
}

/**
 * Home hero entrance: the needle-trace divider draws itself, then the
 * type-mark, tagline, status badge and CTA rise + fade in with a stagger.
 */
export function initHero() {
  const hero = document.querySelector<HTMLElement>("#hero");
  if (!hero || prefersReduced()) return;

  if (hero.querySelector(".hero-line")) {
    animate(svg.createDrawable("#hero .hero-line"), {
      draw: ["0 0", "0 1"],
      ease: "inOut(2)",
      duration: 1300,
      delay: 200,
    });
  }

  createTimeline()
    .add("#hero .mark-lrd", {
      y: [30, 0],
      opacity: [0, 1],
      duration: 760,
      ease: "outExpo",
    })
    .add(
      "#hero .mark-production",
      { y: [18, 0], opacity: [0, 1], duration: 660, ease: "outExpo" },
      "-=400",
    )
    .add(
      "#hero .hero-tagline",
      { y: [16, 0], opacity: [0, 1], duration: 620, ease: "outExpo" },
      "-=360",
    )
    .add(
      "#hero .hero-badge",
      { y: [12, 0], opacity: [0, 1], duration: 560, ease: "outExpo" },
      "-=380",
    )
    .add(
      "#hero .hero-cta",
      { y: [12, 0], opacity: [0, 1], duration: 600, ease: "outExpo" },
      "-=400",
    );
}
