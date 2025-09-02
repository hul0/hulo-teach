import Link from "next/link"
import { posts } from "@/lib/posts"
import BlogIndexClient from "./BlogIndexClient"

export const metadata = {
  title: "Blog",
  description: "In-depth tutorials and concepts explained clearly.",
}

export default function BlogIndexPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">Blog</h1>
        <p className="text-muted-foreground">Learn concepts step-by-step with clear, readable articles.</p>
      </header>

      <BlogIndexClient posts={posts} />

      <div className="text-center text-sm text-muted-foreground pt-4">
        Want to practice? Try the{" "}
        <Link href="/quizzes" className="text-primary hover:underline">
          quizzes
        </Link>
        .
      </div>
    </div>
  )
}
