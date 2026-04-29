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
      const result = data.results?.[0]
      if (result?.regularMarketPrice) {
        const isFii = ticker.toUpperCase().endsWith('11')
        return { type: isFii ? 'fii' : 'stock_br', price: result.regularMarketPrice }
      }
    }
  } catch {}

  return null
}

export async function getBatchStockQuotes(tickers: string[]): Promise<Record<string, number>> {
  if (tickers.length === 0) return {}
  try {
    const token = process.env.BRAPI_TOKEN
    const url = `https://brapi.dev/api/quote/${tickers.join(',')}${token ? `?token=${token}` : ''}`
    const res = await fetch(url)
    if (!res.ok) return {}
    const data = await res.json()
    const result: Record<string, number> = {}
    for (const r of (data.results ?? [])) {
      if (r.symbol && r.regularMarketPrice) {
        result[r.symbol.toUpperCase()] = r.regularMarketPrice
      }
    }
    return result
  } catch {
    return {}
  }
}

export async function getBatchCryptoQuotes(tickers: string[]): Promise<Record<string, number>> {
  if (tickers.length === 0) return {}
  try {
    const geckoIds = tickers
      .map(t => ({ ticker: t.toUpperCase(), id: CRYPTO_SYMBOL_MAP[t.toUpperCase()] }))
      .filter(x => x.id)
    if (geckoIds.length === 0) return {}
    const ids = geckoIds.map(x => x.id).join(',')
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=brl`)
    if (!res.ok) return {}
    const data = await res.json()
    const result: Record<string, number> = {}
    for (const { ticker, id } of geckoIds) {
      if (data[id]?.brl) result[ticker] = data[id].brl
    }
    return result
  } catch {
    return {}
  }
}
