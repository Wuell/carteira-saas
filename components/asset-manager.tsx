'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'
import { AssetAboutModal } from './asset-about-modal'

// ---------- Types ----------

type AssetRow = {
  id: string
  ticker: string
  type: string
  quantity: number
  avgPrice: number
  currentPrice: number
  currentValue: number
  investedValue: number
  returnPct: number
  assetSubType?: string | null
  sector?: string | null
  notes?: string | null
}

type FixedLotRow = {
  id: string
  name: string
  subType: string
  investedValue: number
  currentValue: number
  returnPct: number
  notes?: string | null
}

type Portfolio = { assets: AssetRow[]; fixedLots: FixedLotRow[] }
type Category = 'stock' | 'fii' | 'crypto' | 'fixed'
type FixedSub = 'cdb' | 'tesouro'
type SortKey = 'ticker' | 'type' | 'currentValue' | 'returnPct'

const CATEGORIES = [
  { id: 'stock' as Category, label: 'Ações',       description: 'Ações BR, ETFs, BDRs',         icon: '📈', apiType: 'stock_br' },
  { id: 'fii'   as Category, label: 'FIIs',        description: 'Fundos imobiliários B3',        icon: '🏢', apiType: 'fii' },
  { id: 'crypto' as Category, label: 'Cripto',     description: 'Bitcoin, Ethereum e outros',    icon: '₿',  apiType: 'crypto' },
  { id: 'fixed' as Category, label: 'Renda Fixa',  description: 'Tesouro Direto, CDB, LCI',     icon: '🏦', apiType: 'fixed' },
]

const TYPE_LABELS: Record<string, string> = {
  stock_br: 'Ação', fii: 'FII', crypto: 'Cripto', stock_us: 'Ação EUA',
}

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}


async function fetchPortfolio(): Promise<Portfolio> {
  const res = await fetch('/api/portfolio')
  if (!res.ok) throw new Error('Falha ao buscar portfólio')
  return res.json()
}

// ---------- Edit Modal — Ações/Cripto ----------

type EditAssetForm = { quantity: string; avgPrice: string }

function EditAssetModal({ asset, onClose, onSave, saving }: {
  asset: AssetRow
  onClose: () => void
  onSave: (form: EditAssetForm) => void
  saving: boolean
}) {
  const [form, setForm] = useState<EditAssetForm>({
    quantity: String(asset.quantity),
    avgPrice: String(asset.avgPrice),
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-zinc-900">Editar ativo</p>
            <p className="text-xs text-zinc-500 mt-0.5">{asset.ticker} · {TYPE_LABELS[asset.type] ?? asset.type}</p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 text-xl leading-none">×</button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Quantidade</label>
            <input type="number" step="any"
              className="rounded-lg border px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
              value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Preço médio (R$)</label>
            <input type="number" step="0.01"
              className="rounded-lg border px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
              value={form.avgPrice} onChange={e => setForm(f => ({ ...f, avgPrice: e.target.value }))} />
          </div>
        </div>
        <div className="flex gap-2 justify-end pt-1">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-zinc-500 hover:text-zinc-700">Cancelar</button>
          <button onClick={() => onSave(form)} disabled={saving}
            className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50">
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------- Edit Modal — Renda Fixa ----------

type EditFixedForm = {
  name: string
  investedValue: string
  currentValue: string
}

function EditFixedModal({ lot, onClose, onSave, saving }: {
  lot: FixedLotRow
  onClose: () => void
  onSave: (form: EditFixedForm) => void
  saving: boolean
}) {
  const [form, setForm] = useState<EditFixedForm>({
    name: lot.name,
    investedValue: String(lot.investedValue),
    currentValue: String(lot.currentValue),
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-zinc-900">Editar investimento</p>
            <p className="text-xs text-zinc-500 mt-0.5">{lot.name} · {lot.subType === 'tesouro' ? 'Tesouro Direto' : 'CDB / LCI / LCA'}</p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 text-xl leading-none">×</button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Nome</label>
            <input type="text"
              className="rounded-lg border px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
              value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Valor investido (R$)</label>
            <input type="number" step="0.01"
              className="rounded-lg border px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
              value={form.investedValue} onChange={e => setForm(f => ({ ...f, investedValue: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Valor atual (R$)</label>
            <input type="number" step="0.01"
              className="rounded-lg border px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
              placeholder="ex: 352.47"
              value={form.currentValue} onChange={e => setForm(f => ({ ...f, currentValue: e.target.value }))} />
            <p className="text-xs text-zinc-500">Atualize com o valor exibido no app do banco.</p>
          </div>
        </div>
        <div className="flex gap-2 justify-end pt-1">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-zinc-500 hover:text-zinc-700">Cancelar</button>
          <button onClick={() => onSave(form)} disabled={saving}
            className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50">
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------- Main Component ----------

export function AssetManager() {
  const queryClient = useQueryClient()

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [fixedSub, setFixedSub] = useState<FixedSub | null>(null)
  const [form, setForm] = useState({ ticker: '', type: '', operation: 'BUY', quantity: '', price: '' })
  const [error, setError] = useState('')
  const [tickerError, setTickerError] = useState('')
  const [fetchingPrice, setFetchingPrice] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'currentValue', dir: 'desc' })
  const [editAsset, setEditAsset] = useState<AssetRow | null>(null)
  const [editFixed, setEditFixed] = useState<FixedLotRow | null>(null)
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null)
  const [selectedFixedId, setSelectedFixedId] = useState<string | null>(null)
  const [aboutItem, setAboutItem] = useState<{ kind: 'asset'; data: AssetRow } | { kind: 'fixed'; data: FixedLotRow } | null>(null)

  function selectCategory(cat: Category) {
    setSelectedCategory(cat)
    setFixedSub(null)
    const apiType = CATEGORIES.find(c => c.id === cat)!.apiType
    setForm({ ticker: '', type: apiType, operation: 'BUY', quantity: '', price: '' })
    setError('')
    setTickerError('')
  }

  function selectFixedSub(sub: FixedSub) {
    setFixedSub(sub)
    setForm(f => ({ ...f, ticker: '', price: '' }))
    setError('')
  }

  function goBack() {
    if (fixedSub) { setFixedSub(null); setError('') }
    else { setSelectedCategory(null); setError(''); setTickerError('') }
  }

  function toggleSort(key: SortKey) {
    setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' })
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
          const placeholder = selectedCategory === 'stock' ? 'ex: PETR4, MXRF11' : 'ex: BTC, ETH, SOL'
          setTickerError(`Ticker não encontrado. Tente outro código (${placeholder}).`)
        }
      } finally { setFetchingPrice(false) }
    }, 800)
  }, [form.ticker, selectedCategory])

  const { data, isLoading } = useQuery({ queryKey: ['portfolio'], queryFn: fetchPortfolio, refetchInterval: 30000 })

  const assets = [...(data?.assets ?? [])].sort((a, b) => {
    const dir = sort.dir === 'asc' ? 1 : -1
    if (sort.key === 'ticker') return dir * a.ticker.localeCompare(b.ticker)
    if (sort.key === 'type') return dir * a.type.localeCompare(b.type)
    if (sort.key === 'currentValue') return dir * (a.currentValue - b.currentValue)
    if (sort.key === 'returnPct') return dir * (a.returnPct - b.returnPct)
    return 0
  })

  const fixedLots = [...(data?.fixedLots ?? [])].sort((a, b) => b.currentValue - a.currentValue)

  // Mutation — ações/cripto
  const addMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      const res = await fetch('/api/transactions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) { const body = await res.json().catch(() => ({})); throw new Error(body.error ?? 'Falha ao registrar operação') }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      setForm(f => ({ ...f, ticker: '', quantity: '', price: '' }))
      setError('')
      setTickerError('')
    },
    onError: (err: Error) => setError(err.message),
  })

  // Mutation — renda fixa
  const addFixedMutation = useMutation({
    mutationFn: async (payload: object) => {
      const res = await fetch('/api/fixed-income', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) { const body = await res.json().catch(() => ({})); throw new Error(body.error ?? 'Falha ao registrar') }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      setForm(f => ({ ...f, ticker: '', price: '' }))
      setError('')
    },
    onError: (err: Error) => setError(err.message),
  })

  const editAssetMutation = useMutation({
    mutationFn: async ({ id, ...fields }: { id: string } & EditAssetForm) => {
      const res = await fetch('/api/assets', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...fields }) })
      if (!res.ok) throw new Error('Falha ao salvar')
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['portfolio'] }); setEditAsset(null) },
  })

  const editFixedMutation = useMutation({
    mutationFn: async ({ id, ...fields }: { id: string } & EditFixedForm) => {
      const res = await fetch('/api/fixed-income', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...fields }) })
      if (!res.ok) throw new Error('Falha ao salvar')
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['portfolio'] }); setEditFixed(null) },
  })

  const deleteAssetMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/assets', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      if (!res.ok) throw new Error('Falha ao remover')
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['portfolio'] }),
  })

  const deleteFixedMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/fixed-income', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      if (!res.ok) throw new Error('Falha ao remover')
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['portfolio'] }),
  })

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (selectedCategory === 'fixed') {
      if (!form.ticker || !form.price) { setError('Preencha o nome e o valor investido.'); return }
      addFixedMutation.mutate({
        name: form.ticker,
        subType: fixedSub,
        investedValue: Number(form.price),
      })
    } else {
      if (!form.ticker || !form.price || !form.type || !form.quantity) { setError('Preencha todos os campos obrigatórios.'); return }
      addMutation.mutate(form)
    }
  }

  function SortHeader({ label, sortKey }: { label: string; sortKey: SortKey }) {
    const active = sort.key === sortKey
    return (
      <th className="px-4 py-3 cursor-pointer select-none hover:text-zinc-700 transition-colors" onClick={() => toggleSort(sortKey)}>
        <span className="flex items-center gap-1">
          {label}
          <span className={active ? 'text-zinc-700' : 'text-zinc-400'}>{active ? (sort.dir === 'asc' ? '↑' : '↓') : '↕'}</span>
        </span>
      </th>
    )
  }

  const isPendingFixed = addFixedMutation.isPending || addMutation.isPending

  return (
    <>
      {editAsset && (
        <EditAssetModal asset={editAsset} onClose={() => setEditAsset(null)} saving={editAssetMutation.isPending}
          onSave={fields => editAssetMutation.mutate({ id: editAsset.id, ...fields })} />
      )}
      {editFixed && (
        <EditFixedModal lot={editFixed} onClose={() => setEditFixed(null)} saving={editFixedMutation.isPending}
          onSave={fields => editFixedMutation.mutate({ id: editFixed.id, ...fields })} />
      )}
      {aboutItem && (
        <AssetAboutModal item={aboutItem} onClose={() => setAboutItem(null)} />
      )}

      <div className="flex flex-col gap-6">
        {/* Formulário */}
        <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-zinc-900">Registrar operação</h2>
            {selectedCategory && (
              <button type="button" onClick={goBack} className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">
                ← Trocar categoria
              </button>
            )}
          </div>

          {!selectedCategory ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map(cat => (
                <button key={cat.id} type="button" onClick={() => selectCategory(cat.id)}
                  className="flex flex-col items-start gap-1.5 rounded-xl border-2 border-zinc-100 bg-zinc-50 p-4 text-left transition-all hover:border-zinc-300 hover:bg-white hover:shadow-sm">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-sm font-semibold text-zinc-900">{cat.label}</span>
                  <span className="text-xs text-zinc-500">{cat.description}</span>
                </button>
              ))}
            </div>
          ) : selectedCategory === 'fixed' && !fixedSub ? (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-zinc-500">Selecione o tipo de investimento:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" onClick={() => selectFixedSub('cdb')}
                  className="flex flex-col items-start gap-1.5 rounded-xl border-2 border-zinc-100 bg-zinc-50 p-4 text-left transition-all hover:border-zinc-300 hover:bg-white hover:shadow-sm">
                  <span className="text-2xl">🏦</span>
                  <span className="text-sm font-semibold text-zinc-900">CDB / LCI / LCA</span>
                  <span className="text-xs text-zinc-500">Informe a rentabilidade acumulada do app do banco</span>
                </button>
                <button type="button" onClick={() => selectFixedSub('tesouro')}
                  className="flex flex-col items-start gap-1.5 rounded-xl border-2 border-zinc-100 bg-zinc-50 p-4 text-left transition-all hover:border-zinc-300 hover:bg-white hover:shadow-sm">
                  <span className="text-2xl">🇧🇷</span>
                  <span className="text-sm font-semibold text-zinc-900">Tesouro Direto</span>
                  <span className="text-xs text-zinc-500">Prefixado — informe a taxa ao ano e a data da compra</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && <p className="text-sm text-red-500">{error}</p>}

              {/* BUY/SELL só para ações/cripto */}
              {selectedCategory !== 'fixed' && (
                <div className="flex gap-2">
                  {(['BUY', 'SELL'] as const).map(op => (
                    <button key={op} type="button" onClick={() => setForm(f => ({ ...f, operation: op }))}
                      className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${form.operation === op ? op === 'BUY' ? 'bg-green-600 text-white' : 'bg-red-500 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>
                      {op === 'BUY' ? 'Compra' : 'Venda'}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Nome / Ticker */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-zinc-500">
                    {selectedCategory === 'fixed' ? 'Nome do investimento' : selectedCategory === 'stock' ? 'Ticker (B3)' : 'Símbolo'}
                  </label>
                  <div className="relative">
                    <input
                      className={`w-full rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 ${tickerError ? 'border-red-300' : ''}`}
                      placeholder={selectedCategory === 'fixed' ? 'ex: Cofrinho Inter' : selectedCategory === 'stock' ? 'ex: PETR4, MXRF11' : 'ex: BTC, ETH, SOL'}
                      value={form.ticker}
                      onChange={e => setForm(f => ({ ...f, ticker: e.target.value }))}
                    />
                    {fetchingPrice && <span className="absolute right-3 top-2.5 text-xs text-zinc-500">buscando...</span>}
                  </div>
                  {tickerError && <p className="text-xs text-red-500 mt-1">{tickerError}</p>}
                </div>

                {/* Quantidade — só ações/cripto */}
                {selectedCategory !== 'fixed' && (
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-zinc-500">Quantidade</label>
                    <input type="number" step="any"
                      className="rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                      placeholder="ex: 10" value={form.quantity}
                      onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} />
                  </div>
                )}

                {/* Valor / Preço */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-zinc-500">
                    {selectedCategory === 'fixed' ? 'Valor investido (R$)' : 'Preço unitário (R$)'}
                  </label>
                  <input type="number" step="0.01"
                    className="rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                    placeholder={fetchingPrice ? 'Buscando...' : selectedCategory === 'fixed' ? 'ex: 325.00' : 'ex: 32.50'}
                    value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                </div>
              </div>

              <button type="submit" disabled={addFixedMutation.isPending || fetchingPrice}
                className={`self-start rounded-lg px-5 py-2 text-sm font-medium text-white disabled:opacity-50 transition-colors ${selectedCategory === 'fixed' || form.operation === 'BUY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'}`}>
                {isPendingFixed ? 'Registrando...' : selectedCategory === 'fixed' ? 'Registrar investimento' : form.operation === 'BUY' ? 'Registrar compra' : 'Registrar venda'}
              </button>
            </form>
          )}
        </div>

        {/* Tabela — Ações e Cripto */}
        {(isLoading || assets.length > 0) && (
          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">Ações e Cripto</p>
              <div className="flex gap-2">
                <button
                  disabled={!selectedAssetId}
                  onClick={() => { const a = assets.find(a => a.id === selectedAssetId); if (a) { setEditAsset(a); setSelectedAssetId(null) } }}
                  className="rounded-lg border px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >Editar</button>
                <button
                  disabled={!selectedAssetId || deleteAssetMutation.isPending}
                  onClick={() => { if (selectedAssetId) { deleteAssetMutation.mutate(selectedAssetId); setSelectedAssetId(null) } }}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >Remover</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-zinc-50 text-left text-xs text-zinc-500 uppercase tracking-wider">
                    <SortHeader label="Ticker" sortKey="ticker" />
                    <SortHeader label="Tipo" sortKey="type" />
                    <th className="px-4 py-3">Qtd</th>
                    <th className="px-4 py-3">Preço médio</th>
                    <th className="px-4 py-3">Cotação atual</th>
                    <SortHeader label="Valor total" sortKey="currentValue" />
                    <SortHeader label="P&L" sortKey="returnPct" />
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr><td colSpan={7} className="px-4 py-6 text-center text-zinc-500">Carregando...</td></tr>
                  )}
                  {!isLoading && assets.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-6 text-center text-zinc-500">Nenhum ativo cadastrado.</td></tr>
                  )}
                  {assets.map(asset => {
                    const positive = asset.returnPct >= 0
                    const selected = selectedAssetId === asset.id
                    return (
                      <tr
                        key={asset.id}
                        onClick={() => setSelectedAssetId(id => id === asset.id ? null : asset.id)}
                        className={`border-b last:border-0 cursor-pointer transition-colors ${selected ? 'bg-blue-50' : 'hover:bg-zinc-50'}`}
                      >
                        <td className="px-4 py-3">
                          <button
                            onClick={e => { e.stopPropagation(); setAboutItem({ kind: 'asset', data: asset }) }}
                            className="font-medium text-zinc-900 hover:underline underline-offset-2 transition-colors"
                          >
                            {asset.ticker}
                          </button>
                        </td>
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
          </div>
        )}

        {/* Tabela — Renda Fixa */}
        {(isLoading || fixedLots.length > 0) && (
          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">Renda Fixa</p>
              <div className="flex gap-2">
                <button
                  disabled={!selectedFixedId}
                  onClick={() => { const l = fixedLots.find(l => l.id === selectedFixedId); if (l) { setEditFixed(l); setSelectedFixedId(null) } }}
                  className="rounded-lg border px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >Editar</button>
                <button
                  disabled={!selectedFixedId || deleteFixedMutation.isPending}
                  onClick={() => { if (selectedFixedId) { deleteFixedMutation.mutate(selectedFixedId); setSelectedFixedId(null) } }}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >Remover</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-zinc-50 text-left text-xs text-zinc-500 uppercase tracking-wider">
                    <th className="px-4 py-3">Nome</th>
                    <th className="px-4 py-3">Tipo</th>
                    <th className="px-4 py-3">Valor investido</th>
                    <th className="px-4 py-3">Valor atual</th>
                    <th className="px-4 py-3">Rentabilidade</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr><td colSpan={5} className="px-4 py-6 text-center text-zinc-500">Carregando...</td></tr>
                  )}
                  {!isLoading && fixedLots.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-6 text-center text-zinc-500">Nenhum investimento cadastrado.</td></tr>
                  )}
                  {fixedLots.map(lot => {
                    const positive = lot.returnPct >= 0
                    const isTesouro = lot.subType === 'tesouro'
                    const selected = selectedFixedId === lot.id
                    return (
                      <tr
                        key={lot.id}
                        onClick={() => setSelectedFixedId(id => id === lot.id ? null : lot.id)}
                        className={`border-b last:border-0 cursor-pointer transition-colors ${selected ? 'bg-blue-50' : 'hover:bg-zinc-50'}`}
                      >
                        <td className="px-4 py-3">
                          <button
                            onClick={e => { e.stopPropagation(); setAboutItem({ kind: 'fixed', data: lot }) }}
                            className="font-medium text-zinc-900 hover:underline underline-offset-2 transition-colors text-left"
                          >
                            {lot.name}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-zinc-500">{isTesouro ? 'Tesouro Direto' : 'CDB / LCI / LCA'}</td>
                        <td className="px-4 py-3 text-zinc-700">{formatBRL(lot.investedValue)}</td>
                        <td className="px-4 py-3 text-zinc-700">{formatBRL(lot.currentValue)}</td>
                        <td className="px-4 py-3 font-medium">
                          <span className={positive ? 'text-green-600' : 'text-red-500'}>
                            {positive ? '+' : ''}{lot.returnPct.toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
