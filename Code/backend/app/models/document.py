import uuid
from sqlalchemy import Column, ForeignKey, String, Text, LargeBinary, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base

class Document(Base):
    __tablename__ = "uploaded_documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    file_name = Column(String(255))
    file_type = Column(String(50))
    file_data = Column(LargeBinary)
    parsed_data = Column(JSONB)
    ai_summary = Column(Text)
    upload_status = Column(String(20), default='processing')
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="documents")

# Add relationship to User model
from .user import User
User.documents = relationship("Document", back_populates="user", cascade="all, delete-orphan")
