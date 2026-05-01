import { PortfolioCards } from '@/components/portfolio-cards'
import { AllocationChart } from '@/components/allocation-chart'
import { AssetTable } from '@/components/asset-table'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Dashboard</h1>
        <p className="text-sm font-medium text-zinc-700 mt-1">
          Visão <span className="text-green-600">geral</span> da sua carteira
        </p>
      </div>
      <PortfolioCards />
      <AllocationChart />
      <AssetTable />
    </div>
  )
}
