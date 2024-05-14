import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ReactNode, Suspense } from "react";
import TanstackProvider from "@/components/providers/TanstackProvider";
import Script from "next/script";
import { Metadata } from "next";
import { YandexMetrika } from "@/app/YandexMetrika";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ImageGif',
  description: "Upload your images and gifs, share them with users, rate them, download them and leave comments. ImageGif loves you"
};

export default function RootLayout({ children }: {
  children: ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <meta name="keywords"
            content="imagegif, ImageGIf, image, gif, картинки, гифки, best gifs, best images, best gif, best image, gifs, images, каринка, гифка, image gif, images gifs" />
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HWZ2ZY2C73"></Script>
      <Script id="google-analytics">
        {
          `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag("js", new Date());

          gtag("config", "G-HWZ2ZY2C73");`
        }
      </Script>
      <Suspense>
        <YandexMetrika/>
      </Suspense>
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
