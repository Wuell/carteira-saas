'use client'

import { useQuery } from '@tanstack/react-query'
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts'
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

type ActiveShapeProps = {
  cx: number
  cy: number
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  fill: string
  payload: { name: string; rawType: string }
  percent: number
  value: number
}

function ActiveShape(props: ActiveShapeProps) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
  return (
    <g>
      <text x={cx} y={cy - 18} textAnchor="middle" fill="#18181b" fontSize={13} fontWeight={600}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 4} textAnchor="middle" fill="#52525b" fontSize={12}>
        {formatBRL(value)}
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fill="#a1a1aa" fontSize={11}>
        {(percent * 100).toFixed(1)}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 4}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  )
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

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-zinc-900 mb-4">Alocação por classe</p>
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
            activeIndex={activeIndex ?? undefined}
            activeShape={(props: unknown) => <ActiveShape {...(props as ActiveShapeProps)} />}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {chartData.map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-2 cursor-pointer"
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
