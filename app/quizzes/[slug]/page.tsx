import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { quizzes } from "@/lib/quizzes"
import { QuizPlayer } from "@/components/quiz-player"

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return quizzes.map((q) => ({ slug: q.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const q = quizzes.find((x) => x.slug === params.slug)
  if (!q) return {}
  const url = `/quizzes/${q.slug}`
  return {
    title: q.title,
    description: q.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: q.title, description: q.description },
    twitter: { card: "summary", title: q.title, description: q.description },
  }
}

export default function QuizPage({ params }: Props) {
  const q = quizzes.find((x) => x.slug === params.slug)
  if (!q) notFound()
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">{q.title}</h1>
        <p className="text-muted-foreground">{q.description}</p>
      </header>

      <QuizPlayer slug={q.slug} />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: q.title,
            description: q.description,
            url: `/quizzes/${q.slug}`,
          }),
        }}
      />
    </div>
  )
}
