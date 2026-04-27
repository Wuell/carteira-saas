'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'

type Asset = {
  id: string
  ticker: string
  type: string
  quantity: number
  avgPrice: number
  createdAt: string
}

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
  const [form, setForm] = useState({ ticker: '', type: '', quantity: '', avgPrice: '' })
  const [error, setError] = useState('')
  const [tickerError, setTickerError] = useState('')
  const [fetchingPrice, setFetchingPrice] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setTickerError('')
    setForm(f => ({ ...f, type: '', avgPrice: '' }))
    if (!form.ticker || form.ticker.length < 2) return

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      setFetchingPrice(true)
      try {
        const res = await fetch(`/api/quote/${form.ticker.toUpperCase()}`)
        if (res.ok) {
          const { price, type } = await res.json()
          setForm(f => ({ ...f, avgPrice: price.toFixed(2), type }))
          setTickerError('')
        } else {
          setTickerError('Ticker não encontrado. Use o código da B3 (ex: PETR4) ou o ID do CoinGecko (ex: bitcoin).')
        }
      } finally {
        setFetchingPrice(false)
      }
    }, 800)
  }, [form.ticker])

  const { data: assets = [], isLoading } = useQuery({ queryKey: ['assets'], queryFn: fetchAssets })

  const addMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      const res = await fetch('/api/assets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error('Falha ao adicionar ativo')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      setForm({ ticker: '', type: '', quantity: '', avgPrice: '' })
      setError('')
    },
    onError: () => setError('Erro ao adicionar ativo. Verifique os dados.'),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/assets', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      if (!res.ok) throw new Error('Falha ao remover ativo')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.ticker || !form.quantity || !form.avgPrice || !form.type) {
      setError('Aguarde a detecção do ticker ou verifique os dados.')
      return
    }
    addMutation.mutate(form)
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-6 shadow-sm flex flex-col gap-4">
        <h2 className="text-base font-semibold text-zinc-900">Adicionar ativo</h2>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Ticker</label>
            <div className="relative">
              <input
                className={`w-full rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 ${tickerError ? 'border-red-400' : ''}`}
                placeholder="ex: PETR4 ou bitcoin"
                value={form.ticker}
                onChange={e => setForm(f => ({ ...f, ticker: e.target.value }))}
              />
              {fetchingPrice && (
                <span className="absolute right-3 top-2.5 text-xs text-zinc-400">buscando...</span>
              )}
            </div>
            {tickerError && <p className="text-xs text-red-500 mt-1">{tickerError}</p>}
            {form.type && !tickerError && (
              <p className="text-xs text-green-600 mt-1">{TYPE_LABELS[form.type] ?? form.type} detectado</p>
            )}
          </div>
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
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">
              Preço médio (R$)
            </label>
            <input
              type="number"
              step="0.01"
              className="rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
              placeholder={fetchingPrice ? 'Buscando...' : 'ex: 32.50'}
              value={form.avgPrice}
              onChange={e => setForm(f => ({ ...f, avgPrice: e.target.value }))}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={addMutation.isPending || fetchingPrice || !!tickerError}
          className="self-start rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 transition-colors"
        >
          {addMutation.isPending ? 'Adicionando...' : 'Adicionar'}
        </button>
      </form>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-zinc-50 text-left text-xs text-zinc-500 uppercase tracking-wider">
              <th className="px-4 py-3">Ticker</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Quantidade</th>
              <th className="px-4 py-3">Preço médio</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-zinc-400">Carregando...</td></tr>
            )}
            {!isLoading && assets.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-zinc-400">Nenhum ativo cadastrado.</td></tr>
            )}
            {assets.map(asset => (
              <tr key={asset.id} className="border-b last:border-0 hover:bg-zinc-50 transition-colors">
                <td className="px-4 py-3 font-medium text-zinc-900">{asset.ticker}</td>
                <td className="px-4 py-3 text-zinc-500">{TYPE_LABELS[asset.type] ?? asset.type}</td>
                <td className="px-4 py-3 text-zinc-700">{asset.quantity}</td>
                <td className="px-4 py-3 text-zinc-700">
                  {asset.avgPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
