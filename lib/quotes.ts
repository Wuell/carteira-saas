export async function detectTickerType(ticker: string): Promise<{ type: string; price: number } | null> {
  try {
    const cryptoRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ticker.toLowerCase()}&vs_currencies=brl`
    )
    if (cryptoRes.ok) {
      const data = await cryptoRes.json()
      const price = data[ticker.toLowerCase()]?.brl
      if (price) return { type: 'crypto', price }
    }
  } catch {}

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
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ticker.toLowerCase()}&vs_currencies=brl`,
        { next: { revalidate: 30 } }
      )
      if (!res.ok) return 0
      const data = await res.json()
      return data[ticker.toLowerCase()]?.brl ?? 0
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
  } catch {
    return 0
  }

  return 0
}
