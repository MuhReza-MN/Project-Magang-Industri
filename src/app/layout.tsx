import "./globals.css";
import NavLink from "@/components/ui/dNavbar";
import MobileSidebar from "@/components/ui/mNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="sticky -top-1 left-0 z-50 w-full bg-slate-900/75 text-white">
          <nav className=" mx-auto flex justify-between items-center lg:px-[clamp(0.25rem,0.75vw,2rem)] lg:py-[clamp(0.15rem,1.5vh,2rem)]">
            <div className="flex font-bold bg-slate-400 h-[clamp(2.5rem,5vh,7.5rem)] w-35 lg:w-[clamp(5.5rem,10vw,25rem)] text-[clamp(0.9rem,1.2vw,10rem)] justify-center items-center">
              LOGO RQRE
            </div>
            <ul className="hidden md:flex lg:flex gap-[clamp(1rem,1.2vw,5rem)] text-sm md:mr-2">
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
