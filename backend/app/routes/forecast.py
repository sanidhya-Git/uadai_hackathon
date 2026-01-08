from fastapi import APIRouter
from app.services.forecast_engine import combined_forecast

router = APIRouter()

@router.get("/compare")
def compare_models():
    return combined_forecast()
