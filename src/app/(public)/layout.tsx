import "@/styles/public.css";
import Navbar from "@/components/navbar/NavBar";
import Image from "next/image";
import LoadingBar from "@/components/ui/loadingBar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="sticky top-0 left-0 z-50 w-full bg-slate-900/75 text-white">
          {/* don't touch this duct-taped section, reason? it's because of some display bar animation fix */}
          <nav className="relative flex justify-between w-full overflow-hidden items-center lg:px-[clamp(0.25rem,0.75vw,2rem)] my-[0.5%] md:my-0">
            <div className="relative flex-shrink-0 font-bold my-0.5 lg:my-[clamp(0.15rem,1.5vh,2rem)] h-[clamp(2.8rem,5vh,7.5rem)] w-35 md:w-[clamp(15rem,20vw,25rem)] justify-center items-center">
              <Image
                src={"/rqre.svg"}
                alt="LOGO RQRE"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute right-0 h-full -top-[50%] md:-top-0 items-center mt-0.75 md:mt-0 lg:mt-[clamp(0.1rem,0.25vw,2rem)] 2xl:mt-[0.5%]">
              <div className="flex shrink-0 h-full">
                <Navbar />
              </div>
            </div>
          </nav>
          {/* end of the duct-taped section */}
        </header>
        <div className="flex-grow">
          <main className="flex-1 relative">{children}</main>
        </div>
        <footer className="flex justify-center items-center bg-neutral-800 text-center py-[clamp(0.5rem,1.5vh,1.5rem)] text-[clamp(0.75rem,1.25vw,4rem)]">
          © 2025 RQRE.ID — All rights reserved.
        </footer>
      </body>
    </html>
  );
}
