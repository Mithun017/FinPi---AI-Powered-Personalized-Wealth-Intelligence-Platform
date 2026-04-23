@echo off
TITLE FinPi — AI-Powered Personalized Wealth Intelligence Platform
color 03
cd /d "%~dp0"

echo ============================================================
echo      FinPi π — AI Wealth Intelligence Platform
echo      Launching your personalized wealth journey...
echo ============================================================

:: Start Backend in a new window
echo Starting Backend (FastAPI)...
start "FinPi Backend" cmd /k "cd Code\backend && uvicorn app.main:app --reload --port 8000"

:: Start Frontend in a new window
echo Starting Frontend (React)...
start "FinPi Frontend" cmd /k "cd Code\frontend && npm start"

:: Wait for a few seconds to let servers start
timeout /t 5 /nobreak > nul

:: Open Frontend in the browser
echo Opening FinPi in your browser...
start http://localhost:3000

echo ============================================================
echo  Backend: http://localhost:8000/docs
echo  Frontend: http://localhost:3000
echo ============================================================

pause
