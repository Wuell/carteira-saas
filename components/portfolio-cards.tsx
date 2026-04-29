'use client'

import { useQuery } from '@tanstack/react-query'

type Portfolio = {
  totalValue: number
  totalInvested: number
  returnPct: number
  assets: { id: string }[]
  fixedLots: { id: string }[]
}

async function fetchPortfolio(): Promise<Portfolio> {
  const res = await fetch('/api/portfolio')
  if (!res.ok) throw new Error('Falha ao buscar portfólio')
  return res.json()
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function PortfolioCards() {
  const { data, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolio,
    refetchInterval: 30000,
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl border bg-white p-6 animate-pulse h-28" />
        ))}
      </div>
    )
  }

  const positive = (data?.returnPct ?? 0) >= 0
  const totalPositions = (data?.assets.length ?? 0) + (data?.fixedLots.length ?? 0)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Patrimônio total</p>
        <p className="mt-2 text-2xl font-semibold text-zinc-900">
          {formatBRL(data?.totalValue ?? 0)}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Rentabilidade</p>
        <p className={`mt-2 text-2xl font-semibold ${positive ? 'text-green-600' : 'text-red-500'}`}>
          {positive ? '+' : ''}{(data?.returnPct ?? 0).toFixed(2)}%
        </p>
        <p className="text-xs text-zinc-500 mt-1">
          Investido: {formatBRL(data?.totalInvested ?? 0)}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Posições na carteira</p>
        <p className="mt-2 text-2xl font-semibold text-zinc-900">{totalPositions}</p>
      </div>
    </div>
  )
}
