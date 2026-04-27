import { AssetManager } from '@/components/asset-manager'

export default function AtivosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Ativos</h1>
        <p className="text-sm text-zinc-500 mt-1">Gerencie os ativos da sua carteira</p>
      </div>
      <AssetManager />
    </div>
  )
}
