from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.core.db import get_db
from app.models.financials import Portfolio, Investment
from app.schemas.financials import PortfolioCreate, Portfolio as PortfolioSchema
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[PortfolioSchema])
def read_portfolios(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    return db.query(Portfolio).filter(Portfolio.user_id == current_user.id).all()

@router.post("/", response_model=PortfolioSchema)
def create_portfolio(
    *,
    db: Session = Depends(get_db),
    portfolio_in: PortfolioCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    portfolio = Portfolio(
        **portfolio_in.dict(),
        user_id=current_user.id
    )
    db.add(portfolio)
    db.commit()
    db.refresh(portfolio)
    return portfolio
