"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { BsArrowsFullscreen } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import Image from "next/image";
import "react-phone-input-2/lib/style.css";

type ERegisProps = {
  eventName: string;
  image?: string;
};

export default function EventRegisForm({ eventName, image }: ERegisProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex justify-center items-center mb-[clamp(0.5rem,0.5vw,1rem)] bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:from-[#c53a30] hover:to-[#d87d48] transition-all duration-300 h-[clamp(2.5rem,1.8vw,4.25rem)] w-50 lg:w-[clamp(8.75rem,8vw,18.75rem)] rounded-4xl text-shadow-md font-semibold text-[clamp(1.125rem,1.1vw,3rem)]"
      >
        Register
      </button>

      {createPortal(
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-50 lg:z-40 flex items-center justify-center bg-white/40 top-0 lg:top-5"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative w-full max-h-screen flex items-start justify-center overflow-y-auto p-4"
              >
                <div className="flex flex-col md:flex-row items-center bg-white rounded-[clamp(0.5rem,1vw,1.5rem)] p-4 shadow-lg relative z-50 top-0 w-100 md:w-fit">
                  <div className="relative flex items-center justify-center mb-5 md:mb-2 mt-2 rounded-[clamp(10rem,20vw,500rem)] w-[clamp(21.25rem,20vw,52.5rem)] h-[clamp(21.25rem,20vw,52.5rem)]">
                    <div className="absolute top-2 md:-top-2 lg:-top-5 -right-3 md:-right-2 flex flex-col-reverse md:flex-row gap-2 z-50">
                      <button
                        type="button"
                        className="w-[clamp(2.5rem,2vw,5.5rem)] h-[clamp(2.5rem,2vw,5.5rem)] rounded-full bg-gray-300/60 flex items-center justify-center hover:bg-gray-200/80 active:bg-gray-200/80"
                      >
                        <FiZoomIn className="text-[clamp(2rem,2vw,4.5rem)] text-slate-950/70 hover:text-black/80 active:text-black/80" />
                      </button>
                      <button
                        type="button"
                        className="w-[clamp(2.5rem,2vw,5.5rem)] h-[clamp(2.5rem,2vw,5.5rem)] rounded-full bg-gray-300/60 flex items-center justify-center hover:bg-gray-200/80 active:bg-gray-200/80"
                      >
                        <FiZoomOut className="text-[clamp(2rem,2vw,4.5rem)] text-slate-950/70 hover:text-black/80 active:text-black/80" />
                      </button>
                      <button
                        type="button"
                        className="w-[clamp(2.5rem,2vw,5.5rem)] h-[clamp(2.5rem,2vw,5.5rem)] rounded-full bg-gray-300/60 flex items-center justify-center hover:bg-gray-200/80 active:bg-gray-200/80"
                      >
                        <BsArrowsFullscreen className="text-[clamp(1.5rem,1.2vw,3rem)] text-slate-950/70 hover:text-black/80 active:text-black/80" />
                      </button>
                    </div>
                    <Image
                      className="flex relative rounded-xl z-40"
                      src={"/placeholder.webp"}
                      layout="fill"
                      objectFit="contain"
                      alt="PlaceHolder Pict"
                    />
                  </div>
                  <div className="flex flex-col md:ml-4">
                    <h2 className="text-[clamp(1.25rem,2vw,3rem)] text-center md:text-left font-bold mb-2 text-black">
                      Daftar {eventName}
                    </h2>
                    <div className="flex justify-center">
                      <div className="h-1.5 lg:h-2.5 mb-4 w-[250px] md:w-[clamp(21.25rem,40vw,62.5rem)] rounded-3xl bg-black/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0, opacity: 0.9 }}
                          animate={{ width: "100%", opacity: 1 }}
                          transition={{ duration: 0.7, ease: "easeInOut" }}
                          className="h-full bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] rounded-3xl"
                        />
                      </div>
                    </div>
                    <form className="flex flex-col space-y-[clamp(0.2rem,1.5vh,1.5rem)]">
                      <label className="flex flex-col font-bold text-black text-[clamp(1rem,1vw,2.5rem)] gap-[clamp(0rem,0.5vw,0.25rem)]">
                        Nama Lengkap
                        <input
                          type="text"
                          placeholder="Masukan Nama Lengkap Anda"
                          className="md:w-full border rounded mt-1 p-[clamp(0.625rem,0.5vw,0.75rem)] text-black"
                        />
                      </label>
                      <label className="flex flex-col font-bold text-black text-[clamp(1rem,1vw,2.5rem)] gap-[clamp(0rem,0.5vw,0.25rem)]">
                        Alamat Email
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="md:w-full border rounded mt-1 p-[clamp(0.625rem,0.5vw,0.75rem)] text-black"
                        />
                      </label>
                      <label
                        htmlFor="phone"
                        className="flex flex-col font-bold text-black text-[clamp(1rem,1vw,2.5rem)] gap-[clamp(0rem,0.5vw,0.25rem)]"
                      >
                        Nomor HP
                        <PhoneInput
                          country={"id"}
                          value={phone}
                          preferredCountries={["id"]}
                          onChange={(phone) => setPhone(phone)}
                          defaultMask="... .... .... .."
                          inputClass="
                        !w-full !pl-[clamp(5.5rem,7vw,7rem)] p-[clamp(1.25rem,1vw,2.5rem)] text-black !border !border-black 
                        !text-[clamp(1rem,1vw,2.2rem)] focus:outline-none focus:ring-2 focus:ring-blue-500
                      "
                          containerClass="!w-full mt-1 text-black"
                          buttonClass="!flex !border-black !min-w-[clamp(5rem,10vw,5.5rem)] !justify-start !text-[clamp(0.9rem,1vw,2rem)] !mr-[2000px]"
                          dropdownClass="!flex !flex-col !mt-[clamp(2rem,3.5vh,10rem)] !w-[clamp(18.75rem,20vw,35.25rem)]"
                          inputProps={{
                            id: "phone",
                            required: true,
                          }}
                        />
                      </label>
                      <div className="flex justify-end lg:pt-[clamp(0rem,5vh,50rem)] space-x-2">
                        <button
                          type="button"
                          className="px-[clamp(1rem,1.2vw,1.5rem)] py-[clamp(0.5rem,1vh,1rem)] text-[clamp(1rem,1.2vw,3rem)] rounded-[clamp(0.25rem,0.5vw,1rem)] bg-gray-400 text-white font-bold hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25"
                          onClick={() => {
                            setIsOpen(false);
                            setPhone("");
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="px-[clamp(1rem,1.2vw,1.5rem)] py-[clamp(0.5rem,1vh,1rem)] text-[clamp(1rem,1.2vw,3rem)] rounded-[clamp(0.25rem,0.5vw,1rem)] bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 text-white font-bold"
                          onClick={() => {
                            setIsOpen(false);
                            setPhone("");
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
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
