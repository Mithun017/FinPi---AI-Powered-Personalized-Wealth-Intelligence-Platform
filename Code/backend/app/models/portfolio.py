import uuid
from sqlalchemy import Column, ForeignKey, Numeric, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base

class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    total_invested = Column(Numeric(15, 2), default=0)
    current_value = Column(Numeric(15, 2), default=0)
    total_returns = Column(Numeric(15, 2), default=0)
    xirr = Column(Numeric(6, 4))
    last_synced = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="portfolios")
    investments = relationship("Investment", back_populates="portfolio", cascade="all, delete-orphan")

# Add relationship to User model as well
from .user import User
User.portfolios = relationship("Portfolio", back_populates="user", cascade="all, delete-orphan")
