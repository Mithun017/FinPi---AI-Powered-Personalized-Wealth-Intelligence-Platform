from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.core.db import get_db
from app.services.ai_service import ai_brain
from ai_models.forecaster import wealth_forecaster
from ai_models.behavior import behavior_intelligence
from app.models.user import User
from pydantic import BaseModel

router = APIRouter()

class ChatQuery(BaseModel):
    query: str

@router.post("/chat")
async def chat_with_cfo(
    query_in: ChatQuery,
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    # Prepare context for AI (in a real app, fetch recent transactions/portfolios)
    context = {
        "user_name": current_user.full_name,
        "recent_activity": "User recently added a $1200 rent transaction."
    }
    response = await ai_brain.chat_cfo(query_in.query, context)
    return {"success": True, "data": {"response": response}, "error": None}

@router.get("/insights")
async def get_ai_insights(
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    # Fetch user data for analysis
    user_data = {"net_worth": 124500, "monthly_income": 8200}
    insight = await ai_brain.generate_insight(user_data)
    return {"success": True, "data": insight, "error": None}
@router.get("/forecast")
async def get_wealth_forecast(
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    # Mock historical data
    historical_net_worth = [100000, 105000, 108000, 112000, 118000, 124500]
    forecast = wealth_forecaster.forecast_growth(historical_net_worth)
    return {"success": True, "data": {"forecast": forecast}, "error": None}

@router.get("/behavior")
async def analyze_behavior(
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    # Mock transactions
    transactions = [
        {"category": "shopping", "amount": 500},
        {"category": "rent", "amount": 1200},
        {"category": "food", "amount": 150}
    ]
    analysis = behavior_intelligence.analyze_spending(transactions)
    return {"success": True, "data": analysis, "error": None}
