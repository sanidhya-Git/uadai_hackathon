from prophet import Prophet
import pandas as pd
import joblib
from app.services.data_loader import load_state_data

df = load_state_data()
df["ds"] = pd.to_datetime(df["date"], dayfirst=True, errors="coerce")
df["y"] = df["total_enrolments"]

df = df.dropna(subset=["ds"])

model = Prophet()
model.fit(df[["ds", "y"]])

joblib.dump(model, "models/prophet_model.pkl")
print("Prophet model trained")
