"use client";

import { useKeenSlider } from "keen-slider/react";
import { useState, useRef, useEffect } from "react";
import { easeInOut, motion, AnimatePresence } from "framer-motion";
import { BiScan } from "react-icons/bi";
import { IoTicketOutline } from "react-icons/io5";
import { AiOutlineQrcode, AiOutlineMail } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa6";
import { FaAngleRight, FaEllipsisH } from "react-icons/fa";
import EventCard from "@/components/ui/card";
import "keen-slider/keen-slider.min.css";

export default function HomeClient() {
  const [currSlide, setCurrSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [expandedCards, setExpandedCards] = useState({
    scan: false,
    ticket: false,
    qr: false,
    graph: false,
  });

  const toggleCard = (key: keyof typeof expandedCards) => {
    setExpandedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    const header = document.querySelector("header");
    if (el && header) {
      const headerOffset = header.getBoundingClientRect().height;
      const elementPos = el.offsetTop;
      const offsetPos = elementPos - headerOffset;

      window.scrollTo({
        top: offsetPos,
        behavior: "smooth",
      });
    }
  };

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { origin: "center" },
    slideChanged(slider) {
      setCurrSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(min-width: 1px)": {
        initial: 0,
        slides: { perView: 1, spacing: 10 }, // phones
      },
      "(min-width: 1000px)": {
        initial: 0,
        slides: { perView: 2, spacing: -30 }, // tablets / small desktops
      },
      "(min-width: 1200px)": {
        initial: 0,
        slides: { perView: 3, spacing: 15 }, // tablets / small desktops
      },
      "(min-width: 1500px)": {
        initial: 0,
        slides: { perView: 4, spacing: 15 }, // tablets / small desktops
      },
      "(min-width: 1800px)": {
        initial: 0,
        slides: { perView: 5, spacing: 15 }, // tablets / small desktops
      },
      "(min-width: 2100px)": {
        initial: 0,
        slides: { perView: 6, spacing: 15 }, // tablets / small desktops
      },
      "(min-width: 2800px)": {
        initial: 0,
        slides: { perView: 7, spacing: 15 }, // tablets / small desktops
      },
    },
  });

  const flyVariants = {
    up: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, easeInOut },
      },
    },
    upD1: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, easeInOut, delay: 0.1 },
      },
    },
    down: {
      hidden: { opacity: 0, y: -50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, easeInOut },
      },
    },
    downD1: {
      hidden: { opacity: 0, y: -50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, easeInOut, delay: 0.1 },
      },
    },
    left: {
      hidden: { opacity: 0, x: -50, y: 40 },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.6, easeInOut },
      },
    },
    fill: {
      hidden: { width: 0 },
      visible: {
        width: "100%",
        transition: { duration: 1, easeInOut },
      },
    },
    btn: {
      hidden: { opacity: 0, y: 50, scale: 0.9 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, easeInOut },
      },
    },
    dotCon: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { staggerChildren: 1 },
      },
    },
    dot: {
      hidden: { opacity: 0, scale: 1.7 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, easeInOut, delay: 0.1 },
      },
    },
  };

  return (
    <div className="min-h-screen contain-inline-size">
      <div className="absolute inset-0  bg-gradient-to-r from-[#7c3aed] to-[#7dd3fc]" />
      <div className="absolute inset-y-0 left-0 w-[100%] md:w-[99.9%] -skew-x-60 origin-top-left bg-gradient-to-br from-[#0b1220] to-[#1a1f2e]" />
      <section
        id="hero"
        className="relative z-10 min-h-[clamp(5.5rem,100vh,150rem)] flex flex-col items-center"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={flyVariants.up}
        >
          <h1 className="pt-20 md:pt-[clamp(2rem,8vw,3000rem)] text-[clamp(4.5rem,10vw,120rem)] flex justify-center-safe text-shadow-md xl:text-shadow-lg text-shadow-black">
            RQRE.ID
          </h1>
          <h3 className="px-[clamp(0.75rem,4vw,120rem)] flex justify-center text-center text-balance text-[clamp(1.125rem,1.5vw,2000rem)] text-shadow-md xl:text-shadow-lg text-shadow-gray-700/80">
            RQRE.ID menyediakan layanan verifikasi berbasis QR Code untuk Event
            Organizer, mulai dari registrasi peserta dan validasi akses masuk
            demi memastikan event berjalan aman, ekslusif, dan tertata.
          </h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={flyVariants.btn}
          className="flex items-center justify-center flex-col md:flex-row gap-3 md:gap-[clamp(0rem,2.5vw,10rem)] w-full mt-[clamp(1rem,2vw,4rem)]"
        >
          <button
            type="button"
            onClick={() => handleScroll("event")}
            className="bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 h-[clamp(2.5rem,3vw,5rem)] w-[clamp(12.5rem,15vw,500%)] rounded-4xl text-shadow-md font-semibold text-[clamp(1.125rem,1vw,3rem)]"
          >
            Daftarkan Diri
          </button>
          <button
            type="button"
            className="bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 h-[clamp(2.5rem,3vw,5rem)] w-[clamp(12.5rem,15vw,500%)] rounded-4xl text-shadow-md font-semibold text-[clamp(1.125rem,1vw,3rem)]"
          >
            Daftarkan Event
          </button>
        </motion.div>
      </section>
      <section id="event" className="relative z-10 md:mt-10 lg:mx-2">
        <div className="flex flex-col gap-2 items-center justify-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.up}
            className="text-[clamp(2.5rem,4vw,150px)] text-shadow-md lg:text-shadow-lg text-shadow-black/60 text-center font-semibold whitespace-normal break-words leading-none"
          >
            ONGOING EVENT
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.up}
            className="flex h-[clamp(0.5rem,0.75vw,1.75rem)] w-[clamp(18.25rem,35vw,83.75rem)] rounded-3xl bg-black/10 overflow-hidden"
          >
            <motion.div
              variants={flyVariants.fill}
              className="h-full bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] rounded-3xl"
            />
          </motion.div>
        </div>
        <div className="navigation-wrapper relative mt-[clamp(2.25rem,3vw,3rem)] px-[clamp(1.5rem,4vw,3000rem)]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.up}
            ref={sliderRef}
            className="keen-slider"
          >
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event1" image="temp1.webp" />
            </div>
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event2" image="temp2.webp" />
            </div>
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event3" image="temp3.webp" />
            </div>
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event4" image="temp4.webp" />
            </div>
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event5" image="temp5.webp" />
            </div>
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event6" image="temp6.webp" />
            </div>
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event7" image="temp7.webp" />
            </div>
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event8" image="temp8.webp" />
            </div>
          </motion.div>
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
              />
              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
              />
            </>
          )}
        </div>
        {loaded && instanceRef.current && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.dotCon}
            className="dots flex justify-center gap-4"
          >
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => (
              <motion.button
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={flyVariants.dot}
                key={idx}
                type="button"
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-[clamp(1rem,1.25vw,1.75rem)] h-[clamp(1rem,1.25vw,1.75rem)] rounded-full ${
                  currSlide === idx
                    ? "bg-orange-500 hover:bg-orange-600 active:bg-orange-600"
                    : "bg-black/40 hover:bg-black/60 active:bg-orange-600"
                } transition-colors duration-200 active:duration-75`}
              />
            ))}
          </motion.div>
        )}

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={flyVariants.up}
          className="pt-[clamp(0.75rem,2vw,1rem)] text-shadow-md lg:text-shadow-lg text-shadow-black/60 font-semibold text-[clamp(0.9375rem,1.75vw,150rem)] text-balance text-center px-[clamp(0.1rem,3vw,12.5rem)]"
        >
          Klik tombol Register untuk mendaftarkan diri ke event yang sedang
          berjalan untuk menerima QR code sebagai bukti pendaftaran.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={flyVariants.btn}
          className="flex w-full items-center justify-center"
        >
          <button
            type="button"
            className="mt-5 bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 h-[clamp(2.5rem,3vw,10rem)] w-[clamp(13.5rem,15vw,35rem)] text-[clamp(1.125rem,1vw,15rem)] rounded-[clamp(0.75rem,2vw,1rem)] text-shadow-md font-semibold text-lg"
          >
            Lihat Semua Event
          </button>
        </motion.div>
      </section>
      <section
        id="about"
        className="relative z-10 mt-10 py-4 bg-black/70 flex flex-col basis-full px-[clamp(0.75rem,2vw,500rem)]"
      >
        <div className="flex flex-col gap-3 w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.up}
            className="flex flex-col gap-1"
          >
            <h3 className=" text-red-600 text-[clamp(1.875rem,3vw,6rem)] text-shadow-md text-center font-semibold">
              I N T R O D U C T I O N
            </h3>
            <h2 className="text-shadow-md text-[clamp(1.875rem,2.5vw,6rem)] font-bold text-center md:text-start">
              APA ITU RQRE.ID ?
            </h2>
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.up}
            className="text-shadow-md text-[clamp(1rem,1.3vw,3rem)] font-medium text-pretty text-justify px-3 lg:px-8 "
          >
            RQRE.ID adalah aplikasi yang dirancang untuk membantu Event
            Organizer dalam menyelenggarakan acara ekslusif bagi partisipan
            terdaftar. Melalui sistem verifikasi kode QR, RQRE.ID akan
            memastikan peluang partisipan tidak terdaftar dalam memasuki area
            acara. Dengan demikian, risiko overcrowding akibat jumlah pengunjung
            yang melebihi kapasitas dapat diminimalisir, sehingga acara berjalan
            lebih aman dan tertata.
          </motion.p>
          <div className="flex justify-center items-center mb-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.btn}
            >
              <button
                type="button"
                className="mt-5 bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 h-[clamp(2.5rem,3vw,10rem)] w-[clamp(13.5rem,15vw,500rem)] text-[clamp(1.125rem,1vw,15rem)] rounded-[clamp(0.75rem,2vw,1rem)] text-shadow-md font-semibold text-lg"
              >
                Daftarkan Event Anda
              </button>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 lg:gap-6 w-full">
          <div className="flex flex-col gap-4 lg:gap-6 w-full md:w-[98%] 2xl:w-[80%]">
            <motion.div
              onClick={() => toggleCard("scan")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.downD1}
              className="flex flex-row py-1 items-center lg:items-start h-fit w-full bg-[#2d3751] rounded-[clamp(1rem,1vw,3rem)] border-5 lg:border-[clamp(0.75rem,0.75vw,1.25rem)] border-[#5ce1e6]"
            >
              <motion.div
                key="icon"
                animate={{
                  opacity: expandedCards.scan ? 1 : 0,
                  y: expandedCards.scan ? 0 : -10,
                  height: expandedCards.scan ? "auto" : 0,
                }}
                transition={{ layout: { duration: 0, ease: "linear" } }}
                className={`flex justify-center items-center overflow-hidden aspect-square
                  ${expandedCards.scan ? "w-[25%] md:w-[13%]" : "w-0"}
                `}
              >
                <BiScan className="flex w-[90%] h-[90%] text-[#7489bf]" />
              </motion.div>
              <motion.div
                layout
                transition={{ layout: { duration: 0.25, ease: "linear" } }}
                className="flex flex-col text-left w-full"
              >
                <div className="flex w-full h-fit justify-center items-center my-1 md:my-[clamp(0.25rem,0.5vw,1rem)]">
                  <h3 className="font-extrabold w-full text-[clamp(1rem,2vw,6rem)] md:ml-2 whitespace-normal break-words leading-5 md:leading-normal">
                    QR Code Verification
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedCards.scan ? 90 : 0 }}
                    transition={{ duration: 0.25, ease: [0.45, 0, 0.55, 1] }}
                    className="flex mr-[clamp(0.25rem,0.5vw,1rem)] mt-1 md:mt-0 w-fit justify-center items-center rounded-full hover:brightness-90 active:brightness-90 transition-colors duration-200 active:duration-25"
                  >
                    <FaAngleRight className="flex shrink-0 size-[clamp(1.5rem,3vw,10rem)] text-[#5ce1e6]" />
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedCards.scan ? "auto" : 0,
                    opacity: expandedCards.scan ? 1 : 0,
                  }}
                  transition={{
                    duration: expandedCards.scan ? 0.5 : 0.35,
                    ease: expandedCards.scan
                      ? [0.25, 0.1, 0.25, 1]
                      : [0.55, 0.05, 0.55, 0.95],
                  }}
                  className="overflow-hidden"
                >
                  <div className=" flex flex-col gap-[clamp(1rem,1vw,3.5rem)] mt-1">
                    <h4 className="font-bold text-xs lg:text-[clamp(1.1rem,1vw,5rem)] text-pretty text-justify md:ml-2 mr-2 md:mr-[clamp(2rem,8vw,8rem)] ">
                      Sebuah media verifikasi pendaftar berupa Quick Response
                      (QR) code yang akan dipakai oleh pendaftar untuk
                      memverifikasi diri mereka sebagai partisipan valid.
                    </h4>
                    <div className="flex shrink-0 align-bottom items-end h-[20%]">
                      <button
                        type="button"
                        className="flex items-end md:ml-2 text-sm lg:text-[clamp(1rem,1.5vw,3rem)] text-[#5ce1e6] hover:text-[#48b1b4] active:text-[#48b1b4] transition-colors duration-200 active:duration-25"
                      >
                        Learn More{" "}
                        <FaArrowRight className="ml-[clamp(0.5rem,0.5vw,1.2rem)] text-lg lg:text-[clamp(1rem,2vw,4.125rem)]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              onClick={() => toggleCard("ticket")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.downD1}
              className="flex flex-row py-1 items-center lg:items-start h-fit w-full bg-[#2d3751] rounded-[clamp(1rem,1vw,3rem)] border-5 lg:border-[clamp(0.75rem,0.75vw,1.25rem)] border-[#5ce1e6]"
            >
              <motion.div
                key="icon"
                animate={{
                  opacity: expandedCards.ticket ? 1 : 0,
                  y: expandedCards.ticket ? 0 : -10,
                  height: expandedCards.ticket ? "auto" : 0,
                }}
                transition={{ layout: { duration: 0, ease: "linear" } }}
                className={`flex justify-center items-center overflow-hidden aspect-square
                  ${expandedCards.ticket ? "w-[25%] md:w-[13%]" : "w-0"}
                `}
              >
                <IoTicketOutline className="flex w-[90%] h-[90%] text-[#7489bf]" />
              </motion.div>

              <motion.div
                layout
                transition={{ layout: { duration: 0.25, ease: "linear" } }}
                className="flex flex-col text-left w-full"
              >
                <div className="flex w-full h-fit justify-center items-center my-1 md:my-[clamp(0.25rem,0.5vw,1rem)]">
                  <h3 className="font-extrabold w-full text-[clamp(1rem,2vw,6rem)] md:ml-2 whitespace-normal break-words leading-5 md:leading-normal">
                    Digital Ticket
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedCards.ticket ? 90 : 0 }}
                    transition={{ duration: 0.25, ease: [0.45, 0, 0.55, 1] }}
                    className="flex mr-[clamp(0.25rem,0.5vw,1rem)] mt-1 md:mt-0 w-fit justify-center items-center rounded-full hover:brightness-90 active:brightness-90 transition-colors duration-200 active:duration-25"
                  >
                    <FaAngleRight className="flex shrink-0 size-[clamp(1.5rem,3vw,10rem)] text-[#5ce1e6]" />
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedCards.ticket ? "auto" : 0,
                    opacity: expandedCards.ticket ? 1 : 0,
                  }}
                  transition={{
                    duration: expandedCards.ticket ? 0.5 : 0.35,
                    ease: expandedCards.ticket
                      ? [0.25, 0.1, 0.25, 1]
                      : [0.55, 0.05, 0.55, 0.95],
                  }}
                  className="overflow-hidden"
                >
                  <div className=" flex flex-col gap-[clamp(1rem,1vw,3.5rem)] mt-1">
                    <h4 className="font-bold text-xs lg:text-[clamp(1.1rem,1vw,5rem)] text-pretty text-justify md:ml-2 mr-2 md:mr-[clamp(2rem,8vw,8rem)] ">
                      RQRE.ID menyediakan ticket dari event, konser, lomba dan
                      lain-lain dalam bentuk digital yang akan dikirimkan
                      langsung melalui email anda yang terdaftar.
                    </h4>
                    <div className="flex shrink-0 align-bottom items-end h-[20%]">
                      <button
                        type="button"
                        className="flex items-end md:ml-2 text-sm lg:text-[clamp(1rem,1.5vw,3rem)] text-[#5ce1e6] hover:text-[#48b1b4] active:text-[#48b1b4] transition-colors duration-200 active:duration-25"
                      >
                        Learn More{" "}
                        <FaArrowRight className="ml-[clamp(0.5rem,0.5vw,1.2rem)] text-lg lg:text-[clamp(1rem,2vw,4.125rem)]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          <div className="flex flex-col gap-4 lg:gap-6 w-full md:w-[98%] 2xl:w-[80%]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.upD1}
              className="flex flex-row py-1 items-center h-fit lg:h-[clamp(12rem,25vh,80rem)] w-full bg-[#2d3751] rounded-[clamp(1rem,1vw,3rem)] border-5 lg:border-[clamp(0.75rem,0.75vw,1.25rem)] border-[#5ce1e6]"
            >
              <div className="flex shrink-0 justify-center items-center overflow-hidden h-[100%] w-[25%] md:w-[13%] aspect-square">
                <AiOutlineQrcode className="flex shrink-0 w-[90%] h-[90%] text-[#7489bf]" />
              </div>
              <div className="flex flex-col gap-1.5 md:gap-[clamp(0rem,1vw,2rem)] text-left h-[90%] w-full">
                <h3 className="font-extrabold text-[clamp(1rem,2vw,6rem)] md:ml-2 whitespace-normal break-words leading-5 md:leading-normal">
                  Automatic QR-code{" "}
                  <span className="whitespace-nowrap">Assigner for Member</span>
                </h3>
                <h4 className="font-bold text-xs lg:text-[clamp(1.1rem,1vw,5rem)] text-pretty text-justify md:ml-2 mr-2 md:mr-[clamp(2rem,8vw,8rem)] ">
                  RQRE.ID akan meng-generate kode QR dan meng-assign kode
                  tersebut ke pendaftar valid secara otomatis sehingga panitia
                  hanya perlu meng-scan QR penggunjung untuk memvalidasi stasus
                  mereka.
                </h4>
                <div className="flex shrink-0 align-bottom items-end h-[20%]">
                  <button
                    type="button"
                    className="flex items-end md:ml-2 text-sm lg:text-[clamp(1rem,1.5vw,3rem)] text-[#5ce1e6] hover:text-[#48b1b4] active:text-[#48b1b4] transition-colors duration-200 active:duration-25"
                  >
                    Learn More{" "}
                    <FaArrowRight className="ml-[clamp(0.5rem,0.5vw,1.2rem)] text-lg lg:text-[clamp(1rem,2vw,4.125rem)]" />
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.upD1}
              className="flex flex-row py-1 items-center h-fit lg:h-[clamp(12rem,25vh,80rem)] w-full bg-[#2d3751] rounded-[clamp(1rem,1vw,3rem)] border-5 lg:border-[clamp(0.75rem,0.75vw,1.25rem)] border-[#5ce1e6]"
            >
              <div className="flex shrink-0 justify-center items-center overflow-hidden h-[100%] w-[25%] md:w-[13%] aspect-square pt-[1%]">
                <VscGraph className="flex shrink-0 w-[90%] h-[90%] text-[#7489bf]" />
              </div>
              <div className="flex flex-col gap-1.5 md:gap-[clamp(0rem,1vw,2rem)] text-left h-[90%] w-full">
                <h3 className="font-extrabold text-[clamp(1rem,2vw,6rem)] md:ml-2 whitespace-normal break-words leading-5 md:leading-normal">
                  Visual Report
                </h3>
                <h4 className="font-bold text-xs lg:text-[clamp(1.1rem,1vw,5rem)] text-pretty text-justify md:ml-2 mr-2 md:mr-[clamp(2rem,8vw,8rem)] ">
                  RQRE.ID menyediakan grafik visual yang akan memperlihatkan
                  laporan jumlah peserta, pengunjung yang hadir, dan beragam
                  data relevan lainnya.
                </h4>
                <div className="flex shrink-0 align-bottom items-end h-[20%]">
                  <button
                    type="button"
                    className="flex items-end md:ml-2 text-sm lg:text-[clamp(1rem,1.5vw,3rem)] text-[#5ce1e6] hover:text-[#48b1b4] active:text-[#48b1b4] transition-colors duration-200 active:duration-25"
                  >
                    Learn More{" "}
                    <FaArrowRight className="ml-[clamp(0.5rem,0.5vw,1.2rem)] text-lg lg:text-[clamp(1rem,2vw,4.125rem)]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section id="faq" className="relative bg-gray-900 w-full z-10 pt-5 pb-10">
        <div className="flex flex-col gap-[clamp(0.5rem,1vw,1.5rem)] items-center-safe justify-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.up}
            className="text-[clamp(1.75rem,2.1vw,85px)] text-shadow-md lg:text-shadow-lg text-shadow-black/60 text-center font-semibold whitespace-normal break-words leading-none"
          >
            FREQUENTLY ASKED QUESTION
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.up}
            className="flex h-[clamp(0.4rem,0.5vw,1.2rem)] w-[clamp(14.25rem,35vw,83.75rem)] rounded-3xl bg-black/10 overflow-hidden"
          >
            <motion.div
              variants={flyVariants.fill}
              className="h-full bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] rounded-3xl"
            />
          </motion.div>
          <div className="flex flex-col justify-center w-full sm:px-10 md:px-[clamp(5rem,11vw,50rem)]  text-left">
            <motion.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.left}
              className="text-red-600 text-[clamp(1.5rem,2.25vw,6.5rem)] text-shadow-md font-semibold pl-2 lg:pl-0"
            >
              Apa itu RQRE.ID ?
            </motion.h3>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.upD1}
              className="pl-4 pr-5 lg:pl-5 lg:pr-10 text-pretty text-justify text-[clamp(1rem,1vw,3.25rem)]"
            >
              RQRI.ID adalah aplikasi yang didirikan untuk membantu event yang
              bersifat Member-Only dalam memastikan partisipan yang memasuki
              area event merupakan partisipan terdaftar dan mengurangi resiko
              overflowded yang disebabkan oleh jumlah partisipan melebihi
              kapasitas pengunjung yang sudah disiapkan oleh penyelengara.
            </motion.p>
            <motion.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.left}
              className="text-red-600 text-[clamp(1.5rem,2.25vw,6.5rem)] text-shadow-md mt-3 font-semibold pl-2 lg:pl-0 leading-7 lg:leading-normal"
            >
              Kenapa harus menggunakan RQRE.ID ?
            </motion.h3>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.upD1}
              className="pl-4 pr-5 lg:pl-5 lg:pr-10 text-pretty text-justify text-[clamp(1rem,1vw,3.25rem)]"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              laoreet iaculis maximus. Nam tristique diam quis odio scelerisque
              commodo. Etiam vel ex libero. Fusce sit amet vestibulum justo.
              Nullam cursus sagittis pharetra. Integer ut justo et ligula
              elementum mattis iaculis ac libero. Praesent eleifend enim non
              pretium pulvinar. Proin quam.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Arrow(props: { left?: boolean; onClick: (e: any) => void }) {
  return (
    <motion.button
      id="event"
      initial={{ opacity: 0, x: props.left ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      type="button"
      onClick={props.onClick}
      className={`
        absolute flex shrink-0 top-1/2 z-20 -translate-y-1/2 py-10 md:py-2 md:px-10 lg:px-0 font-bold text-white/70 hover:text-white active:text-white bg-black/20 lg:bg-black/0 active:bg-black/30 lg:active:bg-black/0
        transition-colors duration-100 active:duration-75 text-[clamp(5rem,6vw,12rem)] md:w-[5%] justify-center items-center text-shadow-md
      ${
        props.left
          ? "-left-1 md:left-20 lg:-left-2 "
          : "-right-1 pr-[2px] md:right-20 lg:-right-2"
      }`}
    >
      {props.left ? "❮" : "❯"}
    </motion.button>
  );
}
