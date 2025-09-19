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
        <header className="sticky top-0 left-0 z-50 w-full bg-slate-900/75 text-white">
          <nav className=" mx-auto flex justify-between items-center lg:px-4 lg:py-3">
            <div className="font-bold bg-slate-400 h-10 w-35 lg:w-30 text-center py-2">
              LOGO RQRE
            </div>
            <ul className="hidden md:flex lg:flex gap-6 text-sm md:mr-2">
              <NavLink />
            </ul>
            <MobileSidebar />
          </nav>
        </header>
        <div className="flex-grow">
          <main className="flex-1 relative">{children}</main>
        </div>
        <footer className="bg-neutral-800 text-center py-3 text-sm">
          © 2025 RQRE.ID — All rights reserved.
        </footer>
      </body>
    </html>
  );
}
