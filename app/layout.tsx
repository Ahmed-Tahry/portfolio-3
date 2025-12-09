import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

// <CHANGE> Updated metadata for portfolio
export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "Interactive desktop-style portfolio showcasing creative development work",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/6534601.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/6534601.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/6534601.jpg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased overflow-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
