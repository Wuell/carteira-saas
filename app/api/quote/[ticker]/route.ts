import { NextRequest, NextResponse } from 'next/server'
import { getQuote, detectTickerType } from '@/lib/quotes'

export async function GET(req: NextRequest, { params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params
  const type = req.nextUrl.searchParams.get('type')

  if (!type) {
    const result = await detectTickerType(ticker)
    if (!result) {
      return NextResponse.json({ error: `Ticker "${ticker}" não encontrado. Tente o ID do CoinGecko para cripto (ex: bitcoin) ou o código da B3 para ações (ex: PETR4).` }, { status: 404 })
    }
    return NextResponse.json({ price: result.price, type: result.type })
  }

  const price = await getQuote(ticker, type)
  if (!price) {
    return NextResponse.json({ error: `Ticker "${ticker}" não encontrado.` }, { status: 404 })
  }

  return NextResponse.json({ price, type })
}
