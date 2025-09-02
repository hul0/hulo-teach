import { quizzes } from "@/lib/quizzes"
import QuizzesIndexClient from "./QuizzesIndexClient"

export const metadata = {
  title: "Quizzes",
  description: "Interactive quizzes to reinforce your learning.",
}

export default function QuizzesPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">Quizzes</h1>
        <p className="text-muted-foreground">Practice and check your understanding with interactive quizzes.</p>
      </header>

      <QuizzesIndexClient quizzes={quizzes} />
    </div>
  )
}
