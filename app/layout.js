import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import { ReservationProvider } from "@/app/_components/ReservationContext";
import { Josefin_Sans } from "next/font/google";
// import { Josefin_Sans } from "next/font/local";
const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata = {
  // title: "The Wild Oasis"
  title: {
    template: "%s - The Wild Oasis",
    default: "Welcome - The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in in the heart of the Italian Dolomites, surrounded by the beautiful mountains and dark forests.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 h-dvh flex flex-col antialiased `}
      >
        <Header />

        <div className="flex-1 px-8 py-12">
          <main className="max-w-7x mx-auto h-full">
            {/* reservationProvider is CLIENT... children is SERVER component (so will be rendered on server) */}
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
