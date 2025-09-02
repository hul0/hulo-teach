export const posts = [
  {
    slug: "hello-world",
    title: "Hello, Learning World",
    description: "Understand how this teaching platform works and how to learn effectively.",
    date: "2025-01-01",
    tags: ["intro", "platform"],
    readingTime: 4,
    quizSlug: "basics",
  },
  {
    slug: "constraints-mechanics",
    title: "Constraints & Generalized Coordinates",
    description: "Deep dive into constraints in mechanics: holonomic and non-holonomic types, examples like bead on wire, rolling motion, pendulum with moving support, and the concepts of generalized coordinates, DOF, virtual displacement, and generalized forces.",
    date: "2025-01-10",
    tags: ["physics", "mechanics", "constraints"],
    readingTime: 12,
    quizSlug: "constraints",
  },
] as const
