import nProgress from "nprogress";
import { applyNPTheme } from "@/styles/nProgress/np-applyTheme";
import { nPThemePublic } from "@/styles/nProgress/nP-theme";

export async function triggerProgress<T>(
  promise: Promise<T>,
  duration = 400,
): Promise<T> {
  applyNPTheme(nPThemePublic);
  nProgress.start();
  try {
    const result = await promise;
    return result;
  } finally {
    setTimeout(() => nProgress.done(), duration);
  }
}
