"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function LoadingBar() {
  const pathName = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setProgress(30);
    setVisible(true);

    const step1 = setTimeout(() => setProgress(70), 150);
    const step2 = setTimeout(() => setProgress(100), 350);
    const hide = setTimeout(() => {
      setProgress(0);
      setVisible(false);
    }, 800);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(hide);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-bar"
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: `${progress}%`, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            width: { type: "spring", stiffness: 100, damping: 20 },
            opacity: { duration: 0.3 },
          }}
          className="fixed top-0 left-0 h-[0.5%] bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] z-[9999] rounded-r-full shadow-[0_0_10px_rgba(255,100,100,0.4)]"
        />
      )}
    </AnimatePresence>
  );
}
