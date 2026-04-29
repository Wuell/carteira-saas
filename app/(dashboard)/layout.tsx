import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1">
      <aside className="w-56 border-r bg-white px-4 py-6 flex flex-col gap-1">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 px-2">Menu</p>
        <Link href="/dashboard" className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 transition-colors">
          Dashboard
        </Link>
        <Link href="/ativos" className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 transition-colors">
          Ativos
        </Link>
        <Link href="/proventos" className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 transition-colors">
          Proventos
        </Link>
      </aside>
      <main className="flex-1 bg-zinc-50 p-8">
        {children}
      </main>
    </div>
  )
}
