# 13주차 맛집 추천 AI Agent 제출 체크리스트

최종 점검일: 2026-06-03

## 제출 준비 상태

현재 브랜치 `assignment/food-agent-react-trace`에는 13주차 맛집 추천 AI Agent 과제 제출에 필요한 FastAPI 백엔드, ReAct Agent, MCP 스타일 도구 서버, Reflection, 샘플 데이터셋, 테스트, 제출 Trace 생성 스크립트, 제출 zip 생성 스크립트가 포함되어 있습니다.

## 최종 검증 결과

| 항목 | 명령 또는 확인 대상 | 결과 | 비고 |
| --- | --- | --- | --- |
| Git 상태 확인 | `git status --short` | 통과 | 커밋 전 작업트리 기준 민감 파일 제외 확인 |
| Python 테스트 | `python -m pytest -q` | 통과 | `9 passed` |
| 제출 시나리오 실행 | `python scripts/run_submission_scenario.py` | 통과 | Trace txt/json/요약 md 생성 |
| 프론트엔드 빌드 | `cd frontend && npx -p node@22 -p npm npm run build` | 통과 | Node 22 LTS 기준 정상 빌드 |
| 기본 Node 24 빌드 | `cd frontend && npm run build` | 주의 | 현재 로컬 Node 24.11.1에서는 Vite/Rollup 네이티브 단계가 `-1073740791`로 종료됨. 소스 문제는 아니며 Node 22 LTS 사용 권장 |
| 제출 zip 생성 | `python scripts/package_submission.py --name 신하윤 --student-id 202112026` | 통과 | `신하윤_202112026_실습4.zip` 생성 |
| 민감정보 스캔 | package script 내장 검사 | 통과 | `.env`와 API Key 패턴 포함 시 zip 생성 중단 |
| Trace 텍스트 확인 | `submission_outputs/실행로그_trace.txt` | 통과 | Thought, Action, Action Input, Observation, Final Answer 포함 |
| Trace JSON 확인 | `submission_outputs/실행로그_trace.json` | 통과 | 제출용 구조화 로그 생성 |
| 실행 요약 확인 | `submission_outputs/과제_실행_요약.md` | 통과 | 사용 패턴, 실행 프롬프트, 추천 결과 요약 포함 |

## 과제 시나리오 확인

과제 문장:

```text
전주 객사 근처에서 친구랑 저녁 먹기 좋은 맛집을 찾아줘. 너무 비싸지 않고, 리뷰가 좋은 곳 위주로 3곳 추천해줘.
```

확인 결과:

| 확인 항목 | 결과 |
| --- | --- |
| `parsed_conditions.region == "전주"` | 통과 |
| `parsed_conditions.area == "객사"` | 통과 |
| `parsed_conditions.companion == "친구"` | 통과 |
| `parsed_conditions.purpose == "저녁"` | 통과 |
| `parsed_conditions.max_price == 15000` | 통과 |
| `parsed_conditions.min_rating >= 4.0` | 통과 |
| `parsed_conditions.min_review_count >= 50` | 통과 |
| 최종 추천 3곳 이상 | 통과 |
| 추천 3곳 모두 전주 후보 | 통과 |
| 최소 2곳 이상 객사/객리단길 관련 | 통과 |
| 추천 이유에 친구/저녁/가격/리뷰 조건 반영 | 통과 |
| 다른 지역 후보로 임의 대체하지 않음 | 통과 |

## Trace 포함 항목

- User Query
- Parsed Conditions
- Thought
- Action
- Action Input
- Observation
- Candidate Filtering Result
- Reflection
- Final Answer
- 예외 발생 시 suggested_queries 또는 relaxation_options

## 제출 zip 포함 대상

- `app/`
- `mcp_servers/`
- `frontend/src/`
- `frontend/public/`
- `frontend/index.html`
- `frontend/package.json`
- `frontend/package-lock.json`
- `frontend/.env.example`
- `scripts/run_submission_scenario.py`
- `scripts/package_submission.py`
- `tests/`
- `README.md`
- `requirements.txt`
- `.env.example`
- `docs/`
- `submission_outputs/실행로그_trace.txt`
- `submission_outputs/실행로그_trace.json`
- `submission_outputs/과제_실행_요약.md`

## 제출 zip 제외 대상

- `.git/`
- `.env`
- `.venv/`
- `venv/`
- `__pycache__/`
- `.pytest_cache/`
- `node_modules/`
- `dist/`
- `build/`
- `.idea/`
- `*.iml`
- API Key 또는 Secret이 들어간 파일
- 대형 캐시 파일

## 권장 실행 순서

```bash
python -m pytest -q
python scripts/run_submission_scenario.py
cd frontend
npx -p node@22 -p npm npm run build
cd ..
python scripts/package_submission.py --name 신하윤 --student-id 202112026
```

## 남은 주의사항

- 프론트엔드 빌드는 Node 22 LTS 기준으로 검증했습니다. 현재 로컬 Node 24.11.1에서는 Vite/Rollup 네이티브 단계가 Windows에서 비정상 종료되므로, 제출 전 빌드 검증은 Node 22 LTS를 권장합니다.
- 생성된 `submission_outputs/`와 `신하윤_202112026_실습4.zip`은 제출물로 사용하되 Git 커밋에는 포함하지 않습니다.
- 실제 `.env`와 API Key는 절대 zip 또는 Git에 포함하지 않습니다.
