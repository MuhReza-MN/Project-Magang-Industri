import { NProgressTheme } from "./nP-theme";

export function applyNPTheme(theme: NProgressTheme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.style.setProperty("--np-bar-gradient", theme.barGradient);
  root.style.setProperty("--np-bar-height", theme.height);
  root.style.setProperty("--np-bar-glow", theme.glow ? "block" : "none");
}
