"use client";
import { motion } from "framer-motion";
import { logoFont } from "@/lib/fonts";
import { useState } from "react";

export default function AuthForm() {
  const [rememberMe, setRemember] = useState(false);

  return (
    <section id="login"
      className="flex w-full min-h-[cacl(100vh-6vh)] justify-center items-center bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex flex-col justify-start items-start shadow-xl p-[clamp(1rem,2vw,3rem)] 2xl:p-[calc(2.5vw-1.5vw)]
          m-[clamp(0.75rem,1vw,1rem)] md:m-[clamp(1rem,2vw,5rem)] bg-white 
          w-[90%] md:w-[40%] 2xl:w-[calc(40vw-10vw)] rounded-[clamp(1rem,1.5vw,2.5rem)]"
      >
        <h1 className={`${logoFont.className} font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#eb4b3f] via-[#f26f44] to-[#f0945b] 
          text-[clamp(4rem,5vw,5rem)] 2xl:text-[5vw] w-full text-center mb-[clamp(1rem,2vh,2rem)] text-outline`}
        >
          RQRE.ID
        </h1>
        <form className="flex flex-col space-y-[clamp(0.1rem,1vh,8rem)] h-full w-full justify-start xl:mr-[2%]">
          <label className="flex flex-col font-bold text-black text-[clamp(0.9rem,0.8vw,2.5rem)] gap-[clamp(0rem,0.5vw,0.25rem)]">
            Email
            <input
              type="email"
              required
              className="md:w-full border rounded mt-1 p-[clamp(0.5rem,0.5vw,0.75rem)] text-black"
            />
          </label>
          <label className="flex flex-col font-bold text-black text-[clamp(0.9rem,0.8vw,2.5rem)] gap-[clamp(0rem,0.5vw,0.25rem)]">
            Password
            <input
              type="password"
              required
              className="md:w-full border rounded mt-1 p-[clamp(0.5rem,0.5vw,0.75rem)] text-black"
            />
          </label>
          <label className="flex items-center gap-[2%] mt-[3%] w-full h-fit">
            <motion.input
              type="checkbox"
              checked={rememberMe}
              required
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05, filter: "brightness(1.5)" }}
              whileTap={{ scale: 0.95, filter: "brightness(0.8)" }}
              transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-[#eb4b3f] min-w-[clamp(1rem,0.8vw,2.5rem)] min-h-[clamp(1rem,0.8vw,2.5rem)]"
            />
            <span className="text-[clamp(0.75rem,0.8vw,3rem)] text-black w-full h-full items-center">Remember me</span>
          </label>
          <div className="flex justify-end lg:pt-[clamp(0rem,5vh,50rem)] space-x-[3%]">
            <motion.button
              type="button"
              whileHover={{ filter: "brightness(2)" }}
              whileTap={{ filter: "brightness(1.8)" }}
              transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
              className="text-[clamp(0.7rem,1vw,2rem)] rounded-[clamp(0.25rem,0.5vw,1rem)] text-gray-600 underline underline-offset-2 font-bold"
              onClick={() => { }}
            >
              Forgot your password?
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.025, filter: "brightness(0.75)" }}
              whileTap={{ scale: 0.925, filter: "brightness(0.5)" }}
              transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
              className="px-[clamp(0.5rem,1vw,1.5rem)] py-[clamp(0.1rem,0.75vh,2rem)] text-[clamp(1rem,1.2vw,3rem)] rounded-[clamp(0.25rem,0.5vw,1rem)] bg-linear-to-r from-[#eb4b3f] to-[#f0945b] text-white font-bold"
              onClick={() => { }}
            >
              LOG IN
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  )
}