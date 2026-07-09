'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="flex items-center justify-between px-8 py-6 backdrop-blur-md bg-black/30">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold">
            W
          </div>
          <h1 className="text-xl font-bold">WhatIfAI</h1>
        </div>
        <Link href="/setup">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
            Get Started
          </Button>
        </Link>
      </nav>

      <section className="max-w-6xl mx-auto px-8 py-24 text-center">
        <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Simulate Before You Execute
        </h2>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          WhatIfAI creates an AI-powered Digital Twin of your business. Simulate decisions and predict outcomes before implementing them.
        </p>
        <Link href="/setup">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600">
            Start Your Business Twin Now
          </Button>
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: '🔮', title: 'AI-Powered Simulation', desc: 'Simulate complex business scenarios' },
          { icon: '📊', title: 'Real-Time Analytics', desc: 'Get instant predictions on metrics' },
          { icon: '💡', title: 'Smart Recommendations', desc: 'AI-powered strategy recommendations' },
        ].map((feature, i) => (
          <Card key={i} className="bg-white/5 backdrop-blur border-white/10 p-6">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-slate-300">{feature.desc}</p>
          </Card>
        ))}
      </section>
    </div>
  )
}