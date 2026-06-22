/* ================================================================== *
 * Anime.js v4 motion — restrained, warm, "analog gear powering on".
 *
 * One entry point: initMotion(). Every effect is guarded by element
 * presence AND by prefers-reduced-motion, so reduced-motion / no-JS
 * users get the final, fully-visible state with nothing hidden.
 *
 * Imported only by pages that animate (anime.js stays out of the rest).
 * ================================================================== */
import { animate, createTimeline, stagger, onScroll, svg } from "animejs";

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Play now if already in view, else once it scrolls into view. */
function onView(el: Element, cb: () => void) {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cb();
  };
  const r = el.getBoundingClientRect();
  if (r.top < window.innerHeight * 0.92 && r.bottom > 0) run();
  else onScroll({ target: el, onEnter: run });
}

/* ------------------------------------------------------------------ *
 * Scroll reveals — each .reveal-group staggers its .reveal children up.
 * ------------------------------------------------------------------ */
function initReveals() {
  document.querySelectorAll<HTMLElement>(".reveal-group").forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>(".reveal");
    if (!items.length) return;
    const anim = animate(items, {
      y: [26, 0],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(85),
      ease: "outExpo",
      autoplay: false,
    });
    onView(group, () => anim.play());
  });
}

/* ------------------------------------------------------------------ *
 * Masked word reveal — headings whose words rise from behind a clip.
 * ------------------------------------------------------------------ */
function splitWords(el: HTMLElement): HTMLElement[] {
  const text = (el.textContent || "").replace(/\s+/g, " ").trim();
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const inners: HTMLElement[] = [];
  const words = text.split(" ");
  words.forEach((w, i) => {
    const word = document.createElement("span");
    word.className = "word";
    word.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = "word-inner";
    inner.textContent = w;
    word.appendChild(inner);
    el.appendChild(word);
    inners.push(inner);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  return inners;
}

function initTextReveals() {
  document.querySelectorAll<HTMLElement>(".reveal-text").forEach((el) => {
    const inners = splitWords(el);
    const anim = animate(inners, {
      translateY: ["110%", "0%"],
      duration: 850,
      delay: stagger(55),
      ease: "outExpo",
      autoplay: false,
    });
    onView(el, () => anim.play());
  });
}

/* ------------------------------------------------------------------ *
 * Count-up stats — .count-up with data-to; markup holds the final value.
 * ------------------------------------------------------------------ */
function initCounters() {
  document.querySelectorAll<HTMLElement>(".count-up").forEach((el) => {
    const to = parseFloat(el.dataset.to || "0");
    if (!isFinite(to)) return;
    const obj = { v: 0 };
    el.textContent = "0";
    const render = () => (el.textContent = String(Math.round(obj.v)));
    const anim = animate(obj, {
      v: to,
      duration: 1500,
      ease: "out(3)",
      autoplay: false,
      onUpdate: render,
      onComplete: render,
    });
    onView(el, () => anim.play());
  });
}

/* ------------------------------------------------------------------ *
 * Magnetic buttons — drift toward the cursor, spring back on leave.
 * ------------------------------------------------------------------ */
function initMagnetic() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      animate(el, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.35,
        y: (e.clientY - (r.top + r.height / 2)) * 0.4,
        duration: 400,
        ease: "out(3)",
      });
    });
    el.addEventListener("mouseleave", () => {
      animate(el, { x: 0, y: 0, duration: 650, ease: "outElastic(1, 0.5)" });
    });
  });
}

/* ------------------------------------------------------------------ *
 * Live equalizer — bars breathe like a track is playing.
 * ------------------------------------------------------------------ */
function initEqualizer() {
  document.querySelectorAll<HTMLElement>(".eq-bar").forEach((bar, i) => {
    animate(bar, {
      scaleY: [0.2 + Math.random() * 0.25, 0.7 + Math.random() * 0.3],
      duration: 480 + Math.random() * 460,
      delay: i * 60,
      loop: true,
      alternate: true,
      ease: "inOutSine",
    });
  });
}

/* ------------------------------------------------------------------ *
 * Thin scroll-progress bar (#scroll-progress) — scrubbed by scroll.
 * ------------------------------------------------------------------ */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
}

/* ------------------------------------------------------------------ *
 * Home hero entrance: needle-trace divider draws itself, then the
 * type-mark, meta, tagline, badge and CTA rise + fade in.
 * ------------------------------------------------------------------ */
function initHero() {
  const hero = document.querySelector<HTMLElement>("#hero");
  if (!hero) return;

  if (hero.querySelector(".hero-line")) {
    animate(svg.createDrawable("#hero .hero-line"), {
      draw: ["0 0", "0 1"],
      ease: "inOut(2)",
      duration: 1300,
      delay: 200,
    });
  }

  createTimeline()
    .add("#hero .hero-meta", {
      opacity: [0, 1],
      duration: 600,
      ease: "outExpo",
    })
    .add(
      "#hero .mark-lrd",
      { y: [32, 0], opacity: [0, 1], duration: 800, ease: "outExpo" },
      "-=350",
    )
    .add(
      "#hero .mark-production",
      { y: [18, 0], opacity: [0, 1], duration: 660, ease: "outExpo" },
      "-=430",
    )
    .add(
      "#hero .hero-tagline",
      { y: [16, 0], opacity: [0, 1], duration: 640, ease: "outExpo" },
      "-=380",
    )
    .add(
      "#hero .hero-badge",
      { y: [12, 0], opacity: [0, 1], duration: 560, ease: "outExpo" },
      "-=420",
    )
    .add(
      "#hero .hero-cta",
      { y: [12, 0], opacity: [0, 1], duration: 600, ease: "outExpo" },
      "-=440",
    );
}

/* ------------------------------------------------------------------ */
export function initMotion() {
  // ?stillshot renders the final, static state (handy for previews/captures).
  const still =
    typeof location !== "undefined" && location.search.includes("stillshot");
  if (reduced() || still) return; // content already visible, no motion

  initScrollProgress();
  initHero();
  initReveals();
  initTextReveals();
  initCounters();
  initMagnetic();
  initEqualizer();
}
