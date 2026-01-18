from fastapi import APIRouter, Query
from app.services.data_loader import load_state_data

router = APIRouter()

@router.get("/{state_name}")
def district_insights(state_name: str, age: str = Query("all")):
    df = load_state_data(age)
    df = df[df["state"].str.lower() == state_name.lower()]

    district_df = df.groupby("district")["total_enrolments"].sum().reset_index()
    return district_df.to_dict(orient="records")
