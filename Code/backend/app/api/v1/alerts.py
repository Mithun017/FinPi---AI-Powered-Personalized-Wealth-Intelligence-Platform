from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.core.db import get_db
from app.models.financials import Alert
from app.models.user import User
from pydantic import BaseModel

router = APIRouter()

class AlertSchema(BaseModel):
    id: int
    title: str
    message: str
    is_read: bool
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[AlertSchema])
def read_alerts(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    return db.query(Alert).filter(Alert.user_id == current_user.id).all()

@router.post("/{id}/read")
def mark_alert_read(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    alert = db.query(Alert).filter(Alert.id == id, Alert.user_id == current_user.id).first()
    if alert:
        alert.is_read = True
        db.commit()
    return {"success": True}
