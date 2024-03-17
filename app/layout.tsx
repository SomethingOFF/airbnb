import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navabar/Navbar";
import RegisterModel from "./components/model/RegisterModel";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModel from "./components/model/LoginModel";
import getCurrentUser from "./actions/getCurrentUser";
import RentModel from "./components/model/RentModel";
import ClientOnly from "./components/ClientsOnly";
import SearchModel from "./components/model/SearchModel";
const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AirBnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SearchModel />
        <LoginModel />
        <RegisterModel />
        <RentModel />
        <Navbar user={user} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
