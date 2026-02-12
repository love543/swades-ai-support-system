# Swades AI Customer Support System

> **Premium AI-powered customer support with multi-agent architecture**

##  Features

-  **Multi-Agent AI System** - Router delegates to Support, Order, and Billing agents
-  **Groq-Powered** - Ultra-fast AI responses with Llama 3.3 70B
-  **Premium UI** - Glassmorphism, gradients, smooth animations
-  **Context-Aware** - Maintains conversation history for personalized responses
-  **AI Tools** - Agents query real database for orders, invoices, refunds
-  **Streaming Responses** - Real-time AI output as it's generated
-  **Type-Safe** - End-to-end TypeScript with Hono RPC ready

##  Quick Start

**Full setup guide:** See [QUICKSTART.md](./QUICKSTART.md)

```bash
npm install  

GROQ_API_KEY="your-key"

createdb swades_support
cd packages/database && npx drizzle-kit push && npx tsx src/seed.ts

cd apps/backend && npx tsx watch src/index.ts
cd apps/frontend && npm run dev
```

**Open:** http://localhost:5173

## 📋 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Framer Motion |
| Backend | Hono.dev + Vercel AI SDK |
| Database | PostgreSQL + Drizzle ORM |
| AI | Groq (Llama 3.3 70B) |
| Monorepo | Turborepo |

##  Try It

Ask the AI:
- "Where is my order ORD-2024-002?"
- "Show invoice INV-2024-003"
- "Check refund status REF-2024-001"

Watch the router classify your query and delegate to the right agent! Each agent has specialized tools to query the database.

## 📁 Project Structure

```
├── apps/
│   ├── backend/       # Hono API with multi-agent system
│   └── frontend/      # React UI with premium animations
├── packages/
│   ├── database/      # Drizzle ORM schema & seeds
│   └── shared-types/  # Shared TypeScript types
```

##  UI Highlights

- Dark mode with purple-blue gradients
- Glassmorphism chat interface
- Animated typing indicators
- Agent badges with color coding
- Collapsible AI reasoning display
- Smooth Framer Motion animations


---

