import joblib
import os
import numpy as np
import pandas as pd
from app.services.data_loader import load_state_data

MODEL_DIR = "models"
ARIMA_PATH = os.path.join(MODEL_DIR, "forecast_model.pkl")
PROPHET_PATH = os.path.join(MODEL_DIR, "prophet_model.pkl")

# Hardcoded accuracy from training (you can store dynamically later)
ARIMA_MAPE = 48.05
PROPHET_MAPE = 33.35


def arima_forecast(steps=1):
    if not os.path.exists(ARIMA_PATH):
        return None

    model = joblib.load(ARIMA_PATH)
    forecast = model.predict(n_periods=steps)
    return int(forecast[-1])


def prophet_forecast(steps=1):
    if not os.path.exists(PROPHET_PATH):
        return None

    model = joblib.load(PROPHET_PATH)

    df = load_state_data()
    df["date"] = pd.to_datetime(df["date"], dayfirst=True, errors="coerce")
    df = df.dropna(subset=["date"])

    future = pd.DataFrame({
        "ds": pd.date_range(
            start=df["date"].max(),
            periods=steps + 1,
            freq="W"
        )
    })

    forecast = model.predict(future)
    return int(forecast.iloc[-1]["yhat"]), int(forecast.iloc[-1]["yhat_lower"]), int(forecast.iloc[-1]["yhat_upper"])


def combined_forecast():
    arima = arima_forecast()
    prophet, lower, upper = prophet_forecast()

    risk = abs(arima - prophet) / max(arima, prophet)

    recommended = "Prophet" if PROPHET_MAPE < ARIMA_MAPE else "ARIMA"

    return {
        "arima_prediction": arima,
        "prophet_prediction": prophet,
        "confidence_lower": lower,
        "confidence_upper": upper,
        "arima_mape": ARIMA_MAPE,
        "prophet_mape": PROPHET_MAPE,
        "recommended_model": recommended,
        "risk_score": round(risk, 2)
    }
