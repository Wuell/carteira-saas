'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/ativos', label: 'Ativos' },
  { href: '/proventos', label: 'Proventos' },
  { href: '/diversificacao', label: 'Diversificação' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-1">
      <aside className="w-56 border-r border-zinc-200/60 bg-white px-4 py-6 flex flex-col gap-1">
        <p className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-3 px-2">Menu</p>
        {NAV.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? 'bg-green-500 text-white font-semibold'
                  : 'text-zinc-700 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </aside>
      <main className="flex-1 bg-[#e8e9eb] p-8">
        {children}
      </main>
    </div>
  )
}
