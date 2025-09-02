import Link from "next/link"
import { posts } from "@/lib/posts"
import { quizzes } from "@/lib/quizzes"
import { ArticleCard } from "@/components/article-card"

export const dynamic = "force-static"

export default function HomePage() {
  const latestPosts = posts.slice(0, 3)
  const latestQuizzes = quizzes.slice(0, 3)

  return (
    <div className="space-y-12">
      <section className="text-center space-y-5">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance">
          Learn by Reading and Practicing
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
          Clear tutorials in Markdown and interactive quizzes to test your understanding. Track bookmarks and completion
          locally.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm hover:bg-primary/90"
          >
            Read Blogs
          </Link>
          <Link
            href="/quizzes"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm hover:bg-accent/20"
          >
            Take Quizzes
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Latest Blogs</h2>
          <Link href="/blog" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestPosts.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Latest Quizzes</h2>
          <Link href="/quizzes" className="text-sm text-primary hover:underline">
            Browse quizzes
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestQuizzes.map((q) => (
            <Link
              key={q.slug}
              href={`/quizzes/${q.slug}`}
              className="block rounded-lg border p-4 transition-colors hover:bg-accent/20"
            >
              <div className="space-y-1">
                <h3 className="font-medium">{q.title}</h3>
                <p className="text-sm text-muted-foreground">{q.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
