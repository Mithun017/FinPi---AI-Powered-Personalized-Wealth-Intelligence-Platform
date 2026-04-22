from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok", "message": "FinPi Backend is running smoothly"}
