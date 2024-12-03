import React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { Montserrat, Inter } from "next/font/google"
import { navMapWithIcons } from "@/components/NavMap"

import Header from "../components/Header"

const mont = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mont',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Kamupeda",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { slug: string }
}>) {
  const HEADER_HEIGHT = 84
  const FOOTER_HEIGHT = 84

  const navMap = await navMapWithIcons()

  return (
    <html lang="en">
      <body className={`${inter.className} ${mont.className} font-mont`}>
        <div>
          <Header navMap={navMap} slug={params.slug} height={HEADER_HEIGHT} />
        </div>
        <div style={{ paddingTop: HEADER_HEIGHT + 'px', minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)` }}>
          <div className="py-8 lg:py-12 overflow-x-hidden content-height flex flex-col bg-gray-100">
            {children}
          </div>
        </div>
        <div style={{ height: FOOTER_HEIGHT + 'px' }}>
          <div className="container mx-auto h-full flex flex-col items-center justify-center text-black opacity-50 gap-1">
            <p className="text-sm">Copyright © 2024 Kamupeda</p>
            <p className="text-xs">Website by Elias Frigård</p>
          </div>
        </div>
      </body>
    </html>
  )
}
