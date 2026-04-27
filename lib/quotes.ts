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

  // Se não está no mapa, tenta buscar pelo símbolo na CoinGecko
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

  // Tenta como cripto (símbolo ou ID do CoinGecko)
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

  // Se está no mapa de criptos, não tenta Brapi mesmo que a CoinGecko falhe
  if (isKnownCrypto) return null

  // Tenta como ação BR na Brapi
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

type AssetOpts = {
  avgPrice?: number
  startDate?: Date | null
  fixedRate?: number | null
}

export async function getQuote(ticker: string, type: string, opts?: AssetOpts): Promise<number> {
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

    if (type === 'fixed') {
      const { avgPrice, startDate, fixedRate } = opts ?? {}
      if (!avgPrice) return 0
      // Sem taxa fixa, retorna o valor original (ex: renda fixa sem juros definidos)
      if (!fixedRate || !startDate) return avgPrice
      const years = (Date.now() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 365)
      return avgPrice * Math.pow(1 + fixedRate / 100, years)
    }
  } catch {
    return 0
  }

  return 0
}
