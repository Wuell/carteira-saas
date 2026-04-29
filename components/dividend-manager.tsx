'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useRef, useEffect } from 'react'

type Dividend = {
  id: string
  ticker: string
  type: string
  amount: number
  paidAt: string
}

type AssetOption = {
  ticker: string
  type: string
}

const TYPE_LABELS: Record<string, string> = {
  stock_br: 'Ação',
  fii: 'FII',
}

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function parseLocalDate(d: string): Date {
  const [year, month, day] = d.split('T')[0].split('-').map(Number)
  return new Date(year, month - 1, day)
}

function formatDate(d: string) {
  return parseLocalDate(d).toLocaleDateString('pt-BR')
}

function toMonthKey(d: string) {
  const date = parseLocalDate(d)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function monthLabel(key: string) {
  const [year, month] = key.split('-')
  return `${month.padStart(2, '0')}/${year}`
}

async function fetchDividends(): Promise<Dividend[]> {
  const res = await fetch('/api/dividends')
  if (!res.ok) throw new Error('Falha ao buscar proventos')
  return res.json()
}

async function fetchAssets(): Promise<AssetOption[]> {
  const res = await fetch('/api/portfolio')
  if (!res.ok) throw new Error('Falha ao buscar ativos')
  const data = await res.json()
  return (data.assets ?? [])
    .filter((a: { type: string }) => a.type === 'stock_br' || a.type === 'fii')
    .map((a: { ticker: string; type: string }) => ({ ticker: a.ticker, type: a.type }))
}

// ---------- Filter Panel ----------

type Filters = { month: string; ticker: string }

function FilterPanel({
  filters, onChange, monthOptions, tickerOptions, onClear,
}: {
  filters: Filters
  onChange: (f: Filters) => void
  monthOptions: string[]
  tickerOptions: string[]
  onClear: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const activeCount = (filters.month ? 1 : 0) + (filters.ticker ? 1 : 0)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${activeCount > 0 ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
        Filtros
        {activeCount > 0 && (
          <span className="rounded-full bg-white text-zinc-900 text-xs w-4 h-4 flex items-center justify-center font-bold">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-20 w-64 rounded-xl border bg-white shadow-lg p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-zinc-900">Filtros</p>
            {activeCount > 0 && (
              <button type="button" onClick={() => { onClear(); setOpen(false) }}
                className="text-xs text-zinc-400 hover:text-zinc-700">
                Limpar
              </button>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Mês</label>
            <select
              className="rounded-lg border px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
              value={filters.month}
              onChange={e => onChange({ ...filters, month: e.target.value })}
            >
              <option value="">Todos os meses</option>
              {monthOptions.map(key => (
                <option key={key} value={key} className="capitalize">{monthLabel(key)}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Ticker</label>
            <select
              className="rounded-lg border px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
              value={filters.ticker}
              onChange={e => onChange({ ...filters, ticker: e.target.value })}
            >
              <option value="">Todos os tickers</option>
              {tickerOptions.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <button type="button" onClick={() => setOpen(false)}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700">
            Aplicar
          </button>
        </div>
      )}
    </div>
  )
}

// ---------- Main Component ----------

export function DividendManager() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState({ ticker: '', type: '', amount: '', paidAt: '' })
  const [error, setError] = useState('')
  const [filters, setFilters] = useState<Filters>({ month: '', ticker: '' })

  const { data: dividends = [], isLoading } = useQuery({
    queryKey: ['dividends'],
    queryFn: fetchDividends,
  })

  const { data: assetOptions = [] } = useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchAssets,
  })

  const addMutation = useMutation({
    mutationFn: async (payload: typeof form) => {
      const res = await fetch('/api/dividends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) { const b = await res.json().catch(() => ({})); throw new Error(b.error ?? 'Falha ao registrar') }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dividends'] })
      setForm(f => ({ ...f, ticker: '', type: '', amount: '', paidAt: '' }))
      setError('')
    },
    onError: (err: Error) => setError(err.message),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/dividends', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error('Falha ao remover')
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dividends'] }),
  })

  function handleTickerSelect(ticker: string) {
    const asset = assetOptions.find(a => a.ticker === ticker)
    setForm(f => ({ ...f, ticker, type: asset?.type ?? '' }))
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.ticker || !form.amount || !form.paidAt) { setError('Preencha todos os campos.'); return }
    addMutation.mutate(form)
  }

  // Dados para os filtros (derivados de todos os dividendos, não dos filtrados)
  const monthOptions = [...new Set(dividends.map(d => toMonthKey(d.paidAt)))].sort((a, b) => b.localeCompare(a))
  const tickerOptions = [...new Set(dividends.map(d => d.ticker))].sort()

  // Dividendos filtrados
  const filtered = dividends.filter(d => {
    if (filters.month && toMonthKey(d.paidAt) !== filters.month) return false
    if (filters.ticker && d.ticker !== filters.ticker) return false
    return true
  })

  // Resumo baseado nos dividendos filtrados (ou todos se sem filtro)
  const base = filters.month || filters.ticker ? filtered : dividends

  const byMonth = base.reduce<Record<string, { total: number; year: number; month: number }>>((acc, d) => {
    const key = toMonthKey(d.paidAt)
    const date = parseLocalDate(d.paidAt)
    if (!acc[key]) acc[key] = { total: 0, year: date.getFullYear(), month: date.getMonth() + 1 }
    acc[key].total += d.amount
    return acc
  }, {})

  const monthSummary = Object.entries(byMonth)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 6)
    .map(([key, val]) => ({ key, ...val }))

  const totalReceived = dividends.reduce((s, d) => s + d.amount, 0)
  const filteredTotal = filtered.reduce((s, d) => s + d.amount, 0)
  const hasFilter = !!(filters.month || filters.ticker)

  return (
    <div className="flex flex-col gap-6">
      {/* Cards resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Total recebido</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">{formatBRL(totalReceived)}</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Último mês</p>
          <p className="mt-2 text-2xl font-semibold text-green-600">
            {formatBRL(monthSummary[0]?.total ?? 0)}
          </p>
          {monthSummary[0] && (
            <p className="text-xs text-zinc-400 mt-1 capitalize">{monthLabel(monthSummary[0].key)}</p>
          )}
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Registros</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">{dividends.length}</p>
        </div>
      </div>

      {/* Resumo por mês */}
      {monthSummary.length > 0 && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-zinc-900 mb-4">Recebido por mês</p>
          <div className="flex flex-col gap-2">
            {monthSummary.map(({ key, total }) => {
              const maxTotal = Math.max(...monthSummary.map(m => m.total))
              const pct = maxTotal > 0 ? (total / maxTotal) * 100 : 0
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="w-32 text-xs text-zinc-500 shrink-0">
                    {monthLabel(key)}
                  </span>
                  <div className="flex-1 bg-zinc-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-24 text-xs font-medium text-zinc-900 text-right shrink-0">
                    {formatBRL(total)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário */}
        <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col gap-4">
          <h2 className="text-base font-semibold text-zinc-900">Registrar provento</h2>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-500">Ticker</label>
              <select
                className="rounded-lg border px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                value={form.ticker}
                onChange={e => handleTickerSelect(e.target.value)}
              >
                <option value="">Selecione um ativo</option>
                {assetOptions.length === 0 && (
                  <option disabled>Nenhum ativo cadastrado</option>
                )}
                {assetOptions.map(a => (
                  <option key={a.ticker} value={a.ticker}>
                    {a.ticker} ({TYPE_LABELS[a.type] ?? a.type})
                  </option>
                ))}
              </select>
              {form.type && (
                <p className="text-xs text-zinc-400">
                  {TYPE_LABELS[form.type] ?? form.type}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-500">Valor recebido (R$)</label>
              <input
                type="number" step="0.01"
                className="rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                placeholder="ex: 12.50"
                value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-500">Data de pagamento</label>
              <input
                type="date"
                className="rounded-lg border px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                value={form.paidAt}
                onChange={e => setForm(f => ({ ...f, paidAt: e.target.value }))}
              />
            </div>

            <button type="submit" disabled={addMutation.isPending}
              className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50 transition-colors">
              {addMutation.isPending ? 'Registrando...' : 'Registrar'}
            </button>
          </form>
        </div>

        {/* Histórico */}
        <div className="lg:col-span-2 rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-zinc-900">Histórico</p>
              {hasFilter && (
                <span className="text-xs text-zinc-500">
                  {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} · {formatBRL(filteredTotal)}
                </span>
              )}
            </div>
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              monthOptions={monthOptions}
              tickerOptions={tickerOptions}
              onClear={() => setFilters({ month: '', ticker: '' })}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-zinc-50 text-left text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Ticker</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Valor</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr><td colSpan={5} className="px-4 py-6 text-center text-zinc-400">Carregando...</td></tr>
                )}
                {!isLoading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-zinc-400">
                      {hasFilter ? 'Nenhum resultado para os filtros selecionados.' : 'Nenhum provento registrado.'}
                    </td>
                  </tr>
                )}
                {filtered.map(d => (
                  <tr key={d.id} className="border-b last:border-0 hover:bg-zinc-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-zinc-900">{d.ticker}</td>
                    <td className="px-4 py-3 text-zinc-500">{TYPE_LABELS[d.type] ?? d.type}</td>
                    <td className="px-4 py-3 text-zinc-500">{formatDate(d.paidAt)}</td>
                    <td className="px-4 py-3 font-medium text-green-600">{formatBRL(d.amount)}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => deleteMutation.mutate(d.id)} disabled={deleteMutation.isPending}
                        className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50">
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
