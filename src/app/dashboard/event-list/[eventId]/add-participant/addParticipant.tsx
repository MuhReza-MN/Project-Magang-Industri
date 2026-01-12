"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import ExpandImage from "@/components/ui/expandImgBtn";
import { createParticipant } from "./action";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type AddParticipantProps = {
  eventId: string;
  eventTitle: string;
  eventCode: string;
  posterImage: string | null;
};


export default function AddParticipant({ eventId, eventTitle, eventCode, posterImage }: AddParticipantProps) {
  const router = useRouter();
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia("(pointer: coarse)");
    const set = () => setIsTouch(mql.matches);
    set();
    mql.addEventListener("change", set);
    return () => mql.removeEventListener("change", set);
  }, []);


  return (
    <div className="h-full flex flex-col contain-inline-size">
      <div className="absolute h-full inset-0 bg-linear-to-tr from-violet-200 via-violet-300 to-blue-200 -z-10" />

      <div className="sticky top-[clamp(3.5rem,6vh,6rem)] z-30 bg-neutral-100/95 backdrop-blur-3xl border-b border-neutral-200 text-black">
        <div className="flex flex-col md:flex-row gap-2 mt-4 mx-2 mb-2">
          <div className="relative flex items-center w-[250px] h-[250px] border-4 border-gray-100/70 bg-white/90 m-2 overflow-hidden rounded-lg shadow-lg">
            {isTouch ? ("") : (
              <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="absolute inset-0 bg-gray z-60 w-full h-full object-contain justify-center items-center pointer-events-auto">
                <div className="flex pointer-events-auto h-full w-full">
                  <ExpandImage
                    aria-label="Tampilkan Poster layar penuh"
                    imageName={`Poster ${eventTitle}`}
                    image={posterImage}
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
                      imageName={`Poster ${eventTitle}`}
                      image={posterImage}
                      FABmode={true}
                    />
                  </div>
                ) : ("")}
                <motion.div
                  animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ type: "spring", duration: 0.3, stiffness: 250, damping: 20 }}
                  className="flex w-full h-full"
                >
                  <Image
                    className=" bg-gray-100/70 p-[clamp(0.25rem,0.5vw,1rem)]"
                    src={posterImage ? `${posterImage}` : "/placeholder.webp"}
                    fill
                    style={{ objectFit: "contain" }}
                    alt={`${eventTitle} Poster Image`}
                    priority={false}
                  />
                </motion.div>
              </motion.div>
            )}
          </div>
          <div className="flex flex-col h-full w-[70%] text-sm align-top gap-2">
            <div className="col-span-2 flex flex-row items-center gap-5">
              <h2 className=" text-2xl font-bold pt-1 pl-2 pr-5 rounded-md w-fit">
                Tambah Data Partisipan " {eventTitle} "
              </h2>
            </div>
            <label className="col-span-2 font-bold text-black text-[clamp(0.9rem,0.8vw,2.5rem)]">
              Nama Lengkap
              <input
                type="text"
                required
                placeholder="Masukan Nama Lengkap Anda"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="block w-full border rounded p-2 bg-neutral-50"
              />
            </label>
            <label className="col-span-2 font-bold text-black text-[clamp(0.9rem,0.8vw,2.5rem)]">
              Alamat Email
              <input
                type="email"
                required
                placeholder="Masukan Alamat Email Anda"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="block w-full border rounded p-2 bg-neutral-50 "
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
                onChange={(phone) => { setPhone(phone); setForm({ ...form, contact: phone }); }}
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
          </div>
        </div>
        <div className="flex gap-10 ml-70 mb-5 w-[50%]">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95, filter: "brightness(0.75)" }}
            whileHover={{ scale: 1.05, filter: "brightness(0.85)" }}
            transition={{ duration: 0.1, type: "spring", stiffness: 500, damping: 25 }}
            className={`px-4 py-2 rounded font-bold w-full bg-green-600 text-white`}
            onClick={async () => {
              if (!form.name || !form.email || !form.contact) {
                alert("Silakan isi semua kolom.");
                return;
              }

              if (
                confirm("Simpan event baru ini?")
              ) {
                await createParticipant({
                  eventId,
                  eventCode,
                  name: form.name,
                  email: form.email,
                  contact: form.contact,
                });
                router.push(`/dashboard/event-list/${eventId}`);
              }
            }}
          >
            Simpan Partisipan
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.95, filter: "brightness(0.75)" }}
            whileHover={{ scale: 1.05, filter: "brightness(0.85)" }}
            transition={{ duration: 0.1, type: "spring", stiffness: 500, damping: 25 }}
            className="px-4 py-2 rounded bg-red-700 text-white font-bold w-full"
            onClick={() => {
              if (
                confirm("Batalkan aksi dan kembali ke detail event?")
              ) {
                router.push(`/dashboard/event-list/${eventId}`);
              }
            }}

          >
            Kembali
          </motion.button>
        </div>
      </div>
    </div>
  )
}
