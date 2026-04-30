'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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

const TYPE_LABELS: Record<string, string> = {
  stock_br: 'Ação BR',
  fii:      'FII',
  crypto:   'Cripto',
  stock_us: 'Ação EUA',
}

const SUBTYPE_SUGGESTIONS: Record<string, string[]> = {
  fii:      ['Tijolo', 'Papel', 'Híbrido', 'FOF', 'Desenvolvimento'],
  stock_br: ['Banco', 'Energia', 'Varejo', 'Saúde', 'Agro', 'Telecom', 'Indústria'],
  stock_us: ['Tech', 'Finance', 'Health', 'Consumer', 'Energy', 'Industrials'],
  crypto:   ['Layer 1', 'Layer 2', 'DeFi', 'Stablecoin', 'NFT/Gaming', 'Infraestrutura'],
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function patchAsset(data: {
  id: string
  assetSubType: string
  sector: string
  notes: string
}) {
  const res = await fetch('/api/assets', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Falha ao salvar')
  return res.json()
}

export function AssetAboutModal({ asset, onClose }: { asset: AssetRow; onClose: () => void }) {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(false)
  const [subType, setSubType] = useState(asset.assetSubType ?? '')
  const [sector, setSector] = useState(asset.sector ?? '')
  const [notes, setNotes] = useState(asset.notes ?? '')

  const { mutate, isPending } = useMutation({
    mutationFn: patchAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      setEditing(false)
    },
  })

  function handleSave() {
    mutate({ id: asset.id, assetSubType: subType, sector, notes })
  }

  const positive = asset.returnPct >= 0
  const suggestions = SUBTYPE_SUGGESTIONS[asset.type] ?? []

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <p className="text-lg font-bold text-zinc-900">{asset.ticker}</p>
            <p className="text-xs text-zinc-500">{TYPE_LABELS[asset.type] ?? asset.type}</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-3 divide-x border-b">
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-zinc-500">Valor atual</p>
            <p className="text-sm font-semibold text-zinc-900">{formatBRL(asset.currentValue)}</p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-zinc-500">Preço médio</p>
            <p className="text-sm font-semibold text-zinc-900">{formatBRL(asset.avgPrice)}</p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-zinc-500">P&L</p>
            <p className={`text-sm font-semibold ${positive ? 'text-green-600' : 'text-red-500'}`}>
              {positive ? '+' : ''}{asset.returnPct.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Sobre */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-zinc-900">Sobre</p>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Editar
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-zinc-600 block mb-1">Sub-tipo</label>
                <input
                  value={subType}
                  onChange={e => setSubType(e.target.value)}
                  placeholder={`ex: ${suggestions[0] ?? 'Tijolo'}`}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {suggestions.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {suggestions.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSubType(s)}
                        className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-600 block mb-1">Ramo / Setor</label>
                <input
                  value={sector}
                  onChange={e => setSector(e.target.value)}
                  placeholder="ex: Shoppings, Logística, Bancos..."
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-600 block mb-1">Observações</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Notas pessoais sobre este ativo..."
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors"
                >
                  {isPending ? 'Salvando...' : 'Salvar'}
                </button>
                <button
                  onClick={() => {
                    setSubType(asset.assetSubType ?? '')
                    setSector(asset.sector ?? '')
                    setNotes(asset.notes ?? '')
                    setEditing(false)
                  }}
                  className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <InfoRow label="Sub-tipo" value={subType} placeholder="Não informado" />
              <InfoRow label="Ramo / Setor" value={sector} placeholder="Não informado" />
              <InfoRow label="Observações" value={notes} placeholder="Sem observações" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value, placeholder }: { label: string; value: string; placeholder: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <p className={`text-sm mt-0.5 ${value ? 'text-zinc-900' : 'text-zinc-400 italic'}`}>
        {value || placeholder}
      </p>
    </div>
  )
}
