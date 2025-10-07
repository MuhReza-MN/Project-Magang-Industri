"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
} from "framer-motion";
import { HiArrowsExpand } from "react-icons/hi";
import { RiCloseLargeFill } from "react-icons/ri";
import Image from "next/image";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

type ExpandImgProps = {
  imageName: string;
  image?: string;
};

export default function ExpandImage({ imageName, image }: ExpandImgProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleMv = useMotionValue(1);

  const handleZoom = (newScale: number) => {
    const clamped = Math.min(Math.max(newScale, 1), 3);

    animate(scaleMv, clamped, { duration: 0.3, ease: "easeInOut" });
    setScale(clamped);

    if (clamped === 1) {
      animate(x, 0, { duration: 0.3 });
      animate(y, 0, { duration: 0.3 });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setScale(1);
    animate(scaleMv, 1, { duration: 0.2, ease: "easeInOut" });
    animate(x, 0, { duration: 0.2, ease: "easeInOut" });
    animate(y, 0, { duration: 0.2, ease: "easeInOut" });
  };

  return (
    <>
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsOpen(true)}
        className="w-[clamp(2.5rem,2vw,5.5rem)] h-[clamp(2.5rem,2vw,5.5rem)] rounded-full bg-gray-300/60 flex items-center justify-center hover:bg-gray-200/80 active:bg-gray-200/80 overflow-hidden"
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <HiArrowsExpand className="text-[clamp(1.8rem,1.5vw,10rem)] text-slate-950/70 hover:text-black/80 active:text-black/80" />
        </motion.div>
      </motion.button>

      {createPortal(
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-50 lg:z-40 flex items-center justify-center bg-slate-900/40 top-0 lg:top-5 min-h-screen"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative w-[98%] md:max-h-screen flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden p-4"
              >
                <div className="flex flex-col items-center justify-center bg-white rounded-[clamp(0.5rem,1vw,1.5rem)] p-[clamp(0.01rem,0.5vw,1.5rem)] shadow-lg z-50 mt-[clamp(0.01rem,1.2vw,200rem)] w-[105%] md:w-[97%] relative">
                  <div className="relative flex items-center justify-center rounded-[clamp(0.5rem,1vw,1.5rem)] w-full h-[80vh] md:h-[clamp(10rem,41vw,200rem)] border-4 border-gray-100/70 overflow-hidden bg-gray-100/70 ">
                    <div className="relative flex flex-col w-full h-full">
                      <motion.button
                        type="button"
                        onClick={handleClose}
                        whileTap={{ scale: 0.85 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-0 right-0 z-60 bg-black/70 hover:bg-black/90 active:bg-black/90 text-white/80 hover:text-white/90 active:text-white/90 rounded-full p-[clamp(0.5rem,0.1vw,1.5rem)] transition-colors duration-100"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 25,
                          }}
                        >
                          <RiCloseLargeFill className="text-[clamp(1rem,2vw,10rem)]" />
                        </motion.div>
                      </motion.button>
                      <div className="absolute z-50 flex flex-row gap-3 bottom-2 left-2">
                        <motion.button
                          type="button"
                          onClick={() => handleZoom(scale + 0.2)}
                          disabled={scale >= 3}
                          whileTap={{ scale: 0.85 }}
                          animate={scale >= 3 ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.2 }}
                          className={`w-[clamp(2.5rem,3vw,20rem)] h-[clamp(2.5rem,3vw,20rem)] rounded-full flex items-center justify-center 
                          ${scale >= 3 ? "cursor-not-allowed bg-gray-800/60" : "bg-gray-300/60 hover:bg-gray-200/80 active:bg-gray-200/80"}
                        `}
                        >
                          <FiZoomIn
                            className={`text-[clamp(2rem,2.5vw,10rem)] 
                            ${scale >= 3 ? "text-gray-300/70" : "text-slate-950/70 hover:text-black/80 active:text-black/80"}
                          `}
                          />
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => handleZoom(scale - 0.2)}
                          disabled={scale <= 1}
                          whileTap={{ scale: 0.85 }}
                          animate={scale <= 1 ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.2 }}
                          className={`w-[clamp(2.5rem,3vw,20rem)] h-[clamp(2.5rem,3vw,20rem)] rounded-full flex items-center justify-center 
                          ${scale <= 1 ? "cursor-not-allowed bg-gray-800/60" : "bg-gray-300/60 hover:bg-gray-200/80 active:bg-gray-200/80"}
                        `}
                        >
                          <FiZoomOut
                            className={`text-[clamp(2rem,2.5vw,10rem)] 
                            ${scale <= 1 ? "text-gray-300/70" : "text-slate-950/70 hover:text-black/80 active:text-black/80"}
                          `}
                          />
                        </motion.button>
                      </div>
                    </div>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ scale: scaleMv, x, y }}
                      drag
                      dragConstraints={{
                        left: -200 * (scale - 1),
                        right: 200 * (scale - 1),
                        top: -200 * (scale - 1),
                        bottom: 200 * (scale - 1),
                      }}
                      dragElastic={0.2}
                      dragMomentum={false}
                    >
                      <Image
                        src={image ? `/poster/${image}` : "/placeholder.webp"}
                        layout="fill"
                        objectFit="contain"
                        alt={imageName}
                        className="pointer-events-none select-none"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
