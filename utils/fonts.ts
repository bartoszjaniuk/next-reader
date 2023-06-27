import { Source_Sans_Pro, Roboto_Mono, Raleway } from "next/font/google";

const sourceSansPro = Source_Sans_Pro({
  weight: "400",
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-source-sans-pro",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-raleway",
});

export const Font = {
  sourceSansPro,
  robotoMono,
  raleway,
};
