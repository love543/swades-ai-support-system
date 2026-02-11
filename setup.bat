@echo off
echo 🚀 Swades AI Support - Setup Script
echo.

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    exit /b 1
)

echo.
echo Step 2: Installing workspace dependencies...
call npm install --workspaces
if %errorlevel% neq 0 (
    echo ❌ Failed to install workspace dependencies
    exit /b 1
)

echo.
echo Step 3: Checking environment file...
if not exist "apps\backend\.env" (
    echo Creating .env file from example...
    copy apps\backend\.env.example apps\backend\.env
    echo.
    echo ⚠️  IMPORTANT: Please edit apps\backend\.env and add your Groq API key!
    echo.
) else (
    echo ✅ .env file already exists
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Edit apps\backend\.env and add your GROQ_API_KEY
echo 2. Create PostgreSQL database: createdb swades_support
echo 3. Run: npm run db:push
echo 4. Run: npm run db:seed
echo 5. Run: npm run dev
echo.
pause
