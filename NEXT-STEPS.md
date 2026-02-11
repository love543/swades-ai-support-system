# ✅ Installation Complete!

All npm packages have been successfully installed. Here's what to do next:

## 🔑 Step 1: Add Your Groq API Key

Edit `apps\backend\.env` and add your Groq API key:

```env
DATABASE_URL="postgresql://localhost:5432/swades_support"
GROQ_API_KEY="gsk_YOUR_ACTUAL_GROQ_KEY_HERE"
PORT=3000
```

Get your free Groq API key from: https://console.groq.com

## 💾 Step 2: Setup PostgreSQL Database

```powershell
# Create the database
createdb swades_support

# Or if using psql:
psql -U postgres -c "CREATE DATABASE swades_support;"
```

## 📊 Step 3: Setup Database Schema & Seed Data

```powershell
# From project root, go to database package
cd packages\database

# Push schema to database
npx drizzle-kit push

# Seed sample data (5 orders, 5 invoices, 3 refunds)
npx tsx src\seed.ts
```

## 🚀 Step 4: Run the Application

Open **2 separate PowerShell terminals**:

**Terminal 1 - Backend:**
```powershell
cd apps\backend
npx tsx watch src\index.ts
```
✅ Backend will start at http://localhost:3000

**Terminal 2 - Frontend:**
```powershell
cd apps\frontend
npm run dev
```
✅ Frontend will start at http://localhost:5173

## 🎉 Step 5: Open and Test!

1. **Open your browser:** http://localhost:5173

2. **Try these queries:**
   - "Where is my order ORD-2024-002?"
   - "Show me invoice INV-2024-003"  
   - "Check refund status REF-2024-001"
   - "I need help with my account"

3. **Watch the magic:**
   - Router agent classifies your query
   - Delegates to the right specialized agent
   - Agent uses tools to query database
   - Streaming AI response appears
   - See reasoning in collapsible section

## 🎨 What You'll Experience

- **Beautiful dark UI** with purple-blue gradients
- **Glassmorphism effects** on all panels
- **Smooth animations** as messages appear
- **Typing indicator** with bouncing dots
- **Agent badges** showing which AI handled your query
- **Real-time streaming** responses from Groq AI

## 🔧 Troubleshooting

**Port already in use?**
```powershell
npx kill-port 3000
npx kill-port 5173
```

**Database connection error?**
- Make sure PostgreSQL is running
- Verify `DATABASE_URL` in `.env` matches your database

**Groq API error?**
- Check your API key is correct
- Make sure you have API credits available

## 📝 Next Steps

- Explore the conversation history sidebar
- Try different types of queries
- Watch the agent routing in action
- Check the collapsible reasoning sections

**Have fun with your AI support system!** 🚀✨
