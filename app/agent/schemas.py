from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field


class ParsedRecommendationConditions(BaseModel):
    region: str | None = None
    area: str | None = None
    food_type: str | None = None
    companion: str | None = None
    purpose: str | None = None
    max_price: int | None = None
    min_rating: float | None = None
    min_review_count: int | None = None
    top_k: int = 3
    warnings: list[str] = Field(default_factory=list)
    needs_clarification: bool = False
    clarification_reason: str | None = None
    error_code: str | None = None
    suggested_queries: list[str] = Field(default_factory=list)


class RecommendationRequest(BaseModel):
    query: str


class RecommendationItem(BaseModel):
    id: str
    name: str
    region: str
    area: str
    district: str | None = None
    category: str
    rating: float
    review_count: int
    price_range: int
    distance: int
    tags: list[str] = Field(default_factory=list)
    reason: str
    menus: list[str] = Field(default_factory=list)
    opening_hours: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    address: str | None = None
    score: float = 0


class ReActTraceStep(BaseModel):
    step: int
    thought: str
    action: str
    action_input: dict[str, Any] = Field(default_factory=dict)
    observation: dict[str, Any] = Field(default_factory=dict)


class ReflectionResult(BaseModel):
    passed: bool
    checks: list[str] = Field(default_factory=list)
    issues: list[str] = Field(default_factory=list)
    improvements: list[str] = Field(default_factory=list)


class AgentRunResult(BaseModel):
    user_query: str
    parsed_conditions: ParsedRecommendationConditions
    recommendations: list[RecommendationItem] = Field(default_factory=list)
    react_trace: list[ReActTraceStep] = Field(default_factory=list)
    reflection: ReflectionResult | None = None
    final_answer: str
    submission_trace_text: str = ""
    status: Literal["ok", "needs_clarification", "no_results"] = "ok"
