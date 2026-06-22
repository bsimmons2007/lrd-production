# Before/After mix demos

Drop paired audio clips here, then register them in `src/config.ts` → `MIX_DEMOS`.

Each demo needs the **same short clip** in two versions so visitors can A/B them:

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

The whole Before/After section on `/portfolio` stays hidden until this array
has at least one entry, so nothing ships broken.

Keep clips short (10–20s) and reasonably small (MP3/AAC) for fast loading.
