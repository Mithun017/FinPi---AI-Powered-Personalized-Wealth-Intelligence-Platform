import uuid
from sqlalchemy import Column, ForeignKey, String, Numeric, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    investment_id = Column(UUID(as_uuid=True), ForeignKey("investments.id"), index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    transaction_type = Column(String(20)) # buy, sell, dividend
    amount = Column(Numeric(12, 2))
    units = Column(Numeric(12, 4))
    nav = Column(Numeric(10, 4))
    status = Column(String(20), default='completed')
    transaction_date = Column(DateTime(timezone=True), server_default=func.now())

    investment = relationship("Investment", back_populates="transactions")
    user = relationship("User")
