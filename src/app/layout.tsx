import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WhatIfAI - Digital Twin for Small Businesses',
  description: 'Simulate business decisions before they happen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {children}
      </body>
    </html>
  )
}