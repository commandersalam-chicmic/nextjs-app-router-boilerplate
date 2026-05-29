/**
 * Brand color primitives (hex). Single source for chroma; Tailwind `palette-*`
 * utilities are wired in `tailwind.config.ts`.
 */
export const themePalette = {
  charcoal: "#2C2A26",
  sandstone: "#F5F2EB",
  ivory: "#FAF8F5",
  sandstoneBorder: "#D6D1C7",
  heroWarm: "#433E38",
  heroDark: "#313030",
} as const;

export type ThemePalette = typeof themePalette;
