from typing import List, Dict, Any

class BehaviorIntelligence:
    def analyze_spending(self, transactions: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Analyzes transactions to detect overspending or risky behavior.
        """
        # Heuristic-based analysis (could be replaced with a classifier)
        categories = {}
        for tx in transactions:
            cat = tx.get('category', 'other')
            categories[cat] = categories.get(cat, 0) + tx.get('amount', 0)

        # Detect if shopping is more than 30% of total expenses
        total_expense = sum(categories.values())
        shopping_ratio = (categories.get('shopping', 0) / total_expense) if total_expense > 0 else 0

        if shopping_ratio > 0.3:
            return {
                "detected": True,
                "pattern": "High Discretionary Spending",
                "insight": f"Shopping accounts for {shopping_ratio*100:.1f}% of your expenses.",
                "risk_level": "medium"
            }

        return {
            "detected": False,
            "pattern": "Healthy Spending",
            "insight": "Your spending is well-balanced across categories.",
            "risk_level": "low"
        }

behavior_intelligence = BehaviorIntelligence()
