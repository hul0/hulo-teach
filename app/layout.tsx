import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"
import { DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hulobiral.online"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weights: ["400", "500", "700"] as any, // Next.js accepts weights via string array
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hulo — Lessons and Quizzes for Learning",
    template: "%s · Hulo",
  },
  description:
    "Learn various topics with lessons and interactive quizzes. Read, practice, and track your progress.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Hulo — Lessons and Quizzes for Learning",
    description: "Learn various topics with lessons and interactive quizzes. Read, practice, and track your progress.",
    siteName: "Hulo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hulo — Lessons and Quizzes for Learning",
    description: 
    "Learn various topics with lessons and interactive quizzes. Read, practice, and track your progress.",
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} antialiased`}>
      <body className="min-h-dvh bg-background text-foreground font-sans">
        <Analytics/>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main className="container mx-auto px-4 md:px-6 py-6">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
