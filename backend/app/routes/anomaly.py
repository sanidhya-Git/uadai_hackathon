from fastapi import APIRouter
from app.services.data_loader import load_state_data
from app.services.anomaly_engine import detect_anomalies

router = APIRouter()

@router.get("/alerts")
def anomaly_alerts():
    df = load_state_data()
    anomalies = detect_anomalies(df)
    return anomalies.to_dict(orient="records")
