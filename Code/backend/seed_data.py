import asyncio
import uuid
from datetime import datetime, timedelta
from decimal import Decimal
from sqlalchemy.future import select
from app.core.database import AsyncSessionLocal, Base, engine
from app.core.security import get_password_hash
from app.models.user import User
from app.models.portfolio import Portfolio
from app.models.investment import Investment
from app.models.goal import Goal
from app.models.transaction import Transaction
from app.models.alert import Alert
from app.models.misc import AIConversation, MarketSentiment, Watchlist

async def seed_data():
    async with AsyncSessionLocal() as session:
        # 1. Create Demo User
        demo_email = "demo@finpi.ai"
        result = await session.execute(select(User).filter(User.email == demo_email))
        db_user = result.scalars().first()
        
        if not db_user:
            db_user = User(
                email=demo_email,
                hashed_password=get_password_hash("Demo@1234"),
                full_name="Demo User",
                phone="9876543210",
                risk_profile="moderate",
                kyc_status="completed"
            )
            session.add(db_user)
            await session.commit()
            await session.refresh(db_user)
            print(f"Created demo user: {demo_email}")
        else:
            print(f"Demo user already exists: {demo_email}")

        # 2. Create Portfolio
        result = await session.execute(select(Portfolio).filter(Portfolio.user_id == db_user.id))
        portfolio = result.scalars().first()
        
        if not portfolio:
            portfolio = Portfolio(
                user_id=db_user.id,
                total_invested=Decimal("450000.00"),
                current_value=Decimal("500000.00"),
                total_returns=Decimal("50000.00"),
                xirr=Decimal("0.1245"),
                last_synced=datetime.utcnow()
            )
            session.add(portfolio)
            await session.commit()
            await session.refresh(portfolio)
            print("Created demo portfolio")

        # 3. Create Investments
        investments_data = [
            {"name": "Parag Parikh Flexi Cap Fund", "cat": "Equity", "isin": "INF123456789", "amt": 200000, "nav": 65.4, "units": 3058.10},
            {"name": "HDFC Mid-Cap Opportunities", "cat": "Equity", "isin": "INF987654321", "amt": 100000, "nav": 142.2, "units": 703.23},
            {"name": "Nippon India Small Cap", "cat": "Equity", "isin": "INF456789123", "amt": 100000, "nav": 135.5, "units": 738.00},
            {"name": "SBI Bluechip Fund", "cat": "Equity", "isin": "INF321654987", "amt": 50000, "nav": 82.1, "units": 609.01},
        ]
        
        for inv in investments_data:
            result = await session.execute(select(Investment).filter(Investment.fund_name == inv["name"], Investment.portfolio_id == portfolio.id))
            if not result.scalars().first():
                db_inv = Investment(
                    portfolio_id=portfolio.id,
                    fund_name=inv["name"],
                    fund_category=inv["cat"],
                    isin=inv["isin"],
                    invested_amount=Decimal(str(inv["amt"])),
                    current_value=Decimal(str(inv["amt"] * 1.1)), # Simulate 10% gain
                    nav_at_purchase=Decimal(str(inv["nav"] * 0.9)),
                    current_nav=Decimal(str(inv["nav"])),
                    units=Decimal(str(inv["units"])),
                    is_sip_active=True,
                    sip_amount=Decimal("5000.00"),
                    sip_date=5
                )
                session.add(db_inv)
        
        await session.commit()
        print("Seeded investments")

        # 4. Create Goals
        goals_data = [
            {"name": "Retirement", "type": "Retirement", "target": 50000000, "date": datetime.now() + timedelta(days=365*20)},
            {"name": "New Home", "type": "House", "target": 10000000, "date": datetime.now() + timedelta(days=365*5)},
            {"name": "Europe Trip", "type": "Travel", "target": 500000, "date": datetime.now() + timedelta(days=365*1)},
        ]
        
        for g in goals_data:
            result = await session.execute(select(Goal).filter(Goal.goal_name == g["name"], Goal.user_id == db_user.id))
            if not result.scalars().first():
                db_goal = Goal(
                    user_id=db_user.id,
                    goal_name=g["name"],
                    goal_type=g["type"],
                    target_amount=Decimal(str(g["target"])),
                    target_date=g["date"].date(),
                    current_savings=Decimal("0.00"),
                    monthly_sip=Decimal("15000.00")
                )
                session.add(db_goal)
        
        await session.commit()
        print("Seeded goals")

        # 5. Create AI Conversations
        result = await session.execute(select(AIConversation).filter(AIConversation.user_id == db_user.id))
        if not result.scalars().first():
            conv = AIConversation(
                user_id=db_user.id,
                title="Portfolio Analysis",
                messages=[
                    {"role": "user", "content": "How is my portfolio doing?"},
                    {"role": "ai", "content": "Your portfolio is doing well with a 12.45% XIRR. You are slightly overweight in Small Caps."}
                ]
            )
            session.add(conv)
            await session.commit()
            print("Seeded AI conversation")

        # 6. Market Sentiment
        sentiments = [
            {"symbol": "NIFTY50", "score": 0.75, "label": "Bullish"},
            {"symbol": "SENSEX", "score": 0.70, "label": "Bullish"},
            {"symbol": "GOLD", "score": 0.45, "label": "Neutral"},
        ]
        for s in sentiments:
            result = await session.execute(select(MarketSentiment).filter(MarketSentiment.symbol == s["symbol"]))
            if not result.scalars().first():
                db_s = MarketSentiment(
                    symbol=s["symbol"],
                    sentiment_score=Decimal(str(s["score"])),
                    sentiment_label=s["label"],
                    confidence=Decimal("0.85"),
                    gemini_analysis="Positive outlook based on recent economic data."
                )
                session.add(db_s)
        
        await session.commit()
        print("Seeded market sentiment")

if __name__ == "__main__":
    asyncio.run(seed_data())
