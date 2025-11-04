import "@/styles/auth.css";
import Image from "next/image";
import ProgressBar from "@/components/ui/nProgress/nProgress";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen w-full bg-linear-to-tr overflow-x-hidden
        bg-[linear-gradient(to_tr,var(--color-violet-200),var(--color-violet-300),var(--color-blue-200))]
      ">
        <ProgressBar theme="dashboard" />
        <header className="relative flex justify-start items-center w-full h-[clamp(3.5rem,6vh,6rem)] bg-linear-to-bl from-[#424242] to-[#8d8d8d] border-double border-b-[clamp(0.4rem,0.5vw,0.75rem)]">
          <div className="relative flex items-center mx-[2%]">
            <div className="absolute flex grow left-[2%] rounded-b-[clamp(0.8rem,1.5vw,3rem)] border-double
              w-[clamp(8rem,15vw,18rem)] 2xl:w-[clamp(0rem,12vw,38rem)] h-[clamp(6rem,12vh,25rem)] bg-gray-600 border-[clamp(0.4rem,0.5vw,0.75rem)] border-t-0"
            >
              <Image
                src={"/rqre.svg"}
                alt="LOGO RQRE"
                fill
                className="object-contain pb-[3.5%] pt-[15%] px-[10%]"
                priority
              />
            </div>
          </div>
        </header>
        <div className="absolute flex grow inset-0 bg-linear-to-tr from-violet-200 via-violet-300 to-blue-200 -z-10" />
        <main className="flex grow justify-center items-center relative">{children}</main>
        <footer className="flex justify-center items-center h-[clamp(2.5rem,5vh,5rem)] font-bold text-[clamp(1rem,1.25vw,2rem)] text-shadow-md text-white translate-y-1/2
          bg-linear-to-bl from-5% md:from-35% from-[#424242] to-[#8d8d8d] border-double border-t-[clamp(0.4rem,0.5vw,0.75rem)]">
          © 2025 RQRE.ID
        </footer>
      </body>
    </html>
  )
}