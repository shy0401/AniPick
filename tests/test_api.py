from fastapi.testclient import TestClient

from app.main import app


def test_health_and_agent_run():
    client = TestClient(app)

    assert client.get("/health").json()["ok"] is True
    response = client.post("/agent/run", json={"query": "전주 객사 근처에서 친구랑 저녁 맛집 3곳 추천해줘"})

    assert response.status_code == 200
    data = response.json()
    assert data["parsed_conditions"]["region"] == "전주"
    assert data["react_trace"]
    assert data["final_answer"]
