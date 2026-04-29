import { DividendManager } from '@/components/dividend-manager'

export default function ProventosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Proventos</h1>
        <p className="text-sm text-zinc-500 mt-1">Dividendos e rendimentos recebidos</p>
      </div>
      <DividendManager />
    </div>
  )
}
