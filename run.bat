@echo off
echo 🚀 Starting FinPi — AI-Powered Wealth Intelligence Platform...

:: Start Backend
echo ⚙️ Starting Backend (FastAPI)...
start cmd /k "cd Code\backend && pip install -r requirements.txt && uvicorn app.main:app --reload"

:: Start Frontend
echo 🌐 Starting Frontend (React)...
start cmd /k "cd Code\frontend && npm install && npm run dev"

:: Wait for 3 seconds
timeout /t 3 /nobreak > nul

:: Open Browser
echo 🌍 Opening FinPi in your browser...
start http://localhost:5173

echo ✅ All services are starting up!
pause
