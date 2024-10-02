import type { Metadata } from "next"
import { Inter, Playpen_Sans } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const pacifico = Playpen_Sans({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${pacifico.variable}`}>
        {children}
      </body>
    </html>
  )
}
