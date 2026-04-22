from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.core.db import get_db
from app.models.financials import Transaction
from app.schemas.financials import TransactionCreate, Transaction as TransactionSchema
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[TransactionSchema])
def read_transactions(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    transactions = db.query(Transaction).filter(Transaction.user_id == current_user.id).offset(skip).limit(limit).all()
    return transactions

@router.post("/", response_model=TransactionSchema)
def create_transaction(
    *,
    db: Session = Depends(get_db),
    transaction_in: TransactionCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    transaction = Transaction(
        **transaction_in.dict(),
        user_id=current_user.id
    )
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction

@router.delete("/{id}", response_model=TransactionSchema)
def delete_transaction(
    *,
    db: Session = Depends(get_db),
    id: int,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    transaction = db.query(Transaction).filter(Transaction.id == id, Transaction.user_id == current_user.id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    db.delete(transaction)
    db.commit()
    return transaction
