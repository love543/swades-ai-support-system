# Order & Billing Agent Debugging Guide

## Quick Diagnostic Steps

### 1. Check Backend Terminal
Look at the terminal running `npx tsx watch src\index.ts` and check for:
- Any error messages when you send an order/billing question
- Database connection errors
- Tool execution errors

### 2. Test Order Agent
Send this exact message in the chat:
```
Where is my order ORD-2024-002?
```

**Expected behavior:**
- Router should detect "order" intent
- Order agent should activate (you'll see cyan/neon color in UI)
- Agent should fetch order details from database
- Response should include order status, items, tracking info

### 3. Test Billing Agent  
Send this exact message:
```
What's the status of invoice INV-2024-001?
```

**Expected behavior:**
- Router should detect "billing" intent
- Billing agent should activate (you'll see magenta color in UI)
- Agent should fetch invoice details from database
- Response should include amount, status, due date

### 4. Verify Database Has Data
Run this command in a new terminal:
```powershell
cd packages\database
npx tsx src\seed.ts
```

This will re-seed the database with test data including:
- 5 orders (ORD-2024-001 through ORD-2024-005)
- 5 invoices (INV-2024-001 through INV-2024-005)
- 3 refunds (REF-2024-001 through REF-2024-003)

### 5. Common Issues

**Issue:** "Agent not responding at all"
- Check backend terminal for errors
- Verify Groq API key is valid in `.env`
- Restart backend: Ctrl+C in backend terminal, then `npx tsx watch src\index.ts`

**Issue:** "Always routes to support agent"
- Router might not be detecting keywords
- Try being more explicit: "I want to check ORDER status for ORD-2024-002"

**Issue:** "Agent responds but returns 'Order not found'"
- Database not seeded
- Run seed command above
- Check DATABASE_URL in `.env` is correct

**Issue:** "Database connection error"
- Verify PostgreSQL is running
- Check password in `.env` DATABASE_URL
- Current format: `postgresql://postgres:Love%40123@localhost:5432/swades_support`

## Agent Code Status

✅ **Order Agent**: Properly configured with tools:
- `fetchOrderDetails` - Gets full order info
- `checkDeliveryStatus` - Gets tracking/delivery info

✅ **Billing Agent**: Properly configured with tools:
- `getInvoiceDetails` - Gets invoice info
- `checkRefundStatus` - Gets refund status

✅ **Router**: Routes based on keywords in user message

## Next Steps
1. Follow diagnostic steps above
2. Note any error messages from backend terminal
3. Share what you see when you send an order/billing question
