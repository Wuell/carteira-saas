'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts'
import {
  inferSector,
  inferFundType,
  inferStockSegment,
  FII_SECTORS,
  STOCK_SECTORS,
  FII_FUND_TYPES,
  STOCK_SEGMENTS,
} from '@/lib/sector-inference'

function IconPencil() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function IconX() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// ——— Types ———

type AssetFromApi = {
  id: string
  ticker: string
  type: string
  sector?: string | null
  quantity: number
  avgPrice: number
  cachedPrice?: number | null
  assetSubType?: string | null
}

type AssetFromPortfolio = {
  ticker: string
  currentValue: number
}

type Portfolio = {
  assets: AssetFromPortfolio[]
  fixedLots: unknown[]
}

type EnrichedAsset = AssetFromApi & {
  currentValue: number
  investedValue: number
  resolvedSector: string
  fundType: string
  stockSegment: string
}

// ——— Helpers ———

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const SECTOR_COLORS = [
  '#16a34a', '#22c55e', '#4ade80', '#86efac',
  '#0ea5e9', '#38bdf8', '#f59e0b', '#fbbf24',
  '#f43f5e', '#fb7185', '#a78bfa', '#818cf8',
  '#34d399', '#2dd4bf', '#c084fc',
]

// Second palette offset for fund type chart
const FUND_TYPE_COLORS = [
  '#f59e0b', '#fbbf24', '#f43f5e', '#fb7185',
  '#a78bfa', '#818cf8', '#34d399', '#2dd4bf',
  '#0ea5e9', '#38bdf8', '#16a34a', '#22c55e',
  '#c084fc', '#4ade80', '#86efac',
]

function sectorColor(index: number): string {
  return SECTOR_COLORS[index % SECTOR_COLORS.length]
}

function fundTypeColor(index: number): string {
  return FUND_TYPE_COLORS[index % FUND_TYPE_COLORS.length]
}

// ——— Fetch functions (shared queryKey pattern) ———

async function fetchAssets(): Promise<AssetFromApi[]> {
  const res = await fetch('/api/assets')
  if (!res.ok) throw new Error('Falha ao buscar ativos')
  return res.json()
}

async function fetchPortfolio(): Promise<Portfolio> {
  const res = await fetch('/api/portfolio')
  if (!res.ok) throw new Error('Falha ao buscar portfólio')
  return res.json()
}

// ——— Inline editor (sector or assetSubType) ———

function SectorEditor({
  assetId,
  currentValue,
  options,
  field,
  placeholder,
  onDone,
}: {
  assetId: string
  currentValue: string
  options: string[]
  field: 'sector' | 'assetSubType'
  placeholder: string
  onDone: () => void
}) {
  const queryClient = useQueryClient()
  const [value, setValue] = useState(
    currentValue === 'Sem setor' || currentValue === 'Não definido' ? '' : currentValue
  )

  const mutation = useMutation({
    mutationFn: async (val: string) => {
      const body: Record<string, string> = { id: assetId }
      body[field] = val
      const res = await fetch('/api/assets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Falha ao salvar')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      onDone()
    },
  })

  return (
    <span className="flex items-center gap-1">
      <select
        value={value}
        onChange={e => setValue(e.target.value)}
        className="rounded border border-zinc-300 bg-white px-2 py-0.5 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-green-500"
        autoFocus
      >
        <option value="">{placeholder}</option>
        {options.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button
        onClick={() => mutation.mutate(value)}
        disabled={mutation.isPending}
        className="rounded p-0.5 text-green-600 hover:bg-green-50 disabled:opacity-50"
        title="Confirmar"
      >
        <IconCheck />
      </button>
      <button
        onClick={onDone}
        className="rounded p-0.5 text-zinc-500 hover:bg-zinc-100"
        title="Cancelar"
      >
        <IconX />
      </button>
    </span>
  )
}

// ——— Sector bar chart ———

type SectorGroup = {
  sector: string
  value: number
  pct: number
  color: string
}

function SectorBarChart({ groups }: { groups: SectorGroup[] }) {
  const sorted = [...groups].sort((a, b) => b.value - a.value)

  if (sorted.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-zinc-600">
        Nenhum ativo nesta categoria.
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: Math.max(sorted.length * 40, 80) }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 0, right: 48, bottom: 0, left: 0 }}
          barCategoryGap="25%"
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={v => `${v}%`}
            tick={{ fontSize: 11, fill: '#71717a' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="sector"
            width={140}
            tick={{ fontSize: 11, fill: '#3f3f46' }}
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey="pct" radius={[0, 4, 4, 0]} isAnimationActive={false}>
            {sorted.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ——— Segment pie chart ———

type PieItem = {
  name: string
  value: number
  pct: number
  color: string
}

function SegmentPieChart({ items }: { items: PieItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-zinc-600">
        Nenhum segmento definido.
      </div>
    )
  }

  return (
    <div>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={items}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              isAnimationActive={false}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {items.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        {items.map(item => (
          <div key={item.name} className="flex items-center gap-2 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-zinc-700">{item.name}</span>
            <span className="ml-auto font-medium text-zinc-900">{item.pct.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ——— FII table with Segmento + Tipo de Fundo columns ———

function FiiTabTable({
  assets,
  totalValue,
}: {
  assets: EnrichedAsset[]
  totalValue: number
}) {
  // editingKey format: `${assetId}:sector` or `${assetId}:fundType`
  const [editing, setEditing] = useState<string | null>(null)

  // Group by resolvedSector
  const grouped = new Map<string, EnrichedAsset[]>()
  for (const a of assets) {
    const list = grouped.get(a.resolvedSector) ?? []
    list.push(a)
    grouped.set(a.resolvedSector, list)
  }

  const sectors = [...grouped.entries()].sort((a, b) => {
    if (a[0] === 'Sem setor') return 1
    if (b[0] === 'Sem setor') return -1
    const sumA = a[1].reduce((s, x) => s + x.currentValue, 0)
    const sumB = b[1].reduce((s, x) => s + x.currentValue, 0)
    return sumB - sumA
  })

  if (sectors.length === 0) {
    return (
      <div className="flex items-center justify-center py-10 text-sm text-zinc-600">
        Nenhum ativo nesta categoria.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200/60 bg-zinc-50 text-left text-xs text-zinc-600 uppercase tracking-wider">
            <th className="px-4 py-3">Ticker</th>
            <th className="px-4 py-3">Segmento</th>
            <th className="px-4 py-3">Tipo de Fundo</th>
            <th className="px-4 py-3">Valor Investido</th>
            <th className="px-4 py-3">Valor Atual</th>
            <th className="px-4 py-3">%</th>
          </tr>
        </thead>
        <tbody>
          {sectors.map(([sector, items]) => {
            const sectorValue = items.reduce((s, a) => s + a.currentValue, 0)
            const sectorPct = totalValue > 0 ? (sectorValue / totalValue) * 100 : 0
            const isMissing = sector === 'Sem setor'
            const isHighConcentration = sectorPct > 40
            const isModerateConcentration = sectorPct > 30 && !isHighConcentration

            return items.map((asset, rowIdx) => {
              const assetPct = totalValue > 0 ? (asset.currentValue / totalValue) * 100 : 0
              const isFirstInGroup = rowIdx === 0
              const sectorKey = `${asset.id}:sector`
              const fundTypeKey = `${asset.id}:fundType`
              const isFundTypeUndefined = asset.fundType === 'Não definido'

              return (
                <tr
                  key={asset.id}
                  className={`border-b border-zinc-200/60 last:border-0 transition-colors ${
                    isMissing
                      ? 'bg-yellow-50/60 hover:bg-yellow-50'
                      : 'hover:bg-green-50/40'
                  }`}
                >
                  {/* Ticker */}
                  <td className="px-4 py-3 font-semibold text-zinc-900">
                    {asset.ticker}
                  </td>

                  {/* Segmento */}
                  <td className="px-4 py-3">
                    {isFirstInGroup ? (
                      <span className="flex items-center gap-2 flex-wrap">
                        {editing === sectorKey ? (
                          <SectorEditor
                            assetId={asset.id}
                            currentValue={asset.resolvedSector}
                            options={FII_SECTORS}
                            field="sector"
                            placeholder="Sem segmento"
                            onDone={() => setEditing(null)}
                          />
                        ) : (
                          <>
                            <span
                              className={`font-medium ${
                                isMissing ? 'text-yellow-700' : 'text-zinc-700'
                              }`}
                            >
                              {sector}
                            </span>
                            {isHighConcentration && (
                              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                                {sectorPct.toFixed(0)}% — Alta
                              </span>
                            )}
                            {isModerateConcentration && (
                              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                                {sectorPct.toFixed(0)}% — Atenção
                              </span>
                            )}
                            <button
                              onClick={() => setEditing(sectorKey)}
                              className="rounded p-0.5 text-zinc-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                              title="Editar segmento"
                            >
                              <IconPencil />
                            </button>
                          </>
                        )}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        {editing === sectorKey ? (
                          <SectorEditor
                            assetId={asset.id}
                            currentValue={asset.resolvedSector}
                            options={FII_SECTORS}
                            field="sector"
                            placeholder="Sem segmento"
                            onDone={() => setEditing(null)}
                          />
                        ) : (
                          <>
                            <span className="text-zinc-500 text-xs">—</span>
                            <button
                              onClick={() => setEditing(sectorKey)}
                              className="rounded p-0.5 text-zinc-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                              title="Editar segmento"
                            >
                              <IconPencil />
                            </button>
                          </>
                        )}
                      </span>
                    )}
                  </td>

                  {/* Tipo de Fundo */}
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1">
                      {editing === fundTypeKey ? (
                        <SectorEditor
                          assetId={asset.id}
                          currentValue={asset.fundType}
                          options={FII_FUND_TYPES}
                          field="assetSubType"
                          placeholder="Não definido"
                          onDone={() => setEditing(null)}
                        />
                      ) : (
                        <>
                          <span
                            className={`text-sm ${
                              isFundTypeUndefined ? 'text-yellow-700' : 'text-zinc-700'
                            }`}
                          >
                            {asset.fundType}
                          </span>
                          <button
                            onClick={() => setEditing(fundTypeKey)}
                            className="rounded p-0.5 text-zinc-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                            title="Editar tipo de fundo"
                          >
                            <IconPencil />
                          </button>
                        </>
                      )}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-zinc-700">{formatBRL(asset.investedValue)}</td>
                  <td className="px-4 py-3 text-zinc-900 font-medium">{formatBRL(asset.currentValue)}</td>
                  <td className="px-4 py-3 text-zinc-700">{assetPct.toFixed(1)}%</td>
                </tr>
              )
            })
          })}
        </tbody>
      </table>
    </div>
  )
}

// ——— Stock table with Setor + Segmento columns ———

function StockTabTable({
  assets,
  totalValue,
}: {
  assets: EnrichedAsset[]
  totalValue: number
}) {
  // editingKey format: `${assetId}:sector` or `${assetId}:segment`
  const [editing, setEditing] = useState<string | null>(null)

  // Group by resolvedSector
  const grouped = new Map<string, EnrichedAsset[]>()
  for (const a of assets) {
    const list = grouped.get(a.resolvedSector) ?? []
    list.push(a)
    grouped.set(a.resolvedSector, list)
  }

  const sectors = [...grouped.entries()].sort((a, b) => {
    if (a[0] === 'Sem setor') return 1
    if (b[0] === 'Sem setor') return -1
    const sumA = a[1].reduce((s, x) => s + x.currentValue, 0)
    const sumB = b[1].reduce((s, x) => s + x.currentValue, 0)
    return sumB - sumA
  })

  // Build segment concentration map
  const segmentValueMap = new Map<string, number>()
  for (const a of assets) {
    if (a.stockSegment !== 'Não definido') {
      segmentValueMap.set(a.stockSegment, (segmentValueMap.get(a.stockSegment) ?? 0) + a.currentValue)
    }
  }
  // Track which segment has already shown its alert (first row in that segment group)
  const segmentAlertShown = new Set<string>()

  if (sectors.length === 0) {
    return (
      <div className="flex items-center justify-center py-10 text-sm text-zinc-600">
        Nenhum ativo nesta categoria.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200/60 bg-zinc-50 text-left text-xs text-zinc-600 uppercase tracking-wider">
            <th className="px-4 py-3">Ticker</th>
            <th className="px-4 py-3">Setor</th>
            <th className="px-4 py-3">Segmento</th>
            <th className="px-4 py-3">Valor Investido</th>
            <th className="px-4 py-3">Valor Atual</th>
            <th className="px-4 py-3">%</th>
          </tr>
        </thead>
        <tbody>
          {sectors.map(([sector, items]) => {
            const sectorValue = items.reduce((s, a) => s + a.currentValue, 0)
            const sectorPct = totalValue > 0 ? (sectorValue / totalValue) * 100 : 0
            const isMissing = sector === 'Sem setor'
            const isHighConcentration = sectorPct > 40
            const isModerateConcentration = sectorPct > 30 && !isHighConcentration

            return items.map((asset, rowIdx) => {
              const assetPct = totalValue > 0 ? (asset.currentValue / totalValue) * 100 : 0
              const isFirstInGroup = rowIdx === 0
              const sectorKey = `${asset.id}:sector`
              const segmentKey = `${asset.id}:segment`
              const isSegmentUndefined = asset.stockSegment === 'Não definido'

              // Segment alert: show only on first occurrence of that segment across entire table
              const segmentPct = totalValue > 0
                ? ((segmentValueMap.get(asset.stockSegment) ?? 0) / totalValue) * 100
                : 0
              const isFirstSegmentOccurrence =
                !isSegmentUndefined && !segmentAlertShown.has(asset.stockSegment)
              if (isFirstSegmentOccurrence) segmentAlertShown.add(asset.stockSegment)
              const segmentIsHigh = isFirstSegmentOccurrence && segmentPct > 40
              const segmentIsModerate = isFirstSegmentOccurrence && segmentPct > 30 && !segmentIsHigh

              return (
                <tr
                  key={asset.id}
                  className={`border-b border-zinc-200/60 last:border-0 transition-colors ${
                    isMissing
                      ? 'bg-yellow-50/60 hover:bg-yellow-50'
                      : 'hover:bg-green-50/40'
                  }`}
                >
                  {/* Ticker */}
                  <td className="px-4 py-3 font-semibold text-zinc-900">
                    {asset.ticker}
                  </td>

                  {/* Setor */}
                  <td className="px-4 py-3">
                    {isFirstInGroup ? (
                      <span className="flex items-center gap-2 flex-wrap">
                        {editing === sectorKey ? (
                          <SectorEditor
                            assetId={asset.id}
                            currentValue={asset.resolvedSector}
                            options={STOCK_SECTORS}
                            field="sector"
                            placeholder="Sem setor"
                            onDone={() => setEditing(null)}
                          />
                        ) : (
                          <>
                            <span
                              className={`font-medium ${
                                isMissing ? 'text-yellow-700' : 'text-zinc-700'
                              }`}
                            >
                              {sector}
                            </span>
                            {isHighConcentration && (
                              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                                {sectorPct.toFixed(0)}% — Alta concentração
                              </span>
                            )}
                            {isModerateConcentration && (
                              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                                {sectorPct.toFixed(0)}% — Atenção
                              </span>
                            )}
                            <button
                              onClick={() => setEditing(sectorKey)}
                              className="rounded p-0.5 text-zinc-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                              title="Editar setor"
                            >
                              <IconPencil />
                            </button>
                          </>
                        )}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        {editing === sectorKey ? (
                          <SectorEditor
                            assetId={asset.id}
                            currentValue={asset.resolvedSector}
                            options={STOCK_SECTORS}
                            field="sector"
                            placeholder="Sem setor"
                            onDone={() => setEditing(null)}
                          />
                        ) : (
                          <>
                            <span className="text-zinc-500 text-xs">—</span>
                            <button
                              onClick={() => setEditing(sectorKey)}
                              className="rounded p-0.5 text-zinc-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                              title="Editar setor"
                            >
                              <IconPencil />
                            </button>
                          </>
                        )}
                      </span>
                    )}
                  </td>

                  {/* Segmento */}
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2 flex-wrap">
                      {editing === segmentKey ? (
                        <SectorEditor
                          assetId={asset.id}
                          currentValue={asset.stockSegment}
                          options={STOCK_SEGMENTS}
                          field="assetSubType"
                          placeholder="Não definido"
                          onDone={() => setEditing(null)}
                        />
                      ) : (
                        <>
                          <span
                            className={`text-sm ${
                              isSegmentUndefined ? 'text-yellow-700' : 'text-zinc-700'
                            }`}
                          >
                            {asset.stockSegment}
                          </span>
                          {segmentIsHigh && (
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                              {segmentPct.toFixed(0)}% em {asset.stockSegment} — Alta concentração
                            </span>
                          )}
                          {segmentIsModerate && (
                            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                              {segmentPct.toFixed(0)}% em {asset.stockSegment} — Atenção
                            </span>
                          )}
                          <button
                            onClick={() => setEditing(segmentKey)}
                            className="rounded p-0.5 text-zinc-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                            title="Editar segmento"
                          >
                            <IconPencil />
                          </button>
                        </>
                      )}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-zinc-700">{formatBRL(asset.investedValue)}</td>
                  <td className="px-4 py-3 text-zinc-900 font-medium">{formatBRL(asset.currentValue)}</td>
                  <td className="px-4 py-3 text-zinc-700">{assetPct.toFixed(1)}%</td>
                </tr>
              )
            })
          })}
        </tbody>
      </table>
    </div>
  )
}

// ——— Skeleton ———

function Skeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-zinc-200/60 bg-white shadow-sm p-6 h-64 animate-pulse" />
      <div className="rounded-2xl border border-zinc-200/60 bg-white shadow-sm p-6 h-72 animate-pulse" />
    </div>
  )
}

// ——— Main component ———

export function Diversificacao() {
  const [tab, setTab] = useState<'fii' | 'stock_br'>('fii')

  const { data: assetsData, isLoading: loadingAssets } = useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
  })

  const { data: portfolioData, isLoading: loadingPortfolio } = useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolio,
    refetchInterval: 30000,
  })

  const isLoading = loadingAssets || loadingPortfolio

  // Build currentValue map from portfolio
  const currentValueMap = new Map<string, number>()
  for (const a of portfolioData?.assets ?? []) {
    currentValueMap.set(a.ticker, a.currentValue)
  }

  // Enrich assets: merge currentValue + resolve sector + fund type + stock segment
  const enriched: EnrichedAsset[] = (assetsData ?? []).map(asset => {
    const investedValue = asset.avgPrice * asset.quantity
    const currentValue = currentValueMap.get(asset.ticker) ?? investedValue
    const resolvedSector =
      asset.sector?.trim() ||
      inferSector(asset.ticker) ||
      'Sem setor'
    const fundType = asset.assetSubType?.trim() || inferFundType(asset.ticker) || 'Não definido'
    const stockSegment = asset.assetSubType?.trim() || inferStockSegment(asset.ticker) || 'Não definido'
    return { ...asset, currentValue, investedValue, resolvedSector, fundType, stockSegment }
  })

  const fiis = enriched.filter(a => a.type === 'fii')
  const stocks = enriched.filter(a => a.type === 'stock_br')

  const activeAssets = tab === 'fii' ? fiis : stocks
  const totalValue = activeAssets.reduce((s, a) => s + a.currentValue, 0)

  // Build sector groups for chart
  const sectorMap = new Map<string, number>()
  for (const a of activeAssets) {
    sectorMap.set(a.resolvedSector, (sectorMap.get(a.resolvedSector) ?? 0) + a.currentValue)
  }

  const sectorGroups: SectorGroup[] = [...sectorMap.entries()]
    .filter(([sector]) => sector !== 'Sem setor')
    .sort((a, b) => b[1] - a[1])
    .map(([sector, value], index) => ({
      sector,
      value,
      pct: totalValue > 0 ? (value / totalValue) * 100 : 0,
      color: sectorColor(index),
    }))

  // Build fund type groups (FII only)
  const fundTypeMap = new Map<string, number>()
  for (const a of fiis) {
    if (a.fundType !== 'Não definido') {
      fundTypeMap.set(a.fundType, (fundTypeMap.get(a.fundType) ?? 0) + a.currentValue)
    }
  }
  const fiiTotalValue = fiis.reduce((s, a) => s + a.currentValue, 0)
  const fundTypeGroups: SectorGroup[] = [...fundTypeMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([sector, value], index) => ({
      sector,
      value,
      pct: fiiTotalValue > 0 ? (value / fiiTotalValue) * 100 : 0,
      color: fundTypeColor(index),
    }))

  // Build stock segment pie items (Ações only, excludes 'Não definido')
  const stockSegmentMap = new Map<string, number>()
  for (const a of stocks) {
    if (a.stockSegment !== 'Não definido') {
      stockSegmentMap.set(a.stockSegment, (stockSegmentMap.get(a.stockSegment) ?? 0) + a.currentValue)
    }
  }
  const stocksTotalValue = stocks.reduce((s, a) => s + a.currentValue, 0)
  const stockSegmentPieItems: PieItem[] = [...stockSegmentMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, value], index) => ({
      name,
      value,
      pct: stocksTotalValue > 0 ? (value / stocksTotalValue) * 100 : 0,
      color: sectorColor(index),
    }))

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Diversificação</h1>
        <p className="text-sm text-zinc-700 mt-1">
          Concentração por setor nos seus FIIs e Ações brasileiras
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['fii', 'stock_br'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              tab === t
                ? 'bg-green-500 text-white shadow-sm'
                : 'bg-white border border-zinc-200/60 text-zinc-700 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            {t === 'fii' ? 'FIIs' : 'Ações BR'}
          </button>
        ))}
      </div>

      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {/* Bar chart card */}
          <div className="rounded-2xl border border-zinc-200/60 bg-white shadow-sm p-6">
            {tab === 'fii' ? (
              <>
                <p className="text-base font-bold text-zinc-900 mb-1">
                  Distribuição por segmento e tipo de fundo
                </p>
                <p className="text-xs text-zinc-600 mb-5">
                  Percentual calculado sobre o valor atual de mercado
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-zinc-700 mb-3">Distribuição por Segmento</p>
                    <SectorBarChart groups={sectorGroups} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-700 mb-3">Distribuição por Tipo de Fundo</p>
                    <SectorBarChart groups={fundTypeGroups} />
                    {fundTypeGroups.some(g => g.pct > 30) && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {fundTypeGroups
                          .filter(g => g.pct > 30)
                          .map(g => (
                            <span
                              key={g.sector}
                              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                g.pct > 40
                                  ? 'bg-red-100 text-red-600'
                                  : 'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {g.pct.toFixed(0)}% em {g.sector} —{' '}
                              {g.pct > 40 ? 'Alta concentração' : 'Atenção'}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-base font-bold text-zinc-900 mb-1">
                  Distribuição por setor e segmento
                </p>
                <p className="text-xs text-zinc-600 mb-5">
                  Percentual calculado sobre o valor atual de mercado
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-zinc-700 mb-3">Distribuição por Setor</p>
                    <SectorBarChart groups={sectorGroups} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-700 mb-3">Distribuição por Segmento</p>
                    <SegmentPieChart items={stockSegmentPieItems} />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Table card */}
          <div className="rounded-2xl border border-zinc-200/60 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-200/60 flex items-center justify-between">
              <p className="text-base font-bold text-zinc-900">
                {tab === 'fii' ? 'FIIs por segmento' : 'Ativos por setor'}
              </p>
              {activeAssets.some(a => a.resolvedSector === 'Sem setor') && (
                <span className="rounded-full bg-yellow-100 px-3 py-0.5 text-xs font-semibold text-yellow-700">
                  Ativos sem setor definido
                </span>
              )}
            </div>
            {tab === 'fii' ? (
              <FiiTabTable
                assets={activeAssets}
                totalValue={totalValue}
              />
            ) : (
              <StockTabTable
                assets={activeAssets}
                totalValue={totalValue}
              />
            )}
          </div>

          {/* Concentration alerts */}
          {sectorGroups.some(g => g.pct > 30) && (
            <div className="rounded-2xl border border-orange-200 bg-orange-50 px-6 py-4">
              <p className="text-sm font-bold text-orange-800 mb-2">Alertas de concentração</p>
              <ul className="flex flex-col gap-1">
                {sectorGroups
                  .filter(g => g.pct > 30)
                  .map(g => (
                    <li key={g.sector} className="flex items-center gap-2 text-sm text-orange-700">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          g.pct > 40
                            ? 'bg-red-100 text-red-600'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {g.pct.toFixed(1)}%
                      </span>
                      <span>
                        <strong>{g.sector}</strong> representa {g.pct.toFixed(1)}% da carteira de{' '}
                        {tab === 'fii' ? 'FIIs' : 'Ações BR'}
                        {g.pct > 40 ? ' — concentração alta' : ' — acima de 30%'}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}
