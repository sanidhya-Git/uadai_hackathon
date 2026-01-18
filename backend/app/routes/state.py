from fastapi import APIRouter, Query
from app.services.data_loader import load_state_data

router = APIRouter()

@router.get("/insights")
def state_wise_insights(age: str = Query("all")):
    df = load_state_data(age)

    state_df = df.groupby("state")["total_enrolments"].sum().reset_index()

    return state_df.to_dict(orient="records")
