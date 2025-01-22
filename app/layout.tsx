import React from "react";
import type { Metadata } from "next";
import { mont } from "@/app/fonts";

import "./globals.css";
import { navMapWithIcons } from "@/components/NavMap";

import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Kamupeda",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  const HEADER_HEIGHT = 84;
  const FOOTER_HEIGHT = 84;

  const navMap = await navMapWithIcons();

  return (
    <html lang='en' className={mont.className}>
      <body>
        <div>
          <Header navMap={navMap} slug={params.slug} height={HEADER_HEIGHT} />
        </div>
        <div
          style={{
            paddingTop: HEADER_HEIGHT + "px",
            minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
          }}
        >
          <div className='py-8 lg:py-12 overflow-x-hidden content-height flex flex-col bg-gray-50/70'>
            {children}
          </div>
        </div>
        <div style={{ height: FOOTER_HEIGHT + "px" }}>
          <div
            className={`container mx-auto h-full flex flex-col items-center justify-center text-black opacity-50 gap-1`}
          >
            <p className='text-sm font-caveat'>Copyright © 2024 Kamupeda</p>
            <p className='text-xs'>Website by Elias Frigård</p>
          </div>
        </div>
      </body>
    </html>
  );
}
