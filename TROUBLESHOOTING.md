# Troubleshooting Guide

## Issue: Chat is Not Responding

If you're not getting AI responses, check the following:

### 1. Check Browser Console

1. Press **F12** to open Developer Tools
2. Click **Console** tab
3. Look for any **red error messages**
4. Common errors:
   - Network errors (backend not running)
   - CORS errors
   - JavaScript errors

### 2. Check Backend Terminal

Look at the terminal running `npx tsx watch src\index.ts`:
- **Look for error messages** in red
- **Check if it says** "Server running on http://localhost:3000"
- Common issues:
  - Port 3000 already in use
  - Database connection errors
  - Groq API key errors

### 3. Check Frontend Terminal

Look at the terminal running `npm run dev`:
- Should say "Local: http://localhost:5173"
- No red errors

### 4. Test Backend Directly

Open a new PowerShell and run:
```powershell
curl http://localhost:3000/api/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### 5. Common Issues

**No Response from AI:**
- ✅ Check Groq API key is valid in `.env`
- ✅ Check backend terminal for errors
- ✅ Check browser console for errors

**Frontend won't load:**
- Kill and restart: `npx kill-port 5173`
- Clear browser cache
- Hard refresh: Ctrl+Shift+R

**Backend errors:**
- Database connection: Check password in `.env`
- Port in use: `npx kill-port 3000`
- Missing packages: `npm install` in backend folder

### 6. Quick Restart

```powershell
npx kill-port 3000
npx kill-port 5173

cd apps\backend
npx tsx watch src\index.ts

cd apps\frontend
npm run dev
```

## Need Help?

Please provide:
1. Screenshot of browser console (F12)
2. Backend terminal output (errors)
3. What you see when you send a message
