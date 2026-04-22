import sys
import os
from datetime import datetime, timedelta

# Add the backend directory to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from sqlalchemy.orm import Session
from app.core.db import SessionLocal, engine
from app.models.user import User, Base
from app.models.financials import Transaction, Portfolio, Goal, AIInsight, UserProfile
from app.core.security import get_password_hash

def seed_data():
    db = SessionLocal()
    
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    # Check if demo user exists
    demo_user = db.query(User).filter(User.email == "demo@finpi.ai").first()
    if demo_user:
        print("Demo data already exists.")
        return

    # 1. Create Demo User
    print("Creating demo user...")
    user = User(
        email="demo@finpi.ai",
        hashed_password=get_password_hash("demo123"),
        full_name="Mithun Demo"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # 2. Create User Profile
    profile = UserProfile(user_id=user.id, risk_score=75, wealth_score=82, onboarding_completed=True)
    db.add(profile)

    # 3. Create Transactions
    print("Seeding transactions...")
    transactions = [
        Transaction(user_id=user.id, amount=5000, type="income", category="salary", description="Monthly Salary"),
        Transaction(user_id=user.id, amount=1200, type="expense", category="rent", description="Apartment Rent"),
        Transaction(user_id=user.id, amount=150, type="expense", category="food", description="Groceries"),
        Transaction(user_id=user.id, amount=80, type="expense", category="entertainment", description="Netflix & Spotify"),
        Transaction(user_id=user.id, amount=500, type="expense", category="shopping", description="Amazon Shopping"),
    ]
    db.add_all(transactions)

    # 4. Create Portfolio
    print("Seeding portfolio...")
    portfolio = Portfolio(user_id=user.id, name="Growth Portfolio", total_value=124500)
    db.add(portfolio)
    db.commit()

    # 5. Create Goals
    print("Seeding goals...")
    goals = [
        Goal(user_id=user.id, title="Emergency Fund", target_amount=20000, current_amount=15000, deadline=datetime.now() + timedelta(days=200)),
        Goal(user_id=user.id, title="New Car", target_amount=35000, current_amount=12000, deadline=datetime.now() + timedelta(days=500)),
    ]
    db.add_all(goals)

    # 6. Create AI Insights
    print("Seeding AI insights...")
    insight = AIInsight(
        user_id=user.id,
        insight="You are spending 15% more on shopping this month compared to your average.",
        confidence=0.85,
        risk_level="medium",
        suggestion="Consider setting a $400 limit on shopping to reach your 'New Car' goal 2 months faster."
    )
    db.add(insight)

    db.commit()
    print("✅ Demo data seeded successfully!")
    db.close()

if __name__ == "__main__":
    seed_data()
