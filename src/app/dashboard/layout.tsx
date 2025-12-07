import "@/styles/dashboard.css";
import "@/styles/auth.css";
import Image from "next/image";
import ProgressBar from "@/components/ui/nProgress/nProgress";
import RotatePrompt from "@/components/ui/rotatePrompt";
import SidebarManager from "@/components/navbar/dashboard/Sidebar/SideBarManager";
import DBNavbar from "@/components/navbar/dashboard/DBNavBar";
import { logoFont } from "@/lib/fonts";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen w-full
        
      ">
        <ProgressBar theme="dashboard" />
        <header className="fixed inset-x-0 top-0 z-60 flex justify-start items-center w-full h-[clamp(3.5rem,6vh,6rem)] bg-linear-to-bl from-[#424242] to-[#8d8d8d] border-double border-b-[clamp(0.4rem,0.5vw,0.75rem)]">
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
          <div className="flex justify-start items-center w-full h-full ml-[15%] pb-[1%]">
            <h2 className={`${logoFont.className} text-[4vw] text-white tracking-widest`}>
              DASHBOARD
            </h2>
          </div>
          <div className="ml-auto mr-[2%] translate-y-1/2">
            <DBNavbar />
          </div>
        </header>
        <div className="pt-[clamp(3.5rem,6vh,6rem)]">
          <div className="min-h-[calc(100vh-clamp(3.5rem,6vh,6rem))] flex relative">
            <SidebarManager />
            <main className="flex-1">
              <RotatePrompt>
                <div className="h-full w-full">
                  {children}
                </div>
              </RotatePrompt>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}