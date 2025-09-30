"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type NavLinkProps = {
  onNavigate?: () => void;
};

const navItems = [
  { id: "hero", label: "HOME" },
  { id: "event", label: "Lihat Event" },
  { id: "about", label: "About Us" },
  { id: "faq", label: "FAQ" },
  { id: "regis", label: "Daftarkan Event" },
];

export default function NavLink({ onNavigate }: NavLinkProps) {
  const [currSect, setCurrSect] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const [params, setParams] = useState({
    left: 0,
    width: 0,
  });
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
      const { offsetLeft, offsetWidth } = activeEl;
      setParams({ left: offsetLeft, width: offsetWidth });
    }
  }, [currSect, hovered]);

  return (
    <ul
      ref={containerRef}
      className="relative flex gap-[clamp(1rem,1.2rem,5rem)] text-sm md:mr-2"
    >
      <motion.div
        className="absolute -top-1 h-[4px] bg-gradient-to-r from-[#eb4b3f] to-[#f0945b]"
        animate={{ left: params.left, width: params.width }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />

      {navItems.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            data-id={item.id}
            onClick={() =>
              item.id === "register"
                ? alert("coming soon")
                : handleScroll(item.id)
            }
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            className="relative text-gray-300 font-extrabold text-[clamp(0.9rem,1.1vw,5rem)] hover:text-gray-400 transition-colors duration-200"
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
