"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
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
        className="mb-2 bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:from-[#c53a30] hover:to-[#d87d48] transition-all duration-300 h-10 w-50 lg:w-35 rounded-4xl text-shadow-md font-semibold text-lg"
      >
        Register
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/40 top-8 md:-top-0 lg:-top-0">
            <div className="flex flex-col md:flex-row bg-white rounded-lg p-6 shadow-lg relative z-50 top-0 w-100 md:w-fit">
              <div className="flex items-center-safe justify-center-safe mb-5 mt-2">
                <Image
                  className="rounded-xl"
                  src={"/placeholder.webp"}
                  width={340}
                  height={340}
                  alt="PlaceHolder Pict"
                />
              </div>
              <div className="flex flex-col md:ml-8">
                <h2 className="text-xl text-center md:text-left font-bold mb-2 text-black">
                  Daftar {eventName}
                </h2>
                <div className="flex justify-center">
                  <div className="h-1.5 lg:h-2.5 mb-4 w-[250px] md:w-[500px] rounded-3xl bg-gradient-to-r from-[#eb4b3f] to-[#f0945b]" />
                </div>
                <form className="flex flex-col space-y-4">
                  <label className="flex flex-col font-bold text-black">
                    Nama Lengkap
                    <input
                      type="text"
                      placeholder="Masukan Nama Lengkap Anda"
                      className="md:w-full border rounded mt-1 p-2 text-black"
                    />
                  </label>
                  <label className="flex flex-col font-bold text-black">
                    Alamat Email
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="md:w-full border rounded mt-1 p-2 text-black"
                    />
                  </label>
                  <label
                    htmlFor="phone"
                    className="flex flex-col font-bold text-black"
                  >
                    Nomor HP
                    <PhoneInput
                      country={"id"}
                      value={phone}
                      preferredCountries={["id"]}
                      onChange={(phone) => setPhone(phone)}
                      enableSearch
                      defaultMask="... .... .... .."
                      inputClass="!w-full p-5 text-black !border !border-black"
                      containerClass="w-full mt-1 text-black"
                      buttonClass="!border-black"
                      inputProps={{
                        id: "phone",
                        required: true,
                      }}
                    />
                  </label>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-gray-400 text-white font-bold hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25"
                      onClick={() => {
                        setIsOpen(false);
                        setPhone("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 text-white font-bold"
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
          </div>,
          document.body,
        )}
    </>
  );
}
