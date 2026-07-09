export type AgentType =
  | 'business-data'
  | 'digital-twin'
  | 'simulation'
  | 'forecast'
  | 'strategy'
  | 'report'

export interface AgentRequest {
  type: AgentType
  data: unknown
  timestamp: Date
}

export interface AgentResponse {
  success: boolean
  data?: unknown
  error?: string
  timestamp: Date
}