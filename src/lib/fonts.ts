import localFont from "next/font/local";

export const logoFont = localFont({
  src: [
    {
      path: "../../public/fonts/MonomaniacOne-Regular.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-nabla",
  display: "swap",
});