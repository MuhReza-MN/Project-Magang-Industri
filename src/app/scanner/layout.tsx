import "@/styles/scanner.css";

export default function ScannerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col contain-inline-size h-full">
        <div className="absolute h-full inset-0 bg-linear-to-tr from-violet-200 via-violet-300 to-blue-200 -z-10" />
        <div className="grow">
          <main className="flex-1 relative">{children}</main>
        </div>
      </body>
    </html>
  )
}