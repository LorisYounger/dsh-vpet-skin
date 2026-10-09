window.__ModuleLoader__.load({id:"dsh-client-vpet-skin",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");

// src/client/skin.css
var skin_default = `.vpet-skin-backdrop {\r
  --vpet-portrait-width: min(76vw, 84vh, 1200px);\r
  --vpet-portrait-height: 65vh;\r
  --vpet-portrait-right: -8vw;\r
  position: fixed;\r
  z-index: 0;\r
  inset: 0;\r
  overflow: hidden;\r
  pointer-events: none;\r
  background: var(--vpet-page, transparent);\r
  opacity: 0;\r
  transition: opacity 220ms ease, background-color 180ms linear;\r
}\r
\r
body[data-vpet-skin="on"] .vpet-skin-backdrop {\r
  opacity: 1;\r
}\r
\r
.vpet-skin-backdrop img {\r
  position: absolute;\r
  bottom: 0;\r
  right: var(--vpet-portrait-right);\r
  display: block;\r
  width: var(--vpet-portrait-width);\r
  height: var(--vpet-portrait-height);\r
  object-fit: contain;\r
  object-position: center bottom;\r
  mask-image: linear-gradient(90deg, transparent 0%, black 20% 100%);\r
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 20% 100%);\r
  opacity: 0.98;\r
  filter: none;\r
  transition: filter 180ms linear;\r
}\r
\r
.vpet-skin-backdrop[data-media="color"] img {\r
  display: none;\r
}\r
\r
/* Soften only the portrait's left edge; the face and host controls stay sharp. */\r
.vpet-skin-backdrop::before {\r
  position: absolute;\r
  z-index: 1;\r
  bottom: 0;\r
  right: var(--vpet-portrait-right);\r
  width: var(--vpet-portrait-width);\r
  height: var(--vpet-portrait-height);\r
  content: "";\r
  backdrop-filter: blur(22px);\r
  -webkit-backdrop-filter: blur(22px);\r
  mask-image: linear-gradient(90deg, transparent 0%, black 8%, rgb(0 0 0 / 70%) 22%, transparent 48% 100%);\r
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, rgb(0 0 0 / 70%) 22%, transparent 48% 100%);\r
}\r
\r
.vpet-skin-backdrop::after {\r
  position: absolute;\r
  z-index: 2;\r
  inset: 0;\r
  content: "";\r
  background: linear-gradient(90deg,\r
    var(--vpet-page, transparent) 0 22%,\r
    color-mix(in srgb, var(--vpet-page) 70%, transparent) 48%,\r
    color-mix(in srgb, var(--vpet-page) 35%, transparent) 68%,\r
    transparent 86% 100%);\r
}\r
\r
body[data-vpet-skin="on"] {\r
  --dsw-alias-bg-base: var(--vpet-bg-base) !important;\r
  --dsw-alias-bg-layer-1: var(--vpet-layer-1) !important;\r
  --dsw-alias-bg-layer-2: var(--vpet-layer-2) !important;\r
  --dsw-alias-bg-layer-3: var(--vpet-layer-3) !important;\r
  --dsw-specific-sidebar-fill: var(--vpet-sidebar) !important;\r
  --dsw-alias-label-primary: var(--vpet-ink) !important;\r
  --dsw-alias-label-primary-dimmed: var(--vpet-ink) !important;\r
  --dsw-alias-label-secondary: var(--vpet-secondary) !important;\r
  --dsw-alias-label-tertiary: var(--vpet-tertiary) !important;\r
  --dsw-alias-label-caption: var(--vpet-tertiary) !important;\r
  --dsw-alias-border-l1: var(--vpet-border) !important;\r
  --dsw-alias-border-l2-darkmode-thin: var(--vpet-border) !important;\r
  --dsw-alias-border-l2: var(--vpet-border) !important;\r
  --dsw-alias-border-l3: var(--vpet-border) !important;\r
  --dsw-alias-button-primary-fill: var(--vpet-accent) !important;\r
  --dsw-alias-button-primary-hover: var(--vpet-accent-hover) !important;\r
  --dsw-alias-button-info-fill: var(--vpet-accent) !important;\r
  --dsw-alias-button-info-hover: var(--vpet-accent-hover) !important;\r
  --dsw-alias-state-business-primary: var(--vpet-accent) !important;\r
  --dsw-alias-interactive-bg-hover: var(--vpet-hover) !important;\r
  --dsw-alias-interactive-bg-active: var(--vpet-hover) !important;\r
  --dsw-alias-button-elevated-fill: var(--vpet-layer-1) !important;\r
  --dsw-alias-button-floating-fill: var(--vpet-layer-2) !important;\r
  --dsw-alias-button-floating-hover: var(--vpet-layer-3) !important;\r
  --dsw-alias-interactive-bg-hover-solid: var(--vpet-layer-2) !important;\r
  --dsw-specific-bubble: var(--vpet-layer-2) !important;\r
  --dsw-specific-input-major: var(--vpet-layer-1) !important;\r
  --dsw-specific-menu: var(--vpet-layer-3) !important;\r
  --dsw-specific-selector: var(--vpet-layer-2) !important;\r
  --dsw-alias-markdown-citation: var(--vpet-layer-2) !important;\r
  --dsw-alias-markdown-code-block-banner: var(--vpet-layer-1) !important;\r
  --dsw-alias-markdown-code-block: var(--vpet-layer-1) !important;\r
  --dsw-alias-markdown-code-segment-selected: var(--vpet-layer-2) !important;\r
  --dsw-alias-markdown-code-segment-unselected: var(--vpet-layer-1) !important;\r
  --dsw-alias-markdown-inline-code: var(--vpet-layer-2) !important;\r
  --dsw-alias-markdown-placeholder: var(--vpet-layer-1) !important;\r
  --dsw-alias-markdown-tag: var(--vpet-layer-2) !important;\r
  background: var(--vpet-page) !important;\r
}\r
\r
/* All five forms drive the host's chrome from the same palette tokens. */\r
body[data-vpet-skin="on"] {\r
  --dsw-alias-brand-primary-new-colorprimary-new-color: var(--vpet-accent) !important;\r
  --dsw-alias-brand-primary: var(--vpet-accent) !important;\r
  --dsw-alias-brand-text: var(--vpet-accent) !important;\r
  --dsw-alias-label-primary-inverted: var(--vpet-on-accent) !important;\r
  --dsw-alias-bg-module-platform: var(--vpet-layer-3) !important;\r
  --dsw-specific-sidebar-nav-item-active: var(--vpet-layer-3) !important;\r
  --dsw-specific-sidebar-nav-item-hover: var(--vpet-hover) !important;\r
}\r
\r
/* Keep the host's text clipping and running-turn shimmer. */\r
body[data-vpet-skin="on"] [class*="_turnStatus"] {\r
  --dsw-static-deepseek-500: var(--vpet-accent) !important;\r
  --dsw-static-deepseek-200: var(--vpet-accent-soft) !important;\r
}\r
\r
body[data-vpet-skin="on"] [class*="_turnStatusClock"] {\r
  color: var(--vpet-accent) !important;\r
  -webkit-text-fill-color: var(--vpet-accent) !important;\r
}\r
\r
body[data-vpet-skin="on"] button[aria-label="\u65B0\u5EFA\u4F1A\u8BDD"] svg[viewBox="0 0 182 24"] > rect[width="52"] {\r
  fill: var(--vpet-accent) !important;\r
}\r
\r
body[data-vpet-skin="on"] button[aria-label="\u65B0\u5EFA\u4F1A\u8BDD"] svg[viewBox="0 0 182 24"] > g[clip-path*="badge"] path {\r
  fill: var(--vpet-on-accent) !important;\r
}\r
\r
body[data-vpet-skin="on"] [aria-label^="\u9009\u62E9\u6A21\u578B"] > span:nth-of-type(2) {\r
  color: var(--vpet-accent) !important;\r
}\r
\r
body[data-vpet-skin="on"] [class*="heroGlow"] ellipse {\r
  fill: var(--vpet-accent) !important;\r
  fill-opacity: 0.14 !important;\r
}\r
\r
body[data-vpet-skin="on"] span[class*="_previewBadge"] {\r
  color: var(--vpet-on-accent) !important;\r
  background: var(--vpet-accent) !important;\r
}\r
\r
body[data-vpet-skin="on"] button[aria-label="\u53D1\u9001\u6D88\u606F"] {\r
  color: var(--vpet-on-accent) !important;\r
  background: var(--vpet-accent) !important;\r
}\r
\r
body[data-vpet-skin="on"] button[aria-label="\u53D1\u9001\u6D88\u606F"]:disabled {\r
  opacity: 0.58;\r
}\r
\r
body[data-vpet-skin="on"] > #root {\r
  position: relative;\r
  z-index: 1;\r
  background: transparent !important;\r
}\r
\r
/* Windows paints the sidebar fill across the host frame, covering the portrait.\r
   Match macOS's transparent frame while keeping the sidebar, caption, and\r
   conversation surfaces painted by their own host rules. */\r
html[data-windows-titlebar] body[data-vpet-skin="on"] #root [class*="_frame"]:has(> [class*="_centerCol"]) {\r
  background: transparent !important;\r
}\r
\r
body[data-vpet-skin="on"] button,\r
body[data-vpet-skin="on"] input,\r
body[data-vpet-skin="on"] textarea {\r
  transition: color 160ms linear, background-color 160ms linear, border-color 160ms linear;\r
}\r
\r
/* Keep input text readable against an opaque card over the larger portrait. */\r
body[data-vpet-skin="on"] [data-composer-card="true"] {\r
  border-color: var(--vpet-border) !important;\r
  color: var(--vpet-ink) !important;\r
  background: var(--vpet-layer-1) !important;\r
  box-shadow: 0 8px 28px rgb(20 22 20 / 8%);\r
}\r
\r
body[data-vpet-skin="on"] [data-composer-card="true"] :is(textarea, [data-input-mirror="true"]) {\r
  color: var(--vpet-ink) !important;\r
  caret-color: var(--vpet-accent) !important;\r
}\r
\r
body[data-vpet-skin="on"] [data-composer-card="true"] textarea::placeholder {\r
  color: var(--vpet-tertiary) !important;\r
  opacity: 1;\r
}\r
\r
.vpet-effort-control {\r
  --vpet-control-accent: var(--dsw-alias-brand-primary-new-colorprimary-new-color, #4176e6);\r
  --vpet-control-rail: var(--dsw-alias-border-l3, rgb(0 0 0 / 16%));\r
  position: relative;\r
  display: flex;\r
  width: 124px;\r
  height: 28px;\r
  align-items: center;\r
  margin: 0 3px;\r
  overflow: visible;\r
}\r
\r
body[data-vpet-skin="on"] .vpet-effort-control {\r
  --vpet-control-accent: var(--vpet-accent);\r
  --vpet-control-rail: color-mix(in srgb, var(--vpet-secondary) 28%, transparent);\r
}\r
\r
.vpet-effort-control__ticks {\r
  position: absolute;\r
  z-index: 0;\r
  inset: 0 10px;\r
  pointer-events: none;\r
}\r
\r
.vpet-effort-control__ticks::before {\r
  position: absolute;\r
  top: 50%;\r
  right: 0;\r
  left: 0;\r
  height: 1px;\r
  content: "";\r
  background: var(--vpet-control-rail);\r
  transform: translateY(-50%);\r
}\r
\r
.vpet-effort-control__tooltip {\r
  position: absolute;\r
  z-index: 4;\r
  bottom: calc(100% + 7px);\r
  left: calc(10px + (100% - 20px) * var(--vpet-slider-ratio));\r
  min-width: max-content;\r
  padding: 5px 8px;\r
  border: 1px solid var(--vpet-border, rgb(0 0 0 / 12%));\r
  border-radius: 7px;\r
  color: var(--vpet-ink, #171816);\r
  background: var(--vpet-layer-1, #fff);\r
  box-shadow: 0 5px 16px rgb(0 0 0 / 16%);\r
  font-size: 11px;\r
  font-weight: 600;\r
  line-height: 16px;\r
  letter-spacing: 0.01em;\r
  pointer-events: none;\r
  transform: translateX(-50%);\r
  white-space: nowrap;\r
}\r
\r
.vpet-effort-control__tooltip::after {\r
  position: absolute;\r
  top: 100%;\r
  left: 50%;\r
  width: 7px;\r
  height: 7px;\r
  content: "";\r
  background: inherit;\r
  transform: translate(-50%, -4px) rotate(45deg);\r
}\r
\r
.vpet-effort-control__tick {\r
  position: absolute;\r
  top: 50%;\r
  width: 1px;\r
  height: 7px;\r
  background: var(--vpet-control-accent);\r
  opacity: 0.42;\r
  transform: translate(-50%, -50%);\r
}\r
\r
.vpet-effort-control__range {\r
  position: relative;\r
  z-index: 1;\r
  width: calc(100% - 7px);\r
  height: 28px;\r
  margin: 0 3.5px;\r
  cursor: ew-resize;\r
  appearance: none;\r
  background: transparent;\r
  touch-action: pan-y;\r
}\r
\r
.vpet-effort-control__range:disabled {\r
  cursor: progress;\r
  opacity: 0.58;\r
}\r
\r
.vpet-effort-control__range::-webkit-slider-runnable-track {\r
  height: 1px;\r
  border-radius: 1px;\r
  background: transparent;\r
}\r
\r
.vpet-effort-control__range::-webkit-slider-thumb {\r
  width: 13px;\r
  height: 13px;\r
  margin-top: -6px;\r
  border: 1.5px solid color-mix(in srgb, var(--vpet-control-accent) 72%, transparent);\r
  border-radius: 50%;\r
  appearance: none;\r
  background: radial-gradient(circle, var(--vpet-control-accent) 0 2px, color-mix(in srgb, var(--vpet-control-accent) 22%, var(--dsw-alias-bg-layer-1, #fff)) 2.5px);\r
  box-shadow: 0 1px 4px rgb(0 0 0 / 14%);\r
}\r
\r
body[data-vpet-skin="on"] .vpet-effort-control__range::-webkit-slider-thumb {\r
  width: 13px;\r
  height: 13px;\r
  margin-top: -6px;\r
  border-color: color-mix(in srgb, var(--vpet-control-accent) 72%, transparent);\r
  background: radial-gradient(circle, var(--vpet-control-accent) 0 2px, color-mix(in srgb, var(--vpet-control-accent) 22%, var(--vpet-layer-1)) 2.5px);\r
}\r
\r
.vpet-effort-control__range::-moz-range-track {\r
  height: 1px;\r
  background: transparent;\r
}\r
\r
.vpet-effort-control__range::-moz-range-progress {\r
  height: 1px;\r
  background: transparent;\r
}\r
\r
.vpet-effort-control__range::-moz-range-thumb {\r
  width: 11px;\r
  height: 11px;\r
  border: 1.5px solid color-mix(in srgb, var(--vpet-control-accent) 72%, transparent);\r
  border-radius: 50%;\r
  background: color-mix(in srgb, var(--vpet-control-accent) 24%, var(--dsw-alias-bg-layer-1, #fff));\r
}\r
\r
.vpet-effort-control__range:focus-visible {\r
  outline: none;\r
}\r
\r
.vpet-effort-control[data-state="error"] {\r
  --vpet-control-accent: var(--dsw-alias-state-error-primary, #e43c3c);\r
}\r
\r
.vpet-appearance-choice {\r
  box-sizing: border-box;\r
  border: 1px solid var(--dsw-alias-border-l2);\r
  flex: 180px;\r
  flex-direction: column;\r
  justify-content: center;\r
  align-items: center;\r
  gap: 4px;\r
  padding: 20px 32px;\r
  border-radius: 16px;\r
  font: inherit;\r
  color: var(--dsw-alias-label-primary);\r
  cursor: pointer;\r
  background: transparent;\r
  font-size: 14px;\r
  line-height: 22px;\r
  display: flex;\r
}\r
\r
[class*="_8HJdBW_cubeRow"]:has(.vpet-appearance-choice) {\r
  display: grid;\r
  grid-template-columns: repeat(4, minmax(0, 1fr));\r
}\r
\r
.vpet-appearance-choice:hover:not([aria-pressed="true"]) {\r
  background: var(--dsw-alias-interactive-bg-hover);\r
}\r
\r
.vpet-appearance-choice[aria-pressed="true"] {\r
  border-color: var(--dsw-static-neutral-bluish-400);\r
  background: var(--dsw-alias-bg-module-platform);\r
}\r
\r
.vpet-appearance-choice__icon {\r
  display: block;\r
  flex: 0 0 16px;\r
  width: 16px;\r
  height: 16px;\r
  color: currentColor;\r
  font-size: 16px;\r
  line-height: 16px;\r
}\r
\r
.vpet-appearance-choice__label {\r
  display: block;\r
}\r
\r
/* Keep the host's three theme cubes untouched. These rules only style the\r
   fourth button that is appended to the host cube row. */\r
.vpet-appearance-choice:disabled {\r
  cursor: progress;\r
  opacity: 0.7;\r
}\r
\r
.vpet-appearance-binding {\r
  box-sizing: border-box;\r
  display: flex;\r
  width: 100%;\r
  min-height: 28px;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 16px;\r
  padding: 4px 0 0;\r
  color: var(--dsw-alias-label-primary);\r
  font: inherit;\r
  font-size: 14px;\r
  line-height: 22px;\r
  cursor: pointer;\r
}\r
\r
.vpet-appearance-binding__label {\r
  display: block;\r
  min-width: 0;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
.vpet-appearance-binding__copy {\r
  display: flex;\r
  min-width: 0;\r
  flex-direction: column;\r
  gap: 1px;\r
}\r
\r
.vpet-appearance-binding__description {\r
  display: block;\r
  overflow: hidden;\r
  color: var(--dsw-alias-label-secondary);\r
  font-size: 12px;\r
  line-height: 18px;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
.vpet-appearance-binding__input {\r
  position: relative;\r
  flex: 0 0 36px;\r
  width: 36px;\r
  height: 20px;\r
  margin: 0;\r
  border: 1px solid var(--dsw-alias-border-l2);\r
  border-radius: 999px;\r
  outline: none;\r
  cursor: pointer;\r
  appearance: none;\r
  background: var(--dsw-alias-interactive-bg-hover, var(--dsw-alias-bg-module-platform));\r
}\r
\r
.vpet-appearance-binding__input::before {\r
  position: absolute;\r
  top: 2px;\r
  left: 2px;\r
  width: 14px;\r
  height: 14px;\r
  border-radius: 50%;\r
  content: "";\r
  background: var(--dsw-alias-label-primary);\r
  box-shadow: 0 1px 3px rgb(0 0 0 / 18%);\r
  transition: transform 160ms ease, background-color 160ms ease;\r
}\r
\r
.vpet-appearance-binding__input:checked {\r
  border-color: var(--dsw-static-neutral-bluish-400);\r
  background: var(--dsw-static-neutral-bluish-400);\r
}\r
\r
.vpet-appearance-binding__input:checked::before {\r
  background: var(--dsw-alias-bg-layer-1, #fff);\r
  transform: translateX(16px);\r
}\r
\r
.vpet-appearance-binding__input:focus-visible {\r
  box-shadow: 0 0 0 2px var(--dsw-alias-interactive-bg-hover);\r
}\r
\r
.vpet-appearance-binding__input:disabled {\r
  cursor: progress;\r
  opacity: 0.7;\r
}\r
\r
@media (max-width: 760px) {\r
  .vpet-effort-control {\r
    width: 92px;\r
  }\r
\r
  .vpet-skin-backdrop {\r
    --vpet-portrait-right: 0;\r
    --vpet-portrait-width: 100vw;\r
    --vpet-portrait-height: 65vh;\r
  }\r
\r
  .vpet-skin-backdrop::before {\r
    backdrop-filter: blur(12px);\r
    -webkit-backdrop-filter: blur(12px);\r
  }\r
\r
  .vpet-skin-backdrop img {\r
  }\r
\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .vpet-skin-backdrop,\r
  .vpet-skin-backdrop img,\r
  body[data-vpet-skin="on"] button,\r
  body[data-vpet-skin="on"] input,\r
  body[data-vpet-skin="on"] textarea {\r
    transition: none;\r
  }\r
}\r
`;

// src/portraits.js
var PORTRAITS = [
  { file: "vpet/68.png", label: "Lv 1" },
  { file: "vpet/69.png", label: "Lv 20" },
  { file: "vpet/70.png", label: "Lv 300" },
  { file: "vpet/71.png", label: "Lv 400/1" },
  { file: "vpet/72.png", label: "Lv 5000/401" }
];

// src/client/logic.ts
var PREVIEW_MAX_FRAME = 240;
var STOPS = [
  { dark: false, page: [247, 238, 241], surface: [255, 248, 250], surface2: [240, 224, 233], ink: [53, 36, 46], secondary: [116, 85, 101], accent: [163, 81, 107] },
  { dark: false, page: [239, 237, 247], surface: [250, 248, 255], surface2: [233, 229, 244], ink: [42, 37, 61], secondary: [101, 93, 123], accent: [108, 96, 153] },
  { dark: false, page: [229, 235, 247], surface: [246, 248, 255], surface2: [217, 226, 244], ink: [32, 42, 65], secondary: [85, 99, 128], accent: [77, 97, 157] },
  { dark: true, page: [35, 28, 35], surface: [52, 41, 49], surface2: [66, 50, 59], ink: [248, 237, 241], secondary: [202, 180, 190], accent: [211, 139, 157] },
  { dark: true, page: [31, 26, 30], surface: [48, 37, 40], surface2: [65, 48, 49], ink: [250, 239, 221], secondary: [211, 193, 174], accent: [217, 182, 119] }
];
function clampFrame(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(PREVIEW_MAX_FRAME, Math.max(0, Math.round(value)));
}
function frameForEffort(index, count) {
  if (count <= 1 || !Number.isFinite(index)) return 0;
  const safe = Math.min(count - 1, Math.max(0, Math.round(index)));
  return Math.round(safe / (count - 1) * PREVIEW_MAX_FRAME);
}
function nearestEffortIndex(frame, efforts) {
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
function selectedEffortIndex(efforts, selectedId, defaultId) {
  const id = selectedId ?? defaultId;
  return id === void 0 ? -1 : efforts.findIndex((effort) => effort.id === id);
}
function portraitIndexForFrame(rawFrame) {
  const frame = clampFrame(rawFrame);
  const index = Math.round(frame / PREVIEW_MAX_FRAME * (PORTRAITS.length - 1));
  return index === 3 && frame < 162 ? 2 : index;
}
function portraitForFrame(rawFrame) {
  return PORTRAITS[portraitIndexForFrame(rawFrame)];
}
function indicatorLabel(rawFrame, efforts) {
  const effort = efforts[nearestEffortIndex(rawFrame, efforts)];
  return effort === void 0 ? portraitForFrame(rawFrame).label : `${portraitForFrame(rawFrame).label} \xB7 ${effort.name}`;
}
function mix(a, b, amount) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * amount),
    Math.round(a[1] + (b[1] - a[1]) * amount),
    Math.round(a[2] + (b[2] - a[2]) * amount)
  ];
}
function rgb(value, alpha = 1) {
  return alpha === 1 ? `rgb(${value[0]} ${value[1]} ${value[2]})` : `rgb(${value[0]} ${value[1]} ${value[2]} / ${alpha})`;
}
function paletteForFrame(rawFrame) {
  const frame = clampFrame(rawFrame);
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
    hover: rgb(ink, dark ? 0.09 : 0.07)
  };
}

// src/client/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PACKAGE_ID = "dsh-client-vpet-skin";
var ASSET_PREFIX = `/plugins/${PACKAGE_ID}/assets`;
var FIRST_PORTRAIT_FILE = PORTRAITS[0].file;
var BIND_EFFORT_KEY = "dsh-vpet-skin.bind-effort";
var cssVariables = [
  "--vpet-page",
  "--vpet-bg-base",
  "--vpet-layer-1",
  "--vpet-layer-2",
  "--vpet-layer-3",
  "--vpet-sidebar",
  "--vpet-ink",
  "--vpet-secondary",
  "--vpet-tertiary",
  "--vpet-border",
  "--vpet-accent",
  "--vpet-accent-hover",
  "--vpet-accent-soft",
  "--vpet-on-accent",
  "--vpet-hover"
];
var SkinPresenter = class {
  scope;
  theme;
  root;
  portrait;
  preloads;
  portraitReady = false;
  enabled = true;
  // Default to the max frame so the first paint after load is the dark shell;
  // starting at 0 flashed the light palette before the directory resolved.
  frame = PREVIEW_MAX_FRAME;
  raf = 0;
  disposed = false;
  unsubscribe;
  constructor(scope, theme) {
    this.scope = scope;
    this.theme = theme;
    this.root = document.createElement("div");
    this.root.className = "vpet-skin-backdrop";
    this.root.dataset.plugin = PACKAGE_ID;
    this.root.setAttribute("aria-hidden", "true");
    this.portrait = document.createElement("img");
    this.portrait.alt = "";
    this.portrait.draggable = false;
    this.portrait.decoding = "async";
    this.portrait.src = `${ASSET_PREFIX}/${portraitForFrame(this.frame).file}`;
    this.portrait.addEventListener("error", this.handlePortraitError);
    this.preloads = PORTRAITS.map(({ file }) => {
      const image = new Image();
      image.loading = "eager";
      image.decoding = "async";
      image.src = `${ASSET_PREFIX}/${file}`;
      return image;
    });
    void Promise.all(this.preloads.map((image) => image.decode())).then(
      () => {
        if (this.disposed) return;
        this.portraitReady = true;
        delete this.root.dataset.media;
        this.updatePortrait();
      },
      () => {
      }
    );
    this.root.append(this.portrait);
    document.body.prepend(this.root);
    this.unsubscribe = scope.subscribe(() => this.syncSettings());
    this.syncSettings();
  }
  handlePortraitError = () => {
    if (this.portrait.src.endsWith(FIRST_PORTRAIT_FILE)) {
      this.root.dataset.media = "color";
      return;
    }
    this.portraitReady = false;
    this.portrait.src = `${ASSET_PREFIX}/${FIRST_PORTRAIT_FILE}`;
    delete this.root.dataset.media;
  };
  syncSettings() {
    this.setEnabled(this.scope.getSnapshot().enabled);
  }
  getFrame() {
    return this.frame;
  }
  setEnabled(enabled) {
    this.enabled = enabled;
    if (enabled) {
      if (!this.root.isConnected) document.body.prepend(this.root);
      document.body.dataset.vpetSkin = "on";
      this.applyFrame();
    } else {
      this.root.remove();
      delete document.body.dataset.vpetSkin;
      for (const name of cssVariables) document.body.style.removeProperty(name);
    }
  }
  setFrame(frame) {
    this.frame = clampFrame(frame);
    if (!this.enabled) return;
    if (this.raf !== 0) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      this.applyFrame();
    });
  }
  applyFrame() {
    const palette = paletteForFrame(this.frame);
    const body = document.body;
    this.syncNativeTheme(palette.dark ? "dark" : "light");
    body.style.setProperty("--vpet-page", palette.page);
    body.style.setProperty("--vpet-bg-base", palette.base);
    body.style.setProperty("--vpet-layer-1", palette.layer1);
    body.style.setProperty("--vpet-layer-2", palette.layer2);
    body.style.setProperty("--vpet-layer-3", palette.layer3);
    body.style.setProperty("--vpet-sidebar", palette.sidebar);
    body.style.setProperty("--vpet-ink", palette.ink);
    body.style.setProperty("--vpet-secondary", palette.secondary);
    body.style.setProperty("--vpet-tertiary", palette.tertiary);
    body.style.setProperty("--vpet-border", palette.border);
    body.style.setProperty("--vpet-accent", palette.accent);
    body.style.setProperty("--vpet-accent-hover", palette.accentHover);
    body.style.setProperty("--vpet-accent-soft", palette.accentSoft);
    body.style.setProperty("--vpet-on-accent", palette.onAccent);
    body.style.setProperty("--vpet-hover", palette.hover);
    this.updatePortrait();
  }
  syncNativeTheme(theme) {
    if (!this.enabled || this.theme.getTheme().preference === theme) return;
    this.theme.setTheme(theme);
  }
  updatePortrait() {
    if (!this.portraitReady) return;
    const source = `${ASSET_PREFIX}/${portraitForFrame(this.frame).file}`;
    if (this.portrait.getAttribute("src") !== source) this.portrait.src = source;
  }
  async choose(enabled) {
    this.setEnabled(enabled);
    try {
      await this.scope.set(enabled);
    } catch (error) {
      this.syncSettings();
      throw error;
    }
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.unsubscribe();
    if (this.raf !== 0) cancelAnimationFrame(this.raf);
    this.portrait.removeEventListener("error", this.handlePortraitError);
    for (const image of this.preloads) image.src = "";
    this.root.remove();
    document.body.removeAttribute("data-vpet-skin");
    for (const name of cssVariables) document.body.style.removeProperty(name);
  }
};
function modelReasoning(state) {
  const current = state.current;
  if (current === null) return null;
  const group = state.groups.find((item) => item.id === current.provider);
  const model = group?.models.find((item) => item.id === current.model);
  if (model?.reasoning === void 0) return null;
  return {
    selection: current,
    efforts: model.reasoning.efforts,
    defaultEffort: model.reasoning.defaultEffort
  };
}
function VPetEffortSlider({ directory, load, select, presenter, scope }) {
  const state = (0, import_react.useSyncExternalStore)(
    (listener) => directory.subscribe(listener),
    () => directory.getSnapshot()
  );
  const skin = (0, import_react.useSyncExternalStore)(
    (listener) => scope.subscribe(listener),
    () => scope.getSnapshot()
  );
  const reasoning = (0, import_react.useMemo)(() => modelReasoning(state), [state]);
  const efforts = reasoning?.efforts ?? [];
  const committedIndex = selectedEffortIndex(
    efforts,
    reasoning?.selection.reasoningEffort,
    reasoning?.defaultEffort
  );
  const committedFrame = committedIndex < 0 ? PREVIEW_MAX_FRAME : frameForEffort(committedIndex, efforts.length);
  const bindEffort = skin.bindEffort;
  const [frame, setFrame] = (0, import_react.useState)(() => bindEffort ? committedFrame : presenter.getFrame());
  const [pending, setPending] = (0, import_react.useState)(false);
  const [failed, setFailed] = (0, import_react.useState)(false);
  const [interacting, setInteracting] = (0, import_react.useState)(false);
  const dragging = (0, import_react.useRef)(false);
  const dragStartFrame = (0, import_react.useRef)(frame);
  const enabled = skin.enabled;
  (0, import_react.useEffect)(() => {
    if (enabled) load();
  }, [enabled, load]);
  (0, import_react.useEffect)(() => {
    if (!bindEffort || dragging.current || pending) return;
    setFrame(committedFrame);
    presenter.setFrame(committedFrame);
  }, [bindEffort, committedFrame, pending, presenter]);
  if (!enabled) return null;
  if (bindEffort && (reasoning === null || efforts.length < 2)) return null;
  const previewIndex = nearestEffortIndex(frame, efforts);
  const previewEffort = efforts[previewIndex];
  const progressRatio = frame / PREVIEW_MAX_FRAME;
  const tooltipLabel = indicatorLabel(frame, bindEffort ? efforts : []);
  const commit = async (rawFrame) => {
    if (!bindEffort) {
      dragging.current = false;
      setFrame(rawFrame);
      presenter.setFrame(rawFrame);
      return;
    }
    const targetIndex = nearestEffortIndex(rawFrame, efforts);
    const target = efforts[targetIndex];
    if (target === void 0) return;
    const targetFrame = frameForEffort(targetIndex, efforts.length);
    dragging.current = false;
    setFrame(targetFrame);
    presenter.setFrame(targetFrame);
    if (targetIndex === committedIndex || pending) return;
    setPending(true);
    setFailed(false);
    const accepted = await select({
      provider: reasoning.selection.provider,
      model: reasoning.selection.model,
      reasoningEffort: target.id
    });
    setPending(false);
    if (!accepted) {
      setFailed(true);
      setFrame(committedFrame);
      presenter.setFrame(committedFrame);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "vpet-effort-control",
      "data-plugin": PACKAGE_ID,
      "data-state": failed ? "error" : pending ? "pending" : "ready",
      title: bindEffort ? previewEffort?.name : void 0,
      children: [
        interacting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "output",
          {
            className: "vpet-effort-control__tooltip",
            style: { "--vpet-slider-ratio": progressRatio },
            children: tooltipLabel
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vpet-effort-control__ticks", "aria-hidden": "true", children: efforts.map((effort, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "i",
          {
            className: "vpet-effort-control__tick",
            style: { left: `${frameForEffort(index, efforts.length) / PREVIEW_MAX_FRAME * 100}%` }
          },
          effort.id
        )) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            className: "vpet-effort-control__range",
            type: "range",
            min: 0,
            max: PREVIEW_MAX_FRAME,
            step: 1,
            value: frame,
            disabled: pending || state.status === "selecting",
            "aria-label": bindEffort ? "\u601D\u8003\u7B49\u7EA7" : "\u76AE\u80A4\u8FDB\u5EA6",
            "aria-valuetext": bindEffort ? previewEffort?.name ?? "" : tooltipLabel,
            onPointerDown: () => {
              dragging.current = true;
              dragStartFrame.current = frame;
              setInteracting(true);
            },
            onInput: (event) => {
              dragging.current = true;
              const next = Number(event.currentTarget.value);
              setFrame(next);
              presenter.setFrame(next);
            },
            onPointerUp: (event) => {
              setInteracting(false);
              void commit(Number(event.currentTarget.value));
            },
            onPointerCancel: () => {
              setInteracting(false);
              dragging.current = false;
              setFrame(dragStartFrame.current);
              presenter.setFrame(dragStartFrame.current);
            },
            onKeyUp: (event) => {
              setInteracting(false);
              if (event.key !== "Escape") void commit(Number(event.currentTarget.value));
            },
            onBlur: (event) => {
              setInteracting(false);
              if (dragging.current) void commit(Number(event.currentTarget.value));
            },
            onKeyDown: (event) => {
              setInteracting(true);
              if (event.key === "Escape" && !pending) {
                setInteracting(false);
                dragging.current = false;
                setFrame(dragStartFrame.current);
                presenter.setFrame(dragStartFrame.current);
              }
            }
          }
        )
      ]
    }
  );
}
var NATIVE_APPEARANCE_GROUP = '[class*="_8HJdBW_group"]';
var NATIVE_APPEARANCE_ROW = '[class*="_8HJdBW_cubeRow"]';
var VPET_APPEARANCE_BUTTON = "vpet-appearance-choice";
var VPET_BINDING_CONTROL = "vpet-appearance-binding";
var VPET_BINDING_INPUT = "vpet-appearance-binding__input";
function installVPetAppearanceButton(scope, presenter) {
  let pending = false;
  const hookedNativeButtons = /* @__PURE__ */ new Set();
  const nativeClickHandlers = /* @__PURE__ */ new Map();
  const sync = () => {
    const group = [...document.querySelectorAll(NATIVE_APPEARANCE_GROUP)].find((node) => node.querySelector('[class*="_8HJdBW_themeCube"]'));
    const row = group?.querySelector(NATIVE_APPEARANCE_ROW);
    if (row === void 0 || row === null) return;
    let customButton = row.querySelector(`.${VPET_APPEARANCE_BUTTON}`);
    if (customButton === null) {
      customButton = document.createElement("button");
      customButton.className = VPET_APPEARANCE_BUTTON;
      customButton.type = "button";
      customButton.dataset.plugin = PACKAGE_ID;
      customButton.setAttribute("aria-label", "VPet");
      const icon = document.createElement("span");
      icon.className = "vpet-appearance-choice__icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "\u25C8";
      const label = document.createElement("span");
      label.className = "vpet-appearance-choice__label";
      label.textContent = "VPet";
      customButton.append(icon, label);
      customButton.addEventListener("click", () => {
        if (pending || scope.getSnapshot().enabled) return;
        pending = true;
        sync();
        void presenter.choose(true).finally(() => {
          pending = false;
          sync();
        });
      });
    }
    if (customButton.parentElement !== row) row.append(customButton);
    const snapshot = scope.getSnapshot();
    customButton.disabled = pending;
    customButton.setAttribute("aria-pressed", String(snapshot.enabled));
    let bindingControl = group.querySelector(`.${VPET_BINDING_CONTROL}`);
    if (!snapshot.enabled) {
      bindingControl?.remove();
      bindingControl = null;
    } else if (bindingControl === null) {
      bindingControl = document.createElement("label");
      bindingControl.className = VPET_BINDING_CONTROL;
      bindingControl.dataset.plugin = PACKAGE_ID;
      const bindingCopy = document.createElement("span");
      bindingCopy.className = "vpet-appearance-binding__copy";
      const bindingLabel = document.createElement("span");
      bindingLabel.className = "vpet-appearance-binding__label";
      const bindingText = document.documentElement.lang.toLowerCase().startsWith("en") ? "Bind slider to reasoning level" : "VPet \u7ED1\u5B9A\u601D\u8003\u7B49\u7EA7";
      bindingLabel.textContent = bindingText;
      const bindingDescription = document.createElement("span");
      bindingDescription.className = "vpet-appearance-binding__description";
      bindingDescription.id = "vpet-appearance-binding-description";
      bindingDescription.textContent = document.documentElement.lang.toLowerCase().startsWith("en") ? "When off, the slider does not change the reasoning level." : "\u5173\u95ED\u4E4B\u540E\u6ED1\u5757\u4E0D\u8054\u52A8\u601D\u8003\u7B49\u7EA7";
      bindingCopy.append(bindingLabel, bindingDescription);
      const bindingInput = document.createElement("input");
      bindingInput.className = VPET_BINDING_INPUT;
      bindingInput.type = "checkbox";
      bindingInput.setAttribute("role", "switch");
      bindingInput.setAttribute("aria-label", bindingText);
      bindingInput.setAttribute("aria-describedby", bindingDescription.id);
      bindingInput.addEventListener("change", () => {
        void scope.setBindEffort(bindingInput.checked).catch(() => sync());
      });
      bindingControl.append(bindingCopy, bindingInput);
      group.append(bindingControl);
    }
    if (bindingControl !== null) {
      const bindingInput = bindingControl.querySelector(`.${VPET_BINDING_INPUT}`);
      if (bindingInput !== null) {
        bindingInput.checked = snapshot.bindEffort;
        bindingInput.setAttribute("aria-checked", String(snapshot.bindEffort));
        bindingInput.disabled = pending;
      }
    }
    for (const nativeButton of row.querySelectorAll('[class*="_8HJdBW_themeCube"]')) {
      if (hookedNativeButtons.has(nativeButton)) continue;
      hookedNativeButtons.add(nativeButton);
      const handleNativeClick = () => {
        if (pending || !scope.getSnapshot().enabled) return;
        pending = true;
        sync();
        void presenter.choose(false).finally(() => {
          pending = false;
          sync();
        });
      };
      nativeClickHandlers.set(nativeButton, handleNativeClick);
      nativeButton.addEventListener("click", handleNativeClick, { capture: true });
    }
  };
  const observer = new MutationObserver(sync);
  observer.observe(document.body, { childList: true, subtree: true });
  const unsubscribe = scope.subscribe(sync);
  sync();
  return () => {
    observer.disconnect();
    unsubscribe();
    for (const [nativeButton, handleNativeClick] of nativeClickHandlers) {
      nativeButton.removeEventListener("click", handleNativeClick, { capture: true });
    }
    document.querySelectorAll(`.${VPET_APPEARANCE_BUTTON}`).forEach((button) => button.remove());
    document.querySelectorAll(`.${VPET_BINDING_CONTROL}`).forEach((control) => control.remove());
  };
}
var inject = [
  "slots",
  "sessions",
  "modelDirectories",
  "theme"
];
function createPreferenceStore() {
  let snapshot = {
    enabled: true,
    bindEffort: localStorage.getItem(BIND_EFFORT_KEY) !== "0"
  };
  const listeners = /* @__PURE__ */ new Set();
  const onStorage = (event) => {
    if (event.key !== BIND_EFFORT_KEY) return;
    const next = {
      enabled: snapshot.enabled,
      bindEffort: event.newValue !== "0"
    };
    if (next.enabled === snapshot.enabled && next.bindEffort === snapshot.bindEffort) return;
    snapshot = next;
    for (const listener of listeners) listener();
  };
  window.addEventListener("storage", onStorage);
  return {
    getSnapshot: () => snapshot,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    async set(enabled) {
      if (enabled === snapshot.enabled) return;
      snapshot = { ...snapshot, enabled };
      for (const listener of listeners) listener();
    },
    async setBindEffort(bindEffort) {
      if (bindEffort === snapshot.bindEffort) return;
      localStorage.setItem(BIND_EFFORT_KEY, bindEffort ? "1" : "0");
      snapshot = { ...snapshot, bindEffort };
      for (const listener of listeners) listener();
    },
    dispose() {
      window.removeEventListener("storage", onStorage);
      listeners.clear();
    }
  };
}
function apply(ctx) {
  const style = document.createElement("style");
  style.dataset.plugin = PACKAGE_ID;
  style.textContent = skin_default;
  document.head.append(style);
  ctx.effect(() => () => style.remove(), "vpet-skin: scoped styles");
  const scope = createPreferenceStore();
  ctx.effect(() => () => scope.dispose(), "vpet-skin: appearance preference");
  const theme = ctx.get("theme");
  const presenter = new SkinPresenter(scope, theme);
  ctx.effect(() => () => presenter.dispose(), "vpet-skin: backdrop presenter");
  ctx.effect(
    () => installVPetAppearanceButton(scope, presenter),
    "vpet-skin: native appearance extension"
  );
  ctx.slots.inject("conversation.input.right", () => ctx.slots.register({
    name: "conversation.input.right",
    id: "vpet-intensity-control",
    order: 10,
    inject: (sessionId) => {
      const available = ctx.sessions.subagentAddress(sessionId) === void 0;
      const directory = ctx.modelDirectories.directoryFor(sessionId);
      return {
        directory: directory.store,
        presenter,
        scope,
        load: () => {
          if (available) void directory.load().catch(() => void 0);
        },
        select: (selection) => available ? directory.select(selection).then((result) => result.ok, () => false) : Promise.resolve(false)
      };
    }
  }, VPetEffortSlider));
}
return module.exports;}});
//# sourceMappingURL=client.js.map
