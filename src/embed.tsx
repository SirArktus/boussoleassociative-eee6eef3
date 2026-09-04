import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { GameApp } from "@/components/game/GameApp";
import widgetCss from "./widget-styles.css?inline";

const TAG_NAME = "boussole-associative";

// Custom element wrapping the game in a Shadow DOM: the widget's CSS (fonts,
// Tailwind, colors) never leaks into the host WordPress page, and the host
// page's theme never leaks into the widget.
class BoussoleAssociativeElement extends HTMLElement {
  private root: Root | null = null;

  connectedCallback() {
    if (this.root) return;

    const shadow = this.shadowRoot ?? this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = widgetCss;
    shadow.appendChild(style);

    const mount = document.createElement("div");
    mount.className = "boussole-widget-root";
    // `contain` makes this element a containing block for `position: fixed`
    // descendants (the in-game header), so it stays pinned to the widget
    // instead of floating over the entire host page.
    mount.style.contain = "layout paint";
    shadow.appendChild(mount);

    this.root = createRoot(mount);
    this.root.render(
      <StrictMode>
        <GameApp />
      </StrictMode>,
    );
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = null;
  }
}

if (typeof window !== "undefined" && !customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, BoussoleAssociativeElement);
}
