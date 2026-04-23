import uuid
from sqlalchemy import Column, ForeignKey, String, Numeric, Boolean, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base

class Investment(Base):
    __tablename__ = "investments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    portfolio_id = Column(UUID(as_uuid=True), ForeignKey("portfolios.id", ondelete="CASCADE"), index=True)
    fund_name = Column(String(255), nullable=False)
    fund_category = Column(String(50))
    isin = Column(String(20))
    units = Column(Numeric(12, 4))
    nav_at_purchase = Column(Numeric(10, 4))
    current_nav = Column(Numeric(10, 4))
    invested_amount = Column(Numeric(12, 2))
    current_value = Column(Numeric(12, 2))
    sip_amount = Column(Numeric(10, 2))
    sip_date = Column(Integer)
    is_sip_active = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    portfolio = relationship("Portfolio", back_populates="investments")
    transactions = relationship("Transaction", back_populates="investment")
