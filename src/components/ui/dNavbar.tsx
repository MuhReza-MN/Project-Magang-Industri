"use client";

import { useState, useRef, useEffect } from "react";
import { clamp, motion } from "framer-motion";

type NavLinkProps = {
  onNavigate?: () => void;
};

const navItems = [
  { id: "hero", label: "HOME" },
  { id: "event", label: "Lihat Event" },
  { id: "about", label: "About Us" },
  { id: "faq", label: "FAQ" },
];

export default function NavLink({ onNavigate }: NavLinkProps) {
  const [currSect, setCurrSect] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const [params, setParams] = useState({ left: 0 });
  const containerRef = useRef<HTMLUListElement>(null);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    const header = document.querySelector("header");
    setCurrSect(id);
    if (el && header) {
      const headerOffset = header.getBoundingClientRect().height;
      const elementPos = el.offsetTop;
      const offsetPos = elementPos - headerOffset;

      window.scrollTo({
        top: offsetPos,
        behavior: "smooth",
      });
      if (onNavigate) onNavigate();
    }
  };

  useEffect(() => {
    const activeId = hovered || currSect;
    const container = containerRef.current;
    if (!container) return;

    const activeEl = container.querySelector<HTMLButtonElement>(
      `[data-id="${activeId}"]`,
    );
    if (activeEl) {
      const barCenter = activeEl.offsetLeft + activeEl.offsetWidth / 2;

      setParams({ left: barCenter });
    }
  }, [currSect, hovered]);

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id));
    if (!sections.length) return;

    const header = document.querySelector("header");
    const headerHeight = header?.getBoundingClientRect().height || 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce((prev, curr) => 
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev
        );

        if (mostVisible.isIntersecting) setCurrSect(mostVisible.target.id);
      },
      {
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: [0.25, 0.5, 0.75],
      },
    );
    sections.forEach((sec) => sec && observer.observe(sec));

    return () => {
      sections.forEach((sec) => sec && observer.unobserve(sec));
    };
  }, []);

  return (
    <ul
      ref={containerRef}
      className="relative flex flex-col gap-4 md:gap-0 md:flex-row md:h-[clamp(3.75rem,6vh,7.5rem)] 
        text-sm md:mr-2 md:items-center justify-center py-1 md:py-0
      "
    >
      <motion.div
        className="absolute top-2 h-[clamp(0.2rem,0.3vw,2rem)] w-[clamp(1.25rem,3.5vw,4rem)] bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] pointer-events-none"
        animate={{ left: params.left }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ translateX: "-50%" }}
      />

      {navItems.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            data-id={item.id}
            onClick={() => handleScroll(item.id)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            className={`relative text-gray-300 font-extrabold hover:text-gray-400 transition-transform duration-10 md:duration-200 w-full text-left md:text-center md:px-[clamp(0.75rem,1vw,2rem)]
              ${item.id === "hero" || item.id === "faq" ? "text-[clamp(1rem,1.2vw,5rem)] tracking-widest" : "text-[clamp(0.9rem,1.1vw,5rem)]"} active:text-white 
            `}
          >
            {item.label}
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={() => {
            alert("coming soon");
            if (onNavigate) onNavigate();
          }}
          className="relative justify-center items-center text-gray-300  md:text-white font-extrabold text-[clamp(0.9rem,1.1vw,5rem)] hover:text-gray-400 transition-colors duration-200 md:ml-[clamp(0.1rem,1vw,2rem)] md:px-[clamp(0.75rem,1vw,2rem)]
            md:bg-gradient-to-r md:from-[#eb4b3f] md:to-[#f0945b] md:py-[clamp(0.2rem,0.4vw,1.2rem)] rounded w-full text-left md:text-center
          "
        >
          Daftarkan Event
        </button>
      </li>
    </ul>
  );
}
