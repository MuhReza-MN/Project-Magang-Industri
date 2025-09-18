"use client";

import EventCard from "@/components/ui/card";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { BiScan } from "react-icons/bi";
import { IoTicketOutline } from "react-icons/io5";
import { AiOutlineQrcode, AiOutlineMail } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa6";

export default function HomeClient() {
  const [currSlide, setCurrSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 1,
    loop: true,
    slides: {
      origin: "center",
      perView: 3,
      spacing: -20,
    },
    slideChanged(slider) {
      setCurrSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(max-width: 1024px)": {
        initial: 0,
        slides: { perView: 1, spacing: 15 },
      },
    },
  });

  return (
    <div className="min-h-screen contain-inline-size">
      <div className="absolute inset-0  bg-gradient-to-r from-[#7c3aed] to-[#7dd3fc]" />
      <div className="absolute inset-y-0 left-0 w-[150%] lg:w-[90%] -skew-x-40 origin-top-left bg-gradient-to-br from-[#0b1220] to-[#1a1f2e]" />
      <section className="relative z-10 min-h-[100%] flex flex-col items-center">
        <h1 className="pt-15 lg:pt-35 text-[90px] lg:text-9xl flex justify-center-safe text-shadow-md text-shadow-gray-700/80">
          RQRE.ID
        </h1>
        <h3 className="px-2 lg:px-50 lg:mt-5 flex justify-center text-center text-wrap text-xl text-shadow-md text-shadow-gray-700/80">
          RQRE.ID menyediakan layanan verifikasi berbasis QR Code untuk Event
          Organizer, mulai dari registrasi peserta dan validasi akses masuk demi
          memastikan event berjalan aman, ekslusif, dan tertata
        </h3>
        <div className="flex items-center flex-col mt-5 lg:mt-8">
          <button
            type="button"
            className="bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 h-10 w-50 lg:w-[150%] rounded-4xl mt-2 text-shadow-md font-semibold text-lg"
          >
            Daftarkan Diri
          </button>
          <button
            type="button"
            className="bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 h-10 w-50 lg:w-[150%] rounded-4xl mt-5 text-shadow-md font-semibold text-lg"
          >
            Daftarkan Event
          </button>
        </div>
      </section>
      <section className="relative z-10 mt-40 lg:mx-2">
        <div className="flex flex-col gap-2 items-center-safe justify-center">
          <h2 className="text-5xl text-shadow-md text-center font-semibold mx-2 lg:mx-0">
            ONGOING EVENT
          </h2>
          <div className="flex h-2 lg:h-2.5 w-[260px] lg:w-[500px]  rounded-3xl bg-gradient-to-r from-[#eb4b3f] to-[#f0945b]" />
        </div>
        <div className="navigation-wrapper relative mt-12 px-8 lg:px-15">
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event1" />
            </div>
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event2" />
            </div>
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event3" />
            </div>
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event4" />
            </div>
            <div className="keen-slider__slide flex justify-center relative">
              <EventCard title="Event5" />
            </div>
          </div>
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
          <div className="dots flex justify-center gap-4">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-3 h-3 rounded-full text-6xl ${
                  currSlide === idx
                    ? "bg-orange-500 hover:bg-orange-600 active:bg-orange-600"
                    : "bg-black/40 hover:bg-black/60 active:bg-orange-600"
                } transition-colors duration-200 active:duration-75`}
              />
            ))}
          </div>
        )}

        <p className="pt-4 lg:pt-3 text-shadow-md font-semibold text-[15px] lg:text-2xl text-balance text-center px-2 lg:px-50">
          Klik tombol Register untuk mendaftarkan diri ke event yang sedang
          berjalan untuk menerima QR code sebagai bukti pendaftaran
        </p>
      </section>
      <section className="relative z-10 mt-10 py-4 bg-black/70 flex flex-col md:flex-col lg:flex-row basis-full md:px-10 sm:px-3 sm:gap-5">
        <div className="flex flex-col gap-3 lg:w-[50%] pl-1 lg:pl-0">
          <h3 className="text-red-600 text-3xl text-shadow-md text-center lg:text-start font-semibold">
            I N T R O D U C T I O N
          </h3>
          <h2 className="text-shadow-md text-4xl font-bold text-center lg:text-start">
            APA ITU RQRE.ID ?
          </h2>
          <p className="text-shadow-md lg:text-lg font-medium text-balance text-justify pr-2 lg:pr-20 ">
            RQRE.ID adalah aplikasi yang dirancang untuk membantu Event
            Organizer dalam menyelenggarakan acara ekslusif bagi partisipan
            terdaftar. Melalui sistem verifikasi kode QR, RQRE.ID akan
            memastikan peluang partisipan tidak terdaftar dalam memasuki area
            acara. Dengan demikian, risiko overcrowding akibat jumlah pengunjung
            yang melebihi kapasitas dapat diminimalisir, sehingga acara berjalan
            lebih aman dan tertata.
          </p>
          <div className="flex flex-col justify-center items-center lg:items-start lg:gap-60 sm: gap-6">
            <button
              type="button"
              className="mt-5 bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 h-10 w-55 rounded-xl text-shadow-md font-semibold text-lg"
            >
              Daftarkan Event Anda
            </button>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <h3 className="text-red-600 text-3xl text-shadow-md font-semibold tracking-widest">
                CONTACT US
              </h3>
              <div className="flex flex-col md:flex-row lg:flex-row gap-3 lg:gap-5 px-8 mb-4 lg:mb-0">
                <div className="flex lg:flex-col md:flex-row md:gap-2 items-center justify-start lg:justify-center pl-2 lg:pl-0 bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 w-60 h-15 lg:w-45 lg:h-45 ">
                  <FaWhatsapp className="text-[50px] md:text-[75px] lg:text-[100px] text-white" />
                  <div className="flex flex-col pl-2 gap-1 md:text-center">
                    <h3 className="font-extrabold tracking-widest sm:text-lg text-shadow-md">
                      WHATSAPP
                    </h3>
                    <h4 className="font-bold text-shadow-md">0800 1221 0200</h4>
                  </div>
                </div>
                <div className="flex md:flex-col sm:flex-row md:gap-0 items-center justify-start lg:justify-center pl-2 lg:pl-0 bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 w-60 h-15 lg:w-45 lg:h-45 ">
                  <AiOutlineMail className="text-[50px] md:text-[75px] lg:text-[100px] text-white" />
                  <div className="flex flex-col pl-2 gap-1 md:text-center">
                    <h3 className="font-extrabold tracking-widest sm:text-lg text-shadow-md">
                      EMAIL US
                    </h3>
                    <h4 className="font-bold text-shadow-md">
                      rqre_id@gmail.com
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:gap-8 lg:w-[50%] md:w-[60%] sm:w-full px-2 lg:px-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <div className="flex flex-row lg:flex-col lg:gap-1 items-center lg:items-center min-h-33 lg:min-h-100 w-full lg:w-80 bg-[#2d3751] rounded-2xl border-5 lg:border-12 border-[#5ce1e6]">
              <BiScan className="flex shrink-0 text-[100px] lg:text-[140px] text-[#7489bf] lg:mt-2 pl-2 lg:pl-0" />
              <div className="flex flex-col lg:gap-2 text-left lg:text-center">
                <h3 className="font-extrabold text-xl px-1 lg:px-10">
                  QR Code Verivication
                </h3>
                <h4 className="font-bold text-xs lg:text-sm text-balance text-justify lg:text-center px-1 pr-8 lg:pr-0">
                  Sebuah media verifikasi pendaftar berupa Quick Response (QR)
                  code yang akan dipakai oleh pendaftar untuk memverifikasi diri
                  mereka sebagai partisipan valid.
                </h4>
                <button
                  type="button"
                  className="flex lg:justify-center pl-1 lg:pl-0 lg:pt-4 text-sm lg:text-base text-[#5ce1e6] hover:text-[#48b1b4] active:text-[#48b1b4] transition-colors duration-200 active:duration-25"
                >
                  Learn More{" "}
                  <FaArrowRight className="pl-2 text-xl lg:text-2xl" />
                </button>
              </div>
            </div>
            <div className="flex flex-row lg:flex-col lg:gap-1 items-center lg:items-center min-h-33 lg:min-h-100 w-full lg:w-80 bg-[#2d3751] rounded-2xl border-5 lg:border-12 border-[#5ce1e6]">
              <IoTicketOutline className="flex shrink-0 text-[100px] lg:text-[140px] text-[#7489bf] lg:mt-3 lg:mb-4 px-2 lg:px-0" />
              <div className="flex flex-col lg:gap-4 text-left lg:text-center">
                <h3 className="font-extrabold text-xl px-1 lg:px-10">
                  Digital Ticket
                </h3>
                <h4 className="font-bold text-xs lg:text-sm text-balance text-justify lg:text-center px-1 pr-8 lg:pr-0">
                  RQRE.ID menyediakan ticket dari event, konser, lomba dan
                  lain-lain dalam bentuk digital yang akan dikirimkan langsung
                  melalui email anda yang terdaftar.
                </h4>
                <button
                  type="button"
                  className="flex lg:justify-center pl-1 lg:pl-0 lg:pt-2 text-sm lg:text-base text-[#5ce1e6] hover:text-[#48b1b4] active:text-[#48b1b4] transition-colors duration-200 active:duration-25"
                >
                  Learn More{" "}
                  <FaArrowRight className="pl-2 text-xl lg:text-2xl" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <div className="flex flex-row lg:flex-col lg:gap-1 items-center lg:items-center min-h-43 lg:min-h-100 w-full lg:w-80 bg-[#2d3751] rounded-2xl border-5 lg:border-12 border-[#5ce1e6]">
              <AiOutlineQrcode className="flex shrink-0 text-[100px] lg:text-[140px] text-[#7489bf] lg:mt-2" />
              <div className="flex flex-col gap-1 lg:gap-2 text-left lg:text-center">
                <h3 className="font-extrabold text-xl px-1 lg:px-4 whitespace-normal break-words leading-5 lg:leading-7">
                  Automatic Member <span className="whitespace-nowrap">QR-code</span> Assign
                </h3>
                <h4 className="font-bold text-xs lg:text-sm text-balance text-justify lg:text-center px-1 pr-8 lg:pr-0">
                  RQRE.ID akan meng-generate kode QR dan meng-assign kode
                  tersebut ke pendaftar valid secara otomatis sehingga panitia
                  hanya perlu meng-scan QR penggunjung untuk memvalidasi stasus
                  mereka.
                </h4>
                <button
                  type="button"
                  className="flex lg:justify-center pl-1 lg:pl-0 text-sm lg:text-base text-[#5ce1e6] hover:text-[#48b1b4] active:text-[#48b1b4] transition-colors duration-200 active:duration-25"
                >
                  Learn More{" "}
                  <FaArrowRight className="pl-2 text-xl lg:text-2xl" />
                </button>
              </div>
            </div>
            <div className="flex flex-row lg:flex-col lg:gap-4 items-center lg:items-center min-h-33 lg:min-h-100 w-full lg:w-80 bg-[#2d3751] rounded-2xl border-5 lg:border-12 border-[#5ce1e6]">
              <VscGraph className="flex shrink-0 text-[100px] lg:text-[120px] text-[#7489bf] mt-2 lg:mt-8 pl-2 lg:pl-0" />
              <div className="flex flex-col lg:gap-4 text-left lg:text-center">
                <h3 className="font-extrabold text-xl px-1 lg:px-10 lg:pb-1">
                  Visual Report
                </h3>
                <h4 className="font-bold text-xs lg:text-sm text-balance text-justify lg:text-center px-1 pr-8 lg:pr-0">
                  RQRE.ID menyediakan grafik visual yang akan memperlihatkan
                  laporan jumlah peserta, pengunjung yang hadir, dan beragam
                  data relevan lainnya.
                </h4>
                <button
                  type="button"
                  className="flex lg:justify-center pl-1 lg:pl-0 lg:pt-3 text-sm lg:text-base text-[#5ce1e6] hover:text-[#48b1b4] active:text-[#48b1b4] transition-colors duration-200 active:duration-25"
                >
                  Learn More{" "}
                  <FaArrowRight className="pl-2 text-xl lg:text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-gray-900 w-full z-10 pt-5 pb-10">
        <div className="flex flex-col gap-2 items-center-safe justify-center">
          <h2 className="text-3xl lg:text-5xl text-shadow-md text-center font-semibold tracking-wide">
            FREQUENTLY ASKED QUESTION
          </h2>
          <div className="flex h-1.5 lg:h-2.5 mb-8 w-[300px] lg:w-[500px] rounded-3xl bg-gradient-to-r from-[#eb4b3f] to-[#f0945b]" />
          <div className="flex flex-col justify-center w-full md:px-40 sm:px-10 text-left">
            <h3 className="text-red-600 text-2xl text-shadow-md font-semibold pl-2 lg:pl-0">
              Apa itu RQRE.ID ?
            </h3>
            <p className="pl-4 pr-5 lg:pl-5 lg:pr-10 text-balance text-justify">
              RQRI.ID adalah aplikasi yang didirikan untuk membantu event yang
              bersifat Member-Only dalam memastikan partisipan yang memasuki
              area event merupakan partisipan terdaftar dan mengurangi resiko
              overflowded yang disebabkan oleh jumlah partisipan melebihi
              kapasitas pengunjung yang sudah disiapkan oleh penyelengara.
            </p>
            <h3 className="text-red-600 text-2xl text-shadow-md mt-3 font-semibold pl-2 lg:pl-0">
              Kenapa harus menggunakan RQRE.ID ?
            </h3>
            <p className="pl-4 pr-5 lg:pl-5 lg:pr-10 text-balance text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              laoreet iaculis maximus. Nam tristique diam quis odio scelerisque
              commodo. Etiam vel ex libero. Fusce sit amet vestibulum justo.
              Nullam cursus sagittis pharetra. Integer ut justo et ligula
              elementum mattis iaculis ac libero. Praesent eleifend enim non
              pretium pulvinar. Proin quam.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Arrow(props: { left?: boolean; onClick: (e: any) => void }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`absolute top-1/2 z-20 -translate-y-1/2 lg:px-1 text-7xl lg:text-9xl font-bold text-white/70 hover:text-white active:text-white transition-colors duration-100 active:duration-75 ${
        props.left ? "-left-0.5 lg:-left-2 " : "-right-0.5 lg:-right-2"
      }`}
    >
      {props.left ? "❮" : "❯"}
    </button>
  );
}
