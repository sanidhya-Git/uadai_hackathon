from fastapi import APIRouter
from app.services.data_loader import load_state_data

router = APIRouter()

@router.get("/")
def overview_metrics():
    df = load_state_data()

    return {
        "total_states": int(df["state"].nunique()),
        "total_enrolments": int(df["total_enrolments"].sum()),
        "total_updates": 0,
        "volatility_score": 0.0,
        "stability_index": 0.0
    }
