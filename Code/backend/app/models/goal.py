import uuid
from sqlalchemy import Column, ForeignKey, String, Numeric, DateTime, Date, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base

class Goal(Base):
    __tablename__ = "goals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    goal_type = Column(String(50))
    goal_name = Column(String(100))
    target_amount = Column(Numeric(15, 2))
    target_date = Column(Date)
    current_savings = Column(Numeric(15, 2), default=0)
    monthly_sip = Column(Numeric(10, 2))
    expected_return_rate = Column(Numeric(5, 2), default=12.0)
    priority = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="goals")

# Add relationship to User model
from .user import User
User.goals = relationship("Goal", back_populates="user", cascade="all, delete-orphan")
