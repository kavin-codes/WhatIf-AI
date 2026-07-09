export interface SimulationScenario {
  id: string
  businessId: string
  description: string
  createdAt: Date
  results: SimulationResults
  confidence: number
}

export interface SimulationResults {
  revenueImpact: number
  expenseImpact: number
  profitImpact: number
  cashFlowImpact: number
  inventoryImpact: number
  growthImpact: number
  riskLevel: 'low' | 'medium' | 'high'
  customerRetention: number
  recommendation: string
}