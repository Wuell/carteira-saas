import { PortfolioCards } from '@/components/portfolio-cards'
import { AllocationChart } from '@/components/allocation-chart'
import { AssetTable } from '@/components/asset-table'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Visão geral da sua carteira</p>
      </div>
      <PortfolioCards />
      <AllocationChart />
      <AssetTable />
    </div>
  )
}
