import type { FixedIncomeLot } from '@prisma/client'

const CRYPTO_SYMBOL_MAP: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  BNB: 'binancecoin',
  XRP: 'ripple',
  ADA: 'cardano',
  AVAX: 'avalanche-2',
  DOGE: 'dogecoin',
  DOT: 'polkadot',
  MATIC: 'matic-network',
  LINK: 'chainlink',
  UNI: 'uniswap',
  LTC: 'litecoin',
  SHIB: 'shiba-inu',
  ATOM: 'cosmos',
  FIL: 'filecoin',
  NEAR: 'near',
  APT: 'aptos',
  ARB: 'arbitrum',
  OP: 'optimism',
  TON: 'the-open-network',
  SUI: 'sui',
  PEPE: 'pepe',
  WIF: 'dogwifcoin',
  TRX: 'tron',
  ALGO: 'algorand',
  VET: 'vechain',
  HBAR: 'hedera-hashgraph',
  ICP: 'internet-computer',
  RENDER: 'render-token',
}

async function resolveToGeckoId(symbol: string): Promise<string | null> {
  const upper = symbol.toUpperCase()
  if (CRYPTO_SYMBOL_MAP[upper]) return CRYPTO_SYMBOL_MAP[upper]

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(symbol)}`)
    if (!res.ok) return null
    const data = await res.json()
    const coin = data.coins?.find((c: { symbol: string }) => c.symbol.toUpperCase() === upper)
    return coin?.id ?? null
  } catch {
    return null
  }
}

export async function detectTickerType(ticker: string): Promise<{ type: string; price: number } | null> {
  const isKnownCrypto = !!CRYPTO_SYMBOL_MAP[ticker.toUpperCase()]

  try {
    const geckoId = await resolveToGeckoId(ticker)
    if (geckoId) {
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=brl`)
      if (res.ok) {
        const data = await res.json()
        const price = data[geckoId]?.brl
        if (price) return { type: 'crypto', price }
      }
    }
  } catch {}

  if (isKnownCrypto) return null

  try {
    const token = process.env.BRAPI_TOKEN
    const url = `https://brapi.dev/api/quote/${ticker.toUpperCase()}${token ? `?token=${token}` : ''}`
    const stockRes = await fetch(url)
    if (stockRes.ok) {
      const data = await stockRes.json()
      const price = data.results?.[0]?.regularMarketPrice
      if (price) return { type: 'stock_br', price }
    }
  } catch {}

  return null
}

export async function getQuote(ticker: string, type: string): Promise<number> {
  try {
    if (type === 'crypto') {
      const geckoId = await resolveToGeckoId(ticker)
      if (!geckoId) return 0
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=brl`,
        { next: { revalidate: 30 } }
      )
      if (!res.ok) return 0
      const data = await res.json()
      return data[geckoId]?.brl ?? 0
    }

    if (type === 'stock_br') {
      const token = process.env.BRAPI_TOKEN
      const url = `https://brapi.dev/api/quote/${ticker.toUpperCase()}${token ? `?token=${token}` : ''}`
      const res = await fetch(url, { next: { revalidate: 30 } })
      if (!res.ok) return 0
      const data = await res.json()
      if (data.error) return 0
      return data.results?.[0]?.regularMarketPrice ?? 0
    }
  } catch {}

  return 0
}

// Conta dias úteis (seg-sex) entre duas datas, sem considerar feriados.
function countWeekdays(start: Date, end: Date): number {
  const msPerDay = 86400000
  const totalDays = Math.max(0, Math.floor((end.getTime() - start.getTime()) / msPerDay))
  const fullWeeks = Math.floor(totalDays / 7)
  const remainder = totalDays % 7
  const startDay = start.getDay()
  let extra = 0
  for (let i = 0; i < remainder; i++) {
    const d = (startDay + i) % 7
    if (d !== 0 && d !== 6) extra++
  }
  return fullWeeks * 5 + extra
}

export function getFixedLotCurrentValue(lot: FixedIncomeLot): number {
  if (lot.subType === 'tesouro') {
    if (!lot.annualRate || !lot.startDate) return lot.investedValue
    const now = new Date()
    const maturity = lot.maturityDate ? new Date(lot.maturityDate) : null
    // Trava o rendimento na data de vencimento se já passou
    const effectiveEnd = maturity && maturity < now ? maturity : now
    const weekdays = countWeekdays(new Date(lot.startDate), effectiveEnd)
    return lot.investedValue * Math.pow(1 + lot.annualRate / 100, weekdays / 252)
  }

  if (lot.subType === 'cdb') {
    // Usuário informa a rentabilidade acumulada atual lida no app do banco
    if (lot.accumulatedReturn == null) return lot.investedValue
    return lot.investedValue * (1 + lot.accumulatedReturn / 100)
  }

  return lot.investedValue
}
