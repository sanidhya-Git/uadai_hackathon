from fastapi import APIRouter, UploadFile, File
import shutil
import os

router = APIRouter()

UPLOAD_DIR = "data"
UPLOAD_PATH = os.path.join(UPLOAD_DIR, "data.csv")

@router.post("/")
async def upload_dataset(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        return {"error": "Only CSV files allowed"}

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    with open(UPLOAD_PATH, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"status": "Dataset uploaded successfully"}
