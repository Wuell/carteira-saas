'use client'

import { useQuery } from '@tanstack/react-query'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

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

const COLORS = ['#18181b', '#52525b', '#a1a1aa', '#d4d4d8']

async function fetchPortfolio(): Promise<Portfolio> {
  const res = await fetch('/api/portfolio')
  if (!res.ok) throw new Error('Falha ao buscar portfólio')
  return res.json()
}

export function AllocationChart() {
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

  const chartData = Object.entries(grouped).map(([type, value]) => ({
    name: TYPE_LABELS[type] ?? type,
    value: Number(value.toFixed(2)),
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
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              typeof value === 'number'
                ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                : value
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
