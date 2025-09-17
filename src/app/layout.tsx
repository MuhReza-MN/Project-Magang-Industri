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
          <nav className=" mx-auto flex justify-between items-center px-4 py-3">
            <div className="font-bold bg-slate-400 h-10 w-30 text-center py-2">
              LOGO RQRE
            </div>
            <ul className="flex gap-6 text-sm">
              <li>
                <p className="underline underline-offset-3 text-gray-300 font-extrabold text-sm">
                  Lihat Event
                </p>
              </li>
              <li>
                <p className="underline underline-offset-3 text-gray-300 font-extrabold text-sm">
                  About Us
                </p>
              </li>
              <li>
                <p className="underline underline-offset-3 text-gray-300 font-extrabold text-sm">
                  FAQ
                </p>
              </li>
              <li>
                <p className="underline underline-offset-3 text-gray-300 font-extrabold text-sm">
                  Daftarkan Event
                </p>
              </li>
            </ul>
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
