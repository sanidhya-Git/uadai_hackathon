from sklearn.ensemble import IsolationForest

def detect_anomalies(df):
    if "total_enrolments" not in df.columns:
        return []

    model = IsolationForest(
        contamination=0.05,
        random_state=42
    )

    df["anomaly_flag"] = model.fit_predict(
        df[["total_enrolments"]]
    )

    anomalies = df[df["anomaly_flag"] == -1]
    return anomalies
