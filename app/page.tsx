// landing page (public) — server component; auth UI lives in <AuthButtons />

import AuthButtons from "@/components/AuthButtons";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <div className="text-lg font-semibold tracking-tight">PrepIV</div>
        <AuthButtons />
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
            Prepare interview or hire talent
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            Practice sharper interviews and screen candidates with confidence.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            PrepIV is ready for your first authenticated workflow. Sign in or
            create an account to start building the private interview workspace.
          </p>
        </div>
      </main>
    </div>
  );
}
