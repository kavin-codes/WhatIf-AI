import { NextResponse } from 'next/server'
import { saveSimulation } from '@/lib/persistence'

type Business = {
  name?: string
  industry?: string
  employees?: number
  createdAt?: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const business: Business = body.business || {}

    const noKeys = !process.env.OPENAI_API_KEY || !process.env.LAMATIC_API_KEY
    const forceMock = !!body.mock

    if (noKeys || forceMock) {
      const now = Date.now()
      const baseRevenue = 50000 + (business.employees || 1) * 8000
      const revenueForecast = [30, 90, 180, 365].map((days, i) => ({
        days,
        revenue: Math.round(baseRevenue * (1 + 0.02 * (i + 1)) + i * 1000),
      }))

      const recommendations = [
        'Increase weekly promotions by 1%',
        'Optimize staffing on weekdays to reduce labor costs by 5%',
        'Negotiate supplier discounts to reduce COGS by 3%',
      ]

      const response = {
        status: 'ok',
        mock: true,
        generatedAt: new Date(now).toISOString(),
        summary: `Mock simulation for ${business.name || 'Untitled Business'}`,
        revenueForecast,
        riskScore: Math.round(30 + Math.random() * 40),
        recommendations,
        business,
      }

      // persist result (best-effort)
      try {
        await saveSimulation({ ...response, id: `sim_${now}` })
      } catch (e) {
        // ignore persistence errors
      }

      return NextResponse.json(response)
    }

    return NextResponse.json({
      status: 'error',
      message:
        'Real simulation not implemented. Set OPENAI_API_KEY and LAMATIC_API_KEY and implement the agent call in this route.',
    }, { status: 501 })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 })
  }
}
