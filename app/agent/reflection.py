from __future__ import annotations

from app.agent.schemas import ParsedRecommendationConditions, RecommendationItem, ReflectionResult


def check_recommendations(
    conditions: ParsedRecommendationConditions,
    recommendations: list[RecommendationItem],
) -> ReflectionResult:
    checks: list[str] = []
    issues: list[str] = []
    improvements: list[str] = []

    checks.append("지역 조건 검토")
    if any(item.region != conditions.region for item in recommendations):
        issues.append("다른 지역 후보가 포함되었습니다.")

    checks.append("가격 조건 검토")
    if conditions.max_price and any(item.price_range > conditions.max_price for item in recommendations):
        issues.append("가격 상한을 넘는 후보가 포함되었습니다.")

    checks.append("리뷰/평점 조건 검토")
    if conditions.min_review_count and any(item.review_count < conditions.min_review_count for item in recommendations):
        issues.append("리뷰 수 기준에 못 미치는 후보가 포함되었습니다.")

    checks.append("동행/목적 조건 검토")
    if conditions.companion and not any(conditions.companion in item.tags for item in recommendations):
        improvements.append("동행 조건을 추천 이유에 더 명확히 드러낼 수 있습니다.")
    if conditions.purpose and not any(conditions.purpose in item.tags for item in recommendations):
        improvements.append("식사 목적 조건을 추천 이유에 더 명확히 드러낼 수 있습니다.")

    checks.append("개수 조건 검토")
    if len(recommendations) < conditions.top_k:
        issues.append("요청한 추천 개수를 채우지 못했습니다.")

    return ReflectionResult(
        passed=not issues,
        checks=checks,
        issues=issues,
        improvements=improvements,
    )
