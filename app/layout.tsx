import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ReactNode } from "react";
import { SetScroll } from "@/components/public/ScrollComponents";
import TanstackProvider from "@/components/providers/TanstackProvider";
import { checkBan } from "@/api/checkVerify";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ImageGifGallery",
  description: "Gallery of pictures and gifs"
};

export default function RootLayout({ children }: {
  children: ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </head>
    <body className={inter.className}>
    <div className="xl:px-40 lg:px-30 md:px-20 sm:px-0">
      <TanstackProvider>
        <Header />
        {children}
      </TanstackProvider>
    </div>
    </body>
    </html>
  );
}
