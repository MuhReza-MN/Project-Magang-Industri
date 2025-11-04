import type { NProgressTheme } from "./nP-theme";
import {
  nPThemeDefault, nPThemePublic,
  nPThemeDashboard, nPThemeScanner
} from "./nP-theme";

export const npThemes: Record<string, NProgressTheme> = {
  default: nPThemeDefault,
  public: nPThemePublic,
  dashboard: nPThemeDashboard,
  scanner: nPThemeScanner,
}