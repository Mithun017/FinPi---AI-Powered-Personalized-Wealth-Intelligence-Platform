from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.core.db import get_db
from app.models.financials import Goal
from app.schemas.financials import GoalCreate, Goal as GoalSchema
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[GoalSchema])
def read_goals(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    return db.query(Goal).filter(Goal.user_id == current_user.id).all()

@router.post("/", response_model=GoalSchema)
def create_goal(
    *,
    db: Session = Depends(get_db),
    goal_in: GoalCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    goal = Goal(
        **goal_in.dict(),
        user_id=current_user.id
    )
    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal
