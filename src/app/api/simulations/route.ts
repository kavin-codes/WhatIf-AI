import { NextResponse } from 'next/server'
import { readSimulations } from '@/lib/persistence'

export async function GET() {
  try {
    const sims = await readSimulations()
    return NextResponse.json({ status: 'ok', simulations: sims })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 })
  }
}
