import { DividendManager } from '@/components/dividend-manager'

export default function ProventosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
          <span className="text-green-600">Proventos</span>
        </h1>
        <p className="text-sm font-medium text-zinc-700 mt-1">Dividendos e rendimentos recebidos</p>
      </div>
      <DividendManager />
    </div>
  )
}
