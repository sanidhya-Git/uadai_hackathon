import pandas as pd
import os

# backend/
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

DATA_DIR = os.path.join(BASE_DIR, "data")

STATE_DATA_PATH = os.path.join(
    DATA_DIR, "data.csv"
)

NATIONAL_DATA_PATH = os.path.join(
    DATA_DIR, "data.csv"
)


def normalize_columns(df):
    df.columns = df.columns.str.lower().str.strip()
    return df


def compute_total_enrolments(df):
    age_cols = ["age_0_5", "age_5_17", "age_18_greater"]

    for col in age_cols:
        if col not in df.columns:
            raise ValueError(f"Missing column: {col}")

    df["total_enrolments"] = df[age_cols].sum(axis=1)
    return df


def load_state_data():
    df = pd.read_csv(STATE_DATA_PATH)
    df = normalize_columns(df)
    df = compute_total_enrolments(df)
    return df


def load_national_data():
    df = pd.read_csv(NATIONAL_DATA_PATH)
    df = normalize_columns(df)
    df = compute_total_enrolments(df)
    return df
