
export default function detailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen contain-inline-size">
      <div className="absolute inset-0  bg-gradient-to-r from-[#7c3aed] to-[#7dd3fc]" />
      <div className="absolute inset-y-0 left-0 w-[100%] md:w-[99.9%] -skew-x-60 origin-top-left bg-gradient-to-br from-[#0b1220] to-[#1a1f2e]" />
      <div className="absolute flex flex-col z-40 w-full h-full bg-amber-200/20 justify-center items-center">
        <div
          className="bg-black w-[80%] h-[5vh]"
        >

        </div>
      </div>
    </div>
  )
}