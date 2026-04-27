'use client'

import { useQuery } from '@tanstack/react-query'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

type Asset = {
  type: string
  currentValue: number
}

type Portfolio = {
  assets: Asset[]
}

const TYPE_LABELS: Record<string, string> = {
  stock_br: 'Ações BR',
  crypto: 'Cripto',
  stock_us: 'Ações EUA',
  fixed: 'Renda Fixa',
}

const TYPE_COLORS: Record<string, string> = {
  stock_br: '#6366f1',
  crypto:   '#f59e0b',
  stock_us: '#3b82f6',
  fixed:    '#10b981',
}

const FALLBACK_COLORS = ['#6366f1', '#f59e0b', '#3b82f6', '#10b981', '#f43f5e', '#8b5cf6']

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
    return <div className="rounded-xl border bg-white p-6 shadow-sm h-72 animate-pulse" />
  }

  const assets = data?.assets ?? []

  if (assets.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm flex items-center justify-center h-72 text-zinc-400 text-sm">
        Nenhum ativo cadastrado.
      </div>
    )
  }

  const grouped = assets.reduce<Record<string, number>>((acc, asset) => {
    acc[asset.type] = (acc[asset.type] ?? 0) + asset.currentValue
    return acc
  }, {})

  const total = Object.values(grouped).reduce((s, v) => s + v, 0)

  const chartData = Object.entries(grouped).map(([type, value]) => ({
    name: TYPE_LABELS[type] ?? type,
    rawType: type,
    value: Number(value.toFixed(2)),
    color: TYPE_COLORS[type] ?? FALLBACK_COLORS[0],
    pct: total > 0 ? (value / total) * 100 : 0,
  }))

  const active = activeIndex !== null ? chartData[activeIndex] : null

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-zinc-900 mb-4">Alocação por classe</p>

      <div className="relative">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
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
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                  stroke="transparent"
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {active ? (
            <div className="text-center">
              <p className="text-sm font-semibold text-zinc-900">{active.name}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{formatBRL(active.value)}</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: active.color }}>
                {active.pct.toFixed(1)}%
              </p>
            </div>
          ) : (
            <p className="text-xs text-zinc-400">Passe o mouse</p>
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
            <span
              className="inline-block h-3 w-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-zinc-600">{entry.name}</span>
            <span className="text-xs font-medium text-zinc-900">{entry.pct.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
