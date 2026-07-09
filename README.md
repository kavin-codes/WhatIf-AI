# 🚀 WhatIfAI – Digital Twin for Small Businesses

An AI-powered business simulation platform that creates virtual Digital Twins of small businesses. Instead of just showing reports, **WhatIfAI** simulates future business decisions before they happen.

**Built for the Lamatic AgentKit Challenge**

## 🎯 Problem Statement

Small business owners lack a way to simulate business decisions before implementing them. WhatIfAI solves this by creating an AI-powered Digital Twin that simulates future outcomes.

## 🌟 Key Features

- 🔮 AI-Powered Simulation Engine
- 📊 Real-Time Analytics & Forecasting
- 💡 Smart Strategy Recommendations
- ⚠️ Risk Assessment & Mitigation
- 📈 Multi-timeframe Forecasts (30d, 90d, 6m, 1y)
- 📄 Comprehensive Report Generation

## 🏗️ Tech Stack

- **Frontend**: Next.js 14+, React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express (Next.js API Routes)
- **AI**: Lamatic AgentKit, OpenAI-compatible LLM
- **Database**: SQLite
- **Visualization**: Recharts

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- OpenAI API key
- Lamatic API key

### Installation

```bash
# Clone repository
git clone https://github.com/kavin-codes/WhatIf-AI.git
cd WhatIf-AI

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# Initialize database
npm run db:init

# Start development server
npm run dev
```

Open `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                 # Utilities, agents, engines
├── types/               # TypeScript types
└── hooks/               # React hooks
```

## 🤖 AI Agents

1. **Business Data Agent** - Validates business information
2. **Digital Twin Agent** - Creates AI business model
3. **Simulation Agent** - Runs what-if scenarios
4. **Forecast Agent** - Predicts future outcomes
5. **Strategy Agent** - Recommends optimal strategies
6. **Report Agent** - Generates comprehensive reports

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Agent Documentation](./docs/AGENTS.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel deploy --prod
```

### Docker
```bash
docker build -t whatifai .
docker run -p 3000:3000 whatifai
```

## 📄 License

MIT License - see [LICENSE](./LICENSE)

## 🏆 Built for Lamatic AgentKit Challenge

This project demonstrates:
- ✅ Multiple AI agents in orchestration
- ✅ Advanced Lamatic Flows
- ✅ Production-ready TypeScript
- ✅ Modern responsive UI
- ✅ Real-world business problem solving

---

**WhatIfAI - Simulate Before You Execute** 🚀