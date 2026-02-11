@echo off
echo Setting up database schema and seed data...
echo.

set /p DB_PASSWORD="Enter your PostgreSQL password: "

set DATABASE_URL=postgresql://postgres:%DB_PASSWORD%@localhost:5432/swades_support

echo.
echo Pushing schema to database...
cd packages\database
npx drizzle-kit push

if %errorlevel% neq 0 (
    echo.
    echo ❌ Schema push failed. Check your password and database connection.
    pause
    exit /b 1
)

echo.
echo ✅ Schema created successfully!
echo.
echo Seeding database with sample data...
npx tsx src\seed.ts

if %errorlevel% neq 0 (
    echo.
    echo ❌ Seeding failed.
    pause
    exit /b 1
)

echo.
echo ✅ Database setup complete!
echo.
echo Next steps:
echo 1. Add your GROQ_API_KEY to apps\backend\.env
echo 2. Run: cd apps\backend ^&^& npx tsx watch src\index.ts
echo 3. Run: cd apps\frontend ^&^& npm run dev
echo.
pause
