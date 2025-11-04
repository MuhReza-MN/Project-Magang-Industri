"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import Image from "next/image";
import ExpandImage from "@/components/ui/expandImgBtn";
import "react-phone-input-2/lib/style.css";
import { RiCloseLargeFill } from "react-icons/ri";

type ERegisProps = {
  eventName: string;
  image?: string;
};

export default function EventRegisForm({ eventName, image }: ERegisProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [ruleAgreed, setRuleAgree] = useState(false);
  //const [notifAgreed, setNotifAgree] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [phone, setPhone] = useState("");
  const [scale, setScale] = useState(1);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleMv = useMotionValue(1);

  const rules = {
    intro:
      "Dengan menyetujui ketentuan ini, peserta dianggap telah membaca dan bersedia mengikuti seluruh peraturan yang berlaku.",
    sections: [
      {
        id: "autran",
        title: "Aturan :",
        items: [
          { id: "a1", text: "Peserta wajib melakukan registrasi sebelum event dimulai." },
          { id: "a2", text: "Gunakan identitas yang valid saat pendaftaran." },
          { id: "a3", text: "Panitia berhak menolak peserta yang melanggar peraturan." },
        ],
      },
      {
        id: "ketentuan",
        title: "Ketentuan :",
        items: [
          { id: "k1", text: "Tiket yang sudah dibeli tidak dapat dikembalikan." },
          { id: "k2", text: "Peserta wajib mengikuti arahan panitia selama acara berlangsung." },
          { id: "k3", text: "Panitia tidak bertanggung jawab atas kehilangan barang pribadi." },
        ],
      },
    ],
  };

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

  const closeRules = () => {
    setShowRules(false);
    setScale(1);
    animate(scaleMv, 1, { duration: 0.2, ease: "easeInOut" });
    animate(x, 0, { duration: 0.2, ease: "easeInOut" });
    animate(y, 0, { duration: 0.2, ease: "easeInOut" });
  };

  return (
    <>
      <motion.button
        type="button"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05, filter: "brightness(0.95)" }}
        whileTap={{ scale: 0.95, filter: "brightness(0.8)" }}
        transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
        onClick={() => setIsOpen(true)}
        className="flex justify-center items-center mb-[clamp(0.5rem,0.5vw,1rem)] bg-linear-to-r from-[#eb4b3f] to-[#f0945b] h-[clamp(2.5rem,1.8vw,4.25rem)] w-50 lg:w-[clamp(8.75rem,8vw,18.75rem)] rounded-4xl text-shadow-md font-semibold text-[clamp(1.125rem,1.1vw,3rem)]"
      >
        Register
      </motion.button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-50 xl:z-40 flex items-center justify-center bg-white/40 top-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative w-full max-h-screen flex items-start lg:items-center justify-center overflow-y-scroll lg:overflow-y-hidden overflow-x-hidden p-4 lg:top-5"
                >
                  <div className="flex flex-col md:flex-row items-center bg-white rounded-[clamp(0.5rem,1vw,1.5rem)] p-4 shadow-lg relative z-60 top-0 w-100 md:w-fit md:max-w-[clamp(50rem,80vw,70rem)] xl:max-w-[clamp(50rem,70vw,140rem)] max-h-fit md:max-h-none">
                    <div className="relative z-45 flex items-center justify-center mb-2 md:mb-2 xl:mb-[1%] mt-[0.5%] xl:mt-[1%] xl:mx-[1%] min-w-[clamp(21.25rem,20vw,60.5rem)] w-[clamp(21.25rem,20vw,60.5rem)] min-h-[clamp(21.25rem,20vw,60.5rem)] h-[clamp(21.25rem,20vw,60.5rem)] shadow-md bg-gray-100/70 pt-1 px-0.5">
                      <div className="absolute top-2 md:-top-2 lg:-top-5 -right-3 md:-right-2 flex flex-col-reverse md:flex-row gap-2 z-50">
                        <motion.button
                          type="button"
                          onClick={() => handleZoom(scale + 0.2)}
                          disabled={scale >= 3}
                          whileTap={{ scale: 0.85 }}
                          animate={scale >= 3 ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.2 }}
                          className={`w-[clamp(2.5rem,2vw,5.5rem)] h-[clamp(2.5rem,2vw,5.5rem)] rounded-full flex items-center justify-center 
                          ${scale >= 3 ? "cursor-not-allowed bg-gray-800/60" : "bg-gray-300/60 hover:bg-gray-200/80 active:bg-gray-200/80"}
                        `}
                        >
                          <FiZoomIn
                            className={`text-[clamp(2rem,2vw,4.5rem)] 
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
                          className={`w-[clamp(2.5rem,2vw,5.5rem)] h-[clamp(2.5rem,2vw,5.5rem)] rounded-full flex items-center justify-center 
                          ${scale <= 1 ? "cursor-not-allowed bg-gray-800/60" : "bg-gray-300/60 hover:bg-gray-200/80 active:bg-gray-200/80"}
                        `}
                        >
                          <FiZoomOut
                            className={`text-[clamp(2rem,2vw,4.5rem)] 
                            ${scale <= 1 ? "text-gray-300/70" : "text-slate-950/70 hover:text-black/80 active:text-black/80"}
                          `}
                          />
                        </motion.button>
                        <ExpandImage
                          imageName={`Poster ${eventName}`}
                          image={image}
                          FABmode={true}
                        />
                      </div>
                      <div className="flex relative z-40 w-full h-full border-4 border-gray-100/70 overflow-hidden">
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
                            src={
                              image ? `/poster/${image}` : "/placeholder.webp"
                            }
                            layout="fill"
                            objectFit="contain"
                            alt={`${eventName} Poster Image`}
                            className="pointer-events-none select-none"
                          />
                        </motion.div>
                      </div>
                    </div>
                    <div className="flex flex-col md:ml-4 lg:ml-[2%] 2xl:mt-[1%] h-full w-full justify-center items-center">
                      <h2 className="text-[clamp(1.25rem,1.8vw,3.5rem)] text-center md:text-left font-bold mb-1 md:mb-2 text-black justify-start w-full">
                        Daftar {eventName}
                      </h2>
                      <div className="flex justify-center">
                        <div className="h-1.5 lg:h-[clamp(0.05rem,0.7vw,1.25rem)] mb-[3%] w-[250px] md:w-[clamp(21.25rem,40vw,75.5rem)] xl:mr-[2%] rounded-3xl bg-black/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0, opacity: 0.9 }}
                            animate={{ width: "100%", opacity: 1 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className="h-full bg-linear-to-r from-[#eb4b3f] to-[#f0945b] rounded-3xl"
                          />
                        </div>
                      </div>
                      <form className="flex flex-col space-y-[clamp(0.1rem,1vh,8rem)] h-full justify-center xl:mr-[2%]">
                        <label className="flex flex-col font-bold text-black text-[clamp(0.9rem,0.8vw,2.5rem)] gap-[clamp(0rem,0.5vw,0.25rem)]">
                          Nama Lengkap
                          <input
                            type="text"
                            required
                            placeholder="Masukan Nama Lengkap Anda"
                            className="md:w-full border rounded mt-1 p-[clamp(0.5rem,0.5vw,0.75rem)] text-black"
                          />
                        </label>
                        <label className="flex flex-col font-bold text-black text-[clamp(0.9rem,0.8vw,2.5rem)] gap-[clamp(0rem,0.5vw,0.25rem)]">
                          Alamat Email
                          <input
                            type="email"
                            required
                            placeholder="Masukan Alamat Email Anda"
                            className="md:w-full border rounded mt-1 p-[clamp(0.5rem,0.5vw,0.75rem)] text-black"
                          />
                        </label>
                        <label
                          htmlFor="phone"
                          className="flex flex-col font-bold text-black text-[clamp(0.9rem,0.8vw,2.5rem)] gap-[clamp(0rem,0.5vw,0.25rem)]"
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
                        <div className="flex flex-col gap-[15%] mt-[4%] md:mt-[2%] text-[clamp(0.9rem,0.8vw,2.5rem)] text-black justify-center w-full">
                          <label className="flex items-center gap-[2%] h-fit w-full">
                            <motion.input
                              type="checkbox"
                              checked={ruleAgreed}
                              required
                              initial={{ scale: 1 }}
                              whileHover={{ scale: 1.05, filter: "brightness(1.5)" }}
                              whileTap={{ scale: 0.95, filter: "brightness(0.8)" }}
                              transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
                              onChange={(e) => setRuleAgree(e.target.checked)}
                              className="accent-[#eb4b3f] min-w-[clamp(1.5rem,1vw,2.5rem)] min-h-[clamp(1.5rem,1vw,2.5rem)]"
                            />
                            <span className="text-pretty w-full">
                              Saya sudah membaca dan bersedia untuk mengikuti{" "}
                              <motion.button
                                type="button"
                                initial={{ scale: 1 }}
                                whileTap={{ color: "#7c3aed", scale: 0.95 }}
                                whileHover={{ color: "#7c3aed", scale: 1.01 }}
                                transition={{ duration: 0.1, ease: "easeInOut", type: "tween" }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowRules(true);
                                }}
                                className="text-[#18b6ff] underline underline-offset-auto"
                              >
                                Aturan & Ketentuan
                              </motion.button>
                              , serta bersedia menerima notifikasi email untuk event ini.
                            </span>
                          </label>
                          {/* 
                          <label className="flex items-center gap-[2%] h-fit w-full">
                            <motion.input
                              type="checkbox"
                              checked={notifAgreed}
                              required
                              initial={{ scale: 1 }}
                              whileHover={{ scale: 1.05, filter: "brightness(1.5)" }}
                              whileTap={{ scale: 0.95, filter: "brightness(0.8)" }}
                              transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
                              onChange={(e) => setNotifAgree(e.target.checked)}
                              className="accent-[#eb4b3f] min-w-[clamp(1.5rem,1vw,2.5rem)] min-h-[clamp(1.5rem,1vw,2.5rem)]"
                            />
                            <span className="text-pretty w-full">Saya ingin menerima notifikasi mengenai event serupa.</span>
                          </label>
                          */}
                        </div>
                        <div className="flex justify-end lg:pt-[clamp(0rem,5vh,50rem)] space-x-[2.5%]">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.05, filter: "brightness(0.95)" }}
                            whileTap={{ scale: 0.95, filter: "brightness(0.8)" }}
                            transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
                            className="px-[clamp(1rem,1.2vw,1.5rem)] py-[clamp(0.5rem,1vh,1rem)] text-[clamp(1rem,1.2vw,3rem)] rounded-[clamp(0.25rem,0.5vw,1rem)] bg-gray-400 text-white font-bold"
                            onClick={() => {
                              handleClose();
                              setPhone("");
                            }}
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05, filter: "brightness(0.95)" }}
                            whileTap={{ scale: 0.95, filter: "brightness(0.8)" }}
                            transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
                            className="px-[clamp(1rem,1.2vw,1.5rem)] py-[clamp(0.5rem,1vh,1rem)] text-[clamp(1rem,1.2vw,3rem)] rounded-[clamp(0.25rem,0.5vw,1rem)] bg-linear-to-r from-[#eb4b3f] to-[#f0945b] text-white font-bold"
                            onClick={() => {
                              setPhone("");
                            }}
                          >
                            Submit
                          </motion.button>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
            <AnimatePresence mode="wait">
              {showRules && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="fixed inset-0 z-70 bg-black/50 flex items-start lg:items-center justify-center pt-[clamp(2rem,100vh,2rem)] md:pt-[1%] lg:pt-[1.5%]"
                >
                  <motion.button
                    type="button"
                    onClick={closeRules}
                    whileTap={{ scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-8 md:top-2 right-1 z-60 bg-black/70 hover:bg-black/90 active:bg-black/90 text-white/80 hover:text-white/90 active:text-white/90 rounded-full p-[clamp(0.75rem,0.1vw,1.5rem)] transition-colors duration-100 shadow-md"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                    >
                      <RiCloseLargeFill className="text-[clamp(1.5rem,2vw,10rem)]" />
                    </motion.div>
                  </motion.button>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative bg-white rounded-xl p-[2%] w-[97%] md:w-[clamp(45rem,90vw,300rem)] h-fit max-h-[99%] lg:max-h-[90%] shadow-lg overflow-y-auto"
                  >

                    <div className="relative z-45 text-black rounded-xl flex flex-col items-center justify-start shadow-md bg-gray-100/70 h-full w-full p-[1%]">
                      <h3 className="text-[clamp(1.25rem,3.5vw,1.5rem)] md:text-[clamp(1.25rem,2vw,10rem)] font-bold">Aturan & Ketentuan</h3>
                      <h3 className="text-[clamp(2rem,4vw,20rem)] md:text-[clamp(2rem,3vw,25rem)] font-bold mb-[1%]">{eventName}</h3>
                      <p className=" text-pretty text-start w-full whitespace-normal text-[clamp(0.8rem,2.5vw,1rem)] md:text-[clamp(1.1rem,1.35vw,10rem)] mb-[4%] md:mb-[2%]">
                        {rules.intro}
                      </p>
                      {rules.sections.map((section) => (
                        <div key={section.id} className="mb-[3%] md:px-[2%] w-full">
                          <h4 className="font-semibold text-[clamp(1rem,3vw,1.25rem)] md:text-[clamp(1.1rem,1.35vw,10rem)]">{section.title}</h4>
                          <ul className=" list-disc pl-[5%] lg:pl-[2%] text-[clamp(0.8rem,2.5vw,1rem)] md:text-[clamp(0.9rem,1.25vw,10rem)]">
                            {section.items.map((item) => (
                              <li key={item.id}>{item.text}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05, filter: "brightness(0.95)" }}
                        whileTap={{ scale: 0.95, filter: "brightness(0.8)" }}
                        transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
                        className="px-[clamp(1rem,1.2vw,1.5rem)] py-1 md:py-[clamp(0.5rem,1vh,1rem)] mb-[1%] mt-[2%] text-[clamp(1rem,1.2vw,3rem)] rounded-[clamp(0.25rem,0.5vw,1rem)] bg-linear-to-r from-[#eb4b3f] to-[#f0945b] text-white font-bold"
                        onClick={() => {
                          setShowRules(false);
                          setRuleAgree(true);
                        }}
                      >
                        Saya Bersedia
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
