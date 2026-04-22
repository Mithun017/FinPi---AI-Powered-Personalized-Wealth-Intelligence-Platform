import openai
from app.core.config import settings
from typing import Dict, Any

class AIFinancialBrain:
    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY
        if self.api_key:
            openai.api_key = self.api_key

    async def generate_insight(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyzes user financial data and generates an insight.
        """
        # In a real scenario, we would prompt OpenAI with summarized user data.
        # For now, we return a structured mock response as per the requirement.
        
        prompt = f"Analyze these finances: {user_data}"
        
        # Mock logic
        return {
            "insight": "Your current savings rate is 22%, which is excellent. However, your cash reserves are higher than necessary for your risk profile.",
            "confidence": 0.92,
            "risk_level": "low",
            "suggestion": "Move $5,000 from your savings account to your 'Growth Portfolio' to optimize long-term returns."
        }

    async def chat_cfo(self, query: str, context: Dict[str, Any]) -> str:
        """
        Conversational AI CFO interface.
        """
        if not self.api_key:
            return f"I'm your AI CFO. I've received your query: '{query}'. (OpenAI API Key not set, using demo mode)."
        
        try:
            response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a professional AI CFO and financial advisor. Be concise and data-driven."},
                    {"role": "user", "content": f"Context: {context}\n\nUser Query: {query}"}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error connecting to AI brain: {str(e)}"

ai_brain = AIFinancialBrain()
