/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: <explanation> */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { navItems } from "./navItems";

type NavBarProps = { onNavigate?: () => void };

export default function Navbar({ onNavigate }: NavBarProps) {
  const [currSect, setCurrSect] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const [barLeft, setBarLeft] = useState(0);
  const [showBar, setShowBar] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    const header = document.querySelector("header");
    if (!el || !header) return;
    setCurrSect(id);
    const offset = el.offsetTop - header.getBoundingClientRect().height;
    window.scrollTo({ top: offset, behavior: "smooth" });
    onNavigate?.();
    setIsOpen(false);
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;

    const updateBar = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const conRect = container.getBoundingClientRect();
        const activeId = hovered || currSect;
        const activeEl = container.querySelector<HTMLElement>(
          `[data-id="${activeId}"]`,
        );

        if (activeEl) {
          const activeRect = activeEl.getBoundingClientRect();
          const barCenter =
            activeRect.left + activeRect.width / 2 - conRect.left;
          setBarLeft(barCenter);
        }
      });
    };

    const ro = new ResizeObserver(updateBar);
    ro.observe(container);
    Array.from(container.querySelectorAll("button[data-id]")).forEach((btn) =>
      ro.observe(btn),
    );

    const onResize = () => updateBar();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    window.addEventListener("visibilitychange", onResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", onResize);
    }

    const mo = new MutationObserver(() => {
      const visible = !!container.offsetParent;
      if (visible) updateBar();
    });
    mo.observe(container, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    let stableTries = 0;
    const waitForStableLayout = () => {
      if (!container.offsetWidth && stableTries < 10) {
        stableTries++;
        requestAnimationFrame(waitForStableLayout);
        return;
      }
      updateBar();
    };
    waitForStableLayout();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("visibilitychange", onResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", onResize);
      }
    };
  }, [currSect, hovered]);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter(Boolean);
    const headerHeight =
      document.querySelector("header")?.getBoundingClientRect().height || 0;
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce((prev, curr) =>
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev,
        );
        if (mostVisible.isIntersecting) setCurrSect(mostVisible.target.id);
      },
      {
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: [0.25, 0.5, 0.75],
      },
    );
    sections.forEach((sec) => sec && observer.observe(sec));
    return () => sections.forEach((sec) => sec && observer.unobserve(sec));
  }, []);

  return (
    <nav aria-label="Main Navigation">
      <ul
        ref={containerRef}
        className={`relative md:flex-row md:items-center md:justify-center 
          text-sm md:mr-2 py-1 md:py-0 gap-4 md:gap-[clamp(0rem,0.5vw,2rem)] md:h-[clamp(3.75rem,6vh,7.5rem)]
          ${isOpen ? "hidden" : "flex"}
          ${isMobile ? "opacity-0 h-0 overflow-hidden pointer-events-none" : "opacity-100 h-auto"}
        `}
      >
        {showBar && (
          <motion.div
            className="absolute top-2 h-[clamp(0.2rem,0.3vw,2rem)] w-[clamp(1.25rem,3.5vw,4rem)] bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] rounded-full pointer-events-none"
            animate={{ left: barLeft }}
            transition={
              reduceMotion
                ? {}
                : {
                  type: "spring",
                  stiffness: 250,
                  damping: 24,
                }
            }
            style={{ translateX: "-50%", width: "clamp(1.25rem,3.5vw,6rem)" }}
          />
        )}

        {navItems.map((item) => {
          const isActive = item.id === currSect;
          const isHovered = hovered === item.id;

          return (
            <li key={item.id}>
              <motion.button
                data-id={item.id}
                type="button"
                onClick={() => handleScroll(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative font-extrabold w-full md:px-[clamp(0.75rem,1vw,2rem)] mb-3 lg:mb-0
                  ${item.id === "hero" || item.id === "faq" ? "text-[clamp(1rem,1.2vw,5rem)] tracking-widest" : "text-[clamp(0.9rem,1.1vw,5rem)]"}
                `}
                aria-current={isActive ? "page" : undefined}
              >
                <motion.span
                  animate={{
                    color: isActive
                      ? "#ffffff"
                      : isHovered
                        ? "#f5f5f5"
                        : "#d1d5db",
                    opacity: isHovered || isActive ? 1 : 0.8,
                    y: isHovered ? -1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.label}
                </motion.span>
              </motion.button>
            </li>
          );
        })}
        <li>
          <motion.button
            type="button"
            layout
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05, filter: "brightness(0.95)" }}
            whileTap={{ scale: 0.95, filter: "brightness(0.8)" }}
            transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
            onClick={() => {
              alert("coming soon");
              if (onNavigate) onNavigate();
            }}
            className="relative justify-center items-center text-white font-extrabold text-[clamp(0.9rem,1.1vw,5rem)] mb-3 lg:mb-0
              hover:opacity-90 transition-opacity duration-200 md:ml-[clamp(0.1rem,1vw,2rem)] md:px-[clamp(0.75rem,1vw,2rem)]
              md:bg-gradient-to-r md:from-[#eb4b3f] md:to-[#f0945b] md:py-[clamp(0.2rem,0.4vw,1.2rem)] rounded"
          >
            Daftarkan Event
          </motion.button>
        </li>
      </ul>
      <div className="md:hidden flex justify-end p-2">
        <motion.button
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          type="button"
          onClick={() => setIsOpen(true)}
          initial={{ backgroundColor: "rgba(107, 114, 128, 0.4)" }}
          whileHover={{
            backgroundColor: "rgba(107, 114, 128, 0.6)",
            filter: "brightness(0.8)",
          }}
          whileTap={{
            backgroundColor: "rgba(107, 114, 128, 0.6)",
            filter: "brightness(0.8)",
          }}
          transition={{ layout: { duration: 0.2, ease: "easeInOut" } }}
          className={`flex-col justify-center items-center space-y-1 border-white border rounded h-10 w-10 m-2
            ${isOpen ? "hidden" : "flex"}
          `}
        >
          <span className="w-6 h-[3px] bg-white" />
          <span className="w-6 h-[3px] bg-white" />
          <span className="w-6 h-[3px] bg-white" />
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.aside
              id="mobile-menu"
              initial={{ x: "100%", opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 210, damping: 26 },
              }}
              exit={{ x: "100%", opacity: 0, transition: { duration: 0.25 } }}
              className="fixed flex flex-col top-0 right-0 h-fit w-64 bg-slate-800 border-s-6 border-t-6 border-b-6 border-slate-900/50 text-white z-50"
            >
              <div className="flex flex-row justify-between items-center p-4 border-b border-slate-700">
                <span className="font-bold">Akses Cepat</span>
                <motion.div
                  layout
                  initial={{ scale: 1, filter: "brightness(1)" }}
                  whileHover={{ scale: 1.05, filter: "brightness(1.5)" }}
                  whileTap={{ scale: 0.9, filter: "brightness(0.8)" }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className=" inline-block h-full w-[15%] justify-center items-center">
                  <button
                    aria-label="Close navigation menu"
                    type="button"
                    className="text-2xl font-extrabold inline-block"
                    onClick={() => setIsOpen(false)}
                  >
                    ✕
                  </button>
                </motion.div>
              </div>
              <ul className="flex flex-col space-y-2 py-4 pl-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <motion.div
                      layout
                      initial={{ scale: 1, x: 0, filter: "brightness(1)" }}
                      whileHover={{ scale: 1.05, x: 10, filter: "brightness(1.5)" }}
                      whileTap={{ scale: 0.9, x: -5, filter: "brightness(0.8)" }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className=" inline-block w-full"
                    >
                      <button
                        type="button"
                        onClick={() => handleScroll(item.id)}
                        className={`text-left w-full py-1 pl-2 font-semibold text-gray-200 active:text-white border-b-2 border-slate-900/50
                        ${item.id === "hero" || item.id === "faq" ? "tracking-widest text-lg" : ""}
                      `}
                      >
                        {item.label}
                      </button>
                    </motion.div>
                  </li>
                ))}
                <li>
                  <motion.div
                    initial={{ scale: 1, x: 0 }}
                    whileHover={{ scaleY: 1.05, scaleX: 1.01, x: -1 }}
                    whileTap={{ scaleY: 0.95, x: 5 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className=" inline-block rounded-s w-full"
                  >
                    <button
                      type="button"
                      onClick={() => alert("coming soon")}
                      className="text-left w-full py-2 pl-2 font-semibold text-gray-200 bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] rounded-s 
                      hover:opacity-90 active:opacity-70 transition-colors duration-75 active:duration-5"
                    >
                      Daftarkan Event
                    </button>
                  </motion.div>
                </li>
              </ul>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
