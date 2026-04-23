import uuid
from sqlalchemy import Column, ForeignKey, String, Text, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base

class Alert(Base):
    __tablename__ = "smart_alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    alert_type = Column(String(50))
    title = Column(String(200))
    message = Column(Text)
    condition_data = Column(JSONB)
    is_read = Column(Boolean, default=False)
    is_triggered = Column(Boolean, default=False)
    triggered_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="alerts")

# Add relationship to User model
from .user import User
User.alerts = relationship("Alert", back_populates="user", cascade="all, delete-orphan")
