'use client'

import { useQuery } from '@tanstack/react-query'

type AssetWithQuote = {
  id: string
  ticker: string
  type: string
  quantity: number
  avgPrice: number
  currentPrice: number
  currentValue: number
  investedValue: number
  returnPct: number
}

type Portfolio = {
  assets: AssetWithQuote[]
}

const TYPE_LABELS: Record<string, string> = {
  stock_br: 'Ação BR',
  crypto: 'Cripto',
  stock_us: 'Ação EUA',
  fixed: 'Renda Fixa',
}

async function fetchPortfolio(): Promise<Portfolio> {
  const res = await fetch('/api/portfolio')
  if (!res.ok) throw new Error('Falha ao buscar portfólio')
  return res.json()
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function AssetTable() {
  const { data, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolio,
    refetchInterval: 30000,
  })

  const assets = data?.assets ?? []

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b">
        <p className="text-sm font-semibold text-zinc-900">Ativos</p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-zinc-50 text-left text-xs text-zinc-500 uppercase tracking-wider">
            <th className="px-4 py-3">Ticker</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Qtd</th>
            <th className="px-4 py-3">Preço médio</th>
            <th className="px-4 py-3">Cotação atual</th>
            <th className="px-4 py-3">Valor atual</th>
            <th className="px-4 py-3">P&L</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr><td colSpan={7} className="px-4 py-6 text-center text-zinc-400">Carregando...</td></tr>
          )}
          {!isLoading && assets.length === 0 && (
            <tr><td colSpan={7} className="px-4 py-6 text-center text-zinc-400">Nenhum ativo cadastrado.</td></tr>
          )}
          {assets.map(asset => {
            const positive = asset.returnPct >= 0
            return (
              <tr key={asset.id} className="border-b last:border-0 hover:bg-zinc-50 transition-colors">
                <td className="px-4 py-3 font-medium text-zinc-900">{asset.ticker}</td>
                <td className="px-4 py-3 text-zinc-500">{TYPE_LABELS[asset.type] ?? asset.type}</td>
                <td className="px-4 py-3 text-zinc-700">{asset.quantity}</td>
                <td className="px-4 py-3 text-zinc-700">{formatBRL(asset.avgPrice)}</td>
                <td className="px-4 py-3 text-zinc-700">{formatBRL(asset.currentPrice)}</td>
                <td className="px-4 py-3 text-zinc-700">{formatBRL(asset.currentValue)}</td>
                <td className={`px-4 py-3 font-medium ${positive ? 'text-green-600' : 'text-red-500'}`}>
                  {positive ? '+' : ''}{asset.returnPct.toFixed(2)}%
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
