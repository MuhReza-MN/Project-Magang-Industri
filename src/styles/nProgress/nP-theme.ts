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
