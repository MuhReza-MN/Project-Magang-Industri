export type NProgressTheme = {
  barGradient: string;
  height: string;
  glow?: boolean;
};

export const nPThemeDefault: NProgressTheme = {
  barGradient: "linear-gradient(to right, #3b82f6, #06b6d4)",
  height: "clamp(0.1rem, 0.2vw, 1rem)",
  glow: true,
};

export const nPThemePublic: NProgressTheme = {
  barGradient: "linear-gradient(to right, #eb4b3f, #f0945b)",
  height: "clamp(0.1rem, 0.2vw, 1rem)",
  glow: false,
};

export const nPThemeDashboard: NProgressTheme = {
  barGradient: "linear-gradient(to right, #0845a2, #007cd4, #00abc5, #00d27f, #a8eb12)",
  height: "clamp(0.1rem, 0.2vw, 1rem)",
  glow: false,
};
export const nPThemeScanner: NProgressTheme = {
  barGradient: "linear-gradient(to left, #c7003e, #c90059, #be007c, #9f00a4, #5700cd)",
  height: "clamp(0.1rem, 0.2vw, 1rem)",
  glow: false,
};
