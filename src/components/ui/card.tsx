import Image from "next/image";

type ECardProps = {
  title: string;
  image?: string;
};
export default function EventCard({ title, image }: ECardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden lg:w-[375px] mb-8 flex flex-col justify-center items-center">
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
        <button
          type="button"
          className="mb-2 bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:from-[#c53a30] hover:to-[#d87d48] transition-all duration-300 h-10 w-50 lg:w-35 rounded-4xl text-shadow-md font-semibold text-lg"
        >
          Register
        </button>
      </div>
    </div>
  );
}
