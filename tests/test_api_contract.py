from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_mcp_status_lists_expected_tools():
    response = client.get("/mcp/status")

    assert response.status_code == 200
    body = response.json()
    assert body["weather"] == "available"
    assert body["memory"] == "available"
    assert body["restaurant"] == "available"
    assert body["place"] == "available"


def test_recommend_endpoint_keeps_compatibility_shape():
    response = client.post("/recommend", json={"query": "\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1"})

    assert response.status_code == 200
    body = response.json()
    assert "parsed_conditions" in body
    assert "recommendations" in body
    assert "final_answer" in body
    assert "status" in body
