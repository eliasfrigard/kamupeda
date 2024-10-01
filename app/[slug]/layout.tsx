import type { Metadata } from "next"
import "../globals.css"
import React from "react"

import Header from "../../components/Header"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { slug: string }
}>) {
  console.log(params.slug)
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}
