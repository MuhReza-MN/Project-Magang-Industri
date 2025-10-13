import "./globals.css";
import NavLink from "@/components/ui/dNavbar";
import MobileSidebar from "@/components/ui/mNavbar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="sticky top-0 left-0 z-50 w-full bg-slate-900/75 text-white">
          <nav className=" mx-auto flex justify-between items-center lg:px-[clamp(0.25rem,0.75vw,2rem)]">
            <div className="relative font-bold lg:my-[clamp(0.15rem,1.5vh,2rem)] h-[clamp(3rem,5vh,7.5rem)] w-35 md:w-[clamp(15rem,20vw,25rem)] justify-center items-center">
              <Image 
                src={"/rqre.svg"}
                alt="LOGO RQRE"
                fill
                className="text-[clamp(0.9rem,1.2vw,10rem)] object-contain"
                priority
              />
            </div>
            <ul className="hidden md:flex md:mr-2 h-full w-full justify-end">
              <NavLink />
            </ul>
            <MobileSidebar />
          </nav>
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
