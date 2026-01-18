from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import APP_NAME, VERSION, DESCRIPTION
from app.routes import overview, state, anomaly, forecast
from app.routes import district
from app.routes import upload
app = FastAPI(
    title=APP_NAME,
    version=VERSION,
    description=DESCRIPTION
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(overview.router, prefix="/overview")
app.include_router(state.router, prefix="/state")
app.include_router(anomaly.router, prefix="/anomaly")
app.include_router(forecast.router, prefix="/forecast")
app.include_router(district.router, prefix="/district")

app.include_router(upload.router, prefix="/upload")
@app.get("/")
def root():
    return {"status": "Aadhaar InsightX API is running"}


