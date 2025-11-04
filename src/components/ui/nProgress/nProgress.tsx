"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import nProgress from "nprogress";
import { applyNPTheme } from "@/styles/nProgress/np-applyTheme";
import { npThemes } from "@/styles/nProgress/np-themes";
import "@/styles/nProgress/nprogress.css";

nProgress.configure({
  showSpinner: false,
  speed: 400,
  minimum: 0.25,
  easing: "ease",
});

type ProgressBarProps = {
  theme?: keyof typeof npThemes;
}

export default function ProgressBar({ theme = "default" }: ProgressBarProps) {
  const pathname = usePathname();
  const sParams = useSearchParams();
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const originalPush = useRef<typeof router.push | null>(null)
  const originalReplace = useRef<typeof router.push | null>(null)

  useEffect(() => {
    applyNPTheme(npThemes[theme]);
  }, [theme]);

  useEffect(() => {
    nProgress.start();

    const finishProgress = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => nProgress.done(), 400);
    };

    if (document.readyState === "complete") finishProgress();
    else window.addEventListener("load", finishProgress);


    return () => {
      window.removeEventListener("load", finishProgress);
      if (timerRef.current) clearTimeout(timerRef.current);
      nProgress.done();
    };
  }, []);

  useEffect(() => {
    if (!originalPush.current) {
      originalPush.current = router.push;
      originalReplace.current = router.replace;

      const startProgress = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        nProgress.start();
      };
      const stopProgress = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => nProgress.done(), 350);
      };

      (router as any).push = (...args: Parameters<typeof router.push>) => {
        startProgress()
        return originalPush.current!(...args)
      };
      (router as any).replace = (...args: Parameters<typeof router.replace>) => {
        startProgress()
        return originalReplace.current!(...args)
      };

      return () => {
        stopProgress();
        (router as any).push = originalPush.current!;
        (router as any).replace = originalReplace.current!;
      };
    }
  }, [router]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => nProgress.done(), 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      nProgress.done();
    };
  }, [pathname, sParams]);

  return null;
}
