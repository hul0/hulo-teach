import { getSession } from "@/lib/session"

import ProfileForm from "./profile-form"

export default async function ProfilePage() {
  const session = await getSession()
  if (!session) {
    return (
      <main className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-2xl font-semibold">Your profile</h1>
        <p className="text-sm text-muted-foreground mt-2">Please sign in to view and edit your profile.</p>
        <a
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-primary-foreground"
          href="/auth/login"
        >
          Sign in
        </a>
      </main>
    )
  }
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-pretty">Complete your profile</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Adding details helps personalize your learning experience on Hulo.
      </p>
      <ProfileForm />
    </main>
  )
}
