import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Context as ClientContext } from "@deepseek-ai/cordis";
import type { SnapshotStore } from "@deepseek-ai/dsh-client-store";
import type {} from "@deepseek-ai/dsh-client-ui-conversation/client";
import type {} from "@deepseek-ai/dsh-client-ui-model-selection/client";
import styles from "./skin.css";
import { PORTRAITS } from "../portraits.js";
import {
  PREVIEW_MAX_FRAME,
  clampFrame,
  frameForEffort,
  indicatorLabel,
  nearestEffortIndex,
  paletteForFrame,
  portraitForFrame,
  selectedEffortIndex,
  type EffortLike,
} from "./logic";

const PACKAGE_ID = "dsh-client-vpet-skin";
const ASSET_PREFIX = `/plugins/${PACKAGE_ID}/assets`;
const FIRST_PORTRAIT_FILE = PORTRAITS[0].file;
const BIND_EFFORT_KEY = "dsh-vpet-skin.bind-effort";

interface SkinSettings {
  enabled: boolean;
  bindEffort: boolean;
}

interface PreferenceStore {
  getSnapshot(): SkinSettings;
  subscribe(listener: () => void): () => void;
  set(enabled: boolean): Promise<void>;
  setBindEffort(enabled: boolean): Promise<void>;
  dispose(): void;
}

type NativeThemeId = "light" | "dark";

interface ThemeService {
  getTheme(): { preference: string };
  setTheme(id: NativeThemeId | "system"): void;
}

interface ModelSelection {
  provider: string;
  model: string;
  reasoningEffort?: string;
}

interface CatalogModel {
  id: string;
  reasoning?: {
    efforts: EffortLike[];
    defaultEffort?: string;
  };
}

interface ModelDirectoryState {
  current: ModelSelection | null;
  groups: readonly { id: string; models: CatalogModel[] }[];
  status: "idle" | "loading" | "ready" | "selecting" | "error";
  error: string | null;
}

interface ModelDirectory {
  store: SnapshotStore<ModelDirectoryState>;
  load(): Promise<unknown>;
  select(selection: ModelSelection): Promise<{ ok: boolean }>;
}

interface SliderProps {
  directory: SnapshotStore<ModelDirectoryState>;
  load: () => void;
  select: (selection: ModelSelection) => Promise<boolean>;
  presenter: SkinPresenter;
  scope: PreferenceStore;
}

const cssVariables = [
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
  "--vpet-hover",
] as const;

class SkinPresenter {
  private readonly scope: PreferenceStore;
  private readonly theme: ThemeService;
  private readonly root: HTMLDivElement;
  private readonly portrait: HTMLImageElement;
  private readonly preloads: HTMLImageElement[];
  private portraitReady = false;
  private enabled = true;
  // Default to the max frame so the first paint after load is the dark shell;
  // starting at 0 flashed the light palette before the directory resolved.
  private frame = PREVIEW_MAX_FRAME;
  private raf = 0;
  private disposed = false;
  private unsubscribe: () => void;

  constructor(scope: PreferenceStore, theme: ThemeService) {
    this.scope = scope;
    this.theme = theme;
    this.root = document.createElement("div");
    this.root.className = "vpet-skin-backdrop";
    this.root.dataset.plugin = PACKAGE_ID;
    // Show the current portrait immediately while the remaining frames
    // are fetched and decoded. A request being complete does not mean the
    // bitmap is ready for a tear-free first swap.
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

    // `new Image()` starts the requests, but the browser may still defer
    // decoding until the image is attached to the document. Wait for all
    // frames up front so the first slider interaction never reveals a blank
    // or half-painted frame.
    void Promise.all(this.preloads.map((image) => image.decode())).then(
      () => {
        if (this.disposed) return;
        this.portraitReady = true;
        delete this.root.dataset.media;
        this.updatePortrait();
      },
      () => {
        // Keep the already-visible first portrait if another optional
        // frame cannot be decoded. It is still a valid skin fallback.
      },
    );

    this.root.append(this.portrait);
    document.body.prepend(this.root);

    this.unsubscribe = scope.subscribe(() => this.syncSettings());
    this.syncSettings();
  }

  private readonly handlePortraitError = () => {
    if (this.portrait.src.endsWith(FIRST_PORTRAIT_FILE)) {
      this.root.dataset.media = "color";
      return;
    }
    this.portraitReady = false;
    this.portrait.src = `${ASSET_PREFIX}/${FIRST_PORTRAIT_FILE}`;
    delete this.root.dataset.media;
  };

  private syncSettings() {
    this.setEnabled(this.scope.getSnapshot().enabled);
  }

  getFrame() {
    return this.frame;
  }

  setEnabled(enabled: boolean) {
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

  setFrame(frame: number) {
    this.frame = clampFrame(frame);
    if (!this.enabled) return;
    if (this.raf !== 0) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      this.applyFrame();
    });
  }

  private applyFrame() {
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

  private syncNativeTheme(theme: NativeThemeId) {
    if (!this.enabled || this.theme.getTheme().preference === theme) return;
    this.theme.setTheme(theme);
  }

  private updatePortrait() {
    if (!this.portraitReady) return;
    const source = `${ASSET_PREFIX}/${portraitForFrame(this.frame).file}`;
    if (this.portrait.getAttribute("src") !== source) this.portrait.src = source;
  }

  async choose(enabled: boolean) {
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
}

function modelReasoning(state: ModelDirectoryState) {
  const current = state.current;
  if (current === null) return null;
  const group = state.groups.find((item) => item.id === current.provider);
  const model = group?.models.find((item) => item.id === current.model);
  if (model?.reasoning === undefined) return null;
  return {
    selection: current,
    efforts: model.reasoning.efforts,
    defaultEffort: model.reasoning.defaultEffort,
  };
}

function VPetEffortSlider({ directory, load, select, presenter, scope }: SliderProps) {
  const state = useSyncExternalStore(
    (listener) => directory.subscribe(listener),
    () => directory.getSnapshot(),
  );
  const skin = useSyncExternalStore(
    (listener) => scope.subscribe(listener),
    () => scope.getSnapshot(),
  );
  const reasoning = useMemo(() => modelReasoning(state), [state]);
  const efforts = reasoning?.efforts ?? [];
  const committedIndex = selectedEffortIndex(
    efforts,
    reasoning?.selection.reasoningEffort,
    reasoning?.defaultEffort,
  );
  // An unknown committed effort defaults to the max frame: a fresh
  // conversation paints the dark shell immediately instead of flashing the
  // light palette until the directory load resolves the real effort.
  const committedFrame = committedIndex < 0
    ? PREVIEW_MAX_FRAME
    : frameForEffort(committedIndex, efforts.length);
  const bindEffort = skin.bindEffort;
  const [frame, setFrame] = useState(() => bindEffort ? committedFrame : presenter.getFrame());
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const dragging = useRef(false);
  const dragStartFrame = useRef(frame);
  const enabled = skin.enabled;

  useEffect(() => {
    if (enabled) load();
  }, [enabled, load]);

  useEffect(() => {
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

  const commit = async (rawFrame: number) => {
    if (!bindEffort) {
      dragging.current = false;
      setFrame(rawFrame);
      presenter.setFrame(rawFrame);
      return;
    }
    const targetIndex = nearestEffortIndex(rawFrame, efforts);
    const target = efforts[targetIndex];
    if (target === undefined) return;
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
      reasoningEffort: target.id,
    });
    setPending(false);
    if (!accepted) {
      setFailed(true);
      setFrame(committedFrame);
      presenter.setFrame(committedFrame);
    }
  };

  return (
    <div
      className="vpet-effort-control"
      data-plugin={PACKAGE_ID}
      data-state={failed ? "error" : pending ? "pending" : "ready"}
      title={bindEffort ? previewEffort?.name : undefined}
    >
      {interacting && (
        <output
          className="vpet-effort-control__tooltip"
          style={{ "--vpet-slider-ratio": progressRatio } as React.CSSProperties}
        >
          {tooltipLabel}
        </output>
      )}
      <div className="vpet-effort-control__ticks" aria-hidden="true">
        {efforts.map((effort, index) => (
          <i
            className="vpet-effort-control__tick"
            key={effort.id}
            style={{ left: `${(frameForEffort(index, efforts.length) / PREVIEW_MAX_FRAME) * 100}%` }}
          />
        ))}
      </div>
      <input
        className="vpet-effort-control__range"
        type="range"
        min={0}
        max={PREVIEW_MAX_FRAME}
        step={1}
        value={frame}
        disabled={pending || state.status === "selecting"}
        aria-label={bindEffort ? "思考等级" : "皮肤进度"}
        aria-valuetext={bindEffort ? previewEffort?.name ?? "" : tooltipLabel}
        onPointerDown={() => {
          dragging.current = true;
          dragStartFrame.current = frame;
          setInteracting(true);
        }}
        onInput={(event) => {
          dragging.current = true;
          const next = Number(event.currentTarget.value);
          setFrame(next);
          presenter.setFrame(next);
        }}
        onPointerUp={(event) => {
          setInteracting(false);
          void commit(Number(event.currentTarget.value));
        }}
        onPointerCancel={() => {
          setInteracting(false);
          dragging.current = false;
          setFrame(dragStartFrame.current);
          presenter.setFrame(dragStartFrame.current);
        }}
        onKeyUp={(event) => {
          setInteracting(false);
          if (event.key !== "Escape") void commit(Number(event.currentTarget.value));
        }}
        onBlur={(event) => {
          setInteracting(false);
          if (dragging.current) void commit(Number(event.currentTarget.value));
        }}
        onKeyDown={(event) => {
          setInteracting(true);
          if (event.key === "Escape" && !pending) {
            setInteracting(false);
            dragging.current = false;
            setFrame(dragStartFrame.current);
            presenter.setFrame(dragStartFrame.current);
          }
        }}
      />
    </div>
  );
}

const NATIVE_APPEARANCE_GROUP = '[class*="_8HJdBW_group"]';
const NATIVE_APPEARANCE_ROW = '[class*="_8HJdBW_cubeRow"]';
const VPET_APPEARANCE_BUTTON = "vpet-appearance-choice";
const VPET_BINDING_CONTROL = "vpet-appearance-binding";
const VPET_BINDING_INPUT = "vpet-appearance-binding__input";

function installVPetAppearanceButton(scope: PreferenceStore, presenter: SkinPresenter) {
  let pending = false;
  const hookedNativeButtons = new Set<HTMLButtonElement>();
  const nativeClickHandlers = new Map<HTMLButtonElement, () => void>();

  const sync = () => {
    const group = [...document.querySelectorAll<HTMLElement>(NATIVE_APPEARANCE_GROUP)]
      .find((node) => node.querySelector('[class*="_8HJdBW_themeCube"]'));
    const row = group?.querySelector<HTMLElement>(NATIVE_APPEARANCE_ROW);
    if (row === undefined || row === null) return;

    let customButton = row.querySelector<HTMLButtonElement>(`.${VPET_APPEARANCE_BUTTON}`);
    if (customButton === null) {
      customButton = document.createElement("button");
      customButton.className = VPET_APPEARANCE_BUTTON;
      customButton.type = "button";
      customButton.dataset.plugin = PACKAGE_ID;
      customButton.setAttribute("aria-label", "VPet");

      const icon = document.createElement("span");
      icon.className = "vpet-appearance-choice__icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "◈";

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

    let bindingControl = group.querySelector<HTMLElement>(`.${VPET_BINDING_CONTROL}`);
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
      const bindingText = document.documentElement.lang.toLowerCase().startsWith("en")
        ? "Bind slider to reasoning level"
        : "VPet 绑定思考等级";
      bindingLabel.textContent = bindingText;

      const bindingDescription = document.createElement("span");
      bindingDescription.className = "vpet-appearance-binding__description";
      bindingDescription.id = "vpet-appearance-binding-description";
      bindingDescription.textContent = document.documentElement.lang.toLowerCase().startsWith("en")
        ? "When off, the slider does not change the reasoning level."
        : "关闭之后滑块不联动思考等级";
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
      const bindingInput = bindingControl.querySelector<HTMLInputElement>(`.${VPET_BINDING_INPUT}`);
      if (bindingInput !== null) {
        bindingInput.checked = snapshot.bindEffort;
        bindingInput.setAttribute("aria-checked", String(snapshot.bindEffort));
        bindingInput.disabled = pending;
      }
    }

    for (const nativeButton of row.querySelectorAll<HTMLButtonElement>('[class*="_8HJdBW_themeCube"]')) {
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

export const inject = [
  "slots",
  "sessions",
  "modelDirectories",
  "theme",
];

function createPreferenceStore(): PreferenceStore {
  let snapshot: SkinSettings = {
    enabled: true,
    bindEffort: localStorage.getItem(BIND_EFFORT_KEY) !== "0",
  };
  const listeners = new Set<() => void>();
  const onStorage = (event: StorageEvent) => {
    if (event.key !== BIND_EFFORT_KEY) return;
    const next = {
      enabled: snapshot.enabled,
      bindEffort: event.newValue !== "0",
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
    },
  };
}

export function apply(ctx: ClientContext) {
  const style = document.createElement("style");
  style.dataset.plugin = PACKAGE_ID;
  style.textContent = styles;
  document.head.append(style);
  ctx.effect(() => () => style.remove(), "vpet-skin: scoped styles");

  const scope = createPreferenceStore();
  ctx.effect(() => () => scope.dispose(), "vpet-skin: appearance preference");
  const theme = ctx.get("theme") as ThemeService;
  const presenter = new SkinPresenter(scope, theme);
  ctx.effect(() => () => presenter.dispose(), "vpet-skin: backdrop presenter");
  ctx.effect(
    () => installVPetAppearanceButton(scope, presenter),
    "vpet-skin: native appearance extension",
  );

  ctx.slots.inject("conversation.input.right", () => ctx.slots.register({
    name: "conversation.input.right",
    id: "vpet-intensity-control",
    order: 10,
    inject: (sessionId: string) => {
      const available = ctx.sessions.subagentAddress(sessionId) === undefined;
      const directory = ctx.modelDirectories.directoryFor(sessionId) as ModelDirectory;
      return {
        directory: directory.store,
        presenter,
        scope,
        load: () => {
          if (available) void directory.load().catch(() => undefined);
        },
        select: (selection: ModelSelection) => available
          ? directory.select(selection).then((result) => result.ok, () => false)
          : Promise.resolve(false),
      };
    },
  }, VPetEffortSlider));
}
