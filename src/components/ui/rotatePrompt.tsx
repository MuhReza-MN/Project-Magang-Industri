"use client";

import { useEffect, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TbDeviceMobileRotated } from 'react-icons/tb';
import { FaRotateRight } from 'react-icons/fa6';
import { FiRotateCw } from 'react-icons/fi';

const MD_BREAKPOINT_PX = 768;

export default function RotatePrompt({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MD_BREAKPOINT_PX}px)`);
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setAllowed(Boolean("matches" in e ? e.matches : (e as MediaQueryList).matches));
    };

    handler(mq);
    if ("addEventListener" in mq) {
      mq.addEventListener("change", handler);
    } else if ((mq as any).addListener) {
      (mq as any).addListener(handler);
    }

    const onResize = () => handler(mq);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handler);
      } else if ((mq as any).removeListener) {
        (mq as any).removeListener(handler);
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {allowed === false && (
          <motion.div
            key="rotate-prompt-backdrop"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70"
            aria-hidden="false"
            role="dialog"
            aria-label="Rotate device to landscape"
          >
            <motion.div
              initial={{ y: 18, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 18, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mx-4 w-full max-w-lg rounded-2xl bg-linear-to-br from-neutral-900/80 to-neutral-800/75 border border-white/10 p-6 shadow-2xl
              backdrop-blur-md text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="relative flex items-center justify-center w-25 h-25">
                  <motion.div
                    animate={{ rotate: [-85, 20, 20, -85] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                      times: [0, 0.4, 0.8, 1],
                    }}
                    className="absolute inset-0 flex items-center justify-center text-8xl text-white"
                    aria-hidden
                  >
                    <FiRotateCw />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: [-90, 0, 0, -90] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                      times: [0, 0.4, 0.8, 1],
                    }}
                    className="text-7xl z-20 text-white shrink-0"
                    aria-hidden
                  >
                    <TbDeviceMobileRotated className="bg-black rounded-full" />
                  </motion.div>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                  Please rotate your device
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        aria-hidden={allowed !== true}
        className={allowed === true ? "block" : "pointer-events-none opacity-0 select-none"}
      >
        {children}
      </div>
    </>
  )
}