from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .user import Base
import enum

class TransactionType(str, enum.Enum):
    INCOME = "income"
    EXPENSE = "expense"
    TRANSFER = "transfer"

class TransactionCategory(str, enum.Enum):
    FOOD = "food"
    RENT = "rent"
    SHOPPING = "shopping"
    ENTERTAINMENT = "entertainment"
    INVESTMENT = "investment"
    SALARY = "salary"
    OTHER = "other"

class UserProfile(Base):
    __tablename__ = "user_profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    risk_score = Column(Integer, default=50) # 0-100
    wealth_score = Column(Integer, default=0)
    onboarding_completed = Column(Boolean, default=False)
    user = relationship("User", back_ref="profile")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float, nullable=False)
    type = Column(String, default=TransactionType.EXPENSE)
    category = Column(String, default=TransactionCategory.OTHER)
    description = Column(String)
    date = Column(DateTime(timezone=True), server_default=func.now())
    user = relationship("User")

class Portfolio(Base):
    __tablename__ = "portfolios"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, default="Main Portfolio")
    total_value = Column(Float, default=0.0)
    user = relationship("User")

class Investment(Base):
    __tablename__ = "investments"
    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"))
    symbol = Column(String, nullable=False)
    asset_type = Column(String) # Stocks, Crypto, MF
    quantity = Column(Float, nullable=False)
    average_price = Column(Float, nullable=False)
    current_price = Column(Float)
    portfolio = relationship("Portfolio")

class Goal(Base):
    __tablename__ = "goals"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    target_amount = Column(Float, nullable=False)
    current_amount = Column(Float, default=0.0)
    deadline = Column(DateTime)
    user = relationship("User")

class AIInsight(Base):
    __tablename__ = "ai_insights"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    insight = Column(Text, nullable=False)
    confidence = Column(Float)
    risk_level = Column(String) # low, medium, high
    suggestion = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user = relationship("User")

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    message = Column(Text)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user = relationship("User")
