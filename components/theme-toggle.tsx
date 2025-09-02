"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const current = (theme === "system" ? systemTheme : theme) || "light"
  const isDark = current === "dark"

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="relative inline-flex items-center rounded-full border bg-muted/30 p-1 text-xs shadow-sm"
    >
      {/* Sliding thumb */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-background shadow transition-transform duration-200",
          isDark && "translate-x-full",
        )}
      />
      {/* Light button */}
      <button
        type="button"
        aria-pressed={!isDark}
        onClick={() => setTheme("light")}
        className={cn(
          "relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors",
          !isDark ? "text-foreground" : "text-muted-foreground",
        )}
        title="Light mode"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 3v2m0 14v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M3 12h2m14 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="hidden sm:inline">Light</span>
      </button>
      {/* Dark button */}
      <button
        type="button"
        aria-pressed={isDark}
        onClick={() => setTheme("dark")}
        className={cn(
          "relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors",
          isDark ? "text-foreground" : "text-muted-foreground",
        )}
        title="Dark mode"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <span className="hidden sm:inline">Dark</span>
      </button>
      <span className="sr-only">Toggle color theme</span>
    </div>
  )
}
