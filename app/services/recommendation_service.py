from __future__ import annotations

from app.agent.react_agent import FoodReActAgent
from app.agent.schemas import AgentRunResult


class RecommendationService:
    def __init__(self) -> None:
        self.agent = FoodReActAgent()

    def run(self, query: str) -> AgentRunResult:
        return self.agent.run(query)
