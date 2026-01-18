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
        "volatility_score": round(df["total_enrolments"].std(), 2),
        "stability_index": round(100 - df["total_enrolments"].std() / df["total_enrolments"].mean() * 100, 2)
    }
