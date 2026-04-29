'use client'

import { useQuery } from '@tanstack/react-query'

type Transaction = {
  id: string
  ticker: string
  type: string
  operation: string
  quantity: number
  price: number
  date: string
}

const TYPE_LABELS: Record<string, string> = {
  stock_br: 'Ação BR',
  crypto: 'Cripto',
  stock_us: 'Ação EUA',
  fixed: 'Renda Fixa',
}

async function fetchTransactions(): Promise<Transaction[]> {
  const res = await fetch('/api/transactions')
  if (!res.ok) throw new Error('Falha ao buscar transações')
  return res.json()
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function TransactionList() {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  })

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b">
        <p className="text-sm font-semibold text-zinc-900">Histórico de transações</p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-zinc-50 text-left text-xs text-zinc-500 uppercase tracking-wider">
            <th className="px-4 py-3">Data</th>
            <th className="px-4 py-3">Operação</th>
            <th className="px-4 py-3">Ticker</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Qtd</th>
            <th className="px-4 py-3">Preço unit.</th>
            <th className="px-4 py-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr><td colSpan={7} className="px-4 py-6 text-center text-zinc-500">Carregando...</td></tr>
          )}
          {!isLoading && transactions.length === 0 && (
            <tr><td colSpan={7} className="px-4 py-6 text-center text-zinc-500">Nenhuma transação registrada.</td></tr>
          )}
          {transactions.map(tx => (
            <tr key={tx.id} className="border-b last:border-0 hover:bg-zinc-50 transition-colors">
              <td className="px-4 py-3 text-zinc-500 text-xs">{formatDate(tx.date)}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  tx.operation === 'BUY'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {tx.operation === 'BUY' ? 'Compra' : 'Venda'}
                </span>
              </td>
              <td className="px-4 py-3 font-medium text-zinc-900">{tx.ticker}</td>
              <td className="px-4 py-3 text-zinc-500">{TYPE_LABELS[tx.type] ?? tx.type}</td>
              <td className="px-4 py-3 text-zinc-700">{tx.quantity}</td>
              <td className="px-4 py-3 text-zinc-700">{formatBRL(tx.price)}</td>
              <td className="px-4 py-3 font-medium text-zinc-900">{formatBRL(tx.price * tx.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
