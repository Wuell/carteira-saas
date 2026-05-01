'use client'

import { useQuery } from '@tanstack/react-query'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

type Portfolio = {
  assets: { type: string; currentValue: number }[]
  fixedLots: { currentValue: number }[]
}

const TYPE_LABELS: Record<string, string> = {
  stock_br: 'Ações',
  fii:      'FIIs',
  crypto:   'Cripto',
  stock_us: 'Ações EUA',
  fixed:    'Renda Fixa',
}

const TYPE_COLORS: Record<string, string> = {
  stock_br: '#16a34a',
  fii:      '#22c55e',
  crypto:   '#f59e0b',
  stock_us: '#0ea5e9',
  fixed:    '#84cc16',
}

const FALLBACK_COLORS = ['#16a34a', '#22c55e', '#f59e0b', '#0ea5e9', '#84cc16', '#f43f5e']

async function fetchPortfolio(): Promise<Portfolio> {
  const res = await fetch('/api/portfolio')
  if (!res.ok) throw new Error('Falha ao buscar portfólio')
  return res.json()
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function AllocationChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolio,
    refetchInterval: 30000,
  })

  if (isLoading) {
    return <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm h-72 animate-pulse" />
  }

  const assets = data?.assets ?? []
  const fixedLots = data?.fixedLots ?? []
  const fixedTotal = fixedLots.reduce((s, f) => s + f.currentValue, 0)

  const hasData = assets.length > 0 || fixedTotal > 0

  if (!hasData) {
    return (
      <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm flex items-center justify-center h-72 text-zinc-600 text-sm">
        Nenhum ativo cadastrado.
      </div>
    )
  }

  const grouped = assets.reduce<Record<string, number>>((acc, asset) => {
    acc[asset.type] = (acc[asset.type] ?? 0) + asset.currentValue
    return acc
  }, {})

  if (fixedTotal > 0) grouped['fixed'] = fixedTotal

  const total = Object.values(grouped).reduce((s, v) => s + v, 0)

  const chartData = Object.entries(grouped).map(([type, value], i) => ({
    name: TYPE_LABELS[type] ?? type,
    value: Number(value.toFixed(2)),
    color: TYPE_COLORS[type] ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length],
    pct: total > 0 ? (value / total) * 100 : 0,
  }))

  const active = activeIndex !== null ? chartData[activeIndex] : null

  return (
    <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-base font-bold text-zinc-900 mb-4">Alocação por classe</p>

      <div className="relative">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart tabIndex={-1} style={{ outline: 'none' }}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={108}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              style={{ outline: 'none' }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                  stroke="transparent"
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                  style={{ outline: 'none' }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {active ? (
            <div className="text-center">
              <p className="text-sm font-bold text-zinc-900">{active.name}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{formatBRL(active.value)}</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: active.color }}>
                {active.pct.toFixed(1)}%
              </p>
            </div>
          ) : (
            <p className="text-xs text-zinc-600">Passe o mouse</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {chartData.map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-2 cursor-pointer transition-opacity"
            style={{ opacity: activeIndex === null || activeIndex === index ? 1 : 0.4 }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <span className="inline-block h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-xs text-zinc-700">{entry.name}</span>
            <span className="text-xs font-semibold text-zinc-900">{entry.pct.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
