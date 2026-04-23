import json
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from ...services.gemini_service import gemini_advisor
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = None
    user_profile: Optional[dict] = None

@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        response = await gemini_advisor.chat(
            request.message, 
            history=request.history, 
            user_profile=request.user_profile
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    async def event_generator():
        try:
            async for chunk in gemini_advisor.chat_stream(
                request.message, 
                history=request.history, 
                user_profile=request.user_profile
            ):
                yield f"data: {json.dumps({'token': chunk, 'done': False})}\n\n"
            yield f"data: {json.dumps({'token': '', 'done': True})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e), 'done': True})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@router.get("/daily-insight")
async def daily_insight(user_id: str):
    # In real app, fetch user data
    user_profile = "Moderate risk investor, interest in mutual funds"
    portfolio_summary = "Equity: 70%, Debt: 30%, Total: 5,00,000"
    insight = await gemini_advisor.generate_daily_insight(user_profile, portfolio_summary)
    return {"insight": insight}
