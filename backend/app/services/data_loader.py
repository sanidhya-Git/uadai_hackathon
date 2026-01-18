import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_DIR = os.path.join(BASE_DIR, "data")

STATE_DATA_PATH = os.path.join(DATA_DIR, "data.csv")

STATE_NORMALIZATION = {
    "andaman and nicobar islands": "Andaman and Nicobar Islands",
    "andaman & nicobar": "Andaman and Nicobar Islands",
    "delhi nct": "Delhi",
    "nct of delhi": "Delhi",
    "odisha": "Odisha",
    "orissa": "Odisha",
}

def normalize_columns(df):
    df.columns = df.columns.str.lower().str.strip()
    df["state"] = df["state"].str.lower().str.strip().replace(STATE_NORMALIZATION)
    df["state"] = df["state"].str.title()
    df["district"] = df["district"].str.title()
    return df

def compute_total_enrolments(df):
    df["age_0_5"] = df["age_0_5"].fillna(0)
    df["age_5_17"] = df["age_5_17"].fillna(0)
    df["age_18_greater"] = df["age_18_greater"].fillna(0)
    df["total_enrolments"] = df["age_0_5"] + df["age_5_17"] + df["age_18_greater"]
    return df

def load_state_data(age="all"):
    df = pd.read_csv(STATE_DATA_PATH)
    df = normalize_columns(df)
    df = compute_total_enrolments(df)

    if age == "0-5":
        df["total_enrolments"] = df["age_0_5"]
    elif age == "5-17":
        df["total_enrolments"] = df["age_5_17"]
    elif age == "18+":
        df["total_enrolments"] = df["age_18_greater"]

    return df
