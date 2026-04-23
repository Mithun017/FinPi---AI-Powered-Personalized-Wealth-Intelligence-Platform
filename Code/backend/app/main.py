from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .api.routes import auth, portfolio, goals, ai_advisor, market_data, alerts, documents

app = FastAPI(
    title="FinPi API",
    description="AI-Powered Personalized Wealth Intelligence Platform API",
    version="0.1.0"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["Portfolio"])
app.include_router(goals.router, prefix="/api/goals", tags=["Goals"])
app.include_router(ai_advisor.router, prefix="/api/ai", tags=["AI Advisor"])
app.include_router(market_data.router, prefix="/api/market", tags=["Market Data"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["Alerts"])
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])

@app.get("/")
async def root():
    return {"message": "Welcome to FinPi AI API", "status": "online"}
