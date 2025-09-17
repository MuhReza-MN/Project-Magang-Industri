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
        slides: { perView: 1, spacing: 15 },
      },
    },
  });

  return (
    <div className="min-h-screen contain-inline-size">
      <div className="absolute inset-0  bg-gradient-to-r from-[#7c3aed] to-[#7dd3fc]" />
      <div className="absolute inset-y-0 left-0 md:w-[90%] sm:w-[130%] -skew-x-40 origin-top-left bg-gradient-to-br from-[#0b1220] to-[#1a1f2e]" />
      <section className="relative z-10 min-h-[100%] flex flex-col items-center">
        <h1 className="pt-35 text-9xl flex justify-center-safe text-shadow-md text-shadow-gray-700/80">
          RQRE.ID
        </h1>
        <h3 className="md:px-50 sm:px-8 md:pt-5 sm:pt-8 flex justify-center-safe text-center text-wrap text-xl text-shadow-md text-shadow-gray-700/80">
          RQRE.ID menyediakan layanan verifikasi berbasis QR Code untuk Event
          Organizer, mulai dari registrasi peserta dan validasi akses masuk demi
          memastikan event berjalan aman, ekslusif, dan tertata
        </h3>
        <div className="flex items-center flex-col md:mt-8 sm:mt-10">
          <button
            type="button"
            className="bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] h-10 w-[15%] sm:w-50 rounded-4xl mt-2 text-shadow-md font-semibold text-lg"
          >
            Daftarkan Diri
          </button>
          <button
            type="button"
            className="bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] h-10 w-[15%] sm:w-50 rounded-4xl mt-5 text-shadow-md font-semibold text-lg"
          >
            Daftarkan Event
          </button>
        </div>
      </section>
      <section className="relative z-10 mt-40 mx-2">
        <div className="flex flex-col gap-2 items-center-safe justify-center">
          <h2 className="text-5xl text-shadow-md text-center font-semibold">
            ONGOING EVENT
          </h2>
          <div className="flex md:h-2.5 sm:h-2 md:w-[500px] sm:w-[460px] rounded-3xl bg-gradient-to-r from-[#eb4b3f] to-[#f0945b]"></div>
        </div>
        <div className="navigation-wrapper relative mt-12 px-15">
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
                  currSlide === idx ? "bg-orange-500" : "bg-black/40"
                }`}
              />
            ))}
          </div>
        )}

        <p className="pt-3 text-shadow-md font-semibold text-2xl text-center md:px-50 sm:px-0">
          Klik tombol Register untuk mendaftarkan diri ke event yang sedang
          berjalan untuk menerima QR code sebagai bukti pendaftaran
        </p>
      </section>
      <section className="relative z-10 mt-10 py-4 bg-black/70 flex md:flex-row sm:flex-col basis-full md:px-10 sm:px-3 sm:gap-5">
        <div className="flex flex-col gap-3 md:w-[50%] sm:w-full">
          <h3 className="text-red-600 text-3xl text-shadow-md font-semibold">
            I N T R O D U C T I O N
          </h3>
          <h2 className="text-shadow-md text-4xl font-bold">
            APA ITU RQRE.ID ?
          </h2>
          <p className="text-shadow-md text-lg font-medium text-balance text-justify md:pr-20 sm:pr-3">
            RQRE.ID adalah aplikasi yang dirancang untuk membantu Event
            Organizer dalam menyelenggarakan acara ekslusif bagi partisipan
            terdaftar. Melalui sistem verifikasi kode QR, RQRE.ID akan
            memastikan peluang partisipan tidak terdaftar dalam memasuki area
            acara. Dengan demikian, risiko overcrowding akibat jumlah pengunjung
            yang melebihi kapasitas dapat diminimalisir, sehingga acara berjalan
            lebih aman dan tertata.
          </p>
          <div className="flex flex-col md:gap-60 sm: gap-6">
            <button
              type="button"
              className="mt-5 bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] h-10 w-55 rounded-xl text-shadow-md font-semibold text-lg"
            >
              Daftarkan Event Anda
            </button>
            <div className="flex flex-col gap-2">
              <h3 className="text-red-600 text-3xl text-shadow-md font-semibold tracking-widest">
                CONTACT US
              </h3>
              <div className="flex flex-row md:gap-5 sm:gap-24 md:pl-1 sm:pl-8 sm:mb-2">
                <div className="flex md:flex-col sm:flex-row md:gap-2 items-center justify-center sm:justify-start sm:pl-2 bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] md:w-45 md:h-45 sm:h-20 sm:w-60 ">
                  <FaWhatsapp className="md:text-[100px] sm:text-[75px] text-white" />
                  <div className="flex flex-col pl-2 gap-1 md:text-center">
                    <h3 className="font-extrabold tracking-widest sm:text-lg text-shadow-md">
                      WHATSAPP
                    </h3>
                    <h4 className="font-bold text-shadow-md">0800 1221 0200</h4>
                  </div>
                </div>
                <div className="flex md:flex-col sm:flex-row md:gap-0 items-center justify-center sm:justify-start sm:pl-1 bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] md:w-45 md:h-45 sm:h-20 sm:w-60 ">
                  <AiOutlineMail className="md:text-[108px] sm:text-[75px] text-white" />
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
        <div className="flex flex-col gap-8 md:w-[50%] sm:w-full px-4">
          <div className="flex flex-row gap-8">
            <div className="flex flex-col gap-1 items-center-safe min-h-100 w-80 bg-[#2d3751] rounded-2xl border-12 border-[#5ce1e6]">
              <BiScan className="text-[140px] text-[#7489bf] mt-2" />
              <h3 className="font-extrabold text-xl text-center px-10">
                QR Code Verivication
              </h3>
              <h4 className="font-bold text-sm text-center px-1">
                Sebuah media verifikasi pendaftar berupa Quick Response (QR)
                code yang akan dipakai oleh pendaftar untuk memverifikasi diri
                mereka sebagai partisipan valid
              </h4>
              <button
                type="button"
                className="flex items-center pt-6 text-[#5ce1e6] hover:text-[#48b1b4]"
              >
                Learn More <FaArrowRight className="pl-2 text-2xl" />
              </button>
            </div>
            <div className="flex flex-col gap-1 items-center-safe min-h-100 w-80 bg-[#2d3751] rounded-2xl border-12 border-[#5ce1e6]">
              <IoTicketOutline className="text-[130px] text-[#7489bf] mt-3.5" />
              <h3 className="font-extrabold text-xl text-center px-10 pt-5 pb-3">
                Digital Ticket
              </h3>
              <h4 className="font-bold text-sm text-center px-1">
                RQRE.ID menyediakan ticket dari event, konser, lomba dan
                lain-lain dalam bentuk digital yang akan dikirimkan langsung
                melalui email anda yang terdaftar.
              </h4>
              <button
                type="button"
                className="flex items-center pt-6 text-[#5ce1e6] hover:text-[#48b1b4]"
              >
                Learn More <FaArrowRight className="pl-2 text-2xl" />
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex flex-col gap-1 items-center-safe min-h-100 w-80 bg-[#2d3751] rounded-2xl border-12 border-[#5ce1e6]">
              <AiOutlineQrcode className="text-[140px] text-[#7489bf] mt-2" />
              <h3 className="font-extrabold text-xl text-center px-5">
                Automatic Member QR-code Assign
              </h3>
              <h4 className="font-bold text-sm text-center px-1">
                RQRE.ID akan meng-generate kode QR dan meng-assign kode tersebut
                ke pendaftar valid secara otomatis sehingga panitia hanya perlu
                meng-scan QR penggunjung untuk memvalidasi stasus mereka.
              </h4>
              <button
                type="button"
                className="flex items-center pt-2 text-[#5ce1e6] hover:text-[#48b1b4]"
              >
                Learn More <FaArrowRight className="pl-2 text-2xl" />
              </button>
            </div>
            <div className="flex flex-col gap-1 items-center-safe min-h-100 w-80 bg-[#2d3751] rounded-2xl border-12 border-[#5ce1e6]">
              <VscGraph className="text-[130px] text-[#7489bf] mt-6" />
              <h3 className="font-extrabold text-xl text-center px-10 pt-2 pb-4">
                Visual Report
              </h3>
              <h4 className="font-bold text-sm text-center px-1">
                RQRE.ID menyediakan grafik visual yang akan memperlihatkan
                laporan jumlah peserta, pengunjung yang hadir, dan beragam data
                relevan lainnya.
              </h4>
              <button
                type="button"
                className="flex items-center pt-6 text-[#5ce1e6] hover:text-[#48b1b4]"
              >
                Learn More <FaArrowRight className="pl-2 text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-gray-900 w-full z-10 pt-5 pb-10">
        <div className="flex flex-col gap-2 items-center-safe justify-center">
          <h2 className="text-5xl text-shadow-md text-center font-semibold tracking-wide">
            FREQUENTLY ASKED QUESTION
          </h2>
          <div className="flex md:h-2.5 sm:h-2 mb-8 md:w-[500px] sm:w-[460px] rounded-3xl bg-gradient-to-r from-[#eb4b3f] to-[#f0945b]" />
          <div className="flex flex-col justify-center w-full md:px-40 sm:px-10 text-left">
            <h3 className="text-red-600 text-2xl text-shadow-md font-semibold">
              Apa itu RQRE.ID ?
            </h3>
            <p className="pl-5 md:pr-10 text-justify">
              RQRI.ID adalah aplikasi yang didirikan untuk membantu event yang
              bersifat Member-Only dalam memastikan partisipan yang memasuki
              area event merupakan partisipan terdaftar dan mengurangi resiko
              overflowded yang disebabkan oleh jumlah partisipan melebihi
              kapasitas pengunjung yang sudah disiapkan oleh penyelengara.
            </p>
            <h3 className="text-red-600 text-2xl text-shadow-md mt-3 font-semibold">
              Kenapa harus menggunakan RQRE.ID ?
            </h3>
            <p className="pl-5 md:pr-10 text-justify">
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
      className={`absolute top-1/2 z-20 -translate-y-1/2 px-1 text-9xl font-bold text-white/70 hover:text-white ${
        props.left ? "left-0.5" : "right-0.5"
      }`}
    >
      {props.left ? "❮" : "❯"}
    </button>
  );
}
