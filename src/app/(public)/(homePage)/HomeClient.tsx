"use client";

import { useKeenSlider } from "keen-slider/react";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import {
  easeInOut,
  motion,
  cubicBezier,
  useReducedMotion,
} from "framer-motion";
import type { IconType } from "react-icons";
import { BiScan } from "react-icons/bi";
import { IoTicketOutline } from "react-icons/io5";
import { AiOutlineQrcode } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import { triggerProgress } from "@/components/ui/nProgress/nProgresssTrigger";
import EventCard from "@/components/ui/card";
import "keen-slider/keen-slider.min.css";

function useThrottledResizeObserver(
  callback: () => void,
  selector = ".card",
  delay = 150,
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const throttled = useCallback(() => {
    if (timeoutRef.current) return;
    timeoutRef.current = setTimeout(() => {
      callback();
      timeoutRef.current = null;
    }, delay);
  }, [callback, delay]);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    const observer = new ResizeObserver(throttled);
    observerRef.current = observer;
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [selector, throttled]);
  return {
    disconnect: () => observerRef.current?.disconnect(),
  };
}

export default function HomeClient() {
  const [currSlide, setCurrSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [subject, setSubject] = useState("Hal Umum");
  const [expandedCards, setExpandedCards] = useState({
    scan: false,
    ticket: false,
    qr: false,
    graph: false,
  });

  type CardKey = "scan" | "ticket" | "qr" | "graph";
  const defTrans = useMemo(
    () => ({ duration: 0.55, ease: cubicBezier(0.25, 0.1, 0.25, 1) }),
    [],
  );
  const arrowTrans = useMemo(
    () => ({ duration: 0.25, ease: cubicBezier(0.45, 0, 0.55, 1) }),
    [],
  );
  const flyVariants = useMemo(
    () => ({
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
      btnPush: {
        initial: { scale: 1 },
        whileHover: { scale: 1.05, transition: { duration: 0.2, easeInOut } },
        whileTap: { scale: 0.95, transition: { duration: 0.2, easeInOut } },
      },
    }),
    [],
  );

  const cards = useMemo(
    () => [
      {
        id: "scan" as CardKey,
        title: "QR Code Verification",
        Icon: BiScan as IconType,
        desc: "Sebuah media verifikasi pendaftar berupa Quick Response (QR) code yang akan dipakai oleh pendaftar untuk memverifikasi diri mereka sebagai partisipan valid.",
      },
      {
        id: "ticket" as CardKey,
        title: "Digital Ticket",
        Icon: IoTicketOutline as IconType,
        desc: "RQRE.ID menyediakan ticket dari event, konser, lomba dan lain-lain dalam bentuk digital yang akan dikirimkan langsung melalui email anda yang terdaftar.",
      },
      {
        id: "qr" as CardKey,
        title: "Automatic QR-code",
        titleBreak: "Assigner for Member",
        Icon: AiOutlineQrcode as IconType,
        desc: "RQRE.ID akan meng-generate kode QR dan meng-assign kode tersebut ke pendaftar valid secara otomatis sehingga panitia hanya perlu meng-scan QR penggunjung untuk memvalidasi stasus mereka.",
      },
      {
        id: "graph" as CardKey,
        title: "Visual Report",
        Icon: VscGraph as IconType,
        desc: "RQRE.ID menyediakan grafik visual yang akan memperlihatkan laporan jumlah peserta, pengunjung yang hadir, dan beragam data relevan lainnya.",
      },
    ],
    [],
  );

  const InfoCard = useMemo(() => {
    return React.memo(function InfoCard({
      id,
      title,
      titleBreak,
      Icon,
      desc,
      expanded,
      onToggle,
    }: {
      id: CardKey;
      title: string;
      titleBreak?: string;
      Icon: IconType;
      desc: string;
      expanded: boolean;
      onToggle: () => void;
    }) {
      const contentRef = useRef<HTMLDivElement | null>(null);
      const [contentH, setContentH] = useState<number>(0);
      const prefersReduced = useReducedMotion();

      const router = useRouter();
      const linkMap: Record<CardKey, string> = {
        scan: "/detail/verifikasi",
        ticket: "/detail/tiket",
        qr: "/detail/assigner",
        graph: "/detail/laporan",
      };

      useLayoutEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const update = () => {
          setContentH(el.scrollHeight);
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        window.addEventListener("resize", update);
        return () => {
          ro.disconnect();
          window.removeEventListener("resize", update);
        };
      }, []);

      const updateLayout = useCallback(() => {
        const el = contentRef.current;
        if (expanded && el) {
          setContentH(el.scrollHeight);
        }
      }, [expanded]);

      useThrottledResizeObserver(updateLayout, ".card", 150);

      const variant = ["scan", "ticket"].includes(id)
        ? flyVariants.downD1
        : flyVariants.upD1;

      return (
        <motion.div
          layout
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            onToggle();
          }}
          initial="hidden"
          whileInView="visible"
          whileTap={{
            scale: 0.95,
            filter: "brightness(0.8)",
            transition: { duration: 0.1, ease: "easeInOut" },
          }}
          viewport={{ once: true, amount: 0.2 }}
          variants={variant}
          className="card flex flex-row py-1 items-center h-fit w-full bg-[#2d3751] rounded-[clamp(1rem,1vw,3rem)] border-5 lg:border-[clamp(0.25rem,0.5vw,1.25rem)] border-[#5ce1e6] pointer-events-auto"
        >
          <motion.div
            aria-hidden={!expanded}
            initial={false}
            animate={{
              opacity: expanded ? 1 : 0,
              y: expanded ? 0 : -10,
              height: expanded ? "auto" : 0,
            }}
            transition={{ layout: { duration: 0, ease: "linear" } }}
            className={`flex justify-center items-center overflow-hidden aspect-square duration-0 transition-all
              ${expanded ? "w-[25%] md:w-[13%]" : "w-[5%]"}
              ${id === "graph" ? "pt-[1%]" : ""}
            `}
          >
            <Icon className="w-[90%] h-[90%] text-[#7489bf]" />
          </motion.div>
          <motion.div
            layout
            transition={{ layout: { duration: 0.25, ease: "linear" } }}
            className="flex flex-col text-left w-full"
          >
            <div className="flex w-full h-fit justify-center items-center my-1 md:my-[clamp(0.25rem,0.5vw,1rem)]">
              <h3 className="font-extrabold w-full text-[clamp(1rem,2vw,6rem)] md:ml-2 whitespace-normal break-words leading-5 md:leading-normal">
                {title}
                {titleBreak && (
                  <>
                    {" "}
                    <span className="whitespace-nowrap">{titleBreak}</span>
                  </>
                )}
              </h3>
              <motion.div
                animate={{ rotate: expanded ? 90 : 0 }}
                transition={arrowTrans}
                className="flex mr-[clamp(0.25rem,0.5vw,1rem)] mt-1 md:mt-0 w-fit justify-center items-center rounded-full hover:brightness-90 active:brightness-90 transition-colors duration-200 active:duration-25"
              >
                <FaAngleRight className="flex shrink-0 size-[clamp(1.5rem,3vw,10rem)] text-[#5ce1e6]" />
              </motion.div>
            </div>
            <motion.div
              layout
              initial={false}
              animate={{
                height: expanded ? contentH : 0,
                opacity: expanded ? 1 : 0,
              }}
              transition={prefersReduced ? { duration: 0 } : defTrans}
              className="overflow-hidden"
            >
              <motion.div
                layout
                ref={contentRef}
                className=" flex flex-col gap-[clamp(0.5rem,1vw,3.5rem)] mt-1"
              >
                <h4 className="font-bold text-xs lg:text-[clamp(1.1rem,1vw,5rem)] text-pretty text-justify md:ml-2 mr-2 md:mr-[clamp(2rem,8vw,8rem)] ">
                  {desc}
                </h4>
                <div className="flex align-bottom items-end h-[20%] pb-[2%] md:pb-[1%]">
                  <motion.button
                    layout
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(linkMap[id]);
                    }}
                    whileTap={{ scale: 0.95, filter: "brightness(0.8)" }}
                    whileHover={{ scale: 0.95, filter: "brightness(0.8)" }}
                    transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
                    className="flex items-end z-10 pr-3 py-1 md:ml-2 text-sm lg:text-[clamp(1rem,1.5vw,3rem)] text-[#5ce1e6] pointer-events-auto"
                    style={{ touchAction: "manipulation" }}
                  >
                    Learn More{" "}
                    <FaArrowRight className="ml-[clamp(0.5rem,0.5vw,1.2rem)] text-lg lg:text-[clamp(1rem,2vw,4.125rem)]" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      );
    });
  }, [arrowTrans, defTrans, flyVariants]);

  const toggleCard = (key: keyof typeof expandedCards) => {
    setExpandedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    const header = document.querySelector("header");
    if (!el || !header) return;
    const offset = el.offsetTop - header.getBoundingClientRect().height;
    window.scrollTo({ top: offset, behavior: "smooth" });
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

  return (
    <div className="min-h-screen contain-inline-size">
      <div className="absolute inset-0  bg-gradient-to-r from-[#7c3aed] to-[#7dd3fc]" />
      <div className="absolute inset-y-0 left-0 w-[100%] md:w-[99.9%] -skew-x-60 origin-top-left bg-gradient-to-br from-[#0b1220] to-[#1a1f2e]" />
      <motion.div
        layout
        initial={{
          scale: 0,
          opacity: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.4, ease: "easeOut" },
        }}
        variants={flyVariants.btnPush}
        whileHover="whileHover"
        whileTap="whileTap"
        className="fixed bottom-5 right-2 md:bottom-[clamp(0.25rem,1vw,2rem)] md:right-[clamp(0.25rem,1vw,2rem)] z-50 
          w-[clamp(3rem,4vw,15rem)] h-[clamp(3rem,4vw,15rem)] flex items-center justify-center rounded-full"
      >
        <div
          className=" w-full h-full justify-center items-center bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] ease-in-out
          shadow-lg hover:shadow-2xl hover:brightness-90 active:brightness-90 transition-all cursor-pointer rounded-full"
        >
          <FaWhatsapp className=" text-white w-full h-full scale-[75%]" />
        </div>
      </motion.div>
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
          <motion.div
            layout
            variants={flyVariants.btnPush}
            initial="initial"
            whileHover="whileHover"
            whileTap="whileTap"
            className="inline-block justify-center items-center h-[clamp(2.5rem,3vw,7rem)] w-[clamp(12.5rem,15vw,500%)] rounded-4xl"
          >
            <button
              type="button"
              onClick={() => handleScroll("event")}
              className="bg-gradient-to-r w-full h-full rounded-4xl from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 text-shadow-md font-semibold text-[clamp(1.125rem,1.1vw,5rem)]"
            >
              Daftarkan Diri
            </button>
          </motion.div>
          <motion.div
            layout
            variants={flyVariants.btnPush}
            initial="initial"
            whileHover="whileHover"
            whileTap="whileTap"
            className="inline-block justify-center items-center h-[clamp(2.5rem,3vw,7rem)] w-[clamp(12.5rem,15vw,500%)] rounded-4xl"
          >
            <button
              type="button"
              className="bg-gradient-to-r w-full h-full rounded-4xl from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 text-shadow-md font-semibold text-[clamp(1.125rem,1.1vw,5rem)]"
            >
              Ajukan Event
            </button>
          </motion.div>
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
        <div className="navigation-wrapper relative mt-[clamp(2.25rem,3vw,3rem)] px-[clamp(1.5rem,4vw,3000rem)] overflow-hidden">
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
                className={`w-[clamp(1rem,1.25vw,1.75rem)] h-[clamp(1rem,1.25vw,1.75rem)] rounded-full ${currSlide === idx
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
          <motion.div
            layout
            variants={flyVariants.btnPush}
            initial="initial"
            whileHover="whileHover"
            whileTap="whileTap"
            className="mt-5 inline-block justify-center items-center h-[clamp(2.5rem,3vw,10rem)] w-[clamp(13.5rem,15vw,35rem)] rounded-[clamp(0.75rem,2vw,1rem)]"
          >
            <button
              type="button"
              className=" bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 w-full h-full text-[clamp(1.125rem,1vw,15rem)] rounded-[clamp(0.75rem,2vw,1rem)] text-shadow-md font-semibold text-lg"
            >
              Lihat Semua Event
            </button>
          </motion.div>
        </motion.div>
      </section>
      <section
        id="about"
        className="relative z-10 mt-10 py-4 bg-black/70 flex flex-col items-center basis-full px-[clamp(0.75rem,2vw,500rem)]"
      >
        <div className="flex flex-col gap-3 md:gap-[clamp(0.5rem,1vh,1.2rem)] w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.up}
            className="flex flex-col gap-1"
          >
            <h3 className=" text-red-600 text-[clamp(1.875rem,3vw,8rem)] text-shadow-md text-center font-semibold">
              I N T R O D U C T I O N
            </h3>
            <h2 className="text-shadow-md text-[clamp(1.875rem,2.5vw,6rem)] md:px-[clamp(5rem,9vw,50rem)] font-bold text-center md:text-start">
              APA ITU RQRE.ID ?
            </h2>
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.up}
            className="text-shadow-md text-[clamp(1rem,1.3vw,3rem)] font-medium text-pretty text-justify px-3 md:px-[clamp(5rem,11vw,50rem)] "
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
              <motion.div
                layout
                variants={flyVariants.btnPush}
                initial="initial"
                whileHover="whileHover"
                whileTap="whileTap"
                className="mt-5 inline-block justify-center items-center h-[clamp(2.5rem,3vw,10rem)] w-[clamp(13.5rem,15vw,500rem)] rounded-[clamp(0.75rem,2vw,1rem)]"
              >
                <button
                  type="button"
                  className="bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 h-full w-full text-[clamp(1.125rem,1vw,15rem)] rounded-[clamp(0.75rem,2vw,1rem)] text-shadow-md font-semibold text-lg"
                >
                  Ajukan Event Anda
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6 w-full md:px-[clamp(5rem,9vw,50rem)]">
          {cards.map((c) => (
            <InfoCard
              key={c.id}
              id={c.id}
              title={c.title}
              titleBreak={c.titleBreak}
              Icon={c.Icon}
              desc={c.desc}
              expanded={(expandedCards as Record<string, boolean>)[c.id]}
              onToggle={() => toggleCard(c.id)}
            />
          ))}
        </div>
      </section>
      <section id="faq" className="relative bg-gray-900 w-full z-10 pt-[3%] pb-[3%]">
        <div className="flex flex-col gap-[clamp(0.5rem,1vw,1.5rem)] items-center-safe justify-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.up}
            className="text-[clamp(1.75rem,2.1vw,85px)] text-shadow-md lg:text-shadow-lg text-shadow-black/60 text-center font-semibold whitespace-normal break-words leading-none"
          >
            FREQUENTLY {""}
            <span className="whitespace-nowrap">ASKED QUESTION</span>
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
          <div className="flex flex-col justify-center w-full text-left">
            <motion.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.left}
              className="text-red-600 text-[clamp(1.5rem,2.25vw,6.5rem)] text-shadow-md font-semibold px-2 md:px-[clamp(6rem,11vw,50rem)]"
            >
              Apa itu RQRE.ID ?
            </motion.h3>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.upD1}
              className="px-5.5 md:px-[clamp(6.5rem,13vw,50rem)] text-pretty text-justify text-[clamp(1rem,1vw,3.25rem)]"
            >
              RQRI.ID adalah aplikasi yang didirikan untuk membantu event yang
              bersifat Member-Only dalam memastikan partisipan yang memasuki
              area event merupakan partisipan terdaftar dan mengurangi resiko
              overcrowded yang disebabkan oleh jumlah partisipan melebihi
              kapasitas pengunjung yang sudah disiapkan oleh penyelengara.
            </motion.p>
            <motion.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.left}
              className="text-red-600 text-[clamp(1.5rem,2.25vw,6.5rem)] text-shadow-md mt-3 font-semibold px-2 md:px-[clamp(6rem,11vw,50rem)] leading-7 lg:leading-normal"
            >
              Kenapa harus menggunakan RQRE.ID ?
            </motion.h3>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.upD1}
              className="px-5.5 md:px-[clamp(6.5rem,13vw,50rem)] text-pretty text-justify text-[clamp(1rem,1vw,3.25rem)]"
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
        <div className="flex flex-col mt-5 md:mt-[5%] gap-[clamp(0.5rem,1vw,1.5rem)] items-center-safe justify-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.up}
            className="text-[clamp(1.75rem,2.1vw,85px)] text-shadow-md lg:text-shadow-lg text-shadow-black/60 text-center font-semibold whitespace-normal break-words leading-none"
          >
            HUBUNGI KAMI
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={flyVariants.up}
            className="flex h-[clamp(0.4rem,0.5vw,1.2rem)] w-[clamp(14.25rem,25vw,53.75rem)] rounded-3xl bg-black/10 overflow-hidden"
          >
            <motion.div
              variants={flyVariants.fill}
              className="h-full bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] rounded-3xl"
            />
          </motion.div>
          <div className="flex w-[95%] md:w-full md:px-[clamp(6rem,11.5vw,50rem)] h-fit mt-2 md:mt-[1%]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={flyVariants.upD1}
              className="flex flex-col justify-center items-start mt-[0.25%] p-[2%] bg-white rounded-[clamp(0.5rem,1vw,1.5rem)] w-full gap-[clamp(0.25rem,0.5vw,1rem)]"
            >
              <h4 className="text-black w-full text-center md:text-start font-bold text-[clamp(1rem,1.35vw,3rem)]">
                Beritahu kami apa yang anda ingin ketahui
              </h4>
              <h5 className="text-gray-600 w-full font-semibold text-center md:text-start text-[clamp(0.7rem,1.35vw,3rem)]">
                staff kami akan sebisa mungkin menjawab pertanyaan anda
              </h5>
              <form className="flex flex-col mt-3 md:mt-[1%] px-2 md:px-0 space-y-[clamp(0.2rem,1.5vh,3.5rem)] w-full">
                <label className="flex flex-col font-bold text-black text-[clamp(0.8rem,1.35vw,3rem)] gap-[clamp(0rem,0.5vw,0.25rem)]">
                  Alamat Email
                  <input
                    name="email"
                    type="email"
                    placeholder="Masukan Alamat Email Anda"
                    required={true}
                    className="md:w-full border rounded mt-1 p-[clamp(0.625rem,0.5vw,0.75rem)] text-black"
                  />
                </label>
                <fieldset className="flex flex-col mt-2 gap-[clamp(0.5rem,0.8vw,1rem)]">
                  <legend className="font-bold text-black text-[clamp(0.8rem,1.35vw,3rem)] mb-[0.5%]">
                    Ingin menanyakan seputaran :
                  </legend>
                  <div className="flex flex-wrap gap-[clamp(0.3rem,0.5vw,2rem)] w-full justify-center md:justify-start">
                    {[
                      "Pendaftaran Event",
                      "Pendaftaran Peserta",
                      "Hal Umum",
                      "Sistem Verifikasi",
                      "Hal yang Lain",
                    ].map((label) => (
                      <motion.button
                        key={label}
                        type="button"
                        whileTap={{ scale: 0.95, filter: "brightness(0.8)" }}
                        whileHover={{ scale: 1.05, filter: "brightness(0.95)" }}
                        onClick={() => setSubject(label)}
                        transition={{ type: "spring", duration: 0.4, ease: "easeInOut" }}
                        className={`px-[clamp(0.5rem,1.5vw,2.5rem)] py-[clamp(0.4rem,0.6vw,0.6rem)]
                          rounded-full border text-[clamp(0.75rem,1vw,3rem)] font-bold
                          ${subject === label
                            ? "bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] text-white shadow-md"
                            : "border-gray-300 bg-white text-gray-700 hover:border-[#f0945b]"
                          }`}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </div>
                  <input type="hidden" name="subjek" value={subject} />
                </fieldset>
                <textarea
                  name="pesan"
                  placeholder="Ketikkan Pesan Anda Disini"
                  required={true}
                  className="md:w-full text-[clamp(0.8rem,1.35vw,3rem)] border rounded mt-1 p-[clamp(0.625rem,0.5vw,0.75rem)] text-black"
                />
                <div className="flex w-full justify-center items-center mt-[1%]">
                  <motion.div
                    layout
                    variants={flyVariants.btnPush}
                    initial="initial"
                    whileHover="whileHover"
                    whileTap="whileTap"
                    className=" inline-block justify-center items-center rounded-[clamp(0.25rem,0.5vw,1rem)]"
                  >
                    <button
                      type="submit"
                      className=" px-[clamp(1rem,1.2vw,1.5rem)] py-1 md:py-[clamp(0.1rem,0.75vh,2rem)] w-full h-full md:text-[clamp(1rem,1.5vw,5rem)] rounded-[clamp(0.25rem,0.5vw,1rem)] bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 text-white font-bold"
                    >
                      Kirimkan
                    </button>
                  </motion.div>
                </div>
              </form>
            </motion.div>
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
      whileTap={{
        scale: 1.25,
        x: props.left ? 0.5 : -0.5,
        transition: { duration: 0.2, ease: "linear", type: "tween" },
      }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      type="button"
      onClick={props.onClick}
      className={`overflow-hidden bg-radial from-black/50 from-5% to-black/0 lg:bg-none active:bg-black/30 lg:active:bg-black/0 rounded-full
        absolute flex shrink-0 top-1/2 z-20 -translate-y-1/2 py-10 md:py-2 md:px-10 lg:px-0 font-bold text-white/70 hover:text-white active:text-white 
        text-[clamp(5rem,6vw,12rem)] md:w-[5%] justify-center items-center text-shadow-md
      ${props.left
          ? "left-0 md:left-20 lg:-left-2 "
          : "right-0 md:right-20 lg:-right-2"
        }`}
    >
      {props.left ? "❮" : "❯"}
    </motion.button>
  );
}
