import google.generativeai as genai
import asyncio
from ..core.config import settings

class GeminiAdvisorService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        # Consolidating to Gemini 2.0 Flash as requested
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    async def get_portfolio_analysis(self, portfolio_data):
        prompt = f"""
        Analyze the following portfolio data and provide a detailed report card.
        Portfolio Data: {portfolio_data}
        Return a JSON with: risk_score (0-100), diversification_score (0-100), expense_ratio_score (0-100), 
        rebalancing_suggestions (list), top_recommendations (list), health_grade (A-F).
        """
        response = await self.model.generate_content_async(prompt)
        return response.text

    async def chat(self, user_message, history=None, user_profile=None):
        chat_session = self.model.start_chat(history=history or [])
        context = f"User Profile: {user_profile}\n" if user_profile else ""
        response = await chat_session.send_message_async(context + user_message)
        return response.text

    async def chat_stream(self, user_message, history=None, user_profile=None):
        chat_session = self.model.start_chat(history=history or [])
        context = f"User Profile: {user_profile}\n" if user_profile else ""
        response = await chat_session.send_message_async(context + user_message, stream=True)
        async for chunk in response:
            yield chunk.text

    async def generate_daily_insight(self, user_profile, portfolio_summary):
        prompt = f"User Profile: {user_profile}\nPortfolio Summary: {portfolio_summary}\nProvide a single financial insight under 80 words. Branded as 'FinPi Insight'."
        response = await self.model.generate_content_async(prompt)
        return response.text

    async def analyze_market_sentiment(self, symbol, headlines):
        prompt = f"Symbol: {symbol}\nHeadlines: {headlines}\nAnalyze sentiment. Return JSON: {{sentiment_score, label, confidence, key_factors[], gemini_analysis}}."
        response = await self.model.generate_content_async(prompt)
        return response.text

    async def parse_document(self, file_bytes, file_type):
        content = [
            {"mime_type": file_type, "data": file_bytes},
            "Extract structured investment/income data from this document and provide a plain-English summary. Return JSON + Summary."
        ]
        response = await self.model.generate_content_async(content)
        return response.text

gemini_advisor = GeminiAdvisorService()
