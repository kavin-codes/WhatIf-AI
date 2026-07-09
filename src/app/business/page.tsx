'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

type Business = {
  name: string
  industry: string
  employees?: number
  createdAt?: string
}

type SimulationResult = {
  status: string
  mock?: boolean
  generatedAt?: string
  summary?: string
  revenueForecast?: { days: number; revenue: number }[]
  riskScore?: number
  recommendations?: string[]
  id?: string
}

export default function BusinessPage() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<SimulationResult[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('whatif_business')
      if (raw) setBusiness(JSON.parse(raw))
    } catch (e) {
      setBusiness(null)
    }

    // load history
    fetch('/api/simulations')
      .then((r) => r.json())
      .then((data) => {
        if (data?.status === 'ok') setHistory(data.simulations || [])
      })
      .catch(() => {})
  }, [])

  async function runSimulation() {
    if (!business) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const resp = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business, mock: true }),
      })
      const data: SimulationResult = await resp.json()
      if (!resp.ok) throw new Error((data as any)?.message || 'Simulation failed')
      setResult(data)

      // refresh history
      const h = await fetch('/api/simulations').then((r) => r.json()).catch(() => null)
      if (h?.status === 'ok') setHistory(h.simulations || [])
    } catch (err: any) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <p className="mb-4">No Business Twin found.</p>
          <Link href="/setup" className="underline text-blue-400">Create one now</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-3xl mx-auto bg-white/5 p-6 rounded border border-white/10">
        <h1 className="text-2xl font-bold mb-2">{business.name}</h1>
        <p className="text-slate-300 mb-4">{business.industry}</p>
        <p className="mb-2">Employees: {business.employees ?? '—'}</p>
        <p className="mb-4 text-sm text-slate-400">Created: {business.createdAt ?? '—'}</p>

        <div className="flex gap-3 mb-6">
          <button
            onClick={runSimulation}
            disabled={loading}
            className="rounded-md bg-gradient-to-r from-green-500 to-teal-500 px-3 py-2 disabled:opacity-60"
          >
            {loading ? 'Running...' : 'Run Simulation'}
          </button>
          <Link href="/" className="rounded-md bg-slate-700 px-3 py-2">Back to Home</Link>
          <Link href="/setup" className="rounded-md bg-slate-700 px-3 py-2">Edit</Link>
        </div>

        {error && (
          <div className="mb-4 text-red-400">Error: {error}</div>
        )}

        {result ? (
          <div>
            <h2 className="text-lg font-semibold mb-2">{result.summary}</h2>
            <p className="text-sm text-slate-400 mb-4">Generated: {result.generatedAt} {result.mock ? '(mock)' : ''}</p>

            <div className="mb-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={(result.revenueForecast || []).map((r) => ({ days: r.days, revenue: r.revenue }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="days" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mb-4">
              <h3 className="font-bold">Risk Score</h3>
              <div className="text-xl">{result.riskScore ?? '—'}/100</div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold">Recommendations</h3>
              <ul className="list-disc list-inside">
                {(result.recommendations || []).map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-400">No simulation run yet.</div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Previous Simulations</h3>
          {history.length === 0 ? (
            <div className="text-sm text-slate-400">No previous simulations.</div>
          ) : (
            <ul className="space-y-3">
              {history.slice().reverse().map((h) => (
                <li key={(h as any).id || (h as any).generatedAt} className="p-3 bg-white/3 rounded">
                  <div className="text-sm text-slate-200">{(h as any).summary}</div>
                  <div className="text-xs text-slate-400">{(h as any).generatedAt} {(h as any).mock ? '(mock)' : ''}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
