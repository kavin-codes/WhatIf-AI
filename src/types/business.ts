export interface BusinessMetrics {
  monthlyRevenue: number
  monthlyExpenses: number
  profitMargin: number
  employees: number
  marketingBudget: number
  inventoryCost: number
  supplierCost: number
  customerGrowthRate: number
}

export interface Business {
  id: string
  userId: string
  name: string
  type: BusinessType
  industry: string
  location?: string
  createdAt: Date
  updatedAt: Date
  metrics: BusinessMetrics
  twinId?: string
}

export type BusinessType =
  | 'retail'
  | 'restaurant'
  | 'ecommerce'
  | 'services'
  | 'saas'
  | 'manufacturing'
  | 'consulting'
  | 'other'