import { AssetManager } from '@/components/asset-manager'
import { TransactionList } from '@/components/transaction-list'

export default function TransacoesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Transações</h1>
        <p className="text-sm text-zinc-500 mt-1">Registre compras e vendas da sua carteira</p>
      </div>
      <AssetManager />
      <TransactionList />
    </div>
  )
}
