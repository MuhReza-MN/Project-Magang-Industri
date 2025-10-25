import "@/styles/auth.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <div className="absolute inset-0 bg-sky-100 -z-10" />
        <div className="flex-grow">
          <main className="flex-1 relative">{children}</main>
        </div>
        <footer className="flex justify-center items-center bg-neutral-800 text-center py-[clamp(0.5rem,1.5vh,1.5rem)] text-[clamp(0.75rem,1.25vw,4rem)]">
          © 2025 RQRE.ID — All rights reserved.
        </footer>
      </body>
    </html>
  )
}