'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'

type Asset = {
  id: string
  ticker: string
  type: string
  quantity: number
  avgPrice: number
  startDate?: string | null
  fixedRate?: number | null
  createdAt: string
}

type Category = 'stock' | 'crypto' | 'fixed'
type FixedSub = 'cdb' | 'tesouro'

const CATEGORIES = [
  {
    id: 'stock' as Category,
    label: 'Ações / FIIs',
    description: 'B3, ETFs, fundos imobiliários',
    icon: '📈',
    apiType: 'stock_br',
  },
  {
    id: 'crypto' as Category,
    label: 'Cripto',
    description: 'Bitcoin, Ethereum e outros',
    icon: '₿',
    apiType: 'crypto',
  },
  {
    id: 'fixed' as Category,
    label: 'Renda Fixa',
    description: 'Tesouro Direto, CDB, LCI',
    icon: '🏦',
    apiType: 'fixed',
  },
]

const TYPE_LABELS: Record<string, string> = {
  stock_br: 'Ação BR',
  crypto: 'Cripto',
  stock_us: 'Ação EUA',
  fixed: 'Renda Fixa',
}

async function fetchAssets(): Promise<Asset[]> {
  const res = await fetch('/api/assets')
  if (!res.ok) throw new Error('Falha ao buscar ativos')
  return res.json()
}

export function AssetManager() {
  const queryClient = useQueryClient()
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [fixedSub, setFixedSub] = useState<FixedSub | null>(null)
  const [form, setForm] = useState({
    ticker: '',
    type: '',
    operation: 'BUY',
    quantity: '',
    price: '',
    startDate: '',
    fixedRate: '',
  })
  const [error, setError] = useState('')
  const [tickerError, setTickerError] = useState('')
  const [fetchingPrice, setFetchingPrice] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function selectCategory(cat: Category) {
    setSelectedCategory(cat)
    setFixedSub(null)
    const apiType = CATEGORIES.find(c => c.id === cat)!.apiType
    setForm({ ticker: '', type: apiType, operation: 'BUY', quantity: '', price: '', startDate: '', fixedRate: '' })
    setError('')
    setTickerError('')
  }

  function selectFixedSub(sub: FixedSub) {
    setFixedSub(sub)
    setForm(f => ({ ...f, ticker: '', price: '', startDate: '', fixedRate: '' }))
    setError('')
  }

  function goBack() {
    if (fixedSub) {
      setFixedSub(null)
      setError('')
    } else {
      setSelectedCategory(null)
      setError('')
      setTickerError('')
    }
  }

  useEffect(() => {
    if (!selectedCategory || selectedCategory === 'fixed') return
    setTickerError('')
    setForm(f => ({ ...f, price: '' }))
    if (!form.ticker || form.ticker.length < 2) return

    if (debounceRef.current) clearTimeout(debounceRef.current)

    const category = CATEGORIES.find(c => c.id === selectedCategory)!
    debounceRef.current = setTimeout(async () => {
      setFetchingPrice(true)
      try {
        const res = await fetch(`/api/quote/${form.ticker.toUpperCase()}?type=${category.apiType}`)
        if (res.ok) {
          const { price } = await res.json()
          setForm(f => ({ ...f, price: price.toFixed(2) }))
          setTickerError('')
        } else {
          const placeholder =
            selectedCategory === 'stock' ? 'ex: PETR4, MXRF11' : 'ex: BTC, ETH, SOL'
          setTickerError(`Ticker não encontrado. Tente outro código (${placeholder}).`)
        }
      } finally {
        setFetchingPrice(false)
      }
    }, 800)
  }, [form.ticker, selectedCategory])

  const { data: assets = [], isLoading } = useQuery({ queryKey: ['assets'], queryFn: fetchAssets })

  const addMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Falha ao registrar operação')
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      setForm(f => ({ ...f, ticker: '', quantity: '', price: '', startDate: '', fixedRate: '' }))
      setError('')
      setTickerError('')
    },
    onError: (err: Error) => setError(err.message),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/assets', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error('Falha ao remover ativo')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const isFixed = selectedCategory === 'fixed'
    if (!form.ticker || !form.price || !form.type) {
      setError('Preencha todos os campos obrigatórios.')
      return
    }
    if (!isFixed && !form.quantity) {
      setError('Informe a quantidade.')
      return
    }
    if (fixedSub === 'tesouro' && (!form.fixedRate || !form.startDate)) {
      setError('Informe a taxa ao ano e a data da aplicação.')
      return
    }
    addMutation.mutate({ ...form, quantity: isFixed ? '1' : form.quantity })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900">Registrar operação</h2>
          {selectedCategory && (
            <button
              type="button"
              onClick={goBack}
              className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              ← Trocar categoria
            </button>
          )}
        </div>

        {!selectedCategory ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.id)}
                className="flex flex-col items-start gap-1.5 rounded-xl border-2 border-zinc-100 bg-zinc-50 p-4 text-left transition-all hover:border-zinc-300 hover:bg-white hover:shadow-sm"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-sm font-semibold text-zinc-900">{cat.label}</span>
                <span className="text-xs text-zinc-400">{cat.description}</span>
              </button>
            ))}
          </div>
        ) : selectedCategory === 'fixed' && !fixedSub ? (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-zinc-500">Selecione o tipo de investimento:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => selectFixedSub('cdb')}
                className="flex flex-col items-start gap-1.5 rounded-xl border-2 border-zinc-100 bg-zinc-50 p-4 text-left transition-all hover:border-zinc-300 hover:bg-white hover:shadow-sm"
              >
                <span className="text-2xl">🏦</span>
                <span className="text-sm font-semibold text-zinc-900">CDB / LCI / LCA</span>
                <span className="text-xs text-zinc-400">Liquidez diária — informe a rentabilidade acumulada do app</span>
              </button>
              <button
                type="button"
                onClick={() => selectFixedSub('tesouro')}
                className="flex flex-col items-start gap-1.5 rounded-xl border-2 border-zinc-100 bg-zinc-50 p-4 text-left transition-all hover:border-zinc-300 hover:bg-white hover:shadow-sm"
              >
                <span className="text-2xl">🇧🇷</span>
                <span className="text-sm font-semibold text-zinc-900">Tesouro Direto</span>
                <span className="text-xs text-zinc-400">Prefixado — informe a taxa ao ano e a data da compra</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-2">
              {(['BUY', 'SELL'] as const).map(op => (
                <button
                  key={op}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, operation: op }))}
                  className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                    form.operation === op
                      ? op === 'BUY'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                  }`}
                >
                  {op === 'BUY' ? 'Compra' : 'Venda'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedCategory !== 'fixed' && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-zinc-500">
                    {selectedCategory === 'stock' ? 'Ticker (B3)' : 'Símbolo'}
                  </label>
                  <div className="relative">
                    <input
                      className={`w-full rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 ${tickerError ? 'border-red-300' : ''}`}
                      placeholder={selectedCategory === 'stock' ? 'ex: PETR4, MXRF11' : 'ex: BTC, ETH, SOL'}
                      value={form.ticker}
                      onChange={e => setForm(f => ({ ...f, ticker: e.target.value }))}
                    />
                    {fetchingPrice && (
                      <span className="absolute right-3 top-2.5 text-xs text-zinc-400">buscando...</span>
                    )}
                  </div>
                  {tickerError && <p className="text-xs text-red-500 mt-1">{tickerError}</p>}
                  {form.price && !tickerError && (
                    <p className="text-xs text-green-600 mt-1">Cotação atual detectada</p>
                  )}
                </div>
              )}

              {selectedCategory === 'fixed' && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-zinc-500">Nome do investimento</label>
                  <input
                    className="rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                    placeholder="ex: Tesouro Prefixado 2032, CDB Inter"
                    value={form.ticker}
                    onChange={e => setForm(f => ({ ...f, ticker: e.target.value }))}
                  />
                </div>
              )}

              {selectedCategory !== 'fixed' && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-zinc-500">Quantidade</label>
                  <input
                    type="number"
                    className="rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                    placeholder="ex: 10"
                    value={form.quantity}
                    onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs text-zinc-500">
                  {selectedCategory === 'fixed' ? 'Valor investido (R$)' : 'Preço unitário (R$)'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                  placeholder={fetchingPrice ? 'Buscando...' : selectedCategory === 'fixed' ? 'ex: 5000.00' : 'ex: 32.50'}
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                />
              </div>
            </div>

            {fixedSub === 'cdb' && (
              <div className="flex flex-col gap-3 p-4 rounded-lg bg-zinc-50 border border-zinc-200">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-zinc-500">Rentabilidade acumulada (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                    placeholder="ex: 24.74"
                    value={form.fixedRate}
                    onChange={e => setForm(f => ({ ...f, fixedRate: e.target.value }))}
                  />
                </div>
                <p className="text-xs text-zinc-400">
                  Informe a rentabilidade que aparece no app (ex: Inter, Rico). Atualize quando quiser ver o valor corrigido.
                </p>
              </div>
            )}

            {fixedSub === 'tesouro' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-lg bg-zinc-50 border border-zinc-200">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-zinc-500">Taxa ao ano (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                    placeholder="ex: 13.5"
                    value={form.fixedRate}
                    onChange={e => setForm(f => ({ ...f, fixedRate: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-zinc-500">Data da aplicação</label>
                  <input
                    type="date"
                    className="rounded-lg border px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                    value={form.startDate}
                    onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                  />
                </div>
                <p className="sm:col-span-2 text-xs text-zinc-400">
                  Informe a taxa contratada na compra (encontrada na nota de negociação). O rendimento é calculado automaticamente.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={addMutation.isPending || fetchingPrice}
              className={`self-start rounded-lg px-5 py-2 text-sm font-medium text-white disabled:opacity-50 transition-colors ${
                form.operation === 'BUY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {addMutation.isPending
                ? 'Registrando...'
                : form.operation === 'BUY'
                ? 'Registrar compra'
                : 'Registrar venda'}
            </button>
          </form>
        )}
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <p className="text-sm font-semibold text-zinc-900">Posição atual</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-zinc-50 text-left text-xs text-zinc-500 uppercase tracking-wider">
              <th className="px-4 py-3">Ticker</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Quantidade</th>
              <th className="px-4 py-3">Preço médio</th>
              <th className="px-4 py-3">Rentabilidade</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-zinc-400">Carregando...</td></tr>
            )}
            {!isLoading && assets.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-zinc-400">Nenhum ativo cadastrado.</td></tr>
            )}
            {assets.map(asset => (
              <tr key={asset.id} className="border-b last:border-0 hover:bg-zinc-50 transition-colors">
                <td className="px-4 py-3 font-medium text-zinc-900">{asset.ticker}</td>
                <td className="px-4 py-3 text-zinc-500">{TYPE_LABELS[asset.type] ?? asset.type}</td>
                <td className="px-4 py-3 text-zinc-700">{asset.quantity}</td>
                <td className="px-4 py-3 text-zinc-700">
                  {asset.avgPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td className="px-4 py-3 text-zinc-500 text-xs">
                  {asset.fixedRate ? `${asset.fixedRate}%` : '—'}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteMutation.mutate(asset.id)}
                    disabled={deleteMutation.isPending}
                    className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
