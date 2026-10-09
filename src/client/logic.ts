import { PORTRAITS } from "../portraits.js";

export const PREVIEW_MAX_FRAME = 240;

export interface EffortLike {
  id: string;
  name: string;
  description?: string;
}

export interface Palette {
  stage: number;
  dark: boolean;
  page: string;
  base: string;
  layer1: string;
  layer2: string;
  layer3: string;
  sidebar: string;
  ink: string;
  secondary: string;
  tertiary: string;
  border: string;
  accent: string;
  accentHover: string;
  accentSoft: string;
  onAccent: string;
  hover: string;
}

type Rgb = readonly [number, number, number];

interface PaletteStop {
  dark: boolean;
  page: Rgb;
  surface: Rgb;
  surface2: Rgb;
  ink: Rgb;
  secondary: Rgb;
  accent: Rgb;
}

// One palette per portrait: pink knit, lavender robe, blue robe,
// rose/charcoal armor, then the crowned form's ruby and champagne gold.
const STOPS: readonly PaletteStop[] = [
  { dark: false, page: [247, 238, 241], surface: [255, 248, 250], surface2: [240, 224, 233], ink: [53, 36, 46], secondary: [116, 85, 101], accent: [163, 81, 107] },
  { dark: false, page: [239, 237, 247], surface: [250, 248, 255], surface2: [233, 229, 244], ink: [42, 37, 61], secondary: [101, 93, 123], accent: [108, 96, 153] },
  { dark: false, page: [229, 235, 247], surface: [246, 248, 255], surface2: [217, 226, 244], ink: [32, 42, 65], secondary: [85, 99, 128], accent: [77, 97, 157] },
  { dark: true, page: [35, 28, 35], surface: [52, 41, 49], surface2: [66, 50, 59], ink: [248, 237, 241], secondary: [202, 180, 190], accent: [211, 139, 157] },
  { dark: true, page: [31, 26, 30], surface: [48, 37, 40], surface2: [65, 48, 49], ink: [250, 239, 221], secondary: [211, 193, 174], accent: [217, 182, 119] },
];

export function clampFrame(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(PREVIEW_MAX_FRAME, Math.max(0, Math.round(value)));
}

export function frameForEffort(index: number, count: number): number {
  if (count <= 1 || !Number.isFinite(index)) return 0;
  const safe = Math.min(count - 1, Math.max(0, Math.round(index)));
  return Math.round((safe / (count - 1)) * PREVIEW_MAX_FRAME);
}

export function nearestEffortIndex(frame: number, efforts: readonly EffortLike[]): number {
  if (efforts.length === 0) return -1;
  const safe = clampFrame(frame);
  let best = 0;
  let distance = Math.abs(safe - frameForEffort(0, efforts.length));
  for (let index = 1; index < efforts.length; index += 1) {
    const next = Math.abs(safe - frameForEffort(index, efforts.length));
    if (next < distance) {
      best = index;
      distance = next;
    }
  }
  return best;
}

export function selectedEffortIndex(
  efforts: readonly EffortLike[],
  selectedId?: string,
  defaultId?: string,
): number {
  const id = selectedId ?? defaultId;
  return id === undefined ? -1 : efforts.findIndex((effort) => effort.id === id);
}

function portraitIndexForFrame(rawFrame: number): number {
  const frame = clampFrame(rawFrame);
  const index = Math.round((frame / PREVIEW_MAX_FRAME) * (PORTRAITS.length - 1));
  // Move only the form 3/4 boundary from 62.5% to 67.5%; effort ticks stay put.
  return index === 3 && frame < 162 ? 2 : index;
}

export function portraitForFrame(rawFrame: number) {
  return PORTRAITS[portraitIndexForFrame(rawFrame)];
}

export function indicatorLabel(rawFrame: number, efforts: readonly EffortLike[]): string {
  const effort = efforts[nearestEffortIndex(rawFrame, efforts)];
  return effort === undefined
    ? portraitForFrame(rawFrame).label
    : `${portraitForFrame(rawFrame).label} · ${effort.name}`;
}

function mix(a: Rgb, b: Rgb, amount: number): Rgb {
  return [
    Math.round(a[0] + (b[0] - a[0]) * amount),
    Math.round(a[1] + (b[1] - a[1]) * amount),
    Math.round(a[2] + (b[2] - a[2]) * amount),
  ];
}

function rgb(value: Rgb, alpha = 1): string {
  return alpha === 1
    ? `rgb(${value[0]} ${value[1]} ${value[2]})`
    : `rgb(${value[0]} ${value[1]} ${value[2]} / ${alpha})`;
}

export function paletteForFrame(rawFrame: number): Palette {
  const frame = clampFrame(rawFrame);
  // Use the same boundary as the image and tooltip, including during a drag.
  const stage = portraitIndexForFrame(frame);
  const ui = STOPS[stage];
  const dark = ui.dark;
  const page = ui.page;
  const surface = ui.surface;
  const surface2 = ui.surface2;
  const sidebar = mix(page, surface2, 0.25);
  const ink = ui.ink;
  const secondary = ui.secondary;
  const accent = ui.accent;
  const accentHover = mix(accent, ink, 0.13);

  return {
    stage,
    dark,
    page: rgb(page),
    // Keep the shell readable while allowing the right-side portrait to remain
    // visibly present. Dense controls use the opaque layer tokens below.
    base: rgb(page, dark ? 0.12 : 0.06),
    layer1: rgb(surface, 0.98),
    layer2: rgb(surface2, 0.98),
    layer3: rgb(surface2),
    sidebar: rgb(sidebar, 0.98),
    ink: rgb(ink),
    secondary: rgb(secondary),
    tertiary: rgb(mix(secondary, page, 0.28)),
    border: rgb(ink, dark ? 0.15 : 0.12),
    accent: rgb(accent),
    accentHover: rgb(accentHover),
    accentSoft: rgb(mix(accent, surface, 0.72)),
    onAccent: rgb(dark ? [38, 25, 29] : [255, 252, 250]),
    hover: rgb(ink, dark ? 0.09 : 0.07),
  };
}
