import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold text-slate-950">
          Prooforio
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link href="/login" className="transition hover:text-accent">
            Login
          </Link>
          <Link href="/dashboard" className="rounded-full bg-slate-100 px-4 py-2 text-slate-900 transition hover:bg-slate-200">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
