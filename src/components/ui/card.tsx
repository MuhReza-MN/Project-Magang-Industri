import Image from "next/image";
import EventRegisForm from "./eventRegis";

type ECardProps = {
  title: string;
  image?: string;
};

export default function EventCard({ title, image }: ECardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden md:w-[375px] lg:w-[375px] mb-8 flex flex-col justify-center items-center">
      <div className="pt-5 flex items-center-safe justify-center-safe">
        <Image
          className="rounded-xl"
          src={"/placeholder.webp"}
          width={340}
          height={340}
          alt="PlaceHolder Pict"
        />
      </div>
      <div className="text-center">
        <h3 className="pt-2 font-bold text-3xl mb-2 text-black">{title}</h3>
        <EventRegisForm eventName={title} />
      </div>
    </div>
  );
}
