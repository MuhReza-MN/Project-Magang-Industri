"use client";

import Image from "next/image";
import EventRegisForm from "@/components/ui/eventRegis";
import ExpandImage from "@/components/ui/expandImgBtn";
import { BsArrowsFullscreen } from "react-icons/bs";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ECardProps = {
  title: string;
  image?: string;
};

export default function EventCard({ title, image }: ECardProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden md:w-[clamp(23.4375rem,12vw,345rem)] md:h-[clamp(30rem,35vh,500rem)] mb-8 flex flex-col justify-center items-center">
      <div className="relative flex m-2 md:m-0 md:mt-5 items-center w-[300px] h-[300px] md:w-[92%] md:h-[70%]">
        <div className="absolute z-50 -top-1 -right-1 md:-top-2 md:-right-2">
          <ExpandImage imageName={`Poster ${title}`} image={image} />
        </div>
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
          >
            <Image
              className="shadow-md bg-gray-100/70 pt-2 px-2 border-4 border-gray-100/70"
              src={image ? `/poster/${image}` : "/placeholder.webp"}
              layout="fill"
              objectFit="contain"
              alt={`${title} Poster Image`}
              priority={false}
            />
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
