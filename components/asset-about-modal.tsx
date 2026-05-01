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

type FixedLotRow = {
  id: string
  name: string
  subType: string
  investedValue: number
  currentValue: number
  returnPct: number
  notes?: string | null
}

type ModalItem =
  | { kind: 'asset'; data: AssetRow }
  | { kind: 'fixed'; data: FixedLotRow }

const TYPE_LABELS: Record<string, string> = {
  stock_br: 'Ação BR',
  fii: 'FII',
  crypto: 'Cripto',
  stock_us: 'Ação EUA',
}

type FieldConfig = {
  field1?: { key: 'sector' | 'assetSubType'; label: string; suggestions: string[]; placeholder: string }
  field2?: { key: 'sector' | 'assetSubType'; label: string; suggestions: string[]; placeholder: string }
}

function getFieldConfig(type: string): FieldConfig {
  if (type === 'fii') {
    return {
      field1: { key: 'sector', label: 'Segmento', suggestions: ['Shoppings', 'Logística', 'Lajes Corp.', 'Hospitais', 'Educacional', 'Residencial', 'Agro'], placeholder: 'ex: Shoppings, Logística...' },
      field2: { key: 'assetSubType', label: 'Tipo de Fundo', suggestions: ['Tijolo', 'Papel', 'Híbrido', 'FOF', 'Desenvolvimento'], placeholder: 'ex: Tijolo, Papel...' },
    }
  }
  if (type === 'stock_br' || type === 'stock_us') {
    return {
      field1: { key: 'sector', label: 'Setor', suggestions: ['Energia', 'Financeiro', 'Varejo', 'Saúde', 'Agro', 'Telecom', 'Indústria', 'Consumo'], placeholder: 'ex: Energia, Financeiro...' },
      field2: { key: 'assetSubType', label: 'Segmento', suggestions: ['Novo Mercado', 'Nível 2', 'Nível 1', 'Bovespa Mais'], placeholder: 'ex: Novo Mercado...' },
    }
  }
  return {}
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function patchAsset(data: { id: string; assetSubType: string; sector: string; notes: string }) {
  const res = await fetch('/api/assets', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Falha ao salvar')
  return res.json()
}

async function patchFixed(data: { id: string; notes: string }) {
  const res = await fetch('/api/fixed-income', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Falha ao salvar')
  return res.json()
}

export function AssetAboutModal({ item, onClose }: { item: ModalItem; onClose: () => void }) {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(false)

  const isAsset = item.kind === 'asset'
  const asset = isAsset ? item.data : null
  const fixed = !isAsset ? item.data : null

  const fieldConfig = asset ? getFieldConfig(asset.type) : {}

  const [field1Val, setField1Val] = useState(
    asset ? (fieldConfig.field1?.key === 'sector' ? (asset.sector ?? '') : (asset.assetSubType ?? '')) : ''
  )
  const [field2Val, setField2Val] = useState(
    asset ? (fieldConfig.field2?.key === 'assetSubType' ? (asset.assetSubType ?? '') : (asset.sector ?? '')) : ''
  )
  const [notes, setNotes] = useState(isAsset ? (asset?.notes ?? '') : (fixed?.notes ?? ''))

  const currentValue = isAsset ? asset!.currentValue : fixed!.currentValue
  const investedValue = isAsset ? asset!.investedValue : fixed!.investedValue
  const returnPct = isAsset ? asset!.returnPct : fixed!.returnPct
  const positive = returnPct >= 0

  const { mutate: mutateAsset, isPending: pendingAsset } = useMutation({
    mutationFn: patchAsset,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['portfolio'] }); setEditing(false) },
  })

  const { mutate: mutateFixed, isPending: pendingFixed } = useMutation({
    mutationFn: patchFixed,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['portfolio'] }); setEditing(false) },
  })

  const isPending = pendingAsset || pendingFixed

  function handleSave() {
    if (isAsset && asset) {
      const sectorVal = fieldConfig.field1?.key === 'sector' ? field1Val : field2Val
      const subTypeVal = fieldConfig.field2?.key === 'assetSubType' ? field2Val : field1Val
      mutateAsset({ id: asset.id, assetSubType: subTypeVal, sector: sectorVal, notes })
    } else if (fixed) {
      mutateFixed({ id: fixed.id, notes })
    }
  }

  function handleCancel() {
    if (isAsset && asset) {
      setField1Val(fieldConfig.field1?.key === 'sector' ? (asset.sector ?? '') : (asset.assetSubType ?? ''))
      setField2Val(fieldConfig.field2?.key === 'assetSubType' ? (asset.assetSubType ?? '') : (asset.sector ?? ''))
      setNotes(asset.notes ?? '')
    } else if (fixed) {
      setNotes(fixed.notes ?? '')
    }
    setEditing(false)
  }

  const notesPlaceholder = isAsset && asset
    ? (asset.type === 'crypto'
        ? 'ex: categoria (Layer 1/DeFi), blockchain, caso de uso...'
        : 'Anotações pessoais sobre este ativo...')
    : 'ex: emissor, indexador (CDI/IPCA), data de vencimento...'

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
            <p className="text-lg font-bold text-zinc-900">
              {isAsset ? asset!.ticker : fixed!.name}
            </p>
            <p className="text-xs text-zinc-500">
              {isAsset ? (TYPE_LABELS[asset!.type] ?? asset!.type) : (fixed!.subType === 'tesouro' ? 'Tesouro Direto' : 'CDB / LCI / LCA')}
            </p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 text-xl leading-none">×</button>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-3 divide-x border-b">
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-zinc-500">Valor atual</p>
            <p className="text-sm font-semibold text-zinc-900">{formatBRL(currentValue)}</p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-zinc-500">{isAsset ? 'Preço médio' : 'Investido'}</p>
            <p className="text-sm font-semibold text-zinc-900">
              {isAsset ? formatBRL(asset!.avgPrice) : formatBRL(investedValue)}
            </p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-zinc-500">P&L</p>
            <p className={`text-sm font-semibold ${positive ? 'text-green-600' : 'text-red-500'}`}>
              {positive ? '+' : ''}{returnPct.toFixed(2)}%
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
              {isAsset && fieldConfig.field1 && (
                <div>
                  <label className="text-xs font-medium text-zinc-600 block mb-1">{fieldConfig.field1.label}</label>
                  <input
                    value={field1Val}
                    onChange={e => setField1Val(e.target.value)}
                    placeholder={fieldConfig.field1.placeholder}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {fieldConfig.field1.suggestions.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {fieldConfig.field1.suggestions.map(s => (
                        <button key={s} type="button" onClick={() => setField1Val(s)}
                          className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {isAsset && fieldConfig.field2 && (
                <div>
                  <label className="text-xs font-medium text-zinc-600 block mb-1">{fieldConfig.field2.label}</label>
                  <input
                    value={field2Val}
                    onChange={e => setField2Val(e.target.value)}
                    placeholder={fieldConfig.field2.placeholder}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {fieldConfig.field2.suggestions.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {fieldConfig.field2.suggestions.map(s => (
                        <button key={s} type="button" onClick={() => setField2Val(s)}
                          className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-zinc-600 block mb-1">Descrição</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  placeholder={notesPlaceholder}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button onClick={handleSave} disabled={isPending}
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors">
                  {isPending ? 'Salvando...' : 'Salvar'}
                </button>
                <button onClick={handleCancel}
                  className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {isAsset && fieldConfig.field1 && (
                <InfoRow label={fieldConfig.field1.label} value={field1Val} />
              )}
              {isAsset && fieldConfig.field2 && (
                <InfoRow label={fieldConfig.field2.label} value={field2Val} />
              )}
              <InfoRow label="Descrição" value={notes} placeholder="Sem descrição" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value, placeholder = 'Não informado' }: { label: string; value: string; placeholder?: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <p className={`text-sm mt-0.5 ${value ? 'text-zinc-900' : 'text-zinc-400 italic'}`}>
        {value || placeholder}
      </p>
    </div>
  )
}
