export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Hulo</p>
        <p className="hidden sm:block">Built with Next.js & Tailwind</p>
      </div>
    </footer>
  )
}
