import google.generativeai as genai
import asyncio
from ..core.config import settings

class GeminiAdvisorService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.pro_model = genai.GenerativeModel('gemini-1.5-pro-latest')
        self.flash_model = genai.GenerativeModel('gemini-1.5-flash-latest')
        # vision_model = genai.GenerativeModel('gemini-1.5-flash') # gemini-pro-vision is legacy, use flash or pro for multimodal

    async def _run_async(self, func, *args):
        return await asyncio.to_thread(func, *args)

    async def get_portfolio_analysis(self, portfolio_data):
        prompt = f"""
        Analyze the following portfolio data and provide a detailed report card.
        Portfolio Data: {portfolio_data}
        Return a JSON with: risk_score (0-100), diversification_score (0-100), expense_ratio_score (0-100), 
        rebalancing_suggestions (list), top_recommendations (list), health_grade (A-F).
        """
        response = await self._run_async(self.pro_model.generate_content, prompt)
        return response.text

    async def chat(self, user_message, history=None, user_profile=None):
        chat_session = self.flash_model.start_chat(history=history or [])
        context = f"User Profile: {user_profile}\n" if user_profile else ""
        response = await self._run_async(chat_session.send_message, context + user_message)
        return response.text

    async def chat_stream(self, user_message, history=None, user_profile=None):
        chat_session = self.flash_model.start_chat(history=history or [])
        context = f"User Profile: {user_profile}\n" if user_profile else ""
        # For streaming, we need to handle the generator in a thread-safe way for async
        # genai SDK generate_content(stream=True) returns a generator
        response = await self._run_async(chat_session.send_message, context + user_message, stream=True)
        for chunk in response:
            yield chunk.text

    async def generate_daily_insight(self, user_profile, portfolio_summary):
        prompt = f"User Profile: {user_profile}\nPortfolio Summary: {portfolio_summary}\nProvide a single financial insight under 80 words. Branded as 'FinPi Insight'."
        response = await self._run_async(self.flash_model.generate_content, prompt)
        return response.text

    async def summarize_news(self, headlines):
        prompt = f"Headlines: {headlines}\nSummarize these news items. Return a list of JSON: [{{headline, summary, sentiment, impact_on_market}}]."
        response = await self._run_async(self.flash_model.generate_content, prompt)
        return response.text

    async def calculate_goal_advice(self, goal_data, user_income, user_age):
        prompt = f"Goal: {goal_data}\nIncome: {user_income}\nAge: {user_age}\nProvide advice. Return JSON: {{monthly_sip_required, recommended_funds[], timeline_analysis, milestones[]}}."
        response = await self._run_async(self.pro_model.generate_content, prompt)
        return response.text

    async def analyze_market_sentiment(self, symbol, headlines):
        prompt = f"Symbol: {symbol}\nHeadlines: {headlines}\nAnalyze sentiment. Return JSON: {{sentiment_score, label, confidence, key_factors[], gemini_analysis}}."
        response = await self._run_async(self.flash_model.generate_content, prompt)
        return response.text

    async def parse_document(self, file_bytes, file_type):
        # This requires multimodal support
        # In modern Gemini SDK, you can pass bytes directly with mime_type
        content = [
            {"mime_type": file_type, "data": file_bytes},
            "Extract structured investment/income data from this document and provide a plain-English summary. Return JSON + Summary."
        ]
        response = await self._run_async(self.flash_model.generate_content, content)
        return response.text

    async def generate_portfolio_health_report(self, portfolio_data, goals):
        prompt = f"Portfolio: {portfolio_data}\nGoals: {goals}\nGenerate a full HTML report for PDF export."
        response = await self._run_async(self.pro_model.generate_content, prompt)
        return response.text

    async def detect_behavioral_patterns(self, journal_entries, transaction_history):
        prompt = f"Journal: {journal_entries}\nTransactions: {transaction_history}\nDetect patterns. Return JSON: {{patterns_detected[], emotional_triggers[], behavioral_score, coaching_advice}}."
        response = await self._run_async(self.pro_model.generate_content, prompt)
        return response.text

    async def generate_sip_optimization_plan(self, monthly_budget, risk_profile, existing_portfolio, goals):
        prompt = f"Budget: {monthly_budget}\nRisk: {risk_profile}\nPortfolio: {existing_portfolio}\nGoals: {goals}\nProvide optimization plan. Return JSON: {{allocation_plan[], projected_value, rebalancing_schedule}}."
        response = await self._run_async(self.pro_model.generate_content, prompt)
        return response.text

gemini_advisor = GeminiAdvisorService()
