import uuid
from sqlalchemy import Column, ForeignKey, String, DateTime, Numeric, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base

class AIConversation(Base):
    __tablename__ = "ai_conversations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    messages = Column(JSONB, nullable=False, server_default='[]')
    title = Column(String(200))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="conversations")

class MarketSentiment(Base):
    __tablename__ = "market_sentiment"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    symbol = Column(String(50), index=True)
    sentiment_score = Column(Numeric(4, 2))
    sentiment_label = Column(String(20))
    confidence = Column(Numeric(4, 2))
    source_headlines = Column(JSONB)
    gemini_analysis = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Watchlist(Base):
    __tablename__ = "watchlist"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    symbol = Column(String(50))
    fund_name = Column(String(255))
    target_nav = Column(Numeric(10, 4))
    notes = Column(Text)
    added_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="watchlist")

# Update User model relationships
from .user import User
User.conversations = relationship("AIConversation", back_populates="user", cascade="all, delete-orphan")
User.watchlist = relationship("Watchlist", back_populates="user", cascade="all, delete-orphan")
