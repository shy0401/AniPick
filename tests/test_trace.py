from app.agent.react_agent import FoodReActAgent


def test_submission_trace_text_has_required_sections():
    result = FoodReActAgent().run("전주 객사 근처에서 친구랑 저녁 먹기 좋은 맛집을 찾아줘. 너무 비싸지 않고, 리뷰가 좋은 곳 위주로 3곳 추천해줘.")
    trace = result.submission_trace_text

    for keyword in ["User Query", "Parsed Conditions", "Thought", "Action", "Action Input", "Observation", "Final Answer", "Reflection"]:
        assert keyword in trace

    for keyword in ["전주", "객사", "친구", "저녁", "가격", "리뷰", "3곳"]:
        assert keyword in trace
