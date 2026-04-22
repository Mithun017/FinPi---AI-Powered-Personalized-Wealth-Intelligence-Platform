from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

# Transaction Schemas
class TransactionBase(BaseModel):
    amount: float
    type: str
    category: str
    description: Optional[str] = None
    date: Optional[datetime] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True

# Portfolio Schemas
class PortfolioBase(BaseModel):
    name: str
    total_value: float = 0.0

class PortfolioCreate(PortfolioBase):
    pass

class Portfolio(PortfolioBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True

# Goal Schemas
class GoalBase(BaseModel):
    title: str
    target_amount: float
    current_amount: float = 0.0
    deadline: Optional[datetime] = None

class GoalCreate(GoalBase):
    pass

class Goal(GoalBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True

# AI Insight Schemas
class AIInsightBase(BaseModel):
    insight: str
    confidence: float
    risk_level: str
    suggestion: str

class AIInsight(AIInsightBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True
