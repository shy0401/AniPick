from __future__ import annotations

from fastapi import FastAPI

from app.agent.schemas import RecommendationRequest
from app.services.recommendation_service import RecommendationService

app = FastAPI(title="Food Recommendation ReAct Agent")
service = RecommendationService()


@app.get("/health")
def health() -> dict:
    return {"ok": True, "service": "food-agent"}


@app.get("/mcp/status")
def mcp_status() -> dict:
    return {
        "weather": "available",
        "memory": "available",
        "restaurant": "available",
        "place": "available",
    }


@app.post("/agent/run")
def run_agent(request: RecommendationRequest) -> dict:
    return service.run(request.query).model_dump()


@app.post("/recommend")
def recommend(request: RecommendationRequest) -> dict:
    result = service.run(request.query)
    return {
        "parsed_conditions": result.parsed_conditions.model_dump(),
        "recommendations": [item.model_dump() for item in result.recommendations],
        "final_answer": result.final_answer,
        "status": result.status,
    }
