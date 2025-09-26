import Image from "next/image";
import EventRegisForm from "./eventRegis";
import { BsArrowsFullscreen } from "react-icons/bs";

type ECardProps = {
  title: string;
  image?: string;
};

export default function EventCard({ title, image }: ECardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden md:w-[clamp(23.4375rem,12vw,345rem)] md:h-[clamp(30rem,35vh,500rem)] mb-8 flex flex-col justify-center items-center">
      <div className="relative flex m-2 md:m-0 md:mt-5 items-center w-[300px] h-[300px] md:w-[92%] md:h-[70%]">
        <button
          type="button"
          className="absolute z-50 top-0 right-0 md:-top-2 md:-right-2 w-[clamp(2.5rem,2vw,5.5rem)] h-[clamp(2.5rem,2vw,5.5rem)] rounded-full bg-gray-300/60 flex items-center justify-center hover:bg-gray-200/80 active:bg-gray-200/80"
        >
          <BsArrowsFullscreen className="text-[clamp(1.5rem,1.2vw,3rem)] text-center text-slate-950/70 hover:text-black/80 active:text-black/80" />
        </button>
        <Image
          className="rounded-xl"
          src={"/placeholder.webp"}
          layout="fill"
          objectFit="contain"
          alt="PlaceHolder Pict"
        />
      </div>
      <div className="text-center">
        <h3 className="my-[clamp(0.5rem,1vw,0.75rem)] font-bold text-[clamp(2rem,1.75vw,3.75rem)] text-black">
          {title}
        </h3>
        <EventRegisForm eventName={title} />
      </div>
    </div>
  );
}
