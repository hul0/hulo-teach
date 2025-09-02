export const posts = [
  {
    slug: "constraints-mechanics",
    title: "Constraints & Generalized Coordinates",
    description:
      "Deep dive into constraints in mechanics: holonomic and non-holonomic types, examples like bead on wire, rolling motion, pendulum with moving support, and the concepts of generalized coordinates, DOF, virtual displacement, and generalized forces.",
    date: "2025-01-10",
    tags: ["physics", "mechanics", "constraints" , "makaut-sem1"],
    readingTime: 12,
    quizSlug: "constraints",
  },
  {
    slug: "friction",
    title: "Friction in Mechanics",
    description:
      "Comprehensive guide to friction: static, kinetic, and limiting friction; angle and cone of friction; rolling resistance; and applications including blocks on incline, pulleys, and ladders. Covers key concepts, equations, and physical insights.",
    date: "2025-01-18",
    tags: ["physics", "mechanics", "friction", "makaut-sem1"], 
    readingTime: 14,
    quizSlug: "friction",
  },
  {
    slug: "potential-energy",
    title: "Potential Energy, Work & Stability",
    description:
      "Official-book style notes on potential energy, conservative vs non-conservative forces, the work–energy theorem, equilibrium types (stable, unstable, neutral), and small-oscillation analysis near minima of U leading to SHM with ω = √(k/m).",
    date: "2025-01-22",
    tags: ["physics", "mechanics", "energy", "stability", "oscillations" , "makaut-sem1"],
    readingTime: 15,
    quizSlug: "potential",
  },
] as const
