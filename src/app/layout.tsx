import MobileSidebar from "@/components/ui/mNavbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 left-0 z-50 w-full bg-slate-900/75 text-white">
          <nav className=" mx-auto flex justify-between items-center lg:px-4 lg:py-3">
            <div className="font-bold bg-slate-400 h-10 w-35 lg:w-30 text-center py-2">
              LOGO RQRE
            </div>
            <ul className="hidden lg:flex gap-6 text-sm">
              <li>
                <button
                  type="button"
                  className="underline underline-offset-3 text-gray-300 font-extrabold text-sm hover:text-gray-400 transition-colors duration-200"
                >
                  Lihat Event
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="underline underline-offset-3 text-gray-300 font-extrabold text-sm hover:text-gray-400 transition-colors duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="underline underline-offset-3 text-gray-300 font-extrabold text-sm hover:text-gray-400 transition-colors duration-200"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="underline underline-offset-3 text-gray-300 font-extrabold text-sm hover:text-gray-400 transition-colors duration-200"
                >
                  Daftarkan Event
                </button>
              </li>
            </ul>
            <MobileSidebar />
          </nav>
        </header>
        <main className="flex-1 relative">{children}</main>
        <footer className="bg-neutral-800 text-center py-3 text-sm">
          © 2025 RQRE.ID — All rights reserved.
        </footer>
      </body>
    </html>
  );
}
