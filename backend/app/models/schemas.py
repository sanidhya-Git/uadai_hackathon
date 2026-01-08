from pydantic import BaseModel

class StateInsight(BaseModel):
    state: str
    total_enrolments: int
    total_updates: int
    update_dependency_ratio: float
