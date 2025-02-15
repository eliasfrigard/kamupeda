import React from "react";
import type { Metadata } from "next";
import { mont } from "@/app/fonts";

import "./globals.css";
import { navMapWithIcons } from "@/components/NavMap";

import Header from "../components/Header";
import { copyright, creator } from "../utils/texts";

export const metadata: Metadata = {
  title: "kamupeda.fi",
  description: "Vapaata verkkomateriaalia kansanmusiikin perusopetukseen.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const HEADER_HEIGHT = 84;
  const FOOTER_HEIGHT = 84;

  const navMap = await navMapWithIcons();

  return (
    <html lang='en' className={mont.className}>
      <body>
        <div>
          <Header navMap={navMap} height={HEADER_HEIGHT} />
        </div>
        <div
          style={{
            paddingTop: HEADER_HEIGHT + "px",
            minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
          }}
        >
          <div className='py-8 md:py-12 lg:py-16 overflow-x-hidden content-height flex flex-col bg-gray-50/70'>
            {children}
          </div>
        </div>
        <div style={{ height: FOOTER_HEIGHT + "px" }}>
          <div
            className={`container mx-auto h-full flex flex-col items-center justify-center text-black opacity-50 gap-1`}
          >
            <p className='text-sm font-caveat'>{copyright()}</p>
            <p className='text-xs'>{creator}</p>
          </div>
        </div>
      </body>
    </html>
  );
}
