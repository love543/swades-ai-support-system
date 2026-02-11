# Swades AI Support - Setup Guide

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18 or higher
- **PostgreSQL** database
- **Groq API Key** (Get from https://console.groq.com)

### Installation Steps

#### 1. Install Dependencies
```bash
npm install

npm install --workspaces
```

#### 2. Setup Environment Variables
```bash
cp apps/backend/.env.example apps/backend/.env

```

#### 3. Setup Database
```bash
createdb swades_support

psql -U postgres -c "CREATE DATABASE swades_support;"

npm run db:generate

npm run db:push

npm run db:seed
```

#### 4. Run Development Servers
```bash
npm run dev
```

This will start:
- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173

## 📁 Project Structure

```
SwadesAI_assign/
├── apps/
│   ├── backend/              # Hono.dev API server
│   │   ├── src/
│   │   │   ├── agents/       # Multi-agent system
│   │   │   │   ├── router.ts          # Router agent
│   │   │   │   ├── support-agent.ts   # Support agent
│   │   │   │   ├── order-agent.ts     # Order agent
│   │   │   │   └── billing-agent.ts   # Billing agent
│   │   │   ├── routes/       # API endpoints
│   │   │   ├── services/     # Business logic
│   │   │   ├── middleware/   # Error handling, rate limiting
│   │   │   └── index.ts      # Server entry point
│   │   └── .env              # Environment variables
│   │
│   └── frontend/             # React + Vite UI
│       ├── src/
│       │   ├── components/   # UI components
│       │   │   ├── ChatInterface.tsx
│       │   │   ├── ConversationList.tsx
│       │   │   ├── MessageBubble.tsx
│       │   │   └── TypingIndicator.tsx
│       │   ├── lib/          # API client
│       │   └── index.css     # Design system
│       └── vite.config.ts
│
├── packages/
│   ├── database/             # Drizzle ORM
│   │   ├── src/
│   │   │   ├── schema.ts     # Database schema
│   │   │   ├── client.ts     # DB connection
│   │   │   └── seed.ts       # Sample data
│   │   └── drizzle.config.ts
│   │
│   └── shared-types/         # TypeScript types
│       └── src/index.ts
│
└── turbo.json               # Turborepo config
```

## 🎨 Features

### Multi-Agent System
- **Router Agent**: Analyzes queries and delegates to specialized agents
- **Support Agent**: General support, FAQs, troubleshooting
- **Order Agent**: Order tracking, delivery status, modifications
- **Billing Agent**: Payments, refunds, invoices

### AI Capabilities
- Real-time streaming responses
- Conversation context management (last 10 messages)
- Agent reasoning display
- Tool calling for database queries

### UI/UX
- Premium dark mode design with gradients
- Glassmorphism effects
- Smooth Framer Motion animations
- Typing indicators
- Message bubbles with agent badges
- Conversation history

### Technical
- Type-safe API with Hono RPC
- Rate limiting (60 req/min)
- Error handling middleware
- PostgreSQL with Drizzle ORM
- Monorepo with Turborepo

## 🧪 Testing

Try these sample queries:

**Support Queries:**
- "How do I reset my password?"
- "What are your business hours?"

**Order Queries:**
- "Where is my order ORD-2024-002?"
- "Track order ORD-2024-001"

**Billing Queries:**
- "Show me invoice INV-2024-003"
- "What's the status of refund REF-2024-001?"

## 🛠️ Development

### Available Scripts

```bash
npm run dev          
npm run build        
npm run db:generate 
npm run db:push     
npm run db:seed      
```

### Database Commands

```bash
# View database in Drizzle Studio
cd packages/database
npx drizzle-kit studio
```

## 🚨 Troubleshooting

### Port Already in Use
```bash
npx kill-port 3000

npx kill-port 5173
```

### Database Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL in apps/backend/.env
- Create database if it doesn't exist

### Groq API Error
- Verify your API key is correct
- Check API usage limits at https://console.groq.com

## 📦 Deployment

### Backend (Railway/Render)
1. Set environment variables
2. Add build command: `npm run build`
3. Start command: `cd apps/backend && npm start`

### Frontend (Vercel/Netlify)
1. Build command: `cd apps/frontend && npm run build`
2. Output directory: `apps/frontend/dist`
3. Update API_BASE_URL in api-client.ts

## 🎯 Bonus Features Implemented

✅ Hono RPC + Monorepo Setup
✅ Rate limiting (60 req/min)
✅ Streaming responses
✅ Conversation context management
✅ AI reasoning display
✅ Premium UI with animations
✅ Glassmorphism design
✅ Agent typing indicators

## 📝 Notes

- The system uses Groq's Llama 3.3 70B model for ultra-fast inference
- Sample data includes 5 orders, 5 invoices, 3 refunds
- All timestamps are in ISO format
- Messages persist in PostgreSQL

## 🤝 Support

For issues or questions, check:
- Backend logs: Console output from backend server
- Frontend logs: Browser DevTools console
- Database: Use Drizzle Studio to inspect data
