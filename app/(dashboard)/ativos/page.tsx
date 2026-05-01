import { AssetManager } from '@/components/asset-manager'
import { TransactionList } from '@/components/transaction-list'

export default function AtivosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
          <span className="text-green-600">Ativos</span>
        </h1>
        <p className="text-sm font-medium text-zinc-700 mt-1">Gerencie os ativos da sua carteira</p>
      </div>
      <AssetManager />
      <TransactionList />
    </div>
  )
}
