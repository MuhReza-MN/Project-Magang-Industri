"use client";

import Image from "next/image";
import EventRegisForm from "@/components/ui/eventRegis";
import ExpandImage from "@/components/ui/expandImgBtn";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ECardProps = {
  title: string;
  image?: string;
};

export default function EventCard({ title, image }: ECardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(pointer: coarse)");
    const set = () => setIsTouch(Boolean(mql.matches));
    set();
    if (mql.addEventListener) {
      mql.addEventListener("change", set);
      return () => mql.removeEventListener("change", set);
    } else {
      mql.addListener(set);
      return () => mql.removeListener(set);
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden md:w-[clamp(23.4375rem,12vw,345rem)] md:h-[clamp(30rem,35vh,500rem)] mb-8 flex flex-col justify-center items-center">
      <div className="relative flex m-2 md:m-0 items-center w-[300px] h-[300px] md:w-[92%] md:h-[70%] border-4 border-gray-100/70">
        {isTouch ? (
          ""
        ) : (
          <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="absolute inset-0 bg-gray z-60 w-full h-full object-contain justify-center items-center pointer-events-none">
            <div className="flex pointer-events-auto h-full w-full">
              <ExpandImage
                aria-label="Tampilkan Poster layar penuh"
                imageName={`Poster ${title}`}
                image={image}
                FABmode={false}
              />
            </div>
          </motion.div>
        )}
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-24 h-24 border-12 border-gray-300 border-t-[#eb4b3f] rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-center w-full h-full overflow-hidden"
          >
            {isTouch ? (
              <div className="absolute z-50 -top-1 -right-1 md:-top-2 md:-right-2">
                <ExpandImage
                  aria-label="Tampilkan Poster layar penuh"
                  imageName={`Poster ${title}`}
                  image={image}
                  FABmode={true}
                />
              </div>
            ) : (
              ""
            )}
            <motion.div
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ type: "spring", duration: 0.3, stiffness: 250, damping: 20 }}
              className="flex w-full h-full"
            >
              <Image
                className=" bg-gray-100/70 p-[clamp(0.25rem,0.5vw,1rem)]"
                src={image ? `/poster/${image}` : "/placeholder.webp"}
                layout="fill"
                objectFit="contain"
                alt={`${title} Poster Image`}
                priority={false}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
      <div className="text-center">
        <h3 className="my-[clamp(0.5rem,1vw,0.75rem)] font-bold text-[clamp(2rem,1.75vw,3.75rem)] text-black">
          {title}
        </h3>
        <EventRegisForm eventName={title} image={image} />
      </div>
    </div>
  );
}
