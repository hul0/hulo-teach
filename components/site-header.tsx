"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

const links = [
  { href: "/posts", label: "Lessons" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/bookmarks", label: "Bookmarks" },
  { href: "/progress", label: "Progress" },
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-primary">
          Hulo
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname?.startsWith(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  active ? "bg-accent/30 text-foreground" : "text-muted-foreground hover:bg-accent/20"
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
