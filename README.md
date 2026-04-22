# 🚀 FinPi — AI-Powered Personalized Wealth Intelligence Platform

FinPi is a state-of-the-art, AI-driven financial intelligence platform designed to act as your personal AI CFO. It goes beyond simple transaction tracking by providing behavioral insights, predictive wealth forecasting, and personalized financial strategies.

## ✨ Key Features

- **🧠 AI CFO (Chat Assistant)**: A conversational AI that understands your finances and provides real-time guidance.
- **📊 Wealth Intelligence Dashboard**: A premium, glassmorphism-based overview of your assets, liabilities, and net worth.
- **📈 Portfolio Engine**: Advanced tracking for stocks, mutual funds, and crypto with ROI and risk analysis.
- **🔮 Predictive Engine**: AI-powered forecasting of your financial future based on current trends.
- **🛡️ Behavior Intelligence**: Detects spending patterns and provides proactive nudges to optimize your wealth.
- **🎯 Goal Planning**: Set, track, and achieve financial milestones with AI-backed roadmaps.

## 🛠️ Tech Stack

- **Frontend**: React.js, Zustand (State Management), Framer Motion & GSAP (Animations), Lucide React (Icons).
- **Backend**: FastAPI (Python), SQLAlchemy (ORM), Pydantic (Validation).
- **Database**: PostgreSQL (Relational Data).
- **AI Layer**: OpenAI API, Scikit-learn (ML), TensorFlow/PyTorch (Deep Learning).

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- PostgreSQL

### Automated Setup
Simply run the provided one-click script:
```bash
./run.bat
```

### Manual Setup

#### 1. Backend
```bash
cd Code/backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### 2. Frontend
```bash
cd Code/frontend
npm install
npm run dev
```

## 📂 Project Structure

- `frontend/`: React application and design system.
- `backend/`: FastAPI modular architecture and security layer.
- `ai_models/`: Core AI logic and predictive models.
- `database/`: Schema definitions and migrations.
- `scripts/`: Utility scripts for seeding and maintenance.

## 🔐 Security
- Standardized JWT Authentication.
- Secure password hashing with BCrypt.
- API Rate Limiting and Data Validation.

---
🔥 **FinPi** — Empowering your financial future with intelligence.
