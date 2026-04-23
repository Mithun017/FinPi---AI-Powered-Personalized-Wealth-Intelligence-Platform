@echo off
TITLE FinPi — AI-Powered Personalized Wealth Intelligence Platform
color 03
cd /d "%~dp0"
echo ============================================================
echo      FinPi π — AI Wealth Intelligence Platform
echo      Starting up your personalized wealth journey...
echo ============================================================

echo [1/6] Checking Python...
python --version || (echo Python not found! Please install Python 3.11+ && pause && exit)

echo [2/6] Checking Node.js...
node --version || (echo Node.js not found! Please install Node.js 18+ && pause && exit)

echo [3/6] Installing Python dependencies...
cd backend
pip install -r requirements.txt

echo [4/6] Running database migrations...
alembic upgrade head

echo [5/6] Seeding demo data...
python seed_data.py

echo [6/6] Installing frontend dependencies...
cd ../frontend
npm install

echo ============================================================
echo  Starting Backend  (FastAPI)  →  http://localhost:8000
echo  Starting Frontend (React)    →  http://localhost:3000
echo  API Docs (Swagger)           →  http://localhost:8000/docs
echo  Demo Login: demo@finpi.ai  /  Demo@1234
echo ============================================================

start "FinPi Backend" cmd /k "cd ../backend && uvicorn app.main:app --reload --port 8000"
timeout /t 3
start "FinPi Frontend" cmd /k "cd ../frontend && npm start"

echo Both servers are starting. Open http://localhost:3000 in your browser.
pause
