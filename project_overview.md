# PROJECT OVERVIEW FOR CODE ANALYSIS

이 문서는 프로젝트의 전체 구조, 실행 흐름, 서비스 구성, API 라우트, 환경변수, 주요 파일 내용을 파악하기 위해 자동 생성되었습니다.

## 0. 생성 정보

- Root: `C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick`
- Generated at: `2026-06-03T15:03:59`
- Included files: `117`
- Max file size: `1,000,000` bytes
- Max chars per file: `80,000` chars
- Max total chars: `3,000,000` chars

## 1. 프로젝트 디렉터리 구조

```text
AniPick/
    - backend/
    - frontend/
    - README.md
    - all.py
    - docker-compose.yml
    - make_project_overview.py
        - data/
        - prisma/
        - scripts/
        - src/
        - .env.example
        - package.json
            - anime_csv/
                - items/
            - migrations/
            - seed.js
                - 20260427120508_init/
                - 20260429095031_add_anime_translations/
                - 20260429124736_add_anime_cache_translation/
                - 20260429125705_add_anime_cache_translation/
                - 20260501050800_add_translation_jobs_and_metadata/
                - 20260501072400_add_anime_score_metrics/
                - 20260502090000_add_anime_visibility_flags/
                - migration_lock.toml
                    - migration.sql
                    - migration.sql
                    - migration.sql
                    - migration.sql
                    - migration.sql
                    - migration.sql
                    - migration.sql
            - bootstrapCatalog.js
            - cleanupAnimeCache.js
            - createTranslationJobs.js
            - prefetchAnime.js
            - pretranslateAnime.js
            - repairAnimeCache.js
            - translate_pending_ko.py
            - translationCoverage.js
            - controllers/
            - data/
            - lib/
            - middlewares/
            - routes/
            - services/
            - swagger/
            - utils/
            - app.js
            - server.js
                - admin.controller.js
                - adminAnime.controller.js
                - anime.controller.js
                - auth.controller.js
                - favorite.controller.js
                - notice.controller.js
                - review.controller.js
                - translation.controller.js
                - watchStatus.controller.js
                - animeTranslations.js
                - fallbackAnime.js
                - prisma.js
                - admin.middleware.js
                - auth.middleware.js
                - admin.routes.js
                - anime.routes.js
                - auth.routes.js
                - favorite.routes.js
                - notice.routes.js
                - review.routes.js
                - translation.routes.js
                - watchStatus.routes.js
                - anilist.service.js
                - anime-cache.service.js
                - anime-normalizer.service.js
                - anime-prefetch.service.js
                - anime-pretranslate.service.js
                - anime-provider.service.js
                - anime-translation-orchestrator.service.js
                - jikan.service.js
                - openai-model.service.js
                - openai-translation.service.js
                - translation-job.service.js
                - swagger.js
                - animeContentSafety.js
                - animeI18n.js
                - koreanAnime.js
                - season.js
        - src/
        - .env.example
        - build_err.txt
        - build_out.txt
        - index.html
        - package.json
        - vite.config.js
            - api/
            - components/
            - context/
            - hooks/
            - pages/
            - styles/
            - utils/
            - App.jsx
            - main.jsx
                - adminApi.js
                - animeApi.js
                - authApi.js
                - client.js
                - favoriteApi.js
                - noticeApi.js
                - reviewApi.js
                - translationApi.js
                - watchStatusApi.js
                - home/
                - AdminRoute.jsx
                - AnimeCard.jsx
                - AnimeSection.jsx
                - GlassBadge.jsx
                - HeroMedia.jsx
                - Navbar.jsx
                - ProtectedRoute.jsx
                - ReviewForm.jsx
                - ReviewList.jsx
                - SearchFilters.jsx
                - ThemeToggle.jsx
                    - AnimePosterCard.jsx
                    - HorizontalAnimeRail.jsx
                    - TopTenAnimeCard.jsx
                    - TopTenAnimeRail.jsx
                - AuthContext.jsx
                - LanguageContext.jsx
                - useRailScroll.js
                - useTheme.js
                - Admin.jsx
                - AnimeDetail.jsx
                - Browse.jsx
                - Home.jsx
                - Login.jsx
                - MyPage.jsx
                - NotFound.jsx
                - Register.jsx
                - global.css
                - homeRails.css
                - animeRoute.js
                - contentSafety.js
                - error.js
                - image.js
                - score.js
                - text.js
                - theme.js
                - title.js
```

## 2. 자동 감지 요약

### 컨테이너/배포

- `docker-compose.yml`

### 백엔드/API

- `backend/src/routes/admin.routes.js`
- `backend/src/routes/anime.routes.js`
- `backend/src/routes/auth.routes.js`
- `backend/src/routes/favorite.routes.js`
- `backend/src/routes/notice.routes.js`
- `backend/src/routes/review.routes.js`
- `backend/src/routes/translation.routes.js`
- `backend/src/routes/watchStatus.routes.js`
- `backend/src/server.js`
- `frontend/src/api/adminApi.js`
- `frontend/src/api/animeApi.js`
- `frontend/src/api/authApi.js`
- `frontend/src/api/client.js`
- `frontend/src/api/favoriteApi.js`
- `frontend/src/api/noticeApi.js`
- `frontend/src/api/reviewApi.js`
- `frontend/src/api/translationApi.js`
- `frontend/src/api/watchStatusApi.js`

### 프론트엔드

- `backend/src/app.js`
- `backend/src/controllers/admin.controller.js`
- `backend/src/controllers/adminAnime.controller.js`
- `backend/src/controllers/anime.controller.js`
- `backend/src/controllers/auth.controller.js`
- `backend/src/controllers/favorite.controller.js`
- `backend/src/controllers/notice.controller.js`
- `backend/src/controllers/review.controller.js`
- `backend/src/controllers/translation.controller.js`
- `backend/src/controllers/watchStatus.controller.js`
- `backend/src/data/animeTranslations.js`
- `backend/src/data/fallbackAnime.js`
- `backend/src/lib/prisma.js`
- `backend/src/middlewares/admin.middleware.js`
- `backend/src/middlewares/auth.middleware.js`
- `backend/src/services/anilist.service.js`
- `backend/src/services/anime-cache.service.js`
- `backend/src/services/anime-normalizer.service.js`
- `backend/src/services/anime-prefetch.service.js`
- `backend/src/services/anime-pretranslate.service.js`
- `backend/src/services/anime-provider.service.js`
- `backend/src/services/anime-translation-orchestrator.service.js`
- `backend/src/services/jikan.service.js`
- `backend/src/services/openai-model.service.js`
- `backend/src/services/openai-translation.service.js`
- `backend/src/services/translation-job.service.js`
- `backend/src/swagger/swagger.js`
- `backend/src/utils/animeContentSafety.js`
- `backend/src/utils/animeI18n.js`
- `backend/src/utils/koreanAnime.js`
- `backend/src/utils/season.js`
- `frontend/.env.example`
- `frontend/build_err.txt`
- `frontend/build_out.txt`
- `frontend/index.html`
- `frontend/package.json`
- `frontend/src/App.jsx`
- `frontend/src/components/AdminRoute.jsx`
- `frontend/src/components/AnimeCard.jsx`
- `frontend/src/components/AnimeSection.jsx`
- `frontend/src/components/GlassBadge.jsx`
- `frontend/src/components/HeroMedia.jsx`
- `frontend/src/components/Navbar.jsx`
- `frontend/src/components/ProtectedRoute.jsx`
- `frontend/src/components/ReviewForm.jsx`
- `frontend/src/components/ReviewList.jsx`
- `frontend/src/components/SearchFilters.jsx`
- `frontend/src/components/ThemeToggle.jsx`
- `frontend/src/components/home/AnimePosterCard.jsx`
- `frontend/src/components/home/HorizontalAnimeRail.jsx`
- `frontend/src/components/home/TopTenAnimeCard.jsx`
- `frontend/src/components/home/TopTenAnimeRail.jsx`
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/context/LanguageContext.jsx`
- `frontend/src/hooks/useRailScroll.js`
- `frontend/src/hooks/useTheme.js`
- `frontend/src/main.jsx`
- `frontend/src/pages/Admin.jsx`
- `frontend/src/pages/AnimeDetail.jsx`
- `frontend/src/pages/Browse.jsx`
- `frontend/src/pages/Home.jsx`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/MyPage.jsx`
- `frontend/src/pages/NotFound.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/styles/global.css`
- `frontend/src/styles/homeRails.css`
- `frontend/src/utils/animeRoute.js`
- `frontend/src/utils/contentSafety.js`
- `frontend/src/utils/error.js`
- `frontend/src/utils/image.js`
- `frontend/src/utils/score.js`
- `frontend/src/utils/text.js`
- `frontend/src/utils/theme.js`
- `frontend/src/utils/title.js`
- `frontend/vite.config.js`

### DB/스키마/마이그레이션

- `backend/prisma/migrations/20260427120508_init/migration.sql`
- `backend/prisma/migrations/20260429095031_add_anime_translations/migration.sql`
- `backend/prisma/migrations/20260429124736_add_anime_cache_translation/migration.sql`
- `backend/prisma/migrations/20260429125705_add_anime_cache_translation/migration.sql`
- `backend/prisma/migrations/20260501050800_add_translation_jobs_and_metadata/migration.sql`
- `backend/prisma/migrations/20260501072400_add_anime_score_metrics/migration.sql`
- `backend/prisma/migrations/20260502090000_add_anime_visibility_flags/migration.sql`
- `backend/prisma/migrations/migration_lock.toml`

### 설정/환경

- `backend/.env.example`
- `backend/package.json`

### 문서

- `README.md`

## 3. Docker Compose 서비스 추정

| compose 파일 | 서비스 | build | image | ports |
|---|---|---|---|---|
| `docker-compose.yml` | `postgres` | `` | `postgres:15` | `5433:5432` |

## 4. Node/Frontend package.json 요약

### `backend/package.json`

- name: `anipick-backend`
- version: `1.0.0`
- scripts:
  - `dev`: `nodemon src/server.js`
  - `start`: `node src/server.js`
  - `prisma:generate`: `prisma generate`
  - `prisma:migrate`: `prisma migrate dev`
  - `prisma:reset`: `prisma migrate reset`
  - `seed`: `node prisma/seed.js`
  - `db:seed`: `node prisma/seed.js`
  - `cleanup:anime`: `node scripts/cleanupAnimeCache.js`
  - `prefetch:anime`: `node scripts/prefetchAnime.js`
  - `pretranslate:anime`: `node scripts/pretranslateAnime.js`
  - `bootstrap:anime`: `node scripts/bootstrapCatalog.js`
  - `anime:cleanup`: `node scripts/cleanupAnimeCache.js`
  - `anime:repair`: `node scripts/repairAnimeCache.js`
  - `anime:prefetch`: `node scripts/prefetchAnime.js`
  - `anime:jobs:create`: `node scripts/createTranslationJobs.js`
  - `anime:translate`: `node scripts/pretranslateAnime.js`
  - `anime:coverage`: `node scripts/translationCoverage.js`
- dependencies:
  - `@prisma/client`, `axios`, `bcrypt`, `cors`, `dotenv`, `express`, `jsonwebtoken`, `openai`, `swagger-jsdoc`, `swagger-ui-express`
- devDependencies:
  - `nodemon`, `prisma`

### `frontend/package.json`

- name: `anipick-frontend`
- version: `1.0.0`
- scripts:
  - `dev`: `vite`
  - `build`: `vite build`
  - `preview`: `vite preview`
- dependencies:
  - `axios`, `react`, `react-dom`, `react-router-dom`
- devDependencies:
  - `@vitejs/plugin-react`, `vite`

## 5. Python requirements 요약

감지된 requirements.txt가 없습니다.

## 6. 환경변수 흐름

### .env.example / .env.sample에 정의된 키

- `backend/.env.example`: `ANILIST_RATE_LIMIT_PER_MINUTE`, `BOOTSTRAP_ANIME_ON_START`, `DATABASE_URL`, `ENABLE_ADMIN_TRANSLATION`, `JIKAN_RATE_LIMIT_PER_SECOND`, `JWT_SECRET`, `OPENAI_API_KEY`, `OPENAI_TRANSLATION_MODEL`, `OPENAI_TRANSLATION_MODEL_CANDIDATES`, `PORT`, `PRETRANSLATE_LIMIT`
- `frontend/.env.example`: 

### 코드에서 사용되는 환경변수

- `backend/scripts/bootstrapCatalog.js`: `PRETRANSLATE_LIMIT`
- `backend/scripts/pretranslateAnime.js`: `PRETRANSLATE_LIMIT`
- `backend/scripts/translate_pending_ko.py`: `DATABASE_URL`, `OPENAI_API_KEY`, `OPENAI_TRANSLATION_MODEL`
- `backend/src/controllers/anime.controller.js`: `NODE_ENV`
- `backend/src/controllers/auth.controller.js`: `JWT_SECRET`
- `backend/src/controllers/translation.controller.js`: `ENABLE_ADMIN_TRANSLATION`
- `backend/src/middlewares/auth.middleware.js`: `JWT_SECRET`
- `backend/src/server.js`: `JWT_SECRET`, `PORT`
- `backend/src/services/anilist.service.js`: `ANILIST_RATE_LIMIT_PER_MINUTE`, `NODE_ENV`
- `backend/src/services/anime-pretranslate.service.js`: `PRETRANSLATE_LIMIT`
- `backend/src/services/jikan.service.js`: `JIKAN_RATE_LIMIT_PER_SECOND`
- `backend/src/services/openai-model.service.js`: `OPENAI_API_KEY`, `OPENAI_TRANSLATION_MODEL`, `OPENAI_TRANSLATION_MODEL_CANDIDATES`
- `frontend/src/api/client.js`: `VITE_API_BASE_URL`

## 7. API / 라우트 흐름 추정

### Python FastAPI/Flask 계열 라우트

- 감지된 Python 라우트가 없습니다.

### JS/TS Express 계열 라우트

| Method | Path | File |
|---|---|---|
| `GET` | `/users` | `backend/src/routes/admin.routes.js` |
| `GET` | `/reviews` | `backend/src/routes/admin.routes.js` |
| `DELETE` | `/reviews/:id` | `backend/src/routes/admin.routes.js` |
| `GET` | `/translations/coverage` | `backend/src/routes/admin.routes.js` |
| `GET` | `/translations/openai/models` | `backend/src/routes/admin.routes.js` |
| `GET` | `/translations/missing` | `backend/src/routes/admin.routes.js` |
| `POST` | `/translations/jobs` | `backend/src/routes/admin.routes.js` |
| `POST` | `/translations/jobs/run` | `backend/src/routes/admin.routes.js` |
| `PUT` | `/translations/:provider/:externalId` | `backend/src/routes/admin.routes.js` |
| `POST` | `/translations/:provider/:externalId/review` | `backend/src/routes/admin.routes.js` |
| `POST` | `/translations/:provider/:externalId/retry` | `backend/src/routes/admin.routes.js` |
| `GET` | `/anime` | `backend/src/routes/admin.routes.js` |
| `GET` | `/anime/:id` | `backend/src/routes/admin.routes.js` |
| `PATCH` | `/anime/:id/hide` | `backend/src/routes/admin.routes.js` |
| `PATCH` | `/anime/:id/unhide` | `backend/src/routes/admin.routes.js` |
| `PATCH` | `/anime/:id/mark-adult` | `backend/src/routes/admin.routes.js` |
| `DELETE` | `/anime/:id` | `backend/src/routes/admin.routes.js` |
| `DELETE` | `/anime/:id/hard` | `backend/src/routes/admin.routes.js` |
| `GET` | `/trending` | `backend/src/routes/anime.routes.js` |
| `GET` | `/popular-season` | `backend/src/routes/anime.routes.js` |
| `GET` | `/search` | `backend/src/routes/anime.routes.js` |
| `GET` | `/test-provider` | `backend/src/routes/anime.routes.js` |
| `GET` | `/test-anilist` | `backend/src/routes/anime.routes.js` |
| `GET` | `/debug-title/:id` | `backend/src/routes/anime.routes.js` |
| `GET` | `/recommendations` | `backend/src/routes/anime.routes.js` |
| `GET` | `/:id` | `backend/src/routes/anime.routes.js` |
| `POST` | `/register` | `backend/src/routes/auth.routes.js` |
| `POST` | `/login` | `backend/src/routes/auth.routes.js` |
| `GET` | `/me` | `backend/src/routes/auth.routes.js` |
| `GET` | `/` | `backend/src/routes/favorite.routes.js` |
| `POST` | `/` | `backend/src/routes/favorite.routes.js` |
| `DELETE` | `/:animeId` | `backend/src/routes/favorite.routes.js` |
| `GET` | `/:animeId/status` | `backend/src/routes/favorite.routes.js` |
| `GET` | `/` | `backend/src/routes/notice.routes.js` |
| `POST` | `/` | `backend/src/routes/notice.routes.js` |
| `DELETE` | `/:id` | `backend/src/routes/notice.routes.js` |
| `GET` | `/anime/:animeId` | `backend/src/routes/review.routes.js` |
| `GET` | `/me` | `backend/src/routes/review.routes.js` |
| `POST` | `/` | `backend/src/routes/review.routes.js` |
| `PUT` | `/:id` | `backend/src/routes/review.routes.js` |
| `DELETE` | `/:id` | `backend/src/routes/review.routes.js` |
| `GET` | `/openai/models` | `backend/src/routes/translation.routes.js` |
| `GET` | `/:provider/:externalId` | `backend/src/routes/translation.routes.js` |
| `PUT` | `/:provider/:externalId` | `backend/src/routes/translation.routes.js` |
| `POST` | `/:provider/:externalId/auto` | `backend/src/routes/translation.routes.js` |
| `DELETE` | `/:provider/:externalId/:lang` | `backend/src/routes/translation.routes.js` |
| `GET` | `/` | `backend/src/routes/watchStatus.routes.js` |
| `PUT` | `/` | `backend/src/routes/watchStatus.routes.js` |
| `DELETE` | `/:animeId` | `backend/src/routes/watchStatus.routes.js` |
| `GET` | `/health` | `backend/src/app.js` |
| `USE` | `/api/auth` | `backend/src/app.js` |
| `USE` | `/api/anime` | `backend/src/app.js` |
| `USE` | `/api/favorites` | `backend/src/app.js` |
| `USE` | `/api/reviews` | `backend/src/app.js` |
| `USE` | `/api/watch-status` | `backend/src/app.js` |
| `USE` | `/api/admin` | `backend/src/app.js` |
| `USE` | `/api/notices` | `backend/src/app.js` |
| `USE` | `/api/translations` | `backend/src/app.js` |
| `USE` | `/api-docs` | `backend/src/app.js` |

### Frontend Router path

- 감지된 프론트엔드 라우터 path가 없습니다.

### 프론트엔드/클라이언트에서 호출하는 API URL 후보

| URL | File |
|---|---|
| `https://kitsu.io/api/edge/anime/${id}` | `backend/src/services/anime-provider.service.js` |
| `https://kitsu.io/api/edge/anime?${params.toString()}` | `backend/src/services/anime-provider.service.js` |
| `${JIKAN_BASE_URL}${path}` | `backend/src/services/jikan.service.js` |

## 8. 주요 파일 내용

아래 내용은 프로젝트 흐름 파악용으로 자동 병합된 파일입니다. 민감한 `.env` 파일과 대용량 실행 산출물은 제외됩니다.

### File: `README.md`

- size: `20,090` bytes

```markdown
# AniPick

AniPick은 애니메이션 정보를 탐색하고 추천받을 수 있는 애니메이션 정보 플랫폼입니다.

메인 화면에서는 넷플릭스 스타일의 카드 슬라이드 UI로 인기 애니메이션을 보여주며, 사용자는 애니메이션 상세 정보 조회, 검색, 찜하기, 리뷰 작성, 시청 상태 관리 등을 할 수 있습니다.

## 주요 기능

### 사용자 기능

- 애니메이션 목록 조회
- 애니메이션 상세 정보 조회
- 제목, 장르, 연도, 시즌, 형식, 상태 기준 검색
- 지금 뜨는 애니 TOP 10
- 지금 인기 있는 애니
- 이번 시즌 인기작
- 고평점 추천
- 한국어 제목 및 설명 표시
- 회원가입 / 로그인
- 찜하기
- 리뷰 작성
- 시청 상태 관리

### 관리자 기능

- 관리자 로그인
- 사용자 관리
- 리뷰 관리
- 애니메이션 숨김 / 복구 / 삭제 처리
- 성인 콘텐츠 숨김 처리
- 번역 상태 관리
- 공지 관리

### 데이터 관리

- Jikan / AniList 기반 애니메이션 메타데이터 수집
- PostgreSQL DB 캐시 저장
- CSV 기반 한국어 번역 데이터 관리
- 서버 실행 중 실시간 GPT 번역을 하지 않고, 사전 저장된 CSV/DB 번역 데이터 사용
- 누락된 포스터, 평점, 인기도 캐시 보정
- 성인/Hentai/Erotica 콘텐츠 일반 사용자 화면 차단

## 기술 스택

### Frontend

- React
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express
- Prisma
- PostgreSQL
- JWT Authentication
- Swagger

### External API

- Jikan API
- AniList API
- OpenAI API

OpenAI API는 번역 사전 작업용입니다. 서버 실행 중 실시간 번역 호출을 기본 흐름으로 사용하지 않습니다.

## 프로젝트 구조

``​`text
AniPick/
├─ backend/
│  ├─ prisma/
│  │  ├─ schema.prisma
│  │  └─ seed.js
│  ├─ scripts/
│  │  ├─ prefetchAnime.js
│  │  ├─ repairAnimeCache.js
│  │  ├─ translate_pending_ko.py
│  │  └─ translationCoverage.js
│  ├─ src/
│  │  ├─ app.js
│  │  ├─ server.js
│  │  ├─ controllers/
│  │  ├─ routes/
│  │  ├─ services/
│  │  ├─ utils/
│  │  ├─ middlewares/
│  │  ├─ lib/
│  │  └─ swagger/
│  └─ package.json
│
├─ frontend/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ pages/
│  │  ├─ styles/
│  │  └─ utils/
│  └─ package.json
│
└─ README.md
``​`

## 실행 전 준비

### 필수 설치

- Node.js
- npm
- Docker Desktop
- Python 3
- Git

이 프로젝트는 기본적으로 Docker 기반 PostgreSQL을 사용합니다. 따라서 로컬 실행 전에 반드시 Docker Desktop을 먼저 실행해야 합니다.

## 환경변수 설정

### backend/.env

`backend/.env` 파일을 생성하고 아래처럼 작성합니다.

``​`env
DATABASE_URL="postgresql://anipick_user:anipick_password@localhost:5433/anipick_db?schema=public"
JWT_SECRET="change_this_secret"
PORT=4001

OPENAI_API_KEY=""
OPENAI_TRANSLATION_MODEL="gpt-4.1-mini"

BOOTSTRAP_ANIME_ON_START=false
PRETRANSLATE_LIMIT=30
``​`

주의사항:

- `.env` 파일은 GitHub에 올리면 안 됩니다.
- `OPENAI_API_KEY`는 번역 사전 작업이 필요할 때만 사용합니다.
- 서버 실행 중 실시간 번역 호출을 기본 흐름으로 사용하지 않습니다.
- 이미 노출된 API 키는 폐기하고 새로 발급하는 것을 권장합니다.

### frontend/.env

로컬 개발에서는 Vite proxy를 사용한다면 생략할 수 있습니다.

배포 환경에서는 아래처럼 백엔드 주소를 지정합니다.

``​`env
VITE_API_BASE_URL="https://your-backend-url.com/api"
``​`

로컬에서 직접 지정하고 싶다면 아래처럼 작성할 수 있습니다.

``​`env
VITE_API_BASE_URL="http://localhost:4001/api"
``​`

## 로컬 실행 전 DB 준비

AniPick 백엔드는 PostgreSQL 데이터베이스가 먼저 실행되어 있어야 합니다.

기본 DB 연결 주소는 다음과 같습니다.

``​`env
DATABASE_URL="postgresql://anipick_user:anipick_password@localhost:5433/anipick_db?schema=public"
``​`

따라서 로컬 실행 전에 `localhost:5433` 포트에 PostgreSQL이 실행 중이어야 합니다.

### 1. Docker Desktop 실행

Windows에서 Docker Desktop을 먼저 실행합니다.

PowerShell에서 Docker가 정상 실행 중인지 확인합니다.

``​`powershell
docker version
``​`

정상적으로 버전 정보가 출력되면 다음 단계로 진행합니다.

### 2. PostgreSQL 컨테이너 생성

처음 실행하는 경우 아래 명령어로 PostgreSQL 컨테이너를 생성합니다.

``​`powershell
docker run --name anipick_postgres `
  -e POSTGRES_USER=anipick_user `
  -e POSTGRES_PASSWORD=anipick_password `
  -e POSTGRES_DB=anipick_db `
  -p 5433:5432 `
  -d postgres:15
``​`

이미 같은 이름의 컨테이너가 있다면 생성하지 말고 아래 명령어로 실행합니다.

``​`powershell
docker start anipick_postgres
``​`

실행 확인:

``​`powershell
docker ps
``​`

아래와 비슷하게 `5433->5432` 포트가 보이면 정상입니다.

``​`text
0.0.0.0:5433->5432/tcp
``​`

## 처음 실행할 때

처음 실행하거나 DB를 새로 만든 경우 아래 순서대로 실행합니다.

### 1. Docker Desktop 실행

Docker Desktop을 실행합니다.

### 2. PostgreSQL 컨테이너 실행

처음이면 컨테이너를 생성합니다.

``​`powershell
docker run --name anipick_postgres `
  -e POSTGRES_USER=anipick_user `
  -e POSTGRES_PASSWORD=anipick_password `
  -e POSTGRES_DB=anipick_db `
  -p 5433:5432 `
  -d postgres:15
``​`

이미 만든 적이 있다면 실행만 합니다.

``​`powershell
docker start anipick_postgres
``​`

### 3. 백엔드 초기 설정 및 실행

``​`powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\backend"

npm install
npx prisma generate
npx prisma migrate dev
node prisma/seed.js
python scripts/translate_pending_ko.py sync-db
npm run dev
``​`

백엔드 상태 확인:

``​`text
http://localhost:4001/health
``​`

정상 응답 예시:

``​`json
{
  "message": "AniPick backend is running."
}
``​`

### 4. 프론트엔드 실행

새 PowerShell 터미널을 열고 실행합니다.

``​`powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\frontend"

npm install
npm run dev
``​`

프론트 접속:

``​`text
http://localhost:5173
``​`

Swagger 문서:

``​`text
http://localhost:4001/api-docs
``​`

## 평소 실행할 때

이미 `npm install`, `prisma migrate`, `seed`가 끝난 상태라면 아래만 실행하면 됩니다.

### 1. Docker Desktop 실행

먼저 Docker Desktop을 실행합니다.

### 2. PostgreSQL 컨테이너 실행

``​`powershell
docker start anipick_postgres
``​`

### 3. 백엔드 실행

``​`powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\backend"

python scripts/translate_pending_ko.py sync-db
npm run dev
``​`

### 4. 프론트엔드 실행

새 PowerShell 터미널에서 실행합니다.

``​`powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\frontend"

npm run dev
``​`

접속 주소:

``​`text
Frontend: http://localhost:5173
Backend Health Check: http://localhost:4001/health
Swagger: http://localhost:4001/api-docs
``​`

## 데이터까지 새로 갱신할 때

외부 API에서 애니메이션 메타데이터를 다시 가져오고, 번역 CSV를 DB에 반영하고, 누락된 이미지/평점과 성인 콘텐츠 숨김 처리를 함께 수행할 때 사용합니다.

``​`powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\backend"

node scripts/prefetchAnime.js
python scripts/translate_pending_ko.py sync-db
node scripts/repairAnimeCache.js --refresh-missing --limit=100 --apply
node scripts/repairAnimeCache.js --mark-adult --apply
npm run dev
``​`

프론트엔드는 별도 터미널에서 실행합니다.

``​`powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\frontend"

npm run dev
``​`

## 주요 명령어 정리

### 백엔드 개발 서버 실행

``​`powershell
cd backend
npm run dev
``​`

### 프론트엔드 개발 서버 실행

``​`powershell
cd frontend
npm run dev
``​`

### Prisma Client 생성

``​`powershell
cd backend
npx prisma generate
``​`

### DB 마이그레이션

``​`powershell
cd backend
npx prisma migrate dev
``​`

### 관리자 계정 생성 또는 복구

``​`powershell
cd backend
node prisma/seed.js
``​`

### 애니메이션 메타데이터 수집

``​`powershell
cd backend
node scripts/prefetchAnime.js
``​`

### CSV 번역 데이터 DB 반영

``​`powershell
cd backend
python scripts/translate_pending_ko.py sync-db
``​`

### 번역 상태 확인

``​`powershell
cd backend
python scripts/translate_pending_ko.py status
``​`

### PENDING 번역 작업

``​`powershell
cd backend
python scripts/translate_pending_ko.py translate-pending --limit 100 --batch-size 100
python scripts/translate_pending_ko.py sync-db
``​`

### 캐시 진단

``​`powershell
cd backend
node scripts/repairAnimeCache.js
``​`

### 누락 이미지/평점 갱신

``​`powershell
cd backend
node scripts/repairAnimeCache.js --refresh-missing --limit=100 --apply
``​`

### 성인 콘텐츠 숨김 처리

``​`powershell
cd backend
node scripts/repairAnimeCache.js --mark-adult --apply
``​`

### ghost row 정리

``​`powershell
cd backend
node scripts/repairAnimeCache.js --cleanup-ghosts --apply
``​`

### 전체 캐시 정리

``​`powershell
cd backend
node scripts/repairAnimeCache.js --all --apply
``​`

## 관리자 로그인

Seed 실행 시 기본 관리자 계정이 생성됩니다.

``​`text
Email: admin@anipick.com
Password: admin1234
``​`

로그인 화면에서 `admin`이 아니라 반드시 `admin@anipick.com`을 입력해야 합니다.

관리자 API는 JWT 인증 후 `role`이 `ADMIN`인 사용자만 접근할 수 있습니다.

## 관리자가 접속되지 않을 때

### 1. 관리자 계정 다시 생성

백엔드 폴더에서 실행합니다.

``​`powershell
cd backend
node prisma/seed.js
``​`

이 명령은 관리자 계정을 다시 생성하거나 기존 관리자 계정을 갱신합니다.

``​`text
Email: admin@anipick.com
Password: admin1234
Role: ADMIN
``​`

### 2. Prisma Studio에서 확인

``​`powershell
cd backend
npx prisma studio
``​`

브라우저에서 `User` 테이블을 확인합니다.

관리자 계정이 아래처럼 되어 있어야 합니다.

``​`text
email: admin@anipick.com
nickname: admin
role: ADMIN
``​`

### 3. 강제로 관리자 계정 복구

`node prisma/seed.js`로 해결되지 않으면 아래 명령을 실행합니다.

``​`powershell
cd backend

node -e "require('dotenv').config(); const bcrypt=require('bcrypt'); const prisma=require('./src/lib/prisma'); (async()=>{const password=await bcrypt.hash('admin1234',10); await prisma.user.upsert({where:{email:'admin@anipick.com'},update:{password,nickname:'admin',role:'ADMIN'},create:{email:'admin@anipick.com',password,nickname:'admin',role:'ADMIN'}}); console.log('admin ready: admin@anipick.com / admin1234'); await prisma.$disconnect();})().catch(async e=>{console.error(e); await prisma.$disconnect(); process.exit(1);});"
``​`

그 다음 다시 로그인합니다.

``​`text
Email: admin@anipick.com
Password: admin1234
``​`

### 4. 그래도 안 될 때 확인할 것

백엔드가 실행 중인지 확인합니다.

``​`text
http://localhost:4001/health
``​`

로그인 요청이 성공하는지 개발자 도구 Network 탭에서 확인합니다.

``​`text
POST /api/auth/login
``​`

관리자 페이지 접근 시 403이 뜬다면 현재 로그인한 계정이 관리자가 아니거나, JWT token 안의 `role` 값이 `ADMIN`이 아닌 상태입니다.

## 주요 API

### Health Check

``​`http
GET /health
``​`

### Auth

``​`http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
``​`

### Anime

``​`http
GET /api/anime/trending
GET /api/anime/popular-season
GET /api/anime/search
GET /api/anime/:id
GET /api/anime/recommendations
``​`

### Favorites

``​`http
GET    /api/favorites
POST   /api/favorites
DELETE /api/favorites/:animeId
GET    /api/favorites/:animeId/status
``​`

### Reviews

``​`http
GET    /api/reviews/anime/:animeId
GET    /api/reviews/me
POST   /api/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id
``​`

### Watch Status

``​`http
GET    /api/watch-status
PUT    /api/watch-status
DELETE /api/watch-status/:animeId
``​`

### Admin

``​`http
GET    /api/admin/users
GET    /api/admin/reviews
DELETE /api/admin/reviews/:id

GET    /api/admin/anime
GET    /api/admin/anime/:id
PATCH  /api/admin/anime/:id/hide
PATCH  /api/admin/anime/:id/unhide
PATCH  /api/admin/anime/:id/mark-adult
DELETE /api/admin/anime/:id
DELETE /api/admin/anime/:id/hard
``​`

### Swagger

``​`text
http://localhost:4001/api-docs
``​`

## 메인 화면 구조

메인 페이지는 카드 슬라이드 기반으로 구성됩니다.

``​`text
지금 뜨는 애니 TOP 10
지금 인기 있는 애니
이번 시즌 인기작
고평점 추천
``​`

각 카드 rail은 좌우 버튼으로 이동할 수 있으며, 포스터 클릭 시 해당 애니메이션 상세 페이지로 이동합니다.

상세 이동에는 내부 DB ID가 아니라 Jikan/MAL 기준 `externalId`, `malId`, `routeId` 값을 사용합니다.

## 한국어 번역 관리 방식

AniPick은 서버 실행 중 매번 GPT 토큰을 사용해 번역하지 않습니다.

기본 흐름:

``​`text
외부 API에서 원본 애니 정보 수집
→ DB에 Anime 캐시 저장
→ translate_pending_ko.py로 한국어 번역 CSV 생성/관리
→ CSV 번역 데이터를 DB에 sync-db로 반영
→ 프론트에서 DB에 저장된 한국어 제목/설명 표시
``​`

CSV 위치:

``​`text
backend/data/anime_csv/
├─ anime_catalog.csv
└─ items/
``​`

개별 애니 CSV는 provider와 externalId 기준으로 관리됩니다.

예시:

``​`text
JIKAN_5114.csv
JIKAN_9253.csv
``​`

## 캐시 정리 정책

불완전하거나 중복된 Anime 캐시는 `repairAnimeCache.js`를 통해 관리합니다.

지원 작업:

- 누락된 이미지/평점 갱신
- 중복 캐시 탐지
- ghost row 정리
- 성인 콘텐츠 자동 숨김 처리
- dry-run 기본 동작
- `--apply` 옵션을 줄 때만 실제 반영

예시:

``​`powershell
cd backend

node scripts/repairAnimeCache.js
node scripts/repairAnimeCache.js --refresh-missing --limit=100
node scripts/repairAnimeCache.js --refresh-missing --limit=100 --apply
node scripts/repairAnimeCache.js --dedupe
node scripts/repairAnimeCache.js --cleanup-ghosts --apply
node scripts/repairAnimeCache.js --mark-adult --apply
node scripts/repairAnimeCache.js --all --apply
``​`

주의사항:

- 기본 진단은 안전하게 실행할 수 있습니다.
- 실제 DB 반영은 `--apply` 옵션이 있을 때만 수행됩니다.
- 사용자 리뷰, 찜, 시청 상태가 연결된 데이터는 무작정 삭제하지 않는 방향으로 관리합니다.

## 성인 콘텐츠 차단 정책

일반 사용자 화면에서는 아래 콘텐츠를 노출하지 않습니다.

``​`text
Hentai
Erotica
Ecchi
Rx - Hentai
명백한 성인 키워드가 포함된 작품
``​`

성인 콘텐츠는 기본적으로 hard delete가 아니라 soft delete/archive 방식으로 처리합니다.

``​`text
isAdult = true
isHidden = true
dataStatus = ARCHIVED
hiddenReason = ADULT_CONTENT_AUTO_DETECTED
``​`

## GitHub 업로드 전 확인

`.gitignore`에 아래 항목이 포함되어야 합니다.

``​`gitignore
node_modules/
.env
.env.*
backend/.env
frontend/.env
dist/
build/
.DS_Store
.runtime-backend-port
backend/.runtime-port
*.log
``​`

절대 커밋하면 안 되는 값:

``​`text
DATABASE_URL
JWT_SECRET
OPENAI_API_KEY
gpt.jbnu.ai API key
``​`

이미 노출된 API 키는 폐기하고 새로 발급하는 것을 권장합니다.

## GitHub 업로드

프로젝트 루트에서 실행합니다.

``​`powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick"

git status
git add .
git commit -m "Prepare AniPick for deployment"
git branch -M main
git remote set-url origin https://github.com/shy0401/AniPick.git
git push -u origin main
``​`

원격 저장소가 처음인 경우:

``​`powershell
git remote add origin https://github.com/shy0401/AniPick.git
git push -u origin main
``​`

## 배포 가이드

추천 배포 구조:

``​`text
Frontend: Vercel
Backend: Render
Database: Neon PostgreSQL 또는 Supabase PostgreSQL
``​`

### Backend 배포 예시: Render

Render Web Service 설정:

``​`text
Root Directory: backend
Build Command: npm install && npx prisma generate && npx prisma migrate deploy
Start Command: npm run start
``​`

`backend/package.json`에 아래 script가 필요합니다.

``​`json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "seed": "node prisma/seed.js"
  }
}
``​`

Render 환경변수:

``​`env
DATABASE_URL="배포 PostgreSQL URL"
JWT_SECRET="충분히 긴 랜덤 문자열"
PORT=4001
BOOTSTRAP_ANIME_ON_START=false
PRETRANSLATE_LIMIT=30
OPENAI_API_KEY=""
OPENAI_TRANSLATION_MODEL="gpt-4.1-mini"
FRONTEND_URL="https://your-frontend-url.vercel.app"
``​`

배포 후 확인:

``​`text
https://your-backend-url.com/health
``​`

### Frontend 배포 예시: Vercel

Vercel 설정:

``​`text
Root Directory: frontend
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
``​`

Vercel 환경변수:

``​`env
VITE_API_BASE_URL="https://your-backend-url.com/api"
``​`

## 문제 해결

### P1001: Can't reach database server 오류

아래 오류가 발생하면 PostgreSQL DB가 실행 중이 아닌 상태입니다.

``​`text
Error: P1001: Can't reach database server at `localhost:5433`
``​`

해결 방법:

``​`powershell
# Docker Desktop 실행 후

docker start anipick_postgres
docker ps
``​`

그 다음 다시 실행합니다.

``​`powershell
cd backend

npx prisma migrate dev
python scripts/translate_pending_ko.py sync-db
npm run dev
``​`

### Docker 컨테이너가 없다는 오류

아래 명령어에서 컨테이너가 없다는 오류가 나면:

``​`powershell
docker start anipick_postgres
``​`

처음 생성 명령어를 실행합니다.

``​`powershell
docker run --name anipick_postgres `
  -e POSTGRES_USER=anipick_user `
  -e POSTGRES_PASSWORD=anipick_password `
  -e POSTGRES_DB=anipick_db `
  -p 5433:5432 `
  -d postgres:15
``​`

### 프론트에서 API 요청이 실패하는 경우

백엔드가 실행 중인지 확인합니다.

``​`text
http://localhost:4001/health
``​`

프론트 환경변수를 확인합니다.

``​`env
VITE_API_BASE_URL="http://localhost:4001/api"
``​`

로컬 Vite proxy를 사용하는 경우 생략할 수 있습니다.

### CORS 오류가 발생하는 경우

백엔드 CORS 설정에 프론트 주소가 포함되어야 합니다.

로컬 주소:

``​`text
http://localhost:5173
http://127.0.0.1:5173
``​`

배포 주소 예시:

``​`text
https://your-frontend-url.vercel.app
``​`

### 메인 화면 카드 클릭이 안 되는 경우

확인할 것:

``​`text
1. 카드 컴포넌트가 Link로 되어 있는지
2. 상세 URL에 내부 DB id가 아니라 externalId, malId, routeId가 들어가는지
3. 브라우저 콘솔에 routeId missing 경고가 있는지
4. rail의 드래그 이벤트가 일반 클릭을 막고 있지 않은지
``​`

### 애니 포스터가 placeholder로만 보이는 경우

``​`powershell
cd backend

node scripts/repairAnimeCache.js --refresh-missing --limit=100 --apply
``​`

### 평점이 보이지 않는 경우

``​`powershell
cd backend

node scripts/repairAnimeCache.js --refresh-missing --limit=100 --apply
``​`

### 한국어 번역이 PENDING으로 보이는 경우

``​`powershell
cd backend

python scripts/translate_pending_ko.py status
python scripts/translate_pending_ko.py sync-db
``​`

## 라이선스

이 프로젝트는 학습 및 포트폴리오 목적의 프로젝트입니다.

외부 API 데이터와 이미지의 저작권은 각 제공처 및 원저작권자에게 있습니다.
```

### File: `docker-compose.yml`

- size: `383` bytes

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:15
    container_name: anipick_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: anipick_user
      POSTGRES_PASSWORD: anipick_password
      POSTGRES_DB: anipick_db
    ports:
      - "5433:5432"
    volumes:
      - anipick_postgres_data:/var/lib/postgresql/data

volumes:
  anipick_postgres_data:

```

### File: `backend/package.json`

- size: `1,410` bytes

```json
{
  "name": "anipick-backend",
  "version": "1.0.0",
  "private": true,
  "main": "src/server.js",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:reset": "prisma migrate reset",
    "seed": "node prisma/seed.js",
    "db:seed": "node prisma/seed.js",
    "cleanup:anime": "node scripts/cleanupAnimeCache.js",
    "prefetch:anime": "node scripts/prefetchAnime.js",
    "pretranslate:anime": "node scripts/pretranslateAnime.js",
    "bootstrap:anime": "node scripts/bootstrapCatalog.js",
    "anime:cleanup": "node scripts/cleanupAnimeCache.js",
    "anime:repair": "node scripts/repairAnimeCache.js",
    "anime:prefetch": "node scripts/prefetchAnime.js",
    "anime:jobs:create": "node scripts/createTranslationJobs.js",
    "anime:translate": "node scripts/pretranslateAnime.js",
    "anime:coverage": "node scripts/translationCoverage.js"
  },
  "prisma": {
    "seed": "node prisma/seed.js"
  },
  "dependencies": {
    "@prisma/client": "^6.7.0",
    "axios": "^1.9.0",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "openai": "^5.0.0",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.0",
    "prisma": "^6.7.0"
  }
}

```

### File: `frontend/package.json`

- size: `413` bytes

```json
{
  "name": "anipick-frontend",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.9.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^5.4.10"
  }
}

```

### File: `backend/src/server.js`

- size: `2,447` bytes

```javascript
﻿require('dotenv').config();
const fs = require('fs');
const net = require('net');
const path = require('path');

const app = require('./app');

const DEFAULT_START_PORT = 4001;
const MAX_PORT = 4010;

if (!process.env.JWT_SECRET) {
  console.warn('[WARN] JWT_SECRET is not set. Please configure it in your .env file.');
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const tester = net.createServer();

    tester.once('error', () => resolve(false));
    tester.once('listening', () => {
      tester.close(() => resolve(true));
    });

    tester.listen({ port, host: '::', exclusive: true });
  });
}

function writeRuntimePort(port) {
  const backendPortFile = path.resolve(__dirname, '../.runtime-port');
  const rootPortFile = path.resolve(__dirname, '../../.runtime-backend-port');
  const value = String(port);

  fs.writeFileSync(backendPortFile, value, 'utf-8');
  fs.writeFileSync(rootPortFile, value, 'utf-8');

  console.log('Runtime backend port saved to backend/.runtime-port');
  console.log('Runtime backend port saved to .runtime-backend-port');
}

function listenOnPort(port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => resolve(server));
    server.once('error', (error) => reject(error));
  });
}

async function start() {
  const startPort = Number(process.env.PORT) || DEFAULT_START_PORT;

  if (startPort > MAX_PORT) {
    console.error(
      `Start port ${startPort} is greater than max port ${MAX_PORT}. Set PORT between ${DEFAULT_START_PORT}-${MAX_PORT}.`
    );
    process.exit(1);
  }

  for (let port = startPort; port <= MAX_PORT; port += 1) {
    // eslint-disable-next-line no-await-in-loop
    const prechecked = await isPortAvailable(port);
    if (!prechecked) continue;

    try {
      // eslint-disable-next-line no-await-in-loop
      await listenOnPort(port);
      writeRuntimePort(port);
      console.log(`AniPick backend server listening on port ${port}`);
      console.log(`Health check: http://localhost:${port}/health`);
      return;
    } catch (error) {
      if (error.code === 'EADDRINUSE') continue;
      console.error('Failed to start server:', error.message);
      process.exit(1);
    }
  }

  console.error(`No available port found between ${startPort} and ${MAX_PORT}.`);
  process.exit(1);
}

start().catch((error) => {
  console.error('Failed to bootstrap server:', error.message);
  process.exit(1);
});

```

### File: `frontend/index.html`

- size: `295` bytes

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AniPick</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

### File: `backend/src/routes/admin.routes.js`

- size: `2,812` bytes

```javascript
const express = require('express');
const { getUsers, getAllReviews, deleteAnyReview } = require('../controllers/admin.controller');
const {
  getAdminTranslationCoverage,
  getMissingTranslations,
  createAdminTranslationJobs,
  runAdminTranslationJobs,
  putTranslation,
  reviewTranslation,
  retryTranslation,
  getOpenAIModelStatus,
} = require('../controllers/translation.controller');
const {
  getAdminAnimeList,
  getAdminAnimeById,
  hideAdminAnime,
  unhideAdminAnime,
  markAdminAnimeAdult,
  archiveAdminAnime,
  hardDeleteAdminAnime,
} = require('../controllers/adminAnime.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Admin - user list
 *     description: Get all users. Admin only.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User list
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /api/admin/reviews:
 *   get:
 *     summary: Admin - review list
 *     description: Get all reviews. Admin only.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Review list
 */
router.get('/reviews', getAllReviews);

/**
 * @swagger
 * /api/admin/reviews/{id}:
 *   delete:
 *     summary: Admin - delete review
 *     description: Delete any review by id. Admin only.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review removed
 */
router.delete('/reviews/:id', deleteAnyReview);

router.get('/translations/coverage', getAdminTranslationCoverage);
router.get('/translations/openai/models', getOpenAIModelStatus);
router.get('/translations/missing', getMissingTranslations);
router.post('/translations/jobs', createAdminTranslationJobs);
router.post('/translations/jobs/run', runAdminTranslationJobs);
router.put('/translations/:provider/:externalId', putTranslation);
router.post('/translations/:provider/:externalId/review', reviewTranslation);
router.post('/translations/:provider/:externalId/retry', retryTranslation);

router.get('/anime', getAdminAnimeList);
router.get('/anime/:id', getAdminAnimeById);
router.patch('/anime/:id/hide', hideAdminAnime);
router.patch('/anime/:id/unhide', unhideAdminAnime);
router.patch('/anime/:id/mark-adult', markAdminAnimeAdult);
router.delete('/anime/:id', archiveAdminAnime);
router.delete('/anime/:id/hard', hardDeleteAdminAnime);

module.exports = router;

```

### File: `backend/src/routes/anime.routes.js`

- size: `3,461` bytes

```javascript
const express = require('express');
const {
  getTrendingAnime,
  getPopularThisSeason,
  searchAnime,
  getAnimeDetail,
  getRecommendations,
  testProvider,
  testAniListConnection,
  debugAnimeTitle,
} = require('../controllers/anime.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/anime/trending:
 *   get:
 *     summary: Get trending anime
 *     description: Fetch trending anime from AniList using GraphQL API.
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: Trending anime list
 */
router.get('/trending', getTrendingAnime);

/**
 * @swagger
 * /api/anime/popular-season:
 *   get:
 *     summary: Get popular anime in current season
 *     description: Fetch season-based popular anime using current season and year.
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: Seasonal popular anime list
 */
router.get('/popular-season', getPopularThisSeason);

/**
 * @swagger
 * /api/anime/search:
 *   get:
 *     summary: Search anime with filters
 *     description: Search anime by keyword, genre, year, season, format with pagination.
 *     tags: [Anime]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *       - in: query
 *         name: season
 *         schema:
 *           type: string
 *           enum: [WINTER, SPRING, SUMMER, FALL]
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [TV, TV_SHORT, MOVIE, SPECIAL, OVA, ONA, MUSIC]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/search', searchAnime);
router.get('/test-provider', testProvider);

/**
 * @swagger
 * /api/anime/test-anilist:
 *   get:
 *     summary: Test AniList connection
 *     description: Sends a minimal query to AniList and returns one sample record.
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: Connection test result
 */
router.get('/test-anilist', testAniListConnection);
router.get('/debug-title/:id', debugAnimeTitle);

/**
 * @swagger
 * /api/anime/recommendations:
 *   get:
 *     summary: Get personalized recommendations
 *     description: Recommend by top genre from user's favorites. Fallback to trending when favorites are empty.
 *     tags: [Anime]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recommendation list
 */
router.get('/recommendations', authMiddleware, getRecommendations);

/**
 * @swagger
 * /api/anime/{id}:
 *   get:
 *     summary: Get anime detail by AniList ID
 *     description: Fetch a single anime detail with description and studio info.
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Anime detail
 */
router.get('/:id', getAnimeDetail);

module.exports = router;

```

### File: `backend/src/routes/auth.routes.js`

- size: `2,027` bytes

```javascript
const express = require('express');
const { register, login, me } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     description: Create a new AniPick user account.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, nickname]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *               nickname:
 *                 type: string
 *                 example: otaku_user
 *     responses:
 *       201:
 *         description: User registered
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Login with email and password to get JWT.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login success
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user
 *     description: Return profile information from JWT-authenticated user.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 */
router.get('/me', authMiddleware, me);

module.exports = router;

```

### File: `backend/src/routes/favorite.routes.js`

- size: `2,523` bytes

```javascript
const express = require('express');
const {
  getMyFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
} = require('../controllers/favorite.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get my favorites
 *     description: Return authenticated user's favorite anime list.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Favorite list
 */
router.get('/', getMyFavorites);

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add favorite
 *     description: Add anime to favorites. Duplicate favorite is prevented.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [animeId, animeTitle]
 *             properties:
 *               animeId:
 *                 type: integer
 *                 example: 1
 *               animeTitle:
 *                 type: string
 *                 example: Cowboy Bebop
 *               animeImage:
 *                 type: string
 *                 example: https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1.jpg
 *     responses:
 *       201:
 *         description: Favorite created
 */
router.post('/', addFavorite);

/**
 * @swagger
 * /api/favorites/{animeId}:
 *   delete:
 *     summary: Remove favorite
 *     description: Remove anime from favorites by animeId.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: animeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorite removed
 */
router.delete('/:animeId', removeFavorite);

/**
 * @swagger
 * /api/favorites/{animeId}/status:
 *   get:
 *     summary: Check favorite status
 *     description: Return whether authenticated user already favorited this anime.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: animeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorite status
 */
router.get('/:animeId/status', checkFavorite);

module.exports = router;

```

### File: `backend/src/routes/notice.routes.js`

- size: `1,691` bytes

```javascript
const express = require('express');
const { getNotices, createNotice, deleteNotice } = require('../controllers/notice.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/notices:
 *   get:
 *     summary: Get notices
 *     description: Public notice list.
 *     tags: [Notices]
 *     responses:
 *       200:
 *         description: Notice list
 */
router.get('/', getNotices);

/**
 * @swagger
 * /api/notices:
 *   post:
 *     summary: Create notice
 *     description: Create notice. Admin only.
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notice created
 */
router.post('/', authMiddleware, adminMiddleware, createNotice);

/**
 * @swagger
 * /api/notices/{id}:
 *   delete:
 *     summary: Delete notice
 *     description: Delete notice by id. Admin only.
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notice removed
 */
router.delete('/:id', authMiddleware, adminMiddleware, deleteNotice);

module.exports = router;

```

### File: `backend/src/routes/review.routes.js`

- size: `2,823` bytes

```javascript
const express = require('express');
const {
  getReviewsByAnime,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/reviews/anime/{animeId}:
 *   get:
 *     summary: Get reviews by anime id
 *     description: Return all reviews for specific anime with reviewer nickname.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: animeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Anime reviews
 */
router.get('/anime/:animeId', getReviewsByAnime);

/**
 * @swagger
 * /api/reviews/me:
 *   get:
 *     summary: Get my reviews
 *     description: Return authenticated user's own reviews.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: My reviews
 */
router.get('/me', authMiddleware, getMyReviews);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create review
 *     description: Create a review for an anime with rating from 1 to 5.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [animeId, rating, content]
 *             properties:
 *               animeId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 */
router.post('/', authMiddleware, createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update review
 *     description: Update own review (or any review if ADMIN).
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review updated
 */
router.put('/:id', authMiddleware, updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete review
 *     description: Delete own review (or any review if ADMIN).
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review deleted
 */
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;

```

### File: `backend/src/routes/translation.routes.js`

- size: `814` bytes

```javascript
﻿const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const {
  getTranslations,
  putTranslation,
  autoTranslate,
  deleteTranslation,
  getOpenAIModelStatus,
} = require('../controllers/translation.controller');

const router = express.Router();

router.get('/openai/models', authMiddleware, adminMiddleware, getOpenAIModelStatus);
router.get('/:provider/:externalId', getTranslations);
router.put('/:provider/:externalId', authMiddleware, adminMiddleware, putTranslation);
router.post('/:provider/:externalId/auto', authMiddleware, adminMiddleware, autoTranslate);
router.delete('/:provider/:externalId/:lang', authMiddleware, adminMiddleware, deleteTranslation);

module.exports = router;

```

### File: `backend/src/routes/watchStatus.routes.js`

- size: `2,046` bytes

```javascript
const express = require('express');
const {
  getMyWatchStatus,
  upsertWatchStatus,
  removeWatchStatus,
} = require('../controllers/watchStatus.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/watch-status:
 *   get:
 *     summary: Get my watch status list
 *     description: Return authenticated user's watch status records.
 *     tags: [Watch Status]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Watch status list
 */
router.get('/', getMyWatchStatus);

/**
 * @swagger
 * /api/watch-status:
 *   put:
 *     summary: Upsert watch status
 *     description: Create or update watch status by userId + animeId.
 *     tags: [Watch Status]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [animeId, animeTitle, status]
 *             properties:
 *               animeId:
 *                 type: integer
 *               animeTitle:
 *                 type: string
 *               animeImage:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PLAN_TO_WATCH, WATCHING, COMPLETED, DROPPED]
 *     responses:
 *       200:
 *         description: Watch status saved
 */
router.put('/', upsertWatchStatus);

/**
 * @swagger
 * /api/watch-status/{animeId}:
 *   delete:
 *     summary: Remove watch status
 *     description: Delete authenticated user's watch status record by animeId.
 *     tags: [Watch Status]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: animeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Watch status removed
 */
router.delete('/:animeId', removeWatchStatus);

module.exports = router;

```

### File: `frontend/src/api/adminApi.js`

- size: `1,130` bytes

```javascript
import apiClient from './client';

export const adminApi = {
  async getUsers() {
    const { data } = await apiClient.get('/admin/users');
    return data;
  },
  async getAllReviews() {
    const { data } = await apiClient.get('/admin/reviews');
    return data;
  },
  async deleteReview(id) {
    const { data } = await apiClient.delete(`/admin/reviews/${id}`);
    return data;
  },
  async getAnime(params = {}) {
    const { data } = await apiClient.get('/admin/anime', { params });
    return data;
  },
  async getAnimeById(id) {
    const { data } = await apiClient.get(`/admin/anime/${id}`);
    return data;
  },
  async hideAnime(id, reason) {
    const { data } = await apiClient.patch(`/admin/anime/${id}/hide`, { reason });
    return data;
  },
  async unhideAnime(id) {
    const { data } = await apiClient.patch(`/admin/anime/${id}/unhide`);
    return data;
  },
  async markAnimeAdult(id) {
    const { data } = await apiClient.patch(`/admin/anime/${id}/mark-adult`);
    return data;
  },
  async archiveAnime(id) {
    const { data } = await apiClient.delete(`/admin/anime/${id}`);
    return data;
  },
};

```

### File: `frontend/src/api/animeApi.js`

- size: `1,519` bytes

```javascript
import apiClient from './client';

function normalizeAnimeListResponse(data) {
  if (Array.isArray(data)) {
    return {
      items: data,
      pageInfo: {
        currentPage: 1,
        perPage: data.length,
        total: data.length,
        lastPage: 1,
        hasNextPage: false,
      },
      isFallback: false,
      message: '',
    };
  }

  const items = Array.isArray(data?.items) ? data.items : [];
  return {
    ...data,
    items,
    pageInfo:
      data?.pageInfo || {
        currentPage: 1,
        perPage: items.length,
        total: items.length,
        lastPage: 1,
        hasNextPage: false,
      },
    isFallback: Boolean(data?.isFallback),
    message: data?.message || '',
  };
}

export const animeApi = {
  async getTrending(params = {}) {
    const { data } = await apiClient.get('/anime/trending', { params });
    return Array.isArray(data) ? data : normalizeAnimeListResponse(data).items;
  },
  async getPopularSeason(params = {}) {
    const { data } = await apiClient.get('/anime/popular-season', { params });
    return normalizeAnimeListResponse(data);
  },
  async searchAnime(params = {}) {
    const { data } = await apiClient.get('/anime/search', { params });
    return normalizeAnimeListResponse(data);
  },
  async getAnimeDetail(id) {
    const { data } = await apiClient.get(`/anime/${id}`);
    return data;
  },
  async getRecommendations(params = {}) {
    const { data } = await apiClient.get('/anime/recommendations', { params });
    return data;
  },
};

```

### File: `frontend/src/api/authApi.js`

- size: `389` bytes

```javascript
import apiClient from './client';

export const authApi = {
  async register(payload) {
    const { data } = await apiClient.post('/auth/register', payload);
    return data;
  },
  async login(payload) {
    const { data } = await apiClient.post('/auth/login', payload);
    return data;
  },
  async me() {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },
};

```

### File: `frontend/src/api/client.js`

- size: `998` bytes

```javascript
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const lang = localStorage.getItem('anipick_lang') || 'ko';

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['X-AniPick-Lang'] = lang;

  const method = String(config.method || 'get').toLowerCase();
  if (method === 'get') {
    config.params = {
      ...(config.params || {}),
      lang,
    };
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('anipick:unauthorized'));
    }

    return Promise.reject(error);
  }
);

export default apiClient;

```

### File: `frontend/src/api/favoriteApi.js`

- size: `545` bytes

```javascript
import apiClient from './client';

export const favoriteApi = {
  async getFavorites() {
    const { data } = await apiClient.get('/favorites');
    return data;
  },
  async addFavorite(payload) {
    const { data } = await apiClient.post('/favorites', payload);
    return data;
  },
  async removeFavorite(animeId) {
    const { data } = await apiClient.delete(`/favorites/${animeId}`);
    return data;
  },
  async checkFavorite(animeId) {
    const { data } = await apiClient.get(`/favorites/${animeId}/status`);
    return data;
  },
};

```

### File: `frontend/src/api/noticeApi.js`

- size: `395` bytes

```javascript
import apiClient from './client';

export const noticeApi = {
  async getNotices() {
    const { data } = await apiClient.get('/notices');
    return data;
  },
  async createNotice(payload) {
    const { data } = await apiClient.post('/notices', payload);
    return data;
  },
  async deleteNotice(id) {
    const { data } = await apiClient.delete(`/notices/${id}`);
    return data;
  },
};

```

### File: `frontend/src/api/reviewApi.js`

- size: `657` bytes

```javascript
import apiClient from './client';

export const reviewApi = {
  async getReviewsByAnime(animeId) {
    const { data } = await apiClient.get(`/reviews/anime/${animeId}`);
    return data;
  },
  async getMyReviews() {
    const { data } = await apiClient.get('/reviews/me');
    return data;
  },
  async createReview(payload) {
    const { data } = await apiClient.post('/reviews', payload);
    return data;
  },
  async updateReview(id, payload) {
    const { data } = await apiClient.put(`/reviews/${id}`, payload);
    return data;
  },
  async deleteReview(id) {
    const { data } = await apiClient.delete(`/reviews/${id}`);
    return data;
  },
};

```

### File: `frontend/src/api/translationApi.js`

- size: `1,804` bytes

```javascript
﻿import apiClient from './client';

export const translationApi = {
  async getOpenAIModels() {
    const { data } = await apiClient.get('/admin/translations/openai/models');
    return data;
  },
  async getCoverage() {
    const { data } = await apiClient.get('/admin/translations/coverage');
    return data;
  },
  async getMissingTranslations(params = {}) {
    const { data } = await apiClient.get('/admin/translations/missing', { params });
    return data;
  },
  async createJobs(payload) {
    const { data } = await apiClient.post('/admin/translations/jobs', payload);
    return data;
  },
  async runJobs(payload) {
    const { data } = await apiClient.post('/admin/translations/jobs/run', payload);
    return data;
  },
  async getTranslations(provider, externalId) {
    const { data } = await apiClient.get(`/translations/${provider}/${externalId}`);
    return data;
  },
  async upsertTranslation(provider, externalId, payload) {
    const { data } = await apiClient.put(`/admin/translations/${provider}/${externalId}`, payload);
    return data;
  },
  async autoTranslate(provider, externalId, payload) {
    const { data } = await apiClient.post(`/translations/${provider}/${externalId}/auto`, payload);
    return data;
  },
  async reviewTranslation(provider, externalId, payload) {
    const { data } = await apiClient.post(`/admin/translations/${provider}/${externalId}/review`, payload);
    return data;
  },
  async retryTranslation(provider, externalId, payload) {
    const { data } = await apiClient.post(`/admin/translations/${provider}/${externalId}/retry`, payload);
    return data;
  },
  async deleteTranslation(provider, externalId, lang) {
    const { data } = await apiClient.delete(`/translations/${provider}/${externalId}/${lang}`);
    return data;
  },
};

```

### File: `frontend/src/api/watchStatusApi.js`

- size: `440` bytes

```javascript
import apiClient from './client';

export const watchStatusApi = {
  async getMyWatchStatus() {
    const { data } = await apiClient.get('/watch-status');
    return data;
  },
  async upsertWatchStatus(payload) {
    const { data } = await apiClient.put('/watch-status', payload);
    return data;
  },
  async removeWatchStatus(animeId) {
    const { data } = await apiClient.delete(`/watch-status/${animeId}`);
    return data;
  },
};

```

### File: `backend/prisma/migrations/20260427120508_init/migration.sql`

- size: `2,599` bytes

```sql
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "WatchState" AS ENUM ('PLAN_TO_WATCH', 'WATCHING', 'COMPLETED', 'DROPPED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "animeId" INTEGER NOT NULL,
    "animeTitle" TEXT NOT NULL,
    "animeImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "animeId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchStatus" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "animeId" INTEGER NOT NULL,
    "animeTitle" TEXT NOT NULL,
    "animeImage" TEXT,
    "status" "WatchState" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WatchStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_animeId_key" ON "Favorite"("userId", "animeId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchStatus_userId_animeId_key" ON "WatchStatus"("userId", "animeId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchStatus" ADD CONSTRAINT "WatchStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

### File: `backend/prisma/migrations/20260429095031_add_anime_translations/migration.sql`

- size: `1,845` bytes

```sql
-- CreateTable
CREATE TABLE "Anime" (
    "id" SERIAL NOT NULL,
    "provider" TEXT NOT NULL,
    "externalId" INTEGER NOT NULL,
    "romajiTitle" TEXT,
    "englishTitle" TEXT,
    "nativeTitle" TEXT,
    "imageUrl" TEXT,
    "bannerUrl" TEXT,
    "genres" TEXT,
    "averageScore" INTEGER,
    "episodes" INTEGER,
    "status" TEXT,
    "season" TEXT,
    "seasonYear" INTEGER,
    "format" TEXT,
    "siteUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeTranslation" (
    "id" SERIAL NOT NULL,
    "animeId" INTEGER NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "source" TEXT NOT NULL DEFAULT 'GPT',
    "status" TEXT NOT NULL DEFAULT 'AUTO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnimeTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Anime_provider_externalId_idx" ON "Anime"("provider", "externalId");

-- CreateIndex
CREATE INDEX "Anime_seasonYear_idx" ON "Anime"("seasonYear");

-- CreateIndex
CREATE INDEX "Anime_status_idx" ON "Anime"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Anime_provider_externalId_key" ON "Anime"("provider", "externalId");

-- CreateIndex
CREATE INDEX "AnimeTranslation_lang_idx" ON "AnimeTranslation"("lang");

-- CreateIndex
CREATE INDEX "AnimeTranslation_animeId_lang_idx" ON "AnimeTranslation"("animeId", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeTranslation_animeId_lang_key" ON "AnimeTranslation"("animeId", "lang");

-- AddForeignKey
ALTER TABLE "AnimeTranslation" ADD CONSTRAINT "AnimeTranslation_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

### File: `backend/prisma/migrations/20260429124736_add_anime_cache_translation/migration.sql`

- size: `139` bytes

```sql
-- AlterTable
ALTER TABLE "Anime" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE INDEX "Anime_format_idx" ON "Anime"("format");

```

### File: `backend/prisma/migrations/20260429125705_add_anime_cache_translation/migration.sql`

- size: `82` bytes

```sql
-- AlterTable
ALTER TABLE "AnimeTranslation" ADD COLUMN     "failureReason" TEXT;

```

### File: `backend/prisma/migrations/20260501050800_add_translation_jobs_and_metadata/migration.sql`

- size: `1,929` bytes

```sql
-- AlterTable
ALTER TABLE "Anime" ADD COLUMN IF NOT EXISTS "popularity" INTEGER;
ALTER TABLE "Anime" ADD COLUMN IF NOT EXISTS "sourcePayload" JSONB;
ALTER TABLE "Anime" ADD COLUMN IF NOT EXISTS "dataStatus" TEXT NOT NULL DEFAULT 'ACTIVE';
ALTER TABLE "Anime" ADD COLUMN IF NOT EXISTS "lastSyncedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "AnimeTranslation" ADD COLUMN IF NOT EXISTS "reviewedBy" INTEGER;
ALTER TABLE "AnimeTranslation" ADD COLUMN IF NOT EXISTS "reviewedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE IF NOT EXISTS "TranslationJob" (
    "id" SERIAL NOT NULL,
    "animeId" INTEGER NOT NULL,
    "lang" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "model" TEXT,
    "promptHash" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "requestedBy" TEXT NOT NULL DEFAULT 'SYSTEM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "TranslationJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Anime_seasonYear_season_idx" ON "Anime"("seasonYear", "season");
CREATE INDEX IF NOT EXISTS "Anime_averageScore_idx" ON "Anime"("averageScore");
CREATE INDEX IF NOT EXISTS "Anime_popularity_idx" ON "Anime"("popularity");
CREATE INDEX IF NOT EXISTS "AnimeTranslation_lang_status_idx" ON "AnimeTranslation"("lang", "status");
CREATE UNIQUE INDEX IF NOT EXISTS "TranslationJob_animeId_lang_key" ON "TranslationJob"("animeId", "lang");
CREATE INDEX IF NOT EXISTS "TranslationJob_status_lang_idx" ON "TranslationJob"("status", "lang");

-- AddForeignKey
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'TranslationJob_animeId_fkey'
  ) THEN
    ALTER TABLE "TranslationJob"
    ADD CONSTRAINT "TranslationJob_animeId_fkey"
    FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

```

### File: `backend/prisma/migrations/20260501072400_add_anime_score_metrics/migration.sql`

- size: `170` bytes

```sql
-- AlterTable
ALTER TABLE "Anime" ADD COLUMN     "favorites" INTEGER,
ADD COLUMN     "members" INTEGER,
ADD COLUMN     "rank" INTEGER,
ADD COLUMN     "scoredBy" INTEGER;

```

### File: `backend/prisma/migrations/20260502090000_add_anime_visibility_flags/migration.sql`

- size: `259` bytes

```sql
ALTER TABLE "Anime"
  ADD COLUMN IF NOT EXISTS "isAdult" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "isHidden" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "hiddenReason" TEXT,
  ADD COLUMN IF NOT EXISTS "hiddenAt" TIMESTAMP(3);

```

### File: `backend/prisma/migrations/migration_lock.toml`

- size: `128` bytes

```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"

```

### File: `frontend/vite.config.js`

- size: `688` bytes

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function readBackendPort() {
  const portFile = path.resolve(__dirname, '../.runtime-backend-port');

  try {
    const raw = fs.readFileSync(portFile, 'utf-8').trim();
    const port = Number(raw);
    if (Number.isInteger(port) && port > 0) return port;
    return 4001;
  } catch {
    return 4001;
  }
}

const backendPort = readBackendPort();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: `http://localhost:${backendPort}`,
        changeOrigin: true,
      },
    },
  },
});

```

### File: `all.py`

- size: `925` bytes

```python
import os

def merge_code(root_dir, output_file):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk(root_dir):
            # 제외할 폴더 설정 (예: .git, node_modules 등)
            dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '__pycache__']]
            for file in files:
                if file.endswith(('.py', '.js', '.ts', '.java', '.c', '.cpp', '.h')): # 필요한 확장자 추가
                    file_path = os.path.join(root, file)
                    outfile.write(f"\n\n{'='*20}\nFile: {file_path}\n{'='*20}\n\n")
                    try:
                        with open(file_path, 'r', encoding='utf-8') as infile:
                            outfile.write(infile.read())
                    except:
                        outfile.write("// 파일 읽기 실패\n")

merge_code('./', 'project_combined.txt')
```

### File: `backend/.env.example`

- size: `625` bytes

```dotenv
DATABASE_URL="postgresql://anipick_user:anipick_password@localhost:5433/anipick_db?schema=public"
JWT_SECRET="change_this_secret"
# PORT is the start port. If occupied, backend auto-scans up to 4010.
PORT=4001
OPENAI_API_KEY="your_openai_api_key_here"
# Leave empty to auto-select an accessible model for this project.
OPENAI_TRANSLATION_MODEL=""
OPENAI_TRANSLATION_MODEL_CANDIDATES="gpt-4o-mini,gpt-4.1-mini,gpt-4.1-nano,gpt-5-mini,gpt-5-nano,gpt-5.4-mini,gpt-5.4-nano,gpt-5.5"
BOOTSTRAP_ANIME_ON_START=false
PRETRANSLATE_LIMIT=30
ENABLE_ADMIN_TRANSLATION=true
JIKAN_RATE_LIMIT_PER_SECOND=2
ANILIST_RATE_LIMIT_PER_MINUTE=60

```

### File: `backend/prisma/seed.js`

- size: `3,840` bytes

```javascript
﻿require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { animeTranslations } = require('../src/data/animeTranslations');

const prisma = new PrismaClient();

async function seedAdmin() {
  const password = await bcrypt.hash('admin1234', 10);

  await prisma.user.upsert({
    where: { email: 'admin@anipick.com' },
    update: {
      password,
      nickname: 'admin',
      role: 'ADMIN',
    },
    create: {
      email: 'admin@anipick.com',
      password,
      nickname: 'admin',
      role: 'ADMIN',
    },
  });
}

async function upsertSeedTranslation(animeId, payload) {
  const existing = await prisma.animeTranslation.findUnique({
    where: {
      animeId_lang: {
        animeId,
        lang: payload.lang,
      },
    },
  });

  if (existing?.source === 'MANUAL') return false;

  await prisma.animeTranslation.upsert({
    where: {
      animeId_lang: {
        animeId,
        lang: payload.lang,
      },
    },
    create: payload,
    update: payload,
  });

  return true;
}

async function seedAnimeTranslations() {
  let seeded = 0;

  const entries = Object.entries(animeTranslations || {});
  for (const [externalIdText, data] of entries) {
    const externalId = Number(externalIdText);
    if (!Number.isInteger(externalId) || externalId <= 0) continue;

    const anime = await prisma.anime.upsert({
      where: {
        provider_externalId: {
          provider: 'JIKAN',
          externalId,
        },
      },
      create: {
        provider: 'JIKAN',
        externalId,
        romajiTitle: data.enTitle || data.koTitle || data.jaTitle || null,
        englishTitle: data.enTitle || data.koTitle || data.jaTitle || null,
        nativeTitle: data.jaTitle || data.koTitle || data.enTitle || null,
        description: data.enDescription || null,
      },
      update: {
        romajiTitle: data.enTitle || data.koTitle || data.jaTitle || null,
        englishTitle: data.enTitle || data.koTitle || data.jaTitle || null,
        nativeTitle: data.jaTitle || data.koTitle || data.enTitle || null,
        description: data.enDescription || undefined,
      },
    });

    const payloads = [
      {
        animeId: anime.id,
        lang: 'ko',
        title: data.koTitle || null,
        description: data.koDescription || null,
        source: 'SEED',
        status: data.koDescription ? 'REVIEWED' : 'TITLE_ONLY',
        failureReason: null,
      },
      {
        animeId: anime.id,
        lang: 'en',
        title: data.enTitle || null,
        description: data.enDescription || null,
        source: 'SEED',
        status: data.enDescription ? 'REVIEWED' : 'TITLE_ONLY',
        failureReason: null,
      },
      {
        animeId: anime.id,
        lang: 'ja',
        title: data.jaTitle || null,
        description: data.jaDescription || null,
        source: 'SEED',
        status: data.jaDescription ? 'REVIEWED' : 'TITLE_ONLY',
        failureReason: null,
      },
    ];

    for (const payload of payloads) {
      if (!payload.title && !payload.description) continue;
      // eslint-disable-next-line no-await-in-loop
      const changed = await upsertSeedTranslation(anime.id, payload);
      if (changed) seeded += 1;
    }
  }

  return seeded;
}

async function main() {
  await seedAdmin();
  const seededCount = await seedAnimeTranslations();

  console.log('Seed completed: admin user and anime translations seeded.');
  console.log(`Seeded anime translations: ${seededCount}`);
}

main()
  .catch((error) => {
    console.error('[SEED] Failed to seed data:', error.message);
    console.error('[SEED] DB가 실행 중인지 확인하세요.');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

```

### File: `backend/scripts/bootstrapCatalog.js`

- size: `1,165` bytes

```javascript
require('dotenv').config();
const { prefetchAndCacheAnimeCatalog } = require('../src/services/anime-prefetch.service');
const { createMissingTranslationJobs } = require('../src/services/translation-job.service');

function getArg(name, fallback = '') {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

(async () => {
  try {
    const limit = Number(getArg('limit', process.env.PRETRANSLATE_LIMIT || 30));
    const langs = getArg('langs', 'ko,ja').split(',').map((lang) => lang.trim());

    console.log('[BOOTSTRAP] metadata prefetch started');
    const prefetchSummary = await prefetchAndCacheAnimeCatalog();
    console.log('[BOOTSTRAP] metadata prefetch completed:', prefetchSummary);

    console.log('[BOOTSTRAP] translation job creation started');
    const jobs = await createMissingTranslationJobs({ langs, limit, requestedBy: 'BOOTSTRAP' });
    console.log(`[BOOTSTRAP] translation jobs created: ${jobs.length}`);
    process.exit(0);
  } catch (error) {
    console.error('[BOOTSTRAP] failed:', error.message);
    process.exit(1);
  }
})();

```

### File: `backend/scripts/cleanupAnimeCache.js`

- size: `456` bytes

```javascript
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const scriptPath = path.resolve(__dirname, 'repairAnimeCache.js');
const forwardedArgs = process.argv.slice(2);
const args = [scriptPath, '--cleanup-ghosts', ...forwardedArgs];

const result = spawnSync(process.execPath, args, {
  stdio: 'inherit',
  env: process.env,
});

if (typeof result.status === 'number') {
  process.exit(result.status);
}

process.exit(1);


```

### File: `backend/scripts/createTranslationJobs.js`

- size: `762` bytes

```javascript
require('dotenv').config();
const { createMissingTranslationJobs } = require('../src/services/translation-job.service');

function getArg(name, fallback = '') {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

(async () => {
  try {
    const limit = Number(getArg('limit', 100));
    const langs = getArg('langs', 'ko,ja').split(',').map((lang) => lang.trim());
    const jobs = await createMissingTranslationJobs({ langs, limit, requestedBy: 'CLI' });
    console.log(`[JOBS] created translation jobs: ${jobs.length}`);
    process.exit(0);
  } catch (error) {
    console.error('[JOBS] create failed:', error.message);
    process.exit(1);
  }
})();

```

### File: `backend/scripts/prefetchAnime.js`

- size: `481` bytes

```javascript
﻿require('dotenv').config();
const { prefetchAndCacheAnimeCatalog } = require('../src/services/anime-prefetch.service');

(async () => {
  try {
    console.log('[BOOT] Prefetch anime catalog started');
    const summary = await prefetchAndCacheAnimeCatalog();
    console.log('[BOOT] Prefetch anime catalog completed:', summary);
    process.exit(0);
  } catch (error) {
    console.error('[BOOT] Prefetch anime catalog failed:', error.message);
    process.exit(1);
  }
})();

```

### File: `backend/scripts/pretranslateAnime.js`

- size: `909` bytes

```javascript
require('dotenv').config();
const { runTranslationJobs } = require('../src/services/translation-job.service');

function getArg(name, fallback = '') {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

(async () => {
  try {
    const limit = Number(getArg('limit', process.env.PRETRANSLATE_LIMIT || 30));
    const langs = getArg('langs', 'ko,ja').split(',').map((lang) => lang.trim());
    const overwrite = getArg('overwrite', 'false') === 'true';

    console.log('[JOBS] translation job runner started');
    const summary = await runTranslationJobs({ langs, limit, overwrite });
    console.log('[JOBS] translation job runner completed:', summary);
    process.exit(0);
  } catch (error) {
    console.error('[JOBS] translation job runner failed:', error.message);
    process.exit(1);
  }
})();

```

### File: `backend/scripts/repairAnimeCache.js`

- size: `18,740` bytes

```javascript
require('dotenv').config();

const prisma = require('../src/lib/prisma');
const { getAnimeById } = require('../src/services/jikan.service');
const { normalizeJikanAnime } = require('../src/services/anime-normalizer.service');
const { upsertAnimeCache } = require('../src/services/anime-cache.service');
const { isAdultAnime } = require('../src/utils/animeContentSafety');

function parseArgs(argv) {
  const args = argv.slice(2);
  const readValue = (key, fallback) => {
    const hit = args.find((item) => item.startsWith(`${key}=`));
    if (!hit) return fallback;
    return hit.split('=').slice(1).join('=');
  };

  const has = (key) => args.includes(key);
  const limit = Number(readValue('--limit', 100));

  const options = {
    apply: has('--apply'),
    all: has('--all'),
    refreshMissing: has('--refresh-missing'),
    dedupe: has('--dedupe'),
    cleanupGhosts: has('--cleanup-ghosts'),
    markAdult: has('--mark-adult'),
    hardDelete: has('--hard-delete'),
    limit: Number.isFinite(limit) && limit > 0 ? Math.min(limit, 1000) : 100,
  };

  if (options.all) {
    options.refreshMissing = true;
    options.dedupe = true;
    options.cleanupGhosts = true;
    options.markAdult = true;
  }

  return options;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidUrl(value) {
  return isText(value) && /^https?:\/\//i.test(value.trim());
}

function isPlaceholderImage(url) {
  const value = String(url || '').toLowerCase();
  if (!value) return false;
  return value.includes('placehold.co') || value.includes('placeholder') || value.includes('anipick');
}

function isPositive(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0;
}

function isLikelyJikanOrigin(row) {
  const siteUrl = String(row?.siteUrl || '').toLowerCase();
  if (siteUrl.includes('myanimelist.net')) return true;

  const payload = row?.sourcePayload;
  if (payload && typeof payload === 'object') {
    if (Number.isFinite(Number(payload.mal_id)) && Number(payload.mal_id) > 0) return true;
    const payloadUrl = String(payload.url || '').toLowerCase();
    if (payloadUrl.includes('myanimelist.net')) return true;
  }

  return false;
}

function normalizeTitle(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9가-힣ぁ-んァ-ン一-龥]/g, '')
    .trim();
}

async function getUserAnimeIdSet() {
  const [favorites, reviews, watchStatuses] = await Promise.all([
    prisma.favorite.findMany({ select: { animeId: true } }),
    prisma.review.findMany({ select: { animeId: true } }),
    prisma.watchStatus.findMany({ select: { animeId: true } }),
  ]);

  return new Set([
    ...favorites.map((row) => Number(row.animeId)),
    ...reviews.map((row) => Number(row.animeId)),
    ...watchStatuses.map((row) => Number(row.animeId)),
  ]);
}

async function printDiagnostics() {
  const [
    totalAnime,
    missingImage,
    placeholderImage,
    missingScore,
    missingTitle,
    duplicateProviderExternal,
    invalidJikanExternal,
    koTranslations,
  ] = await Promise.all([
    prisma.anime.count(),
    prisma.anime.count({
      where: {
        OR: [{ imageUrl: null }, { imageUrl: '' }],
      },
    }),
    prisma.anime.count({
      where: {
        OR: [
          { imageUrl: { contains: 'placehold.co', mode: 'insensitive' } },
          { imageUrl: { contains: 'placeholder', mode: 'insensitive' } },
          { imageUrl: { contains: 'AniPick', mode: 'insensitive' } },
        ],
      },
    }),
    prisma.anime.count({
      where: {
        OR: [{ averageScore: null }, { averageScore: 0 }],
      },
    }),
    prisma.anime.count({
      where: {
        AND: [
          { OR: [{ romajiTitle: null }, { romajiTitle: '' }] },
          { OR: [{ englishTitle: null }, { englishTitle: '' }] },
          { OR: [{ nativeTitle: null }, { nativeTitle: '' }] },
        ],
      },
    }),
    prisma.$queryRaw`
      SELECT provider, "externalId", COUNT(*)::int AS count
      FROM "Anime"
      GROUP BY provider, "externalId"
      HAVING COUNT(*) > 1
    `,
    prisma.anime.count({
      where: {
        provider: 'JIKAN',
        externalId: { lte: 0 },
      },
    }),
    prisma.animeTranslation.count({ where: { lang: 'ko' } }),
  ]);

  console.log('[REPAIR][DIAG] total anime:', totalAnime);
  console.log('[REPAIR][DIAG] image missing:', missingImage);
  console.log('[REPAIR][DIAG] placeholder image:', placeholderImage);
  console.log('[REPAIR][DIAG] averageScore missing/0:', missingScore);
  console.log('[REPAIR][DIAG] all title missing:', missingTitle);
  console.log('[REPAIR][DIAG] provider+external duplicates:', duplicateProviderExternal.length);
  console.log('[REPAIR][DIAG] invalid JIKAN externalId:', invalidJikanExternal);
  console.log('[REPAIR][DIAG] ko translations:', koTranslations);
}

async function refreshMissingMetadata({ apply, limit }) {
  const rows = await prisma.anime.findMany({
    where: {
      provider: 'JIKAN',
      dataStatus: 'ACTIVE',
      externalId: { gt: 0 },
      OR: [
        { imageUrl: null },
        { imageUrl: '' },
        { imageUrl: { contains: 'placehold.co', mode: 'insensitive' } },
        { averageScore: null },
        { averageScore: 0 },
        { popularity: null },
        { members: null },
        { favorites: null },
        { siteUrl: null },
        { siteUrl: '' },
      ],
    },
    orderBy: [{ updatedAt: 'asc' }],
    take: limit,
  });

  console.log(`[REPAIR][REFRESH] candidates: ${rows.length} (limit=${limit})`);
  if (!rows.length) return { touched: 0, failed: 0, skipped: 0 };

  let touched = 0;
  let failed = 0;
  let skipped = 0;

  for (const row of rows) {
    try {
      if (!isLikelyJikanOrigin(row)) {
        skipped += 1;
        continue;
      }

      // eslint-disable-next-line no-await-in-loop
      const detail = await getAnimeById(row.externalId);
      const normalized = normalizeJikanAnime(detail?.data);
      if (!normalized) {
        skipped += 1;
        continue;
      }

      if (!apply) {
        touched += 1;
      } else {
        // eslint-disable-next-line no-await-in-loop
        await upsertAnimeCache({ ...normalized, provider: 'JIKAN' });
        touched += 1;
      }
    } catch (error) {
      failed += 1;
      console.error(`[REPAIR][REFRESH] failed externalId=${row.externalId}:`, error.message);
    }

    // eslint-disable-next-line no-await-in-loop
    await sleep(950);
  }

  console.log(`[REPAIR][REFRESH] touched=${touched}, failed=${failed}, skipped=${skipped}, apply=${apply}`);
  return { touched, failed, skipped };
}

function buildMergeScore(row, userAnimeIdSet, translationCount) {
  let score = 0;
  if (userAnimeIdSet.has(Number(row.externalId))) score += 1000;
  if (isValidUrl(row.imageUrl) && !isPlaceholderImage(row.imageUrl)) score += 100;
  if (isPositive(row.averageScore)) score += 80;
  if (isText(row.description)) score += 50;
  score += translationCount * 10;
  score += new Date(row.updatedAt).getTime() / 1_000_000_000_000;
  return score;
}

function translationPriority(translation) {
  const sourceWeight = {
    MANUAL: 100,
    SEED: 80,
    API: 70,
    GPT: 60,
  };
  const statusWeight = {
    REVIEWED: 100,
    AUTO: 50,
    TITLE_ONLY: 40,
    FAILED: 10,
    PENDING: 0,
  };
  return (sourceWeight[translation.source] || 0) + (statusWeight[translation.status] || 0);
}

async function mergeDuplicateRows(rows, userAnimeIdSet, apply) {
  if (!rows.length) return { merged: 0, removed: 0, skipped: 0 };

  const scores = rows.map((row) => ({
    row,
    score: buildMergeScore(row, userAnimeIdSet, (row.translations || []).length),
  }));
  scores.sort((a, b) => b.score - a.score);

  const representative = scores[0].row;
  const duplicates = scores.slice(1).map((item) => item.row);

  if (!apply) {
    return { merged: duplicates.length, removed: duplicates.length, skipped: 0 };
  }

  const mergedData = {
    romajiTitle: representative.romajiTitle,
    englishTitle: representative.englishTitle,
    nativeTitle: representative.nativeTitle,
    description: representative.description,
    imageUrl: representative.imageUrl,
    bannerUrl: representative.bannerUrl,
    siteUrl: representative.siteUrl,
    averageScore: representative.averageScore,
    scoredBy: representative.scoredBy,
    rank: representative.rank,
    members: representative.members,
    favorites: representative.favorites,
    popularity: representative.popularity,
    episodes: representative.episodes,
    status: representative.status,
    season: representative.season,
    seasonYear: representative.seasonYear,
    format: representative.format,
    genres: representative.genres,
    sourcePayload: representative.sourcePayload,
    dataStatus: 'ACTIVE',
    lastSyncedAt: representative.lastSyncedAt || new Date(),
  };

  for (const row of duplicates) {
    mergedData.romajiTitle = mergedData.romajiTitle || row.romajiTitle;
    mergedData.englishTitle = mergedData.englishTitle || row.englishTitle;
    mergedData.nativeTitle = mergedData.nativeTitle || row.nativeTitle;
    mergedData.description = mergedData.description || row.description;
    if (!isValidUrl(mergedData.imageUrl) || isPlaceholderImage(mergedData.imageUrl)) {
      if (isValidUrl(row.imageUrl) && !isPlaceholderImage(row.imageUrl)) mergedData.imageUrl = row.imageUrl;
    }
    mergedData.bannerUrl = mergedData.bannerUrl || row.bannerUrl;
    mergedData.siteUrl = mergedData.siteUrl || row.siteUrl;
    mergedData.averageScore = mergedData.averageScore || row.averageScore;
    mergedData.scoredBy = mergedData.scoredBy || row.scoredBy;
    mergedData.rank = mergedData.rank || row.rank;
    mergedData.members = mergedData.members || row.members;
    mergedData.favorites = mergedData.favorites || row.favorites;
    mergedData.popularity = mergedData.popularity || row.popularity;
    mergedData.episodes = mergedData.episodes || row.episodes;
    mergedData.status = mergedData.status || row.status;
    mergedData.season = mergedData.season || row.season;
    mergedData.seasonYear = mergedData.seasonYear || row.seasonYear;
    mergedData.format = mergedData.format || row.format;
    mergedData.genres = mergedData.genres || row.genres;
    mergedData.sourcePayload = mergedData.sourcePayload || row.sourcePayload;
  }

  await prisma.anime.update({
    where: { id: representative.id },
    data: mergedData,
  });

  for (const row of duplicates) {
    for (const tr of row.translations || []) {
      // eslint-disable-next-line no-await-in-loop
      const existing = await prisma.animeTranslation.findUnique({
        where: {
          animeId_lang: { animeId: representative.id, lang: tr.lang },
        },
      });

      if (!existing) {
        // eslint-disable-next-line no-await-in-loop
        await prisma.animeTranslation.create({
          data: {
            animeId: representative.id,
            lang: tr.lang,
            title: tr.title,
            description: tr.description,
            source: tr.source,
            status: tr.status,
            failureReason: tr.failureReason,
            reviewedBy: tr.reviewedBy,
            reviewedAt: tr.reviewedAt,
          },
        });
      } else if (translationPriority(tr) > translationPriority(existing)) {
        // eslint-disable-next-line no-await-in-loop
        await prisma.animeTranslation.update({
          where: { id: existing.id },
          data: {
            title: tr.title || existing.title,
            description: tr.description || existing.description,
            source: tr.source,
            status: tr.status,
            failureReason: tr.failureReason,
            reviewedBy: tr.reviewedBy || existing.reviewedBy,
            reviewedAt: tr.reviewedAt || existing.reviewedAt,
          },
        });
      }
    }
  }

  const duplicateIds = duplicates.map((row) => row.id);
  if (duplicateIds.length) {
    await prisma.anime.deleteMany({
      where: { id: { in: duplicateIds } },
    });
  }

  return { merged: duplicates.length, removed: duplicateIds.length, skipped: 0 };
}

async function dedupeAnimeCache({ apply, limit }) {
  const userAnimeIdSet = await getUserAnimeIdSet();
  const exactDuplicates = await prisma.$queryRaw`
    SELECT provider, "externalId", COUNT(*)::int AS count
    FROM "Anime"
    GROUP BY provider, "externalId"
    HAVING COUNT(*) > 1
    LIMIT ${limit}
  `;

  console.log(`[REPAIR][DEDUPE] exact duplicate groups: ${exactDuplicates.length}`);

  let merged = 0;
  let removed = 0;
  for (const group of exactDuplicates) {
    // eslint-disable-next-line no-await-in-loop
    const rows = await prisma.anime.findMany({
      where: {
        provider: group.provider,
        externalId: Number(group.externalId),
      },
      include: {
        translations: true,
      },
      orderBy: [{ updatedAt: 'desc' }],
    });
    // eslint-disable-next-line no-await-in-loop
    const result = await mergeDuplicateRows(rows, userAnimeIdSet, apply);
    merged += result.merged;
    removed += result.removed;
  }

  const titleCandidates = await prisma.anime.findMany({
    where: { dataStatus: 'ACTIVE' },
    select: {
      id: true,
      provider: true,
      externalId: true,
      romajiTitle: true,
      englishTitle: true,
      nativeTitle: true,
      seasonYear: true,
      format: true,
    },
    take: Math.min(limit * 10, 5000),
  });

  const buckets = new Map();
  for (const row of titleCandidates) {
    const baseTitle =
      normalizeTitle(row.englishTitle) ||
      normalizeTitle(row.romajiTitle) ||
      normalizeTitle(row.nativeTitle);
    if (!baseTitle) continue;
    const key = `${row.provider}::${baseTitle}::${row.seasonYear || 0}::${row.format || ''}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(row);
  }
  const fuzzyCandidates = [...buckets.values()]
    .filter((rows) => rows.length > 1 && new Set(rows.map((r) => r.externalId)).size > 1)
    .slice(0, limit);

  console.log(`[REPAIR][DEDUPE] fuzzy duplicate candidates (report only): ${fuzzyCandidates.length}`);
  fuzzyCandidates.forEach((rows) => {
    const sample = rows.slice(0, 4).map((row) => `${row.provider}:${row.externalId}`).join(', ');
    console.log(`  - ${sample}`);
  });

  console.log(`[REPAIR][DEDUPE] merged=${merged}, removed=${removed}, apply=${apply}`);
  return { merged, removed, fuzzyCandidates: fuzzyCandidates.length };
}

async function cleanupGhostRows({ apply, limit, hardDelete }) {
  const userAnimeIdSet = await getUserAnimeIdSet();
  const rows = await prisma.anime.findMany({
    where: {
      dataStatus: 'ACTIVE',
    },
    include: {
      translations: {
        select: { title: true, description: true },
      },
    },
    take: Math.min(limit * 10, 5000),
    orderBy: [{ updatedAt: 'asc' }],
  });

  const candidates = rows.filter((row) => {
    const hasUserRef = userAnimeIdSet.has(Number(row.externalId));
    if (hasUserRef) return false;

    const invalidIdentity = !isText(row.provider) || !isPositive(row.externalId);
    const titlesMissing = !isText(row.romajiTitle) && !isText(row.englishTitle) && !isText(row.nativeTitle);
    const imageMissing = !isValidUrl(row.imageUrl) || isPlaceholderImage(row.imageUrl);
    const scoreMissing = !isPositive(row.averageScore);
    const episodesMissing = !isPositive(row.episodes);
    const siteMissing = !isValidUrl(row.siteUrl);
    const translationMissing = !(row.translations || []).some(
      (tr) => isText(tr.title) || isText(tr.description)
    );

    return invalidIdentity || (titlesMissing && imageMissing && scoreMissing && episodesMissing && siteMissing && translationMissing);
  });

  const selected = candidates.slice(0, limit);
  console.log(`[REPAIR][GHOST] candidates=${candidates.length}, selected=${selected.length}, apply=${apply}`);

  if (!apply || selected.length === 0) {
    return { archived: 0, deleted: 0, selected: selected.length };
  }

  const ids = selected.map((row) => row.id);
  if (hardDelete) {
    const result = await prisma.anime.deleteMany({ where: { id: { in: ids } } });
    console.log(`[REPAIR][GHOST] hard deleted rows: ${result.count}`);
    return { archived: 0, deleted: result.count, selected: selected.length };
  }

  const result = await prisma.anime.updateMany({
    where: { id: { in: ids } },
    data: { dataStatus: 'ARCHIVED' },
  });
  console.log(`[REPAIR][GHOST] archived rows: ${result.count}`);
  return { archived: result.count, deleted: 0, selected: selected.length };
}

async function markAdultRows({ apply, limit }) {
  const rows = await prisma.anime.findMany({
    where: {
      dataStatus: { not: 'ARCHIVED' },
    },
    take: Math.min(limit * 10, 8000),
    orderBy: [{ updatedAt: 'desc' }],
  });

  const candidates = rows.filter((row) => isAdultAnime(row)).slice(0, limit);
  console.log(`[REPAIR][ADULT] candidates=${candidates.length}, apply=${apply}`);

  if (!apply || candidates.length === 0) {
    return { marked: 0, selected: candidates.length };
  }

  const ids = candidates.map((row) => row.id);
  const result = await prisma.anime.updateMany({
    where: { id: { in: ids } },
    data: {
      isAdult: true,
      isHidden: true,
      hiddenReason: 'ADULT_CONTENT_AUTO_DETECTED',
      hiddenAt: new Date(),
      dataStatus: 'ARCHIVED',
    },
  });

  console.log(`[REPAIR][ADULT] marked rows: ${result.count}`);
  return { marked: result.count, selected: candidates.length };
}

async function main() {
  const options = parseArgs(process.argv);
  console.log('[REPAIR] options:', options);

  await printDiagnostics();

  const hasAction = options.refreshMissing || options.dedupe || options.cleanupGhosts || options.markAdult;
  if (!hasAction) {
    console.log('[REPAIR] dry-run diagnostics only. Add --refresh-missing / --dedupe / --cleanup-ghosts or --all.');
    return;
  }

  if (options.refreshMissing) {
    await refreshMissingMetadata({
      apply: options.apply,
      limit: options.limit,
    });
  }

  if (options.dedupe) {
    await dedupeAnimeCache({
      apply: options.apply,
      limit: options.limit,
    });
  }

  if (options.cleanupGhosts) {
    await cleanupGhostRows({
      apply: options.apply,
      hardDelete: options.hardDelete,
      limit: options.limit,
    });
  }

  if (options.markAdult) {
    await markAdultRows({
      apply: options.apply,
      limit: options.limit,
    });
  }

  await printDiagnostics();
  console.log('[REPAIR] done.');
}

main()
  .catch((error) => {
    console.error('[REPAIR] failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

```

### File: `backend/scripts/translate_pending_ko.py`

- size: `41,689` bytes

```python
import argparse
import csv
import hashlib
import json
import os
import sys
import time
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse, parse_qsl, urlencode, urlunparse

import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
from openai import OpenAI


# ============================================================
# 기본 경로 / 환경변수
# ============================================================

ROOT_DIR = Path(__file__).resolve().parents[1]  # backend
ENV_PATH = ROOT_DIR / ".env"

CSV_ROOT = ROOT_DIR / "data" / "anime_csv"
ITEM_CSV_DIR = CSV_ROOT / "items"
MASTER_CSV_PATH = CSV_ROOT / "anime_catalog.csv"
RUN_LOG_PATH = CSV_ROOT / "translation_runs.csv"

load_dotenv(ENV_PATH, encoding="utf-8-sig")

DATABASE_URL = os.getenv("DATABASE_URL")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MODEL = os.getenv("OPENAI_TRANSLATION_MODEL") or "gpt-4.1-mini"

DEFAULT_BATCH_SIZE = 100


if not DATABASE_URL:
    print("[ERROR] DATABASE_URL이 없습니다. backend/.env를 확인하세요.")
    sys.exit(1)


def get_openai_client(required: bool = False):
    if not OPENAI_API_KEY:
        if required:
            print("[ERROR] OPENAI_API_KEY가 없습니다. 번역 모드에서는 필요합니다.")
            sys.exit(1)
        return None
    return OpenAI(api_key=OPENAI_API_KEY)


# ============================================================
# 공통 유틸
# ============================================================

def now_iso():
    return datetime.now().isoformat(timespec="seconds")


def normalize_text(value):
    if value is None:
        return ""
    return str(value).strip()


def truncate_text(value, limit=2800):
    text = normalize_text(value)
    if len(text) <= limit:
        return text
    return text[:limit].rsplit(" ", 1)[0]


def safe_json(value):
    if value is None:
        return ""
    if isinstance(value, (dict, list)):
        return json.dumps(value, ensure_ascii=False)
    return str(value)


def parse_json_maybe(value, fallback=None):
    if fallback is None:
        fallback = []
    if value is None:
        return fallback
    if isinstance(value, (list, dict)):
        return value
    text = str(value).strip()
    if not text:
        return fallback
    try:
        return json.loads(text)
    except Exception:
        return fallback


def make_prompt_hash(payload):
    raw = json.dumps(payload, ensure_ascii=False, sort_keys=True)
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def ensure_csv_dirs():
    CSV_ROOT.mkdir(parents=True, exist_ok=True)
    ITEM_CSV_DIR.mkdir(parents=True, exist_ok=True)


def item_csv_path(provider, external_id):
    provider = normalize_text(provider or "JIKAN").upper()
    external_id = normalize_text(external_id)
    return ITEM_CSV_DIR / f"{provider}_{external_id}.csv"


def status_is_pending(row):
    """
    한국어 제목이 없거나, 실패/대기 상태이거나,
    원본 설명이 있는데 한국어 설명이 비어 있으면 PENDING으로 판단한다.

    원본 설명 자체가 없는 작품은 ko_description이 없어도 TITLE_ONLY 상태로 정상 처리한다.
    """
    ko_status = normalize_text(row.get("ko_status"))
    ko_title = normalize_text(row.get("ko_title"))
    ko_description = normalize_text(row.get("ko_description"))
    source_description = build_source_description(row)

    if not row.get("ko_translation_id"):
        return True
    if ko_status in ["PENDING", "FAILED"]:
        return True
    if not ko_title:
        return True
    if source_description and not ko_description:
        return True
    if ko_status == "TITLE_ONLY" and source_description:
        return True
    return False


def build_source_title(row):
    return (
            normalize_text(row.get("en_title"))
            or normalize_text(row.get("english_title"))
            or normalize_text(row.get("romaji_title"))
            or normalize_text(row.get("native_title"))
    )


def build_source_description(row):
    return (
            normalize_text(row.get("en_description"))
            or normalize_text(row.get("source_description"))
    )


# ============================================================
# DB 연결
# ============================================================

def clean_database_url(url: str) -> tuple[str, str]:
    parsed = urlparse(url)
    query = dict(parse_qsl(parsed.query))
    schema = query.pop("schema", "public")
    cleaned_query = urlencode(query)
    cleaned_url = urlunparse(
        (
            parsed.scheme,
            parsed.netloc,
            parsed.path,
            parsed.params,
            cleaned_query,
            parsed.fragment,
        )
    )
    return cleaned_url, schema


def connect_db():
    cleaned_url, schema = clean_database_url(DATABASE_URL)
    conn = psycopg2.connect(cleaned_url)
    conn.autocommit = False

    with conn.cursor() as cur:
        cur.execute(f'SET search_path TO "{schema}", public;')

    return conn


# ============================================================
# DB 조회
# ============================================================

def fetch_all_anime(conn, limit: int | None = None):
    sql = """
          SELECT
              a.id AS anime_id,
              a.provider,
              a."externalId" AS external_id,
              a."romajiTitle" AS romaji_title,
              a."englishTitle" AS english_title,
              a."nativeTitle" AS native_title,
              a.description AS source_description,
              a.genres,
              a."seasonYear" AS season_year,
              a.season,
              a.format,
              a.status AS anime_status,
              a."averageScore" AS average_score,
              a.episodes,
              a."imageUrl" AS image_url,
              a."bannerUrl" AS banner_url,
              a."siteUrl" AS site_url,

              ko.id AS ko_translation_id,
              ko.title AS ko_title,
              ko.description AS ko_description,
              ko.source AS ko_source,
              ko.status AS ko_status,
              ko."failureReason" AS ko_failure_reason,

              en.title AS en_title,
              en.description AS en_description
          FROM "Anime" a
                   LEFT JOIN "AnimeTranslation" ko
                             ON ko."animeId" = a.id
                                 AND ko.lang = 'ko'
                   LEFT JOIN "AnimeTranslation" en
                             ON en."animeId" = a.id
                                 AND en.lang = 'en'
          WHERE
              (
                  NULLIF(TRIM(COALESCE(a."englishTitle", '')), '') IS NOT NULL
                      OR NULLIF(TRIM(COALESCE(a."romajiTitle", '')), '') IS NOT NULL
                      OR NULLIF(TRIM(COALESCE(a."nativeTitle", '')), '') IS NOT NULL
                  )
          ORDER BY
              a."averageScore" DESC NULLS LAST,
              a.id ASC \
          """

    params = []
    if limit and limit > 0:
        sql += " LIMIT %s"
        params.append(limit)

    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(sql, params)
        return cur.fetchall()


def fetch_pending_anime(conn, limit: int):
    sql = """
          SELECT
              a.id AS anime_id,
              a.provider,
              a."externalId" AS external_id,
              a."romajiTitle" AS romaji_title,
              a."englishTitle" AS english_title,
              a."nativeTitle" AS native_title,
              a.description AS source_description,
              a.genres,
              a."seasonYear" AS season_year,
              a.season,
              a.format,
              a.status AS anime_status,
              a."averageScore" AS average_score,
              a.episodes,
              a."imageUrl" AS image_url,
              a."bannerUrl" AS banner_url,
              a."siteUrl" AS site_url,

              ko.id AS ko_translation_id,
              ko.title AS ko_title,
              ko.description AS ko_description,
              ko.source AS ko_source,
              ko.status AS ko_status,
              ko."failureReason" AS ko_failure_reason,

              en.title AS en_title,
              en.description AS en_description
          FROM "Anime" a
                   LEFT JOIN "AnimeTranslation" ko
                             ON ko."animeId" = a.id
                                 AND ko.lang = 'ko'
                   LEFT JOIN "AnimeTranslation" en
                             ON en."animeId" = a.id
                                 AND en.lang = 'en'
          WHERE
              (
                  ko.id IS NULL
                      OR ko.status IN ('PENDING', 'TITLE_ONLY', 'FAILED')
                      OR NULLIF(TRIM(COALESCE(ko.title, '')), '') IS NULL
                      OR NULLIF(TRIM(COALESCE(ko.description, '')), '') IS NULL
                  )
            AND NOT (
              COALESCE(ko.source, '') = 'MANUAL'
                  AND COALESCE(ko.status, '') = 'REVIEWED'
              )
            AND (
              NULLIF(TRIM(COALESCE(a."englishTitle", '')), '') IS NOT NULL
                  OR NULLIF(TRIM(COALESCE(a."romajiTitle", '')), '') IS NOT NULL
                  OR NULLIF(TRIM(COALESCE(a."nativeTitle", '')), '') IS NOT NULL
              )
          ORDER BY
              a."averageScore" DESC NULLS LAST,
              a.id ASC
              LIMIT %s; \
          """

    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(sql, (limit,))
        return cur.fetchall()


# ============================================================
# CSV 저장 / 읽기
# ============================================================

MASTER_FIELDS = [
    "anime_id",
    "provider",
    "external_id",
    "source_title",
    "romaji_title",
    "english_title",
    "native_title",
    "source_description",
    "genres",
    "season_year",
    "season",
    "format",
    "anime_status",
    "average_score",
    "episodes",
    "image_url",
    "site_url",
    "ko_title",
    "ko_description",
    "ko_source",
    "ko_status",
    "ko_failure_reason",
    "pending",
    "item_csv",
    "updated_at",
]

ITEM_FIELDS = [
    "anime_id",
    "provider",
    "external_id",
    "source_title",
    "romaji_title",
    "english_title",
    "native_title",
    "source_description",
    "genres",
    "season_year",
    "season",
    "format",
    "anime_status",
    "average_score",
    "episodes",
    "image_url",
    "banner_url",
    "site_url",
    "ko_title",
    "ko_description",
    "ko_source",
    "ko_status",
    "ko_failure_reason",
    "prompt_hash",
    "csv_status",
    "updated_at",
]


def row_to_csv_record(row, translated=None, csv_status=None, prompt_hash=""):
    translated = translated or {}

    ko_title = translated.get("title")
    if ko_title is None:
        ko_title = row.get("ko_title")

    ko_description = translated.get("description")
    if ko_description is None:
        ko_description = row.get("ko_description")

    ko_status = translated.get("status")
    if ko_status is None:
        ko_status = row.get("ko_status") or ("PENDING" if status_is_pending(row) else "REVIEWED")

    ko_source = translated.get("source")
    if ko_source is None:
        ko_source = row.get("ko_source") or ""

    source_title = build_source_title(row)
    source_description = build_source_description(row)

    return {
        "anime_id": row.get("anime_id"),
        "provider": row.get("provider") or "JIKAN",
        "external_id": row.get("external_id"),
        "source_title": source_title,
        "romaji_title": row.get("romaji_title") or "",
        "english_title": row.get("english_title") or "",
        "native_title": row.get("native_title") or "",
        "source_description": source_description,
        "genres": safe_json(row.get("genres")),
        "season_year": row.get("season_year") or "",
        "season": row.get("season") or "",
        "format": row.get("format") or "",
        "anime_status": row.get("anime_status") or "",
        "average_score": row.get("average_score") or "",
        "episodes": row.get("episodes") or "",
        "image_url": row.get("image_url") or "",
        "banner_url": row.get("banner_url") or "",
        "site_url": row.get("site_url") or "",
        "ko_title": ko_title or "",
        "ko_description": ko_description or "",
        "ko_source": ko_source or "",
        "ko_status": ko_status or "",
        "ko_failure_reason": translated.get("failureReason") or row.get("ko_failure_reason") or "",
        "prompt_hash": prompt_hash or "",
        "csv_status": csv_status or "",
        "updated_at": now_iso(),
    }


def write_master_csv(rows):
    ensure_csv_dirs()

    with MASTER_CSV_PATH.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=MASTER_FIELDS)
        writer.writeheader()

        for row in rows:
            path = item_csv_path(row.get("provider"), row.get("external_id"))
            record = row_to_csv_record(row)
            writer.writerow({
                "anime_id": record["anime_id"],
                "provider": record["provider"],
                "external_id": record["external_id"],
                "source_title": record["source_title"],
                "romaji_title": record["romaji_title"],
                "english_title": record["english_title"],
                "native_title": record["native_title"],
                "source_description": record["source_description"],
                "genres": record["genres"],
                "season_year": record["season_year"],
                "season": record["season"],
                "format": record["format"],
                "anime_status": record["anime_status"],
                "average_score": record["average_score"],
                "episodes": record["episodes"],
                "image_url": record["image_url"],
                "site_url": record["site_url"],
                "ko_title": record["ko_title"],
                "ko_description": record["ko_description"],
                "ko_source": record["ko_source"],
                "ko_status": record["ko_status"],
                "ko_failure_reason": record["ko_failure_reason"],
                "pending": "YES" if status_is_pending(row) else "NO",
                "item_csv": str(path.relative_to(ROOT_DIR)),
                "updated_at": now_iso(),
            })


def write_item_csv(row, translated=None, csv_status=None, prompt_hash="", overwrite=False):
    ensure_csv_dirs()

    path = item_csv_path(row.get("provider"), row.get("external_id"))

    if path.exists() and not overwrite:
        existing = read_item_csv(path)
        # 기존 CSV에 한국어 제목이 있으면 보호한다.
        # 기존 CSV가 비어 있거나 ko_title이 없으면 PENDING CSV로 보고 덮어쓴다.
        if existing and normalize_text(existing.get("ko_title")):
            return False, path

    record = row_to_csv_record(
        row,
        translated=translated,
        csv_status=csv_status,
        prompt_hash=prompt_hash,
    )

    with path.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=ITEM_FIELDS)
        writer.writeheader()
        writer.writerow(record)

    return True, path


def read_item_csv(path):
    with path.open("r", newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        if not rows:
            return None
        return rows[0]


def read_all_item_csvs():
    ensure_csv_dirs()
    files = sorted(ITEM_CSV_DIR.glob("*.csv"))
    result = []

    for path in files:
        row = read_item_csv(path)
        if row:
            row["_csv_path"] = str(path)
            result.append(row)

    return result



def get_existing_item_csv(provider, external_id):
    path = item_csv_path(provider, external_id)
    if not path.exists():
        return None, path
    return read_item_csv(path), path


def existing_csv_has_ko_title(provider, external_id):
    row, path = get_existing_item_csv(provider, external_id)
    if not row:
        return False, path
    return bool(normalize_text(row.get("ko_title"))), path


def csv_row_to_translation(row):
    ko_title = normalize_text(row.get("ko_title"))
    if not ko_title:
        return None

    ko_description = normalize_text(row.get("ko_description"))
    ko_status = normalize_text(row.get("ko_status")) or ("AUTO" if ko_description else "TITLE_ONLY")
    ko_source = normalize_text(row.get("ko_source")) or "CSV"

    return {
        "title": ko_title,
        "description": ko_description or None,
        "source": ko_source,
        "status": ko_status,
        "failureReason": normalize_text(row.get("ko_failure_reason")),
    }


def list_csv_rows_missing_ko_title():
    missing = []
    for row in read_all_item_csvs():
        if not normalize_text(row.get("ko_title")):
            missing.append(row)
    return missing


def append_run_log(record):
    ensure_csv_dirs()

    exists = RUN_LOG_PATH.exists()
    fields = [
        "run_at",
        "mode",
        "model",
        "limit",
        "batch_size",
        "success",
        "failed",
        "skipped",
        "csv_written",
        "db_written",
        "note",
    ]

    with RUN_LOG_PATH.open("a", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        if not exists:
            writer.writeheader()
        writer.writerow(record)


# ============================================================
# 번역 payload / OpenAI batch 번역
# ============================================================

def build_source_payload(row):
    source_title = build_source_title(row)
    source_description = build_source_description(row)

    return {
        "animeId": row.get("anime_id"),
        "provider": row.get("provider"),
        "externalId": row.get("external_id"),
        "title": {
            "english": normalize_text(row.get("english_title")),
            "romaji": normalize_text(row.get("romaji_title")),
            "native": normalize_text(row.get("native_title")),
            "source": source_title,
        },
        "description": truncate_text(source_description),
        "genres": parse_json_maybe(row.get("genres")),
        "seasonYear": row.get("season_year"),
        "season": row.get("season"),
        "format": row.get("format"),
        "status": row.get("anime_status"),
        "averageScore": row.get("average_score"),
        "episodes": row.get("episodes"),
    }


def build_batch_payload(rows):
    items = []

    for row in rows:
        payload = build_source_payload(row)
        if not payload["title"]["source"]:
            continue

        items.append({
            "animeId": payload["animeId"],
            "provider": payload["provider"],
            "externalId": payload["externalId"],
            "sourceTitle": payload["title"]["source"],
            "titles": payload["title"],
            "description": payload["description"],
            "genres": payload["genres"],
            "seasonYear": payload["seasonYear"],
            "season": payload["season"],
            "format": payload["format"],
            "status": payload["status"],
            "averageScore": payload["averageScore"],
            "episodes": payload["episodes"],
        })

    return {
        "targetLang": "ko",
        "items": items,
        "returnShape": {
            "items": [
                {
                    "animeId": "number",
                    "provider": "string",
                    "externalId": "number",
                    "title": "string",
                    "description": "string or null",
                }
            ]
        },
    }


def create_translation_response_with_retries(client, system_prompt, payload, schema_name, schema, max_retries=3):
    last_error = None

    for attempt in range(1, max_retries + 1):
        try:
            return client.responses.create(
                model=MODEL,
                input=[
                    {
                        "role": "system",
                        "content": system_prompt,
                    },
                    {
                        "role": "user",
                        "content": json.dumps(payload, ensure_ascii=False),
                    },
                ],
                text={
                    "format": {
                        "type": "json_schema",
                        "name": schema_name,
                        "strict": True,
                        "schema": schema,
                    }
                },
            )
        except Exception as error:
            last_error = error
            wait_seconds = min(2 ** attempt, 15)
            print(f"  - OpenAI retry {attempt}/{max_retries} after {wait_seconds}s: {error}")
            time.sleep(wait_seconds)

    raise last_error


def translate_batch_to_korean(rows, client):
    payload = build_batch_payload(rows)
    prompt_hash = make_prompt_hash(payload)

    if not payload["items"]:
        return {}, prompt_hash

    system_prompt = """
너는 애니메이션 데이터베이스용 번역가다.
여러 애니메이션의 제목과 설명을 한국어 UI에 자연스럽게 맞게 번역하라.

규칙:
- 반드시 JSON만 출력한다.
- 입력받은 items 배열의 각 항목마다 결과를 하나씩 반환한다.
- animeId, provider, externalId는 입력값 그대로 반환한다.
- title은 한국어 공식/통용 제목이 명확하면 그 제목을 사용한다.
- 공식 한국어 제목을 확신할 수 없으면 원제 뉘앙스를 살려 자연스럽게 번역한다.
- description은 원문 설명이 있을 때만 번역한다.
- 원문 설명이 비어 있으면 description은 null로 둔다.
- 없는 내용을 새로 만들지 않는다.
- 과장된 홍보 문구를 만들지 않는다.
- 스포일러를 추가하지 않는다.
- 일본어 고유명사, 작품명, 인명은 한국어 표기 관례에 맞춘다.
""".strip()

    schema = {
        "type": "object",
        "additionalProperties": False,
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "animeId": {"type": "integer"},
                        "provider": {"type": "string"},
                        "externalId": {"type": "integer"},
                        "title": {"type": "string", "minLength": 1},
                        "description": {"type": ["string", "null"]},
                    },
                    "required": [
                        "animeId",
                        "provider",
                        "externalId",
                        "title",
                        "description",
                    ],
                },
            }
        },
        "required": ["items"],
    }

    response = create_translation_response_with_retries(
        client=client,
        system_prompt=system_prompt,
        payload=payload,
        schema_name="anime_ko_translation_batch",
        schema=schema,
    )

    data = json.loads(response.output_text)
    translations = {}

    source_has_description = {}
    for row in rows:
        source_has_description[int(row["anime_id"])] = bool(build_source_description(row))

    for item in data.get("items", []):
        anime_id = int(item["animeId"])
        title = normalize_text(item.get("title"))
        description = item.get("description")

        if not title:
            continue

        if description is not None:
            description = normalize_text(description) or None

        if not source_has_description.get(anime_id):
            description = None

        status = "AUTO" if description else "TITLE_ONLY"

        translations[anime_id] = {
            "title": title,
            "description": description,
            "source": "GPT",
            "status": status,
            "failureReason": "",
        }

    return translations, prompt_hash


def translate_rows_resilient(rows, client):
    """
    100개 배치 번역을 우선 시도하고,
    일부 결과 누락 또는 배치 실패 시 작은 배치/개별 번역으로 자동 재시도한다.
    """
    rows = [row for row in rows if build_source_title(row)]
    if not rows:
        return {}, "", {}

    try:
        translations, prompt_hash = translate_batch_to_korean(rows, client)

        missing_rows = [
            row for row in rows
            if int(row["anime_id"]) not in translations
        ]

        if missing_rows:
            print(f"  - batch response missing items: {len(missing_rows)}개, 개별 재시도")
            for row in missing_rows:
                try:
                    single_translations, single_hash = translate_batch_to_korean([row], client)
                    translations.update(single_translations)
                    if not prompt_hash:
                        prompt_hash = single_hash
                except Exception as error:
                    return_translations = translations
                    errors = {
                        int(row["anime_id"]): str(error)
                    }
                    return return_translations, prompt_hash, errors

        return translations, prompt_hash, {}

    except Exception as error:
        if len(rows) == 1:
            return {}, "", {int(rows[0]["anime_id"]): str(error)}

        mid = max(1, len(rows) // 2)
        print(f"  - batch split retry: {len(rows)}개 -> {mid}개 / {len(rows) - mid}개")

        left_translations, left_hash, left_errors = translate_rows_resilient(rows[:mid], client)
        right_translations, right_hash, right_errors = translate_rows_resilient(rows[mid:], client)

        translations = {}
        translations.update(left_translations)
        translations.update(right_translations)

        errors = {}
        errors.update(left_errors)
        errors.update(right_errors)

        return translations, left_hash or right_hash, errors


# ============================================================
# DB 저장
# ============================================================

def save_translation(conn, anime_id: int, translated: dict):
    sql = """
          INSERT INTO "AnimeTranslation"
          ("animeId", lang, title, description, source, status, "failureReason", "createdAt", "updatedAt")
          VALUES
              (%s, 'ko', %s, %s, %s, %s, NULL, NOW(), NOW())
              ON CONFLICT ("animeId", lang)
        DO UPDATE SET
              title = EXCLUDED.title,
                             description = EXCLUDED.description,
                             source = EXCLUDED.source,
                             status = EXCLUDED.status,
                             "failureReason" = NULL,
                             "updatedAt" = NOW()
           WHERE NOT (
                             "AnimeTranslation".source = 'MANUAL'
             AND "AnimeTranslation".status = 'REVIEWED'
                             ); \
          """

    with conn.cursor() as cur:
        cur.execute(
            sql,
            (
                anime_id,
                translated.get("title"),
                translated.get("description"),
                translated.get("source") or "GPT",
                translated.get("status") or "AUTO",
            ),
        )


def mark_failed(conn, anime_id: int, reason: str):
    reason = truncate_text(reason, 500)

    sql = """
          INSERT INTO "AnimeTranslation"
          ("animeId", lang, title, description, source, status, "failureReason", "createdAt", "updatedAt")
          VALUES
              (%s, 'ko', NULL, NULL, 'GPT', 'FAILED', %s, NOW(), NOW())
              ON CONFLICT ("animeId", lang)
        DO UPDATE SET
              status = 'FAILED',
                             "failureReason" = EXCLUDED."failureReason",
                             "updatedAt" = NOW()
           WHERE NOT (
                             "AnimeTranslation".source = 'MANUAL'
             AND "AnimeTranslation".status = 'REVIEWED'
                             ); \
          """

    with conn.cursor() as cur:
        cur.execute(sql, (anime_id, reason))


def sync_csv_to_db(conn, limit: int | None = None, dry_run=False):
    csv_rows = read_all_item_csvs()

    if limit and limit > 0:
        csv_rows = csv_rows[:limit]

    success = 0
    skipped = 0
    failed = 0

    for row in csv_rows:
        anime_id = int(row["anime_id"])
        ko_title = normalize_text(row.get("ko_title"))
        ko_description = normalize_text(row.get("ko_description"))
        ko_status = normalize_text(row.get("ko_status")) or "AUTO"
        ko_source = normalize_text(row.get("ko_source")) or "CSV"

        if not ko_title:
            print(f"[MISSING] CSV ko_title 없음: animeId={anime_id}, file={row.get('_csv_path', '')}")
            skipped += 1
            continue

        translated = {
            "title": ko_title,
            "description": ko_description or None,
            "source": ko_source,
            "status": ko_status,
        }

        if dry_run:
            print(f"[DRY-RUN] CSV -> DB animeId={anime_id}, title={ko_title}")
            skipped += 1
            continue

        try:
            save_translation(conn, anime_id, translated)
            conn.commit()
            success += 1
        except Exception as error:
            conn.rollback()
            print(f"[FAILED] CSV -> DB animeId={anime_id}: {error}")
            failed += 1

    return {
        "success": success,
        "skipped": skipped,
        "failed": failed,
        "total_csv": len(csv_rows),
    }


# ============================================================
# 모드별 실행
# ============================================================

def mode_export_csv(args):
    conn = connect_db()

    try:
        rows = fetch_all_anime(conn, args.limit if args.limit > 0 else None)
        write_master_csv(rows)

        created = 0
        skipped = 0

        for row in rows:
            did_write, path = write_item_csv(
                row,
                csv_status="EXPORTED",
                overwrite=args.force,
            )

            if did_write:
                created += 1
            else:
                skipped += 1

        print("[DONE] CSV export completed")
        print(f"  master_csv : {MASTER_CSV_PATH}")
        print(f"  item_dir   : {ITEM_CSV_DIR}")
        print(f"  total      : {len(rows)}")
        print(f"  created    : {created}")
        print(f"  skipped    : {skipped}  기존 개별 CSV는 기본적으로 유지됩니다.")

    finally:
        conn.close()


def mode_translate_pending(args):
    if args.batch_size <= 0:
        args.batch_size = DEFAULT_BATCH_SIZE

    client = get_openai_client(required=not args.dry_run)
    conn = connect_db()

    try:
        rows = fetch_pending_anime(conn, args.limit)

        if not rows:
            print("[OK] 번역할 PENDING/누락 한국어 번역이 없습니다.")
            return

        write_master_csv(rows)

        print(f"[INFO] 번역 대상: {len(rows)}개")
        print(f"[INFO] model: {MODEL}")
        print(f"[INFO] batch_size: {args.batch_size}")
        print(f"[INFO] CSV 저장 위치: {CSV_ROOT}")

        success = 0
        failed = 0
        skipped = 0
        csv_written = 0
        db_written = 0
        reused_csv = 0

        for start in range(0, len(rows), args.batch_size):
            batch = rows[start:start + args.batch_size]
            batch_no = start // args.batch_size + 1

            print(f"\n[BATCH {batch_no}] {len(batch)}개 처리")

            actual_batch = []

            for row in batch:
                anime_id = int(row["anime_id"])
                source_title = build_source_title(row)

                if not source_title:
                    reason = "원본 제목이 없어 번역할 수 없습니다."
                    print(f"  - FAILED animeId={anime_id}: {reason}")
                    if not args.dry_run:
                        mark_failed(conn, anime_id, reason)
                        conn.commit()
                    failed += 1
                    continue

                existing_csv, path = get_existing_item_csv(row.get("provider"), row.get("external_id"))
                existing_translation = csv_row_to_translation(existing_csv) if existing_csv else None

                # 기존 CSV에 한국어 제목이 있으면 AI를 다시 쓰지 않고 DB에 반영한다.
                if existing_translation and not args.force:
                    if args.dry_run:
                        print(f"  - DRY-RUN reuse CSV: {path.name}, title={existing_translation['title']}")
                    elif not args.csv_only:
                        save_translation(conn, anime_id, existing_translation)
                        conn.commit()
                        db_written += 1
                    reused_csv += 1
                    success += 1
                    continue

                if args.dry_run:
                    print(
                        f"  - DRY-RUN translate target: animeId={anime_id}, "
                        f"externalId={row['external_id']}, title={source_title}"
                    )
                    skipped += 1
                    continue

                # CSV가 없거나, CSV는 있지만 ko_title이 비어 있으면 번역 대상으로 포함한다.
                actual_batch.append(row)

            if args.dry_run or not actual_batch:
                continue

            translations, prompt_hash, errors = translate_rows_resilient(actual_batch, client)

            for row in actual_batch:
                anime_id = int(row["anime_id"])
                translated = translations.get(anime_id)

                if not translated:
                    reason = errors.get(anime_id) or "번역 결과를 받지 못했습니다."
                    print(f"  - FAILED animeId={anime_id}: {reason}")
                    try:
                        mark_failed(conn, anime_id, reason)
                        conn.commit()
                    except Exception:
                        conn.rollback()
                    failed += 1
                    continue

                try:
                    # 기존 CSV가 있더라도 ko_title이 비어 있었던 파일은 덮어쓴다.
                    did_write, path = write_item_csv(
                        row,
                        translated=translated,
                        csv_status="TRANSLATED",
                        prompt_hash=prompt_hash,
                        overwrite=args.force,
                    )

                    if did_write:
                        csv_written += 1

                    if not args.csv_only:
                        save_translation(conn, anime_id, translated)
                        conn.commit()
                        db_written += 1

                    print(f"  - OK animeId={anime_id}, title={translated['title']}")
                    success += 1

                except Exception as error:
                    conn.rollback()
                    print(f"  - FAILED save animeId={anime_id}: {error}")
                    failed += 1

            time.sleep(args.sleep)

        append_run_log({
            "run_at": now_iso(),
            "mode": "translate-pending",
            "model": MODEL,
            "limit": args.limit,
            "batch_size": args.batch_size,
            "success": success,
            "failed": failed,
            "skipped": skipped,
            "csv_written": csv_written,
            "db_written": db_written,
            "note": f"csv_only={args.csv_only}; reused_csv={reused_csv}",
        })

        print("\n[DONE]")
        print(f"  success    : {success}")
        print(f"  failed     : {failed}")
        print(f"  skipped    : {skipped}")
        print(f"  reused_csv : {reused_csv}")
        print(f"  csv_written: {csv_written}")
        print(f"  db_written : {db_written}")

    finally:
        conn.close()


def mode_sync_db(args):
    conn = connect_db()

    try:
        result = sync_csv_to_db(
            conn,
            limit=args.limit if args.limit > 0 else None,
            dry_run=args.dry_run,
        )

        print("[DONE] CSV -> DB sync completed")
        print(f"  total_csv: {result['total_csv']}")
        print(f"  success  : {result['success']}")
        print(f"  skipped  : {result['skipped']}")
        print(f"  failed   : {result['failed']}")

        append_run_log({
            "run_at": now_iso(),
            "mode": "sync-db",
            "model": "",
            "limit": args.limit,
            "batch_size": "",
            "success": result["success"],
            "failed": result["failed"],
            "skipped": result["skipped"],
            "csv_written": 0,
            "db_written": result["success"],
            "note": "dry-run" if args.dry_run else "",
        })

    finally:
        conn.close()


def mode_status(args):
    conn = connect_db()

    try:
        all_rows = fetch_all_anime(conn, args.limit if args.limit > 0 else None)
        pending_rows = [row for row in all_rows if status_is_pending(row)]
        csv_rows = read_all_item_csvs()

        print("[STATUS]")
        print(f"  DB anime total         : {len(all_rows)}")
        print(f"  DB pending ko          : {len(pending_rows)}")
        missing_csv_titles = [row for row in csv_rows if not normalize_text(row.get("ko_title"))]
        print(f"  item CSV count         : {len(csv_rows)}")
        print(f"  item CSV missing title : {len(missing_csv_titles)}")
        print(f"  master CSV             : {MASTER_CSV_PATH}")
        print(f"  item CSV dir           : {ITEM_CSV_DIR}")

    finally:
        conn.close()


# ============================================================
# CLI
# ============================================================

def build_parser():
    parser = argparse.ArgumentParser(
        description="AniPick PENDING 한국어 번역을 CSV와 DB로 관리하는 스크립트"
    )

    sub = parser.add_subparsers(dest="command")

    export_parser = sub.add_parser(
        "export-csv",
        help="DB의 전체 애니 리스트를 master CSV와 개별 anime CSV로 내보냅니다.",
    )
    export_parser.add_argument("--limit", type=int, default=0)
    export_parser.add_argument("--force", action="store_true", help="기존 개별 CSV도 덮어씁니다.")
    export_parser.set_defaults(func=mode_export_csv)

    translate_parser = sub.add_parser(
        "translate-pending",
        help="PENDING/누락 한국어 번역을 100개 단위 배치로 번역하고 CSV/DB에 저장합니다.",
    )
    translate_parser.add_argument("--limit", type=int, default=100)
    translate_parser.add_argument("--batch-size", type=int, default=100)
    translate_parser.add_argument("--sleep", type=float, default=1.0)
    translate_parser.add_argument("--dry-run", action="store_true")
    translate_parser.add_argument("--force", action="store_true", help="기존 개별 CSV가 있어도 재번역/덮어쓰기합니다.")
    translate_parser.add_argument("--csv-only", action="store_true", help="DB 저장 없이 CSV만 저장합니다.")
    translate_parser.set_defaults(func=mode_translate_pending)

    sync_parser = sub.add_parser(
        "sync-db",
        help="개별 anime CSV에 저장된 한국어 번역을 DB에 반영합니다. AI 호출 없음.",
    )
    sync_parser.add_argument("--limit", type=int, default=0)
    sync_parser.add_argument("--dry-run", action="store_true")
    sync_parser.set_defaults(func=mode_sync_db)

    status_parser = sub.add_parser(
        "status",
        help="DB PENDING 개수와 CSV 개수를 확인합니다.",
    )
    status_parser.add_argument("--limit", type=int, default=0)
    status_parser.set_defaults(func=mode_status)

    return parser


def main():
    parser = build_parser()
    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return

    args.func(args)


if __name__ == "__main__":
    main()

```

### File: `backend/scripts/translationCoverage.js`

- size: `463` bytes

```javascript
require('dotenv').config();
const { getTranslationCoverage } = require('../src/services/translation-job.service');
const prisma = require('../src/lib/prisma');

(async () => {
  try {
    const coverage = await getTranslationCoverage();
    console.log(JSON.stringify(coverage, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('[COVERAGE] failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

```

### File: `backend/src/app.js`

- size: `1,547` bytes

```javascript
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger/swagger');
const authRoutes = require('./routes/auth.routes');
const animeRoutes = require('./routes/anime.routes');
const favoriteRoutes = require('./routes/favorite.routes');
const reviewRoutes = require('./routes/review.routes');
const watchStatusRoutes = require('./routes/watchStatus.routes');
const adminRoutes = require('./routes/admin.routes');
const noticeRoutes = require('./routes/notice.routes');
const translationRoutes = require('./routes/translation.routes');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ message: 'AniPick backend is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/anime', animeRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/watch-status', watchStatusRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/translations', translationRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ message: 'Internal server error.' });
});

module.exports = app;

```

### File: `backend/src/controllers/admin.controller.js`

- size: `1,540` bytes

```javascript
const prisma = require('../lib/prisma');

async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(users);
  } catch (error) {
    console.error('Admin get users error:', error);
    return res.status(500).json({ message: 'Failed to fetch users.' });
  }
}

async function getAllReviews(req, res) {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(reviews);
  } catch (error) {
    console.error('Admin get reviews error:', error);
    return res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
}

async function deleteAnyReview(req, res) {
  try {
    const reviewId = Number(req.params.id);

    if (!reviewId) {
      return res.status(400).json({ message: 'Valid review id is required.' });
    }

    await prisma.review.delete({ where: { id: reviewId } });
    return res.json({ message: 'Review removed by admin.' });
  } catch (error) {
    console.error('Admin delete review error:', error);
    return res.status(500).json({ message: 'Failed to delete review.' });
  }
}

module.exports = {
  getUsers,
  getAllReviews,
  deleteAnyReview,
};

```

### File: `backend/src/controllers/adminAnime.controller.js`

- size: `8,197` bytes

```javascript
const prisma = require('../lib/prisma');

function toPositiveInt(value, fallback) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function normalizeBoolean(value) {
  if (value === true || value === 'true' || value === '1') return true;
  if (value === false || value === 'false' || value === '0') return false;
  return null;
}

function buildWhere(query = {}) {
  const where = {};
  const keyword = String(query.keyword || '').trim();
  const status = String(query.status || '').trim().toUpperCase();
  const isAdult = normalizeBoolean(query.isAdult);
  const isHidden = normalizeBoolean(query.isHidden);

  if (keyword) {
    where.OR = [
      { romajiTitle: { contains: keyword, mode: 'insensitive' } },
      { englishTitle: { contains: keyword, mode: 'insensitive' } },
      { nativeTitle: { contains: keyword, mode: 'insensitive' } },
      { description: { contains: keyword, mode: 'insensitive' } },
    ];
  }

  if (status) {
    if (status === 'HIDDEN') where.isHidden = true;
    else if (status === 'ADULT') where.isAdult = true;
    else if (status === 'ARCHIVED') where.dataStatus = 'ARCHIVED';
    else if (status === 'ACTIVE') where.dataStatus = 'ACTIVE';
  }

  if (isAdult !== null) where.isAdult = isAdult;
  if (isHidden !== null) where.isHidden = isHidden;

  return where;
}

function sanitizeAnime(anime) {
  return {
    id: anime.id,
    provider: anime.provider,
    externalId: anime.externalId,
    malId: anime.externalId,
    romajiTitle: anime.romajiTitle,
    englishTitle: anime.englishTitle,
    nativeTitle: anime.nativeTitle,
    imageUrl: anime.imageUrl,
    bannerUrl: anime.bannerUrl,
    siteUrl: anime.siteUrl,
    averageScore: anime.averageScore,
    popularity: anime.popularity,
    episodes: anime.episodes,
    status: anime.status,
    season: anime.season,
    seasonYear: anime.seasonYear,
    format: anime.format,
    genres: anime.genres,
    isAdult: anime.isAdult,
    isHidden: anime.isHidden,
    hiddenReason: anime.hiddenReason,
    hiddenAt: anime.hiddenAt,
    dataStatus: anime.dataStatus,
    createdAt: anime.createdAt,
    updatedAt: anime.updatedAt,
  };
}

async function getAdminAnimeList(req, res) {
  try {
    const page = toPositiveInt(req.query.page, 1);
    const perPage = Math.min(100, toPositiveInt(req.query.perPage, 20));
    const skip = (page - 1) * perPage;
    const where = buildWhere(req.query);

    const [rows, total] = await Promise.all([
      prisma.anime.findMany({
        where,
        orderBy: [{ updatedAt: 'desc' }],
        skip,
        take: perPage,
      }),
      prisma.anime.count({ where }),
    ]);

    return res.json({
      pageInfo: {
        currentPage: page,
        perPage,
        total,
        lastPage: Math.max(1, Math.ceil(total / perPage)),
        hasNextPage: page * perPage < total,
      },
      items: rows.map(sanitizeAnime),
    });
  } catch (error) {
    console.error('[ADMIN_ANIME] list failed:', error);
    return res.status(500).json({ message: 'Failed to load anime list.' });
  }
}

async function getAdminAnimeById(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Valid anime id is required.' });

    const anime = await prisma.anime.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });

    if (!anime) return res.status(404).json({ message: 'Anime not found.' });
    return res.json({
      ...sanitizeAnime(anime),
      translations: anime.translations || [],
    });
  } catch (error) {
    console.error('[ADMIN_ANIME] detail failed:', error);
    return res.status(500).json({ message: 'Failed to load anime detail.' });
  }
}

async function hideAdminAnime(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Valid anime id is required.' });

    const reason = String(req.body?.reason || 'ADMIN_HIDDEN').trim();
    const anime = await prisma.anime.update({
      where: { id },
      data: {
        isHidden: true,
        hiddenReason: reason,
        hiddenAt: new Date(),
        dataStatus: 'ARCHIVED',
      },
    });

    return res.json({ message: 'Anime hidden by admin.', item: sanitizeAnime(anime) });
  } catch (error) {
    console.error('[ADMIN_ANIME] hide failed:', error);
    return res.status(500).json({ message: 'Failed to hide anime.' });
  }
}

async function unhideAdminAnime(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Valid anime id is required.' });

    const existing = await prisma.anime.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Anime not found.' });
    if (existing.isAdult) {
      return res.status(409).json({
        message: 'Adult anime cannot be unhidden directly. Please clear adult flag first if needed.',
      });
    }

    const anime = await prisma.anime.update({
      where: { id },
      data: {
        isHidden: false,
        hiddenReason: null,
        hiddenAt: null,
        dataStatus: 'ACTIVE',
      },
    });

    return res.json({ message: 'Anime restored.', item: sanitizeAnime(anime) });
  } catch (error) {
    console.error('[ADMIN_ANIME] unhide failed:', error);
    return res.status(500).json({ message: 'Failed to restore anime.' });
  }
}

async function markAdminAnimeAdult(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Valid anime id is required.' });

    const anime = await prisma.anime.update({
      where: { id },
      data: {
        isAdult: true,
        isHidden: true,
        hiddenReason: 'ADULT_CONTENT_MANUAL',
        hiddenAt: new Date(),
        dataStatus: 'ARCHIVED',
      },
    });

    return res.json({ message: 'Anime marked as adult and archived.', item: sanitizeAnime(anime) });
  } catch (error) {
    console.error('[ADMIN_ANIME] mark adult failed:', error);
    return res.status(500).json({ message: 'Failed to mark anime as adult.' });
  }
}

async function archiveAdminAnime(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Valid anime id is required.' });

    const anime = await prisma.anime.update({
      where: { id },
      data: {
        isHidden: true,
        hiddenReason: 'ADMIN_ARCHIVED',
        hiddenAt: new Date(),
        dataStatus: 'ARCHIVED',
      },
    });

    return res.json({ message: 'Anime archived by admin.', item: sanitizeAnime(anime) });
  } catch (error) {
    console.error('[ADMIN_ANIME] archive failed:', error);
    return res.status(500).json({ message: 'Failed to archive anime.' });
  }
}

async function hardDeleteAdminAnime(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Valid anime id is required.' });

    const anime = await prisma.anime.findUnique({ where: { id } });
    if (!anime) return res.status(404).json({ message: 'Anime not found.' });

    const externalId = anime.externalId;
    const [favoriteCount, reviewCount, watchCount] = await Promise.all([
      prisma.favorite.count({ where: { animeId: externalId } }),
      prisma.review.count({ where: { animeId: externalId } }),
      prisma.watchStatus.count({ where: { animeId: externalId } }),
    ]);

    if (favoriteCount || reviewCount || watchCount) {
      return res.status(409).json({
        message: 'Cannot hard delete anime because user data references exist.',
        references: {
          favorites: favoriteCount,
          reviews: reviewCount,
          watchStatuses: watchCount,
        },
      });
    }

    await prisma.anime.delete({ where: { id } });
    return res.json({ message: 'Anime hard deleted.' });
  } catch (error) {
    console.error('[ADMIN_ANIME] hard delete failed:', error);
    return res.status(500).json({ message: 'Failed to hard delete anime.' });
  }
}

module.exports = {
  getAdminAnimeList,
  getAdminAnimeById,
  hideAdminAnime,
  unhideAdminAnime,
  markAdminAnimeAdult,
  archiveAdminAnime,
  hardDeleteAdminAnime,
};


```

### File: `backend/src/controllers/anime.controller.js`

- size: `20,783` bytes

```javascript
﻿const prisma = require('../lib/prisma');
const { getCurrentSeasonAndYear } = require('../utils/season');
const {
  normalizeLang,
  getLocalizedAnime,
  getBestOriginalTitle,
  getTranslationSeedByAnime,
  getDisplayTitle,
} = require('../utils/animeI18n');
const {
  listCachedAnime,
  upsertAnimeCache,
  toAnimeLike,
  getAnimeByProviderId,
  isRenderableAnimeRow,
} = require('../services/anime-cache.service');
const { isAdultAnime } = require('../utils/animeContentSafety');
const {
  getLocalizedAnimeFromDbOnly,
  getLocalizedAnimeListWithTranslations,
} = require('../services/anime-translation-orchestrator.service');
const {
  EXTERNAL_FALLBACK_MESSAGE,
  fetchTrendingAnime,
  fetchPopularThisSeason,
  fetchSearchAnime,
  fetchAnimeDetail,
  fetchRecommendations,
  testProviderConnection,
  fetchSimilarAnime,
} = require('../services/anime-provider.service');
const { requestAniList } = require('../services/anilist.service');

function toPositiveInt(value, fallback) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function getRequestLang(req) {
  return normalizeLang(req.query.lang || req.headers['x-anipick-lang'] || 'ko');
}

function mapSort(sort) {
  const value = String(sort || '').toUpperCase();
  if (value === 'SCORE_DESC') return 'SCORE_DESC';
  if (value === 'START_DATE_DESC') return 'LATEST';
  if (value === 'LATEST') return 'LATEST';
  if (value === 'TITLE' || value === 'TITLE_ASC') return 'TITLE';
  return 'POPULARITY_DESC';
}

function sanitizeFilterValue(value) {
  if (value === null || value === undefined) return '';
  const normalized = String(value).trim();
  if (!normalized) return '';
  if (['all', '전체'].includes(normalized.toLowerCase())) return '';
  return normalized;
}

function parseGenres(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function filterSafeItems(items = []) {
  return (items || []).filter((item) => !isAdultAnime(item));
}

async function hydrateCacheFromProviderItems(items = [], provider = 'JIKAN') {
  for (const item of items) {
    try {
      if (isAdultAnime(item)) continue;
      // eslint-disable-next-line no-await-in-loop
      await upsertAnimeCache({ ...item, provider: item?.provider || provider });
    } catch (error) {
      console.error('[CACHE] upsert failed:', error.message);
    }
  }
}

function localizeRows(rows, lang) {
  return (rows || [])
    .filter((row) => !row?.isAdult && !row?.isHidden && row?.dataStatus === 'ACTIVE')
    .map((row) => {
    const anime = toAnimeLike(row);
    if (isAdultAnime(anime)) return null;
    const translation = (row.translations || []).find((item) => item.lang === lang) || null;
    const localized = getLocalizedAnime(anime, lang, translation);
    return {
      ...localized,
      isTranslated: Boolean(translation?.description),
      translationSource: translation?.source || null,
      translationStatus: translation?.status || (lang === 'en' ? 'REVIEWED' : 'PENDING'),
    };
  })
    .filter(Boolean);
}

function hasMeaningfulScore(item) {
  const value = Number(item?.averageScore ?? item?.meanScore);
  return Number.isFinite(value) && value > 0;
}

function shouldRefreshForScoreCoverage(rows = [], minScoredCount = 4) {
  if (!Array.isArray(rows) || rows.length === 0) return true;
  const scoredCount = rows.reduce((acc, row) => {
    const anime = toAnimeLike(row);
    return acc + (hasMeaningfulScore(anime) ? 1 : 0);
  }, 0);
  return scoredCount < Math.min(minScoredCount, rows.length);
}

async function getTrendingAnime(req, res) {
  const lang = getRequestLang(req);
  const perPage = toPositiveInt(req.query.perPage, 12);

  try {
    let cached = await listCachedAnime({
      page: 1,
      perPage,
      sort: 'POPULARITY_DESC',
      lang,
      qualityFirst: true,
    });

    if (cached.pageInfo.total < perPage || shouldRefreshForScoreCoverage(cached.rows, 6)) {
      const providerResult = await fetchTrendingAnime({ page: 1, perPage });
      await hydrateCacheFromProviderItems(filterSafeItems(providerResult.items), providerResult.provider);
      cached = await listCachedAnime({
        page: 1,
        perPage,
        sort: 'POPULARITY_DESC',
        lang,
        qualityFirst: true,
      });
    }

    const items = localizeRows(cached.rows || [], lang);
    return res.json(items);
  } catch (error) {
    console.error('[ANIME_TRENDING] failed:', error);
    try {
      const fallbackResult = await fetchTrendingAnime({ page: 1, perPage });
      const localized = await getLocalizedAnimeListWithTranslations(filterSafeItems(fallbackResult.items || []), lang);
      return res.status(200).json(localized);
    } catch (fallbackError) {
      console.error('[ANIME_TRENDING] fallback failed:', fallbackError);
      return res.status(200).json([]);
    }
  }
}

async function getPopularThisSeason(req, res) {
  const lang = getRequestLang(req);
  const perPage = toPositiveInt(req.query.perPage, 12);
  const { season, year } = getCurrentSeasonAndYear();

  try {
    let cached = await listCachedAnime({
      page: 1,
      perPage,
      season,
      year,
      sort: 'POPULARITY_DESC',
      lang,
      qualityFirst: true,
    });

    let provider = 'CACHE';
    let isFallback = false;
    let message = '';

    if (
      cached.pageInfo.total < Math.min(6, perPage) ||
      shouldRefreshForScoreCoverage(cached.rows, 5)
    ) {
      const providerResult = await fetchPopularThisSeason({ page: 1, perPage });
      provider = providerResult.provider;
      isFallback = Boolean(providerResult.isFallback);
      message = providerResult.message || '';
      await hydrateCacheFromProviderItems(filterSafeItems(providerResult.items), providerResult.provider);

      cached = await listCachedAnime({
        page: 1,
        perPage,
        season,
        year,
        sort: 'POPULARITY_DESC',
        lang,
        qualityFirst: true,
      });
    }

    const items = localizeRows(cached.rows || [], lang);
    return res.json({
      season,
      year,
      items,
      provider,
      isFallback,
      message,
    });
  } catch (error) {
    console.error('[ANIME_POPULAR_SEASON] failed:', error);
    try {
      const fallbackResult = await fetchPopularThisSeason({ page: 1, perPage });
      const localized = await getLocalizedAnimeListWithTranslations(filterSafeItems(fallbackResult.items || []), lang);
      return res.status(200).json({
        season,
        year,
        items: localized,
        provider: fallbackResult.provider || 'FALLBACK',
        isFallback: true,
        message: fallbackResult.message || EXTERNAL_FALLBACK_MESSAGE,
        debug: process.env.NODE_ENV !== 'production' ? error.message : undefined,
      });
    } catch (fallbackError) {
      console.error('[ANIME_POPULAR_SEASON] fallback failed:', fallbackError);
    }
    return res.status(200).json({
      season,
      year,
      items: [],
      provider: 'FALLBACK',
      isFallback: true,
      message: EXTERNAL_FALLBACK_MESSAGE,
      debug: process.env.NODE_ENV !== 'production' ? error.message : undefined,
    });
  }
}

async function searchAnime(req, res) {
  const lang = getRequestLang(req);
  const page = toPositiveInt(req.query.page, 1);
  const perPage = toPositiveInt(req.query.perPage, 20);
  const sort = mapSort(req.query.sort || 'POPULARITY_DESC');

  const filters = {
    keyword: sanitizeFilterValue(req.query.keyword),
    genre: sanitizeFilterValue(req.query.genre),
    year: sanitizeFilterValue(req.query.year),
    season: sanitizeFilterValue(req.query.season),
    format: sanitizeFilterValue(req.query.format),
    status: sanitizeFilterValue(req.query.status),
    sort,
    page,
    perPage,
  };

  try {
    let provider = 'CACHE';
    let isFallback = false;
    let message = '';
    const hasKeyword = Boolean(String(filters.keyword || '').trim());

    if (hasKeyword) {
      const providerResult = await fetchSearchAnime(filters);
      provider = providerResult.provider;
      isFallback = Boolean(providerResult.isFallback);
      message = providerResult.message || '';
      await hydrateCacheFromProviderItems(filterSafeItems(providerResult.items), providerResult.provider);

      const cachedAfterProvider = await listCachedAnime({ ...filters, lang });
      const localizedAfterProvider = localizeRows(cachedAfterProvider.rows || [], lang);
      if (localizedAfterProvider.length > 0) {
        return res.json({
          pageInfo: cachedAfterProvider.pageInfo,
          items: localizedAfterProvider,
          provider,
          isFallback,
          message,
        });
      }

      if (providerResult.items?.length) {
        const renderableProviderItems = filterSafeItems(providerResult.items).filter((item) =>
          isRenderableAnimeRow({
            externalId: item.externalId || item.malId || item.id,
            provider: item.provider || providerResult.provider || 'JIKAN',
            romajiTitle: item.title?.romaji || null,
            englishTitle: item.title?.english || null,
            nativeTitle: item.title?.native || null,
            imageUrl: item.coverImage?.extraLarge || item.coverImage?.large || item.coverImage?.medium || null,
            averageScore: item.averageScore ?? item.meanScore ?? null,
            episodes: item.episodes ?? null,
          })
        );
        const localizedFallback = await getLocalizedAnimeListWithTranslations(renderableProviderItems, lang);
        return res.json({
          pageInfo: providerResult.pageInfo,
          items: localizedFallback,
          provider,
          isFallback,
          message,
        });
      }
    }

    let cached = await listCachedAnime({ ...filters, lang });
    if ((cached.items || []).length === 0 || shouldRefreshForScoreCoverage(cached.rows, 5)) {
      const providerResult = await fetchSearchAnime(filters);
      provider = providerResult.provider;
      isFallback = Boolean(providerResult.isFallback);
      message = providerResult.message || '';
      await hydrateCacheFromProviderItems(filterSafeItems(providerResult.items), providerResult.provider);
      cached = await listCachedAnime({ ...filters, lang });
    }

    const items = localizeRows(cached.rows || [], lang);
    return res.json({
      pageInfo: cached.pageInfo,
      items,
      provider,
      isFallback,
      message,
    });
  } catch (error) {
    console.error('[ANIME_SEARCH] failed:', error);
    try {
      const fallbackResult = await fetchSearchAnime(filters);
      const localized = await getLocalizedAnimeListWithTranslations(filterSafeItems(fallbackResult.items || []), lang);
      return res.status(200).json({
        pageInfo:
          fallbackResult.pageInfo || {
            currentPage: page,
            perPage,
            total: localized.length,
            lastPage: 1,
            hasNextPage: false,
          },
        items: localized,
        provider: fallbackResult.provider || 'FALLBACK',
        isFallback: true,
        message: fallbackResult.message || EXTERNAL_FALLBACK_MESSAGE,
        debug: process.env.NODE_ENV !== 'production' ? error.message : undefined,
      });
    } catch (fallbackError) {
      console.error('[ANIME_SEARCH] fallback failed:', fallbackError);
    }
    return res.status(200).json({
      pageInfo: {
        currentPage: page,
        perPage,
        total: 0,
        lastPage: 1,
        hasNextPage: false,
      },
      items: [],
      provider: 'FALLBACK',
      isFallback: true,
      message: EXTERNAL_FALLBACK_MESSAGE,
      debug: process.env.NODE_ENV !== 'production' ? error.message : undefined,
    });
  }
}

async function getAnimeDetail(req, res) {
  const id = Number(req.params.id);
  const lang = getRequestLang(req);

  if (!id) {
    return res.status(400).json({ message: '유효한 애니메이션 ID가 필요합니다.' });
  }

  try {
    let row = await getAnimeByProviderId('JIKAN', id);
    if (row && (row.isAdult || row.isHidden || row.dataStatus !== 'ACTIVE')) {
      return res.status(404).json({ message: '애니메이션 정보를 찾을 수 없습니다.' });
    }

    if (!row) {
      const providerResult = await fetchAnimeDetail(id);
      if (providerResult?.item && !isAdultAnime(providerResult.item)) {
        row = await upsertAnimeCache({ ...providerResult.item, provider: providerResult.provider });
      } else if (providerResult?.item) {
        await upsertAnimeCache({ ...providerResult.item, provider: providerResult.provider });
      }
    } else {
      const animeFromCache = toAnimeLike(row);
      const needsDetailRefresh =
        !hasMeaningfulScore(animeFromCache) ||
        !animeFromCache.coverImage?.large ||
        !animeFromCache.description;

      if (needsDetailRefresh) {
        const providerResult = await fetchAnimeDetail(id);
        if (providerResult?.item && !isAdultAnime(providerResult.item)) {
          row = await upsertAnimeCache({ ...providerResult.item, provider: providerResult.provider });
        } else if (providerResult?.item) {
          await upsertAnimeCache({ ...providerResult.item, provider: providerResult.provider });
        }
      }
    }

    if (!row || row.isAdult || row.isHidden || row.dataStatus !== 'ACTIVE') {
      return res.status(404).json({ message: '애니메이션 정보를 찾을 수 없습니다.' });
    }

    const anime = toAnimeLike(row);
    const localized = await getLocalizedAnimeFromDbOnly(anime, lang, { skipCacheWrite: true });

    const genres = parseGenres(row.genres);
    if (genres.length > 0) {
      const similarCached = await listCachedAnime({
        page: 1,
        perPage: 8,
        genre: genres[0],
        sort: 'SCORE_DESC',
        lang,
      });

      let similarItems = similarCached.items
        .filter((item) => Number(item.externalId || item.malId || item.id) !== id)
        .slice(0, 8);

      if (similarItems.length < 4) {
        const similarProvider = await fetchSimilarAnime({ animeId: id, genres, page: 1, perPage: 8 });
        await hydrateCacheFromProviderItems(similarProvider.items, similarProvider.provider);
        const refresh = await listCachedAnime({
          page: 1,
          perPage: 8,
          genre: genres[0],
          sort: 'SCORE_DESC',
          lang,
        });
        similarItems = refresh.items
          .filter((item) => Number(item.externalId || item.malId || item.id) !== id)
          .slice(0, 8);
      }

      localized.similarItems = await getLocalizedAnimeListWithTranslations(similarItems, lang);
    } else {
      localized.similarItems = [];
    }

    return res.json(localized);
  } catch (error) {
    console.error('[ANIME_DETAIL] failed:', error);
    return res.status(404).json({ message: '애니메이션 정보를 찾을 수 없습니다.' });
  }
}

async function getRecommendations(req, res) {
  const lang = getRequestLang(req);
  const perPage = toPositiveInt(req.query.perPage, 12);

  try {
    const [favorites, watchStatuses, reviews] = await Promise.all([
      prisma.favorite.findMany({ where: { userId: req.user.id }, select: { animeId: true } }),
      prisma.watchStatus.findMany({ where: { userId: req.user.id }, select: { animeId: true, status: true } }),
      prisma.review.findMany({ where: { userId: req.user.id, rating: { gte: 4 } }, select: { animeId: true } }),
    ]);

    const ids = [
      ...new Set([
        ...favorites.map((item) => item.animeId),
        ...watchStatuses.map((item) => item.animeId),
        ...reviews.map((item) => item.animeId),
      ]),
    ];

    const cachedRows = ids.length
      ? await prisma.anime.findMany({
          where: {
            externalId: { in: ids },
            provider: 'JIKAN',
            isAdult: false,
            isHidden: false,
            dataStatus: 'ACTIVE',
          },
        })
      : [];

    const genreCount = {};
    cachedRows.forEach((row) => {
      parseGenres(row.genres).forEach((genre) => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });

    const sortedGenres = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);
    const topGenre = sortedGenres[0] || '';

    let cachedRecommendation = await listCachedAnime({
      page: 1,
      perPage,
      genre: topGenre,
      sort: 'SCORE_DESC',
      lang,
    });

    let provider = 'CACHE';
    let isFallback = false;
    let reason = topGenre
      ? `${topGenre} 장르를 자주 찜해서 추천합니다.`
      : '선호 장르 데이터가 부족하여 인기 작품을 추천합니다.';

    if ((cachedRecommendation.items || []).length < Math.min(6, perPage)) {
      const external = await fetchRecommendations({ favoriteGenres: sortedGenres, perPage });
      await hydrateCacheFromProviderItems(filterSafeItems(external.items), external.provider);

      provider = external.provider;
      isFallback = Boolean(external.isFallback);
      reason = external.reason || reason;

      cachedRecommendation = await listCachedAnime({
        page: 1,
        perPage,
        genre: external.genre || topGenre,
        sort: 'SCORE_DESC',
        lang,
      });

      if ((cachedRecommendation.items || []).length === 0) {
        cachedRecommendation = await listCachedAnime({ page: 1, perPage, sort: 'POPULARITY_DESC', lang });
      }
    }

    const localizedItems = localizeRows(cachedRecommendation.rows || [], lang);

    return res.json({
      type: topGenre ? 'GENRE_BASED' : 'TRENDING_DESC',
      genre: topGenre || null,
      reason,
      items: localizedItems,
      provider,
      isFallback,
      message: isFallback ? EXTERNAL_FALLBACK_MESSAGE : '',
    });
  } catch (error) {
    const fallback = await listCachedAnime({ page: 1, perPage, sort: 'POPULARITY_DESC', lang });
    return res.json({
      type: 'TRENDING_DESC',
      genre: null,
      reason: '선호 장르 데이터가 부족하여 인기 작품을 추천합니다.',
      items: localizeRows(fallback.rows || [], lang),
      provider: 'CACHE',
      isFallback: false,
      message: '',
    });
  }
}

async function testProvider(req, res) {
  const lang = getRequestLang(req);

  try {
    const test = await testProviderConnection();
    return res.json({
      ...test,
      sample: await getLocalizedAnimeListWithTranslations(filterSafeItems(test.sample || []), lang),
    });
  } catch (error) {
    return res.json({
      ok: true,
      provider: 'FALLBACK',
      isFallback: true,
      message: EXTERNAL_FALLBACK_MESSAGE,
      sample: [],
    });
  }
}

async function testAniListConnection(req, res) {
  const query = `
    query {
      Page(page: 1, perPage: 1) {
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
          }
        }
      }
    }
  `;

  try {
    const data = await requestAniList(query, {}, false);
    return res.json({ ok: true, sample: data.Page?.media || [] });
  } catch (error) {
    return res.status(error.statusCode || 502).json({
      ok: false,
      message: error.message,
    });
  }
}

async function debugAnimeTitle(req, res) {
  const id = Number(req.params.id);
  const lang = getRequestLang(req);
  if (!id) {
    return res.status(400).json({ message: 'Valid anime id is required.' });
  }

  const row = await prisma.anime.findUnique({
    where: {
      provider_externalId: {
        provider: 'JIKAN',
        externalId: id,
      },
    },
    include: {
      translations: true,
    },
  });

  const anime = row
    ? toAnimeLike(row)
    : { id, externalId: id, malId: id, provider: 'JIKAN', title: {}, description: '' };

  const translation = row?.translations?.find((item) => item.lang === lang) || null;
  const seed = getTranslationSeedByAnime(anime);
  const computedDisplayTitle = getDisplayTitle(anime, lang, translation);

  return res.json({
    id,
    lang,
    provider: 'JIKAN',
    externalId: id,
    cachedAnimeExists: Boolean(row),
    rawTitles: {
      romaji: row?.romajiTitle || null,
      english: row?.englishTitle || null,
      native: row?.nativeTitle || null,
    },
    translations: row?.translations || [],
    seedTranslation: seed?.row || null,
    titleMapValue: seed?.row?.koTitle || null,
    computedDisplayTitle,
    fallbackTitle: getBestOriginalTitle(anime),
    imageUrl: row?.imageUrl || null,
    isRenderable: isRenderableAnimeRow(row || {}),
  });
}

module.exports = {
  getTrendingAnime,
  getPopularThisSeason,
  searchAnime,
  getAnimeDetail,
  getRecommendations,
  testProvider,
  testAniListConnection,
  debugAnimeTitle,
};

```

### File: `backend/src/controllers/auth.controller.js`

- size: `3,205` bytes

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    console.warn('[AUTH] JWT_SECRET is not set. Using fallback_secret for development only.');
  }

  return process.env.JWT_SECRET || 'fallback_secret';
}

function buildAuthResponse(user) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
    },
    getJwtSecret(),
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
    },
  };
}

async function register(req, res) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const nickname = String(req.body.nickname || '').trim();

    if (!email || !password || !nickname) {
      return res.status(400).json({ message: 'email, password, nickname are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        nickname,
        role: 'USER',
      },
    });

    return res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    console.error('[AUTH] Register error:', error.message);
    return res.status(500).json({ message: 'Failed to register user.' });
  }
}

async function login(req, res) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    return res.json(buildAuthResponse(user));
  } catch (error) {
    console.error('[AUTH] Login error:', error.message);
    return res.status(500).json({ message: 'Failed to login.' });
  }
}

async function me(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json(user);
  } catch (error) {
    console.error('[AUTH] Me error:', error.message);
    return res.status(500).json({ message: 'Failed to fetch current user.' });
  }
}

module.exports = {
  register,
  login,
  me,
};

```

### File: `backend/src/controllers/favorite.controller.js`

- size: `4,330` bytes

```javascript
﻿const prisma = require('../lib/prisma');
const { normalizeLang, getLocalizedAnime } = require('../utils/animeI18n');
const { toAnimeLike } = require('../services/anime-cache.service');

function getRequestLang(req) {
  return normalizeLang(req.query.lang || req.headers['x-anipick-lang'] || 'ko');
}

function sanitizeAnimeTitle(title, animeId) {
  const text = String(title || '').trim();
  if (!text || text === '한국어 제목 준비 중') {
    return `애니메이션 #${animeId}`;
  }
  return text;
}

async function buildDisplayMap(animeIds, lang) {
  const uniqueIds = [...new Set((animeIds || []).map(Number).filter(Boolean))];
  if (!uniqueIds.length) return new Map();

  const rows = await prisma.anime.findMany({
    where: {
      provider: 'JIKAN',
      externalId: { in: uniqueIds },
    },
    include: {
      translations: true,
    },
  });

  const map = new Map();
  rows.forEach((row) => {
    const anime = toAnimeLike(row);
    const translation = (row.translations || []).find((item) => item.lang === lang) || null;
    const localized = getLocalizedAnime(anime, lang, translation);
    map.set(row.externalId, {
      title: localized.displayTitle,
      image: anime.coverImage?.large || null,
    });
  });

  return map;
}

async function getMyFavorites(req, res) {
  try {
    const lang = getRequestLang(req);
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    const displayMap = await buildDisplayMap(favorites.map((item) => item.animeId), lang);

    const enriched = favorites.map((item) => {
      const display = displayMap.get(item.animeId);
      return {
        ...item,
        animeTitle: sanitizeAnimeTitle(item.animeTitle, item.animeId),
        animeTitleDisplay: display?.title || sanitizeAnimeTitle(item.animeTitle, item.animeId),
        animeImageDisplay: display?.image || item.animeImage || null,
      };
    });

    return res.json(enriched);
  } catch (error) {
    console.error('Get favorites error:', error);
    return res.status(500).json({ message: 'Failed to fetch favorites.' });
  }
}

async function addFavorite(req, res) {
  try {
    const { animeId, animeTitle, animeImage } = req.body;

    if (!animeId || !animeTitle) {
      return res.status(400).json({ message: 'animeId and animeTitle are required.' });
    }

    const safeTitle = sanitizeAnimeTitle(animeTitle, animeId);

    const favorite = await prisma.favorite.create({
      data: {
        userId: req.user.id,
        animeId: Number(animeId),
        animeTitle: safeTitle,
        animeImage: animeImage || null,
      },
    });

    return res.status(201).json(favorite);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'This anime is already in favorites.' });
    }

    console.error('Add favorite error:', error);
    return res.status(500).json({ message: 'Failed to add favorite.' });
  }
}

async function removeFavorite(req, res) {
  try {
    const animeId = Number(req.params.animeId);

    if (!animeId) {
      return res.status(400).json({ message: 'Valid animeId is required.' });
    }

    const result = await prisma.favorite.deleteMany({
      where: {
        userId: req.user.id,
        animeId,
      },
    });

    if (result.count === 0) {
      return res.status(404).json({ message: 'Favorite not found.' });
    }

    return res.json({ message: 'Favorite removed.' });
  } catch (error) {
    console.error('Remove favorite error:', error);
    return res.status(500).json({ message: 'Failed to remove favorite.' });
  }
}

async function checkFavorite(req, res) {
  try {
    const animeId = Number(req.params.animeId);

    if (!animeId) {
      return res.status(400).json({ message: 'Valid animeId is required.' });
    }

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_animeId: {
          userId: req.user.id,
          animeId,
        },
      },
    });

    return res.json({ isFavorite: Boolean(favorite) });
  } catch (error) {
    console.error('Check favorite error:', error);
    return res.status(500).json({ message: 'Failed to check favorite status.' });
  }
}

module.exports = {
  getMyFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
};

```

### File: `backend/src/controllers/notice.controller.js`

- size: `1,460` bytes

```javascript
const prisma = require('../lib/prisma');

async function getNotices(req, res) {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.json(notices);
  } catch (error) {
    console.error('Get notices error:', error);
    return res.status(500).json({ message: 'Failed to fetch notices.' });
  }
}

async function createNotice(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'title and content are required.' });
    }

    const notice = await prisma.notice.create({
      data: {
        title: String(title).trim(),
        content: String(content).trim(),
      },
    });

    return res.status(201).json(notice);
  } catch (error) {
    console.error('Create notice error:', error);
    return res.status(500).json({ message: 'Failed to create notice.' });
  }
}

async function deleteNotice(req, res) {
  try {
    const noticeId = Number(req.params.id);

    if (!noticeId) {
      return res.status(400).json({ message: 'Valid notice id is required.' });
    }

    await prisma.notice.delete({ where: { id: noticeId } });
    return res.json({ message: 'Notice deleted.' });
  } catch (error) {
    console.error('Delete notice error:', error);
    return res.status(500).json({ message: 'Failed to delete notice.' });
  }
}

module.exports = {
  getNotices,
  createNotice,
  deleteNotice,
};

```

### File: `backend/src/controllers/review.controller.js`

- size: `4,380` bytes

```javascript
const prisma = require('../lib/prisma');

async function getReviewsByAnime(req, res) {
  try {
    const animeId = Number(req.params.animeId);

    if (!animeId) {
      return res.status(400).json({ message: 'Valid animeId is required.' });
    }

    const reviews = await prisma.review.findMany({
      where: { animeId },
      include: {
        user: {
          select: { id: true, nickname: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    return res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
}

async function getMyReviews(req, res) {
  try {
    const reviews = await prisma.review.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(reviews);
  } catch (error) {
    console.error('Get my reviews error:', error);
    return res.status(500).json({ message: 'Failed to fetch your reviews.' });
  }
}

async function createReview(req, res) {
  try {
    const { animeId, rating, content } = req.body;

    if (!animeId || !rating || !content) {
      return res.status(400).json({ message: 'animeId, rating, and content are required.' });
    }

    const normalizedRating = Number(rating);
    if (Number.isNaN(normalizedRating) || normalizedRating < 1 || normalizedRating > 5) {
      return res.status(400).json({ message: 'rating must be between 1 and 5.' });
    }

    const review = await prisma.review.create({
      data: {
        userId: req.user.id,
        animeId: Number(animeId),
        rating: normalizedRating,
        content: String(content).trim(),
      },
      include: {
        user: {
          select: { id: true, nickname: true },
        },
      },
    });

    return res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    return res.status(500).json({ message: 'Failed to create review.' });
  }
}

async function updateReview(req, res) {
  try {
    const reviewId = Number(req.params.id);
    const { rating, content } = req.body;

    if (!reviewId) {
      return res.status(400).json({ message: 'Valid review id is required.' });
    }

    const existing = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!existing) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    if (existing.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'You can only update your own review.' });
    }

    const data = {};

    if (rating !== undefined) {
      const normalizedRating = Number(rating);
      if (Number.isNaN(normalizedRating) || normalizedRating < 1 || normalizedRating > 5) {
        return res.status(400).json({ message: 'rating must be between 1 and 5.' });
      }
      data.rating = normalizedRating;
    }

    if (content !== undefined) {
      const normalizedContent = String(content).trim();
      if (!normalizedContent) {
        return res.status(400).json({ message: 'content cannot be empty.' });
      }
      data.content = normalizedContent;
    }

    const updated = await prisma.review.update({
      where: { id: reviewId },
      data,
    });

    return res.json(updated);
  } catch (error) {
    console.error('Update review error:', error);
    return res.status(500).json({ message: 'Failed to update review.' });
  }
}

async function deleteReview(req, res) {
  try {
    const reviewId = Number(req.params.id);

    if (!reviewId) {
      return res.status(400).json({ message: 'Valid review id is required.' });
    }

    const existing = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!existing) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    if (existing.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'You can only delete your own review.' });
    }

    await prisma.review.delete({ where: { id: reviewId } });
    return res.json({ message: 'Review deleted.' });
  } catch (error) {
    console.error('Delete review error:', error);
    return res.status(500).json({ message: 'Failed to delete review.' });
  }
}

module.exports = {
  getReviewsByAnime,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
};

```

### File: `backend/src/controllers/translation.controller.js`

- size: `8,384` bytes

```javascript
const prisma = require('../lib/prisma');
const { getCachedAnime, upsertTranslation } = require('../services/anime-cache.service');
const {
  createMissingTranslationJobs,
  runTranslationJobs,
  getTranslationCoverage,
} = require('../services/translation-job.service');
const {
  getCandidateModels,
  getOpenAIClient,
  listAccessibleModels,
  selectTranslationModel,
  getUnavailableModels,
} = require('../services/openai-model.service');

function normalizeProvider(provider) {
  return String(provider || 'JIKAN').toUpperCase();
}

function parseExternalId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function adminTranslationEnabled() {
  return String(process.env.ENABLE_ADMIN_TRANSLATION || 'true').toLowerCase() !== 'false';
}

async function getTranslations(req, res) {
  const provider = normalizeProvider(req.params.provider);
  const externalId = parseExternalId(req.params.externalId);
  if (!externalId) return res.status(400).json({ message: 'Invalid externalId.' });

  const anime = await prisma.anime.findUnique({
    where: { provider_externalId: { provider, externalId } },
    include: { translations: true },
  });

  if (!anime) return res.status(404).json({ message: 'Anime cache not found.' });
  return res.json({ anime, translations: anime.translations || [] });
}

async function putTranslation(req, res) {
  const provider = normalizeProvider(req.params.provider);
  const externalId = parseExternalId(req.params.externalId);
  const { lang, title, description, source = 'MANUAL', status = 'REVIEWED' } = req.body || {};

  if (!externalId || !lang) {
    return res.status(400).json({ message: 'externalId and lang are required.' });
  }

  const saved = await upsertTranslation({
    provider,
    externalId,
    lang,
    title,
    description,
    source,
    status,
    failureReason: null,
  });
  return res.json(saved);
}

async function autoTranslate(req, res) {
  if (!adminTranslationEnabled()) return res.status(403).json({ message: 'Admin translation is disabled.' });
  const provider = normalizeProvider(req.params.provider);
  const externalId = parseExternalId(req.params.externalId);
  const { targetLangs = ['ko', 'ja'], overwrite = false } = req.body || {};

  if (!externalId) return res.status(400).json({ message: 'Invalid externalId.' });

  const anime = await getCachedAnime(provider, externalId);
  if (!anime) {
    return res.status(404).json({ message: 'Anime cache not found. Run prefetch first.' });
  }

  for (const rawLang of targetLangs) {
    const lang = String(rawLang || '').toLowerCase();
    if (!['ko', 'ja', 'en'].includes(lang)) continue;
    // eslint-disable-next-line no-await-in-loop
    await prisma.translationJob.upsert({
      where: { animeId_lang: { animeId: anime.id, lang } },
      create: {
        animeId: anime.id,
        lang,
        status: 'PENDING',
        requestedBy: `ADMIN:${req.user?.id || 'unknown'}`,
      },
      update: {
        status: 'PENDING',
        reason: null,
        finishedAt: null,
        requestedBy: `ADMIN:${req.user?.id || 'unknown'}`,
      },
    });
  }

  await runTranslationJobs({ langs: targetLangs, limit: targetLangs.length, overwrite: Boolean(overwrite) });
  const refreshed = await prisma.anime.findUnique({ where: { id: anime.id }, include: { translations: true } });
  return res.json({ ok: true, translations: refreshed?.translations || [] });
}

async function deleteTranslation(req, res) {
  const provider = normalizeProvider(req.params.provider);
  const externalId = parseExternalId(req.params.externalId);
  const lang = String(req.params.lang || '').toLowerCase();

  if (!externalId || !lang) {
    return res.status(400).json({ message: 'externalId and lang are required.' });
  }

  const anime = await getCachedAnime(provider, externalId);
  if (!anime) return res.status(404).json({ message: 'Anime cache not found.' });

  await prisma.animeTranslation.delete({
    where: { animeId_lang: { animeId: anime.id, lang } },
  }).catch(() => null);

  return res.json({ ok: true });
}

async function getOpenAIModelStatus(req, res) {
  const candidates = getCandidateModels();
  const client = getOpenAIClient();
  if (!client) {
    return res.json({
      ok: false,
      message: 'No accessible translation model.',
      selectedModel: null,
      candidates,
      accessibleCandidates: [],
      unavailableModels: getUnavailableModels(),
    });
  }

  const accessible = await listAccessibleModels(client);
  const selectedModel = await selectTranslationModel(client, { forceRefresh: true });
  const accessibleCandidates = Array.isArray(accessible)
    ? candidates.filter((model) => accessible.includes(model))
    : [];

  return res.json({
    ok: Boolean(selectedModel),
    message: selectedModel ? '' : 'No accessible translation model.',
    selectedModel: selectedModel || null,
    candidates,
    accessibleCandidates,
    unavailableModels: getUnavailableModels(),
  });
}

async function getAdminTranslationCoverage(req, res) {
  return res.json(await getTranslationCoverage());
}

async function getMissingTranslations(req, res) {
  const lang = String(req.query.lang || 'ko').toLowerCase();
  const limit = Math.max(1, Math.min(Number(req.query.limit) || 50, 200));
  const rows = await prisma.anime.findMany({
    where: {
      dataStatus: 'ACTIVE',
      translations: { none: { lang } },
    },
    orderBy: [{ popularity: 'desc' }, { averageScore: 'desc' }, { updatedAt: 'desc' }],
    take: limit,
  });
  return res.json(rows);
}

async function createAdminTranslationJobs(req, res) {
  if (!adminTranslationEnabled()) return res.status(403).json({ message: 'Admin translation is disabled.' });
  const { langs = ['ko', 'ja'], limit = 100 } = req.body || {};
  const jobs = await createMissingTranslationJobs({
    langs,
    limit,
    requestedBy: `ADMIN:${req.user?.id || 'unknown'}`,
  });
  return res.status(201).json({ created: jobs.length, jobs });
}

async function runAdminTranslationJobs(req, res) {
  if (!adminTranslationEnabled()) return res.status(403).json({ message: 'Admin translation is disabled.' });
  const { langs = ['ko', 'ja'], limit = 20, overwrite = false } = req.body || {};
  return res.json({ results: await runTranslationJobs({ langs, limit, overwrite }) });
}

async function reviewTranslation(req, res) {
  const provider = normalizeProvider(req.params.provider);
  const externalId = parseExternalId(req.params.externalId);
  const { lang } = req.body || {};
  if (!externalId || !lang) return res.status(400).json({ message: 'externalId and lang are required.' });

  const anime = await getCachedAnime(provider, externalId);
  if (!anime) return res.status(404).json({ message: 'Anime cache not found.' });

  const saved = await prisma.animeTranslation.update({
    where: { animeId_lang: { animeId: anime.id, lang } },
    data: {
      status: 'REVIEWED',
      reviewedBy: req.user.id,
      reviewedAt: new Date(),
      failureReason: null,
    },
  });
  return res.json(saved);
}

async function retryTranslation(req, res) {
  if (!adminTranslationEnabled()) return res.status(403).json({ message: 'Admin translation is disabled.' });
  const provider = normalizeProvider(req.params.provider);
  const externalId = parseExternalId(req.params.externalId);
  const { lang = 'ko' } = req.body || {};
  if (!externalId || !lang) return res.status(400).json({ message: 'externalId and lang are required.' });

  const anime = await getCachedAnime(provider, externalId);
  if (!anime) return res.status(404).json({ message: 'Anime cache not found.' });

  const job = await prisma.translationJob.upsert({
    where: { animeId_lang: { animeId: anime.id, lang } },
    create: {
      animeId: anime.id,
      lang,
      status: 'PENDING',
      attempts: 0,
      requestedBy: `ADMIN:${req.user?.id || 'unknown'}`,
    },
    update: {
      status: 'PENDING',
      reason: null,
      attempts: 0,
      finishedAt: null,
      requestedBy: `ADMIN:${req.user?.id || 'unknown'}`,
    },
  });
  return res.status(201).json(job);
}

module.exports = {
  getTranslations,
  putTranslation,
  autoTranslate,
  deleteTranslation,
  getOpenAIModelStatus,
  getAdminTranslationCoverage,
  getMissingTranslations,
  createAdminTranslationJobs,
  runAdminTranslationJobs,
  reviewTranslation,
  retryTranslation,
};

```

### File: `backend/src/controllers/watchStatus.controller.js`

- size: `4,109` bytes

```javascript
﻿const prisma = require('../lib/prisma');
const { normalizeLang, getLocalizedAnime } = require('../utils/animeI18n');
const { toAnimeLike } = require('../services/anime-cache.service');

const ALLOWED_STATUS = ['PLAN_TO_WATCH', 'WATCHING', 'COMPLETED', 'DROPPED'];

function getRequestLang(req) {
  return normalizeLang(req.query.lang || req.headers['x-anipick-lang'] || 'ko');
}

function sanitizeAnimeTitle(title, animeId) {
  const text = String(title || '').trim();
  if (!text || text === '한국어 제목 준비 중') {
    return `애니메이션 #${animeId}`;
  }
  return text;
}

async function buildDisplayMap(animeIds, lang) {
  const uniqueIds = [...new Set((animeIds || []).map(Number).filter(Boolean))];
  if (!uniqueIds.length) return new Map();

  const rows = await prisma.anime.findMany({
    where: {
      provider: 'JIKAN',
      externalId: { in: uniqueIds },
    },
    include: {
      translations: true,
    },
  });

  const map = new Map();
  rows.forEach((row) => {
    const anime = toAnimeLike(row);
    const translation = (row.translations || []).find((item) => item.lang === lang) || null;
    const localized = getLocalizedAnime(anime, lang, translation);
    map.set(row.externalId, {
      title: localized.displayTitle,
      image: anime.coverImage?.large || null,
    });
  });

  return map;
}

async function getMyWatchStatus(req, res) {
  try {
    const lang = getRequestLang(req);

    const list = await prisma.watchStatus.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: 'desc' },
    });

    const displayMap = await buildDisplayMap(list.map((item) => item.animeId), lang);

    const enriched = list.map((item) => {
      const display = displayMap.get(item.animeId);
      return {
        ...item,
        animeTitle: sanitizeAnimeTitle(item.animeTitle, item.animeId),
        animeTitleDisplay: display?.title || sanitizeAnimeTitle(item.animeTitle, item.animeId),
        animeImageDisplay: display?.image || item.animeImage || null,
      };
    });

    return res.json(enriched);
  } catch (error) {
    console.error('Get watch status error:', error);
    return res.status(500).json({ message: 'Failed to fetch watch status.' });
  }
}

async function upsertWatchStatus(req, res) {
  try {
    const { animeId, animeTitle, animeImage, status } = req.body;

    if (!animeId || !animeTitle || !status) {
      return res.status(400).json({ message: 'animeId, animeTitle, and status are required.' });
    }

    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const safeTitle = sanitizeAnimeTitle(animeTitle, animeId);

    const saved = await prisma.watchStatus.upsert({
      where: {
        userId_animeId: {
          userId: req.user.id,
          animeId: Number(animeId),
        },
      },
      update: {
        animeTitle: safeTitle,
        animeImage: animeImage || null,
        status,
      },
      create: {
        userId: req.user.id,
        animeId: Number(animeId),
        animeTitle: safeTitle,
        animeImage: animeImage || null,
        status,
      },
    });

    return res.json(saved);
  } catch (error) {
    console.error('Upsert watch status error:', error);
    return res.status(500).json({ message: 'Failed to save watch status.' });
  }
}

async function removeWatchStatus(req, res) {
  try {
    const animeId = Number(req.params.animeId);

    if (!animeId) {
      return res.status(400).json({ message: 'Valid animeId is required.' });
    }

    const deleted = await prisma.watchStatus.deleteMany({
      where: {
        userId: req.user.id,
        animeId,
      },
    });

    if (!deleted.count) {
      return res.status(404).json({ message: 'Watch status not found.' });
    }

    return res.json({ message: 'Watch status removed.' });
  } catch (error) {
    console.error('Remove watch status error:', error);
    return res.status(500).json({ message: 'Failed to remove watch status.' });
  }
}

module.exports = {
  getMyWatchStatus,
  upsertWatchStatus,
  removeWatchStatus,
};

```

### File: `backend/src/data/animeTranslations.js`

- size: `13,708` bytes

```javascript
﻿const animeTranslations = {
  1: {
    koTitle: '카우보이 비밥',
    enTitle: 'Cowboy Bebop',
    jaTitle: 'カウボーイビバップ',
    koDescription: '우주를 떠도는 현상금 사냥꾼들이 각자의 과거와 마주하며 살아가는 SF 느와르 애니메이션입니다.',
  },
  5: { koTitle: '카우보이 비밥: 천국의 문', enTitle: 'Cowboy Bebop: The Movie', jaTitle: 'カウボーイビバップ 天国の扉' },
  20: {
    koTitle: '나루토',
    enTitle: 'NARUTO',
    jaTitle: 'ナルト',
    koDescription: '닌자가 되기 위해 성장하는 소년 나루토의 우정과 도전을 그린 장편 소년 애니메이션입니다.',
  },
  21: {
    koTitle: '원피스',
    enTitle: 'ONE PIECE',
    jaTitle: 'ワンピース',
    koDescription: '해적왕을 꿈꾸는 루피와 밀짚모자 일당이 전설의 보물을 찾아 항해하는 모험 애니메이션입니다.',
  },
  30: {
    koTitle: '신세기 에반게리온',
    enTitle: 'Neon Genesis Evangelion',
    jaTitle: '新世紀エヴァンゲリオン',
    koDescription: '사도에 맞서 싸우는 소년소녀들의 전투와 심리를 그린 메카 드라마입니다.',
  },
  1535: {
    koTitle: '데스노트',
    enTitle: 'Death Note',
    jaTitle: 'デスノート',
    koDescription: '데스노트를 얻은 학생이 범죄자를 심판하며 벌어지는 치열한 두뇌 대결을 다룹니다.',
  },
  1575: {
    koTitle: '코드 기아스',
    enTitle: 'Code Geass',
    jaTitle: 'コードギアス 反逆のルルーシュ',
    koDescription: '절대 명령의 힘을 얻은 주인공이 제국에 반기를 드는 반역 서사를 그린 작품입니다.',
  },
  16498: {
    koTitle: '진격의 거인',
    enTitle: 'Attack on Titan',
    jaTitle: '進撃の巨人',
    koDescription: '거인에게 맞서 인류의 생존을 건 전투와 세계의 비밀을 파헤치는 다크 판타지입니다.',
  },
  1735: {
    koTitle: '나루토 질풍전',
    enTitle: 'Naruto: Shippuden',
    jaTitle: 'ナルト 疾風伝',
    koDescription: '성장한 나루토 세대가 더 거대한 전쟁과 운명에 맞서는 후속 시리즈입니다.',
  },
  18679: {
    koTitle: '킬라킬',
    enTitle: 'Kill la Kill',
    jaTitle: 'キルラキル',
    koDescription: '강렬한 액션과 과장된 연출로 학교를 지배하는 권력 구조에 맞서는 이야기입니다.',
  },
  19815: {
    koTitle: '노 게임 노 라이프',
    enTitle: 'No Game No Life',
    jaTitle: 'ノーゲーム・ノーライフ',
    koDescription: '게임으로 모든 것이 결정되는 세계에서 천재 남매가 도전하는 판타지 두뇌전입니다.',
  },
  20507: {
    koTitle: '노라가미',
    enTitle: 'Noragami',
    jaTitle: 'ノラガミ',
    koDescription: '무명신 야토가 인간과 인연을 맺으며 신과 요괴 세계의 사건을 해결해 나갑니다.',
  },
  20583: {
    koTitle: '하이큐',
    enTitle: 'Haikyu!!',
    jaTitle: 'ハイキュー!!',
    koDescription: '배구에 빠진 소년들이 팀워크와 성장을 통해 정상에 도전하는 스포츠 애니메이션입니다.',
  },
  20605: {
    koTitle: '도쿄 구울 √A',
    enTitle: 'Tokyo Ghoul √A',
    jaTitle: '東京喰種√A',
    koDescription: '인간과 구울 사이에서 갈등하는 카네키의 선택과 폭력적인 세계를 그린 작품입니다.',
  },
  21459: { koTitle: '나의 히어로 아카데미아 2기', enTitle: 'My Hero Academia Season 2', jaTitle: '僕のヒーローアカデミア 第2期' },
  21827: {
    koTitle: '바이올렛 에버가든',
    enTitle: 'Violet Evergarden',
    jaTitle: 'ヴァイオレット・エヴァーガーデン',
    koDescription: '감정을 이해하지 못하던 소녀가 편지를 쓰며 사람의 마음을 배워가는 감성 드라마입니다.',
  },
  22319: {
    koTitle: '도쿄 구울',
    enTitle: 'Tokyo Ghoul',
    jaTitle: '東京喰種',
    koDescription: '인간이던 청년이 구울이 된 뒤 정체성과 생존 사이에서 고뇌하는 다크 액션입니다.',
  },
  22370: { koTitle: '원펀맨 OVA', enTitle: 'One Punch Man OVA', jaTitle: 'ワンパンマン OVA' },
  2251: {
    koTitle: '기생수',
    enTitle: 'Parasyte',
    jaTitle: '寄生獣 セイの格率',
    koDescription: '인간의 몸을 노리는 기생 생물과 공존하게 된 소년의 사투를 그린 SF 스릴러입니다.',
  },
  235: {
    koTitle: '명탐정 코난',
    enTitle: 'Detective Conan',
    jaTitle: '名探偵コナン',
    koDescription: '몸이 작아진 고교 탐정이 각종 사건을 해결하며 검은 조직의 실체를 추적합니다.',
  },
  269: {
    koTitle: '블리치',
    enTitle: 'BLEACH',
    jaTitle: 'ブリーチ',
    koDescription: '사신의 힘을 얻은 이치고가 영혼 세계의 위협에 맞서 싸우는 배틀 액션입니다.',
  },
  223: {
    koTitle: '드래곤볼',
    enTitle: 'Dragon Ball',
    jaTitle: 'ドラゴンボール',
    koDescription: '손오공이 동료들과 함께 모험과 수련을 거듭하며 강적들과 맞서는 전설적인 작품입니다.',
  },
  30015: {
    koTitle: '리제로',
    enTitle: 'Re:ZERO -Starting Life in Another World-',
    jaTitle: 'Re:ゼロから始める異世界生活',
    koDescription: '죽으면 시간을 되돌리는 능력을 얻은 소년이 소중한 사람을 지키기 위해 반복에 맞섭니다.',
  },
  30276: {
    koTitle: '원펀맨',
    enTitle: 'One Punch Man',
    jaTitle: 'ワンパンマン',
    koDescription: '너무 강해져 한 방에 끝내는 히어로가 허무함 속에서도 도시를 지키는 액션 코미디입니다.',
  },
  31964: {
    koTitle: '나의 히어로 아카데미아',
    enTitle: 'My Hero Academia',
    jaTitle: '僕のヒーローアカデミア',
    koDescription: '개성이 보편화된 사회에서 무개성 소년이 최고의 히어로를 꿈꾸며 성장합니다.',
  },
  33051: {
    koTitle: '쿠로코의 농구',
    enTitle: "Kuroko's Basketball",
    jaTitle: '黒子のバスケ',
    koDescription: '보이지 않는 패스를 무기로 한 쿠로코와 동료들의 뜨거운 농구 승부를 담았습니다.',
  },
  33486: { koTitle: '나의 히어로 아카데미아 2기', enTitle: 'My Hero Academia Season 2', jaTitle: '僕のヒーローアカデミア 第2期' },
  34240: {
    koTitle: '메이드 인 어비스',
    enTitle: 'Made in Abyss',
    jaTitle: 'メイドインアビス',
    koDescription: '심연의 대구멍을 탐험하는 소녀와 로봇 소년의 모험을 잔혹하고 아름답게 그립니다.',
  },
  37991: { koTitle: '약속의 네버랜드 2기', enTitle: 'The Promised Neverland Season 2', jaTitle: '約束のネバーランド Season 2' },
  40748: { koTitle: '주술회전 2기', enTitle: 'Jujutsu Kaisen Season 2', jaTitle: '呪術廻戦 第2期' },
  5114: {
    koTitle: '강철의 연금술사 BROTHERHOOD',
    enTitle: 'Fullmetal Alchemist: Brotherhood',
    jaTitle: '鋼の錬金術師 FULLMETAL ALCHEMIST',
    koDescription: '잃어버린 것을 되찾기 위해 금기를 저지른 형제가 진실을 향해 나아가는 모험 서사입니다.',
  },
  6547: {
    koTitle: 'Angel Beats!',
    enTitle: 'Angel Beats!',
    jaTitle: 'Angel Beats!',
    koDescription: '사후 세계 학교를 배경으로 각자의 상처를 가진 학생들이 해방을 찾아가는 이야기입니다.',
  },
  6702: { koTitle: '페어리 테일', enTitle: 'Fairy Tail', jaTitle: 'フェアリーテイル', koDescription: '마도사 길드 동료들이 우정과 모험으로 강적들을 돌파하는 판타지 배틀물입니다.' },
  6922: { koTitle: '강철의 연금술사', enTitle: 'Fullmetal Alchemist', jaTitle: '鋼の錬金術師' },
  7785: { koTitle: '요스가노소라', enTitle: 'Yosuga no Sora', jaTitle: 'ヨスガノソラ' },
  9253: {
    koTitle: '슈타인즈 게이트',
    enTitle: 'Steins;Gate',
    jaTitle: 'シュタインズ・ゲート',
    koDescription: '사소한 실험에서 시작된 시간여행이 세계선의 비극으로 번지는 SF 미스터리입니다.',
  },
  97938: { koTitle: '보루토', enTitle: 'Boruto: Naruto Next Generations', jaTitle: 'BORUTO-ボルト-' },
  97940: {
    koTitle: '블랙 클로버',
    enTitle: 'Black Clover',
    jaTitle: 'ブラッククローバー',
    koDescription: '마력이 없는 소년 아스타가 마법제에 도전하며 라이벌과 함께 성장하는 배틀 판타지입니다.',
  },
  9919: { koTitle: '청의 엑소시스트', enTitle: 'Blue Exorcist', jaTitle: '青の祓魔師' },
  9969: { koTitle: '건담 UC', enTitle: 'Mobile Suit Gundam Unicorn', jaTitle: '機動戦士ガンダムUC' },
  10087: {
    koTitle: '페이트/제로',
    enTitle: 'Fate/Zero',
    jaTitle: 'Fate/Zero',
    koDescription: '성배전쟁에 참가한 마스터와 서번트들의 욕망과 비극을 장대한 스케일로 담아냅니다.',
  },
  101759: {
    koTitle: '약속의 네버랜드',
    enTitle: 'The Promised Neverland',
    jaTitle: '約束のネバーランド',
    koDescription: '고아원에 숨겨진 진실을 알게 된 아이들이 탈출을 계획하는 서스펜스 스릴러입니다.',
  },
  101922: {
    koTitle: '귀멸의 칼날',
    enTitle: 'Demon Slayer',
    jaTitle: '鬼滅の刃',
    koDescription: '가족을 잃은 소년 탄지로가 귀살대가 되어 동생과 함께 운명에 맞서는 작품입니다.',
  },
  10620: { koTitle: '미래일기', enTitle: 'Future Diary', jaTitle: '未来日記' },
  10719: { koTitle: '소드 아트 온라인 2', enTitle: 'Sword Art Online II', jaTitle: 'ソードアート・オンライン II' },
  11061: {
    koTitle: '헌터×헌터',
    enTitle: 'Hunter x Hunter',
    jaTitle: 'HUNTER×HUNTER',
    koDescription: '곤이 헌터가 되어 아버지를 찾는 여정 속에서 강적과 동료를 만나 성장하는 모험담입니다.',
  },
  11111: { koTitle: '어나더', enTitle: 'Another', jaTitle: 'Another' },
  113415: {
    koTitle: '주술회전',
    enTitle: 'Jujutsu Kaisen',
    jaTitle: '呪術廻戦',
    koDescription: '저주와 맞서 싸우는 주술사들의 전투와 청춘을 그린 현대 오컬트 액션입니다.',
  },
  116242: {
    koTitle: '체인소 맨',
    enTitle: 'Chainsaw Man',
    jaTitle: 'チェンソーマン',
    koDescription: '빚더미 인생의 소년이 악마와 계약해 공안 데빌 헌터로 살아가는 하드 액션입니다.',
  },
  11757: {
    koTitle: '소드 아트 온라인',
    enTitle: 'Sword Art Online',
    jaTitle: 'ソードアート・オンライン',
    koDescription: '가상현실 게임에 갇힌 플레이어들이 생존을 위해 싸우는 SF 액션 시리즈입니다.',
  },
  12531: { koTitle: '사이코패스 2', enTitle: 'Psycho-Pass 2', jaTitle: 'PSYCHO-PASS サイコパス 2' },
  127230: {
    koTitle: '체인소 맨',
    enTitle: 'Chainsaw Man',
    jaTitle: 'チェンソーマン',
    koDescription: '악마가 일상에 침투한 세계에서 생존과 욕망을 오가는 거친 청춘극입니다.',
  },
  129874: {
    koTitle: '스파이 패밀리',
    enTitle: 'SPY x FAMILY',
    jaTitle: 'SPY×FAMILY',
    koDescription: '스파이, 암살자, 초능력자가 가족이 되어 임무와 일상을 함께 꾸려가는 코믹 액션입니다.',
  },
  13601: {
    koTitle: '사이코패스',
    enTitle: 'Psycho-Pass',
    jaTitle: 'PSYCHO-PASS サイコパス',
    koDescription: '범죄 성향이 수치화된 사회에서 정의와 시스템의 한계를 묻는 디스토피아 수사물입니다.',
  },
  137822: {
    koTitle: '블루 록',
    enTitle: 'Blue Lock',
    jaTitle: 'ブルーロック',
    koDescription: '최고의 스트라이커를 만들기 위한 극한 경쟁 프로그램을 그린 축구 애니메이션입니다.',
  },
  140960: {
    koTitle: '최애의 아이',
    enTitle: 'Oshi no Ko',
    jaTitle: '【推しの子】',
    koDescription: '연예계의 화려함과 어두운 이면을 복수극과 성장극으로 풀어낸 미스터리 드라마입니다.',
  },
  150672: {
    koTitle: '최애의 아이',
    enTitle: 'Oshi no Ko',
    jaTitle: '【推しの子】',
    koDescription: '아이돌 산업의 구조를 파헤치며 인물들의 상처와 선택을 그리는 현대극입니다.',
  },
  15125: { koTitle: '신세계에서', enTitle: 'From the New World', jaTitle: '新世界より' },
  154587: {
    koTitle: '장송의 프리렌',
    enTitle: 'Frieren: Beyond Journey`s End',
    jaTitle: '葬送のフリーレン',
    koDescription: '마왕 토벌 이후를 살아가는 엘프 마법사가 인간의 시간을 이해해 가는 여정을 담았습니다.',
  },
  16417: { koTitle: '사카모토입니다만?', enTitle: 'Haven`t You Heard? I`m Sakamoto', jaTitle: '坂本ですが？' },
  18617: { koTitle: '암살교실', enTitle: 'Assassination Classroom', jaTitle: '暗殺教室' },
  20594: { koTitle: '암살교실 2기', enTitle: 'Assassination Classroom Season 2', jaTitle: '暗殺教室 第2期' },
  21234: { koTitle: '나만이 없는 거리', enTitle: 'ERASED', jaTitle: '僕だけがいない街' },
  23273: { koTitle: '4월은 너의 거짓말', enTitle: 'Your Lie in April', jaTitle: '四月は君の嘘' },
  52991: {
    koTitle: '장송의 프리렌',
    enTitle: 'Frieren: Beyond Journey`s End',
    jaTitle: '葬送のフリーレン',
    koDescription: '긴 생을 사는 엘프의 시선으로 우정과 이별, 기억의 의미를 차분히 풀어낸 판타지 드라마입니다.',
  },
};

module.exports = { animeTranslations };

```

### File: `backend/src/data/fallbackAnime.js`

- size: `8,937` bytes

```javascript
function poster(text, size = '300x420') {
  return `https://placehold.co/${size}/d9d9d9/333333?text=${text}`;
}

function makeAnime({
  id,
  romaji,
  english,
  native,
  genres,
  score,
  episodes,
  status,
  season,
  seasonYear,
  format,
}) {
  const text = encodeURIComponent(english || romaji || native || 'AniPick');
  return {
    id,
    title: {
      romaji: romaji || english || native,
      english: english || romaji || native,
      native: native || english || romaji,
    },
    coverImage: {
      extraLarge: poster(text, '300x420'),
      large: poster(text, '300x420'),
      medium: poster(text, '160x220'),
    },
    bannerImage: poster(text, '1200x360'),
    description: `${native || english || romaji} 작품의 기본 안내 정보입니다.`,
    genres,
    averageScore: score,
    meanScore: score,
    popularity: score ? score * 5000 : 100000,
    trending: score ? score * 80 : 2000,
    episodes,
    status,
    season,
    seasonYear,
    format,
    siteUrl: `https://anilist.co/anime/${id}`,
    studios: { nodes: [{ name: 'AniPick Studio' }] },
    isFallback: true,
  };
}

const FALLBACK_ANIME = [
  makeAnime({ id: 21, romaji: 'ONE PIECE', english: 'ONE PIECE', native: '원피스', genres: ['Action', 'Adventure', 'Comedy'], score: 89, episodes: 1100, status: 'RELEASING', season: 'FALL', seasonYear: 1999, format: 'TV' }),
  makeAnime({ id: 20, romaji: 'NARUTO', english: 'NARUTO', native: '나루토', genres: ['Action', 'Adventure'], score: 79, episodes: 220, status: 'FINISHED', season: 'FALL', seasonYear: 2002, format: 'TV' }),
  makeAnime({ id: 1735, romaji: 'Naruto: Shippuuden', english: 'Naruto Shippuden', native: '나루토 질풍전', genres: ['Action', 'Adventure'], score: 83, episodes: 500, status: 'FINISHED', season: 'WINTER', seasonYear: 2007, format: 'TV' }),
  makeAnime({ id: 269, romaji: 'BLEACH', english: 'BLEACH', native: '블리치', genres: ['Action', 'Supernatural'], score: 78, episodes: 366, status: 'FINISHED', season: 'FALL', seasonYear: 2004, format: 'TV' }),
  makeAnime({ id: 16498, romaji: 'Shingeki no Kyojin', english: 'Attack on Titan', native: '진격의 거인', genres: ['Action', 'Drama', 'Fantasy'], score: 86, episodes: 25, status: 'FINISHED', season: 'SPRING', seasonYear: 2013, format: 'TV' }),
  makeAnime({ id: 101922, romaji: 'Kimetsu no Yaiba', english: 'Demon Slayer', native: '귀멸의 칼날', genres: ['Action', 'Supernatural'], score: 84, episodes: 26, status: 'FINISHED', season: 'SPRING', seasonYear: 2019, format: 'TV' }),
  makeAnime({ id: 113415, romaji: 'Jujutsu Kaisen', english: 'Jujutsu Kaisen', native: '주술회전', genres: ['Action', 'Supernatural'], score: 85, episodes: 24, status: 'FINISHED', season: 'FALL', seasonYear: 2020, format: 'TV' }),
  makeAnime({ id: 1535, romaji: 'Death Note', english: 'Death Note', native: '데스노트', genres: ['Mystery', 'Psychological', 'Supernatural'], score: 84, episodes: 37, status: 'FINISHED', season: 'FALL', seasonYear: 2006, format: 'TV' }),
  makeAnime({ id: 5114, romaji: 'Fullmetal Alchemist: Brotherhood', english: 'Fullmetal Alchemist: Brotherhood', native: '강철의 연금술사 BROTHERHOOD', genres: ['Action', 'Adventure', 'Drama'], score: 90, episodes: 64, status: 'FINISHED', season: 'SPRING', seasonYear: 2009, format: 'TV' }),
  makeAnime({ id: 11061, romaji: 'Hunter x Hunter (2011)', english: 'Hunter x Hunter', native: '헌터×헌터', genres: ['Action', 'Adventure', 'Fantasy'], score: 89, episodes: 148, status: 'FINISHED', season: 'FALL', seasonYear: 2011, format: 'TV' }),
  makeAnime({ id: 30276, romaji: 'One Punch Man', english: 'One Punch Man', native: '원펀맨', genres: ['Action', 'Comedy', 'Sci-Fi'], score: 85, episodes: 12, status: 'FINISHED', season: 'FALL', seasonYear: 2015, format: 'TV' }),
  makeAnime({ id: 22319, romaji: 'Tokyo Ghoul', english: 'Tokyo Ghoul', native: '도쿄 구울', genres: ['Action', 'Horror', 'Mystery'], score: 77, episodes: 12, status: 'FINISHED', season: 'SUMMER', seasonYear: 2014, format: 'TV' }),
  makeAnime({ id: 20583, romaji: 'Haikyuu!!', english: 'Haikyu!!', native: '하이큐', genres: ['Sports', 'Comedy', 'Drama'], score: 87, episodes: 25, status: 'FINISHED', season: 'SPRING', seasonYear: 2014, format: 'TV' }),
  makeAnime({ id: 129874, romaji: 'SPY x FAMILY', english: 'SPY x FAMILY', native: '스파이 패밀리', genres: ['Action', 'Comedy', 'Slice of Life'], score: 82, episodes: 12, status: 'FINISHED', season: 'SPRING', seasonYear: 2022, format: 'TV' }),
  makeAnime({ id: 127230, romaji: 'Chainsaw Man', english: 'Chainsaw Man', native: '체인소 맨', genres: ['Action', 'Horror', 'Supernatural'], score: 84, episodes: 12, status: 'FINISHED', season: 'FALL', seasonYear: 2022, format: 'TV' }),
  makeAnime({ id: 150672, romaji: 'Oshi no Ko', english: 'Oshi no Ko', native: '최애의 아이', genres: ['Drama', 'Mystery'], score: 84, episodes: 11, status: 'FINISHED', season: 'SPRING', seasonYear: 2023, format: 'TV' }),
  makeAnime({ id: 21827, romaji: 'Violet Evergarden', english: 'Violet Evergarden', native: '바이올렛 에버가든', genres: ['Drama', 'Fantasy', 'Slice of Life'], score: 86, episodes: 13, status: 'FINISHED', season: 'WINTER', seasonYear: 2018, format: 'TV' }),
  makeAnime({ id: 11757, romaji: 'Sword Art Online', english: 'Sword Art Online', native: '소드 아트 온라인', genres: ['Action', 'Adventure', 'Fantasy'], score: 75, episodes: 25, status: 'FINISHED', season: 'SUMMER', seasonYear: 2012, format: 'TV' }),
  makeAnime({ id: 1575, romaji: 'Code Geass', english: 'Code Geass', native: '코드 기아스', genres: ['Action', 'Drama', 'Mecha'], score: 87, episodes: 25, status: 'FINISHED', season: 'FALL', seasonYear: 2006, format: 'TV' }),
  makeAnime({ id: 9253, romaji: 'Steins;Gate', english: 'Steins;Gate', native: '슈타인즈 게이트', genres: ['Drama', 'Sci-Fi', 'Thriller'], score: 89, episodes: 24, status: 'FINISHED', season: 'SPRING', seasonYear: 2011, format: 'TV' }),
  makeAnime({ id: 97940, romaji: 'Black Clover', english: 'Black Clover', native: '블랙 클로버', genres: ['Action', 'Comedy', 'Fantasy'], score: 77, episodes: 170, status: 'FINISHED', season: 'FALL', seasonYear: 2017, format: 'TV' }),
  makeAnime({ id: 10087, romaji: 'Fate/Zero', english: 'Fate/Zero', native: '페이트/제로', genres: ['Action', 'Fantasy', 'Supernatural'], score: 84, episodes: 13, status: 'FINISHED', season: 'FALL', seasonYear: 2011, format: 'TV' }),
  makeAnime({ id: 30, romaji: 'Shinseiki Evangelion', english: 'Neon Genesis Evangelion', native: '신세기 에반게리온', genres: ['Action', 'Drama', 'Mecha'], score: 83, episodes: 26, status: 'FINISHED', season: 'FALL', seasonYear: 1995, format: 'TV' }),
  makeAnime({ id: 2251, romaji: 'Kiseijuu: Sei no Kakuritsu', english: 'Parasyte', native: '기생수', genres: ['Action', 'Drama', 'Horror'], score: 83, episodes: 24, status: 'FINISHED', season: 'FALL', seasonYear: 2014, format: 'TV' }),
  makeAnime({ id: 101759, romaji: 'Yakusoku no Neverland', english: 'The Promised Neverland', native: '약속의 네버랜드', genres: ['Drama', 'Fantasy', 'Mystery'], score: 82, episodes: 12, status: 'FINISHED', season: 'WINTER', seasonYear: 2019, format: 'TV' }),
  makeAnime({ id: 154587, romaji: 'Sousou no Frieren', english: 'Frieren: Beyond Journey`s End', native: '장송의 프리렌', genres: ['Adventure', 'Drama', 'Fantasy'], score: 90, episodes: 28, status: 'FINISHED', season: 'FALL', seasonYear: 2023, format: 'TV' }),
  makeAnime({ id: 137822, romaji: 'Blue Lock', english: 'Blue Lock', native: '블루 록', genres: ['Sports', 'Drama'], score: 82, episodes: 24, status: 'FINISHED', season: 'FALL', seasonYear: 2022, format: 'TV' }),
  makeAnime({ id: 97938, romaji: 'Boruto', english: 'Boruto: Naruto Next Generations', native: '보루토', genres: ['Action', 'Adventure'], score: 68, episodes: 293, status: 'FINISHED', season: 'SPRING', seasonYear: 2017, format: 'TV' }),
  makeAnime({ id: 223, romaji: 'Dragon Ball', english: 'Dragon Ball', native: '드래곤볼', genres: ['Action', 'Adventure', 'Comedy'], score: 79, episodes: 153, status: 'FINISHED', season: 'WINTER', seasonYear: 1986, format: 'TV' }),
  makeAnime({ id: 235, romaji: 'Detective Conan', english: 'Case Closed', native: '명탐정 코난', genres: ['Mystery', 'Comedy'], score: 82, episodes: 1100, status: 'RELEASING', season: 'WINTER', seasonYear: 1996, format: 'TV' }),
  makeAnime({ id: 1, romaji: 'Cowboy Bebop', english: 'Cowboy Bebop', native: '카우보이 비밥', genres: ['Action', 'Drama', 'Sci-Fi'], score: 86, episodes: 26, status: 'FINISHED', season: 'SPRING', seasonYear: 1998, format: 'TV' }),
  makeAnime({ id: 6547, romaji: 'Angel Beats!', english: 'Angel Beats!', native: 'Angel Beats!', genres: ['Action', 'Drama', 'Supernatural'], score: 78, episodes: 13, status: 'FINISHED', season: 'SPRING', seasonYear: 2010, format: 'TV' }),
];

module.exports = { FALLBACK_ANIME };

```

### File: `backend/src/lib/prisma.js`

- size: `115` bytes

```javascript
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;

```

### File: `backend/src/middlewares/admin.middleware.js`

- size: `219` bytes

```javascript
function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access only.' });
  }

  return next();
}

module.exports = adminMiddleware;

```

### File: `backend/src/middlewares/auth.middleware.js`

- size: `801` bytes

```javascript
const jwt = require('jsonwebtoken');

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    console.warn('[AUTH] JWT_SECRET is not set. Using fallback_secret for development only.');
  }

  return process.env.JWT_SECRET || 'fallback_secret';
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Authentication token is required.' });
  }

  try {
    req.user = jwt.verify(token, getJwtSecret());
    return next();
  } catch (error) {
    console.error('[AUTH] JWT verify error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = authMiddleware;

```

### File: `backend/src/services/anilist.service.js`

- size: `4,415` bytes

```javascript
const axios = require('axios');

const ANILIST_URL = 'https://graphql.anilist.co';
const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map();
let lastRequestAt = 0;

function createAniListError(message, statusCode = 502, details = null) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
}

function buildCacheKey(query, variables) {
  return `${query}::${JSON.stringify(variables || {})}`;
}

function getCached(key) {
  const hit = cache.get(key);
  if (!hit) return null;

  if (Date.now() > hit.expiresAt) {
    cache.delete(key);
    return null;
  }

  return hit.data;
}

function setCache(key, data) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

function mapNetworkError(error) {
  const code = error.code;
  if (['ENOTFOUND', 'ECONNRESET', 'ETIMEDOUT', 'ECONNABORTED'].includes(code)) {
    return createAniListError('AniList API connection failed.', 502, { code });
  }
  return createAniListError('AniList API is temporarily unavailable.', 502, { code });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForRateLimit() {
  const perMinute = Math.max(1, Number(process.env.ANILIST_RATE_LIMIT_PER_MINUTE || 60));
  const minInterval = Math.ceil(60000 / perMinute);
  const elapsed = Date.now() - lastRequestAt;
  if (elapsed < minInterval) {
    await delay(minInterval - elapsed);
  }
  lastRequestAt = Date.now();
}

async function requestAniList(query, variables = {}, useCache = true) {
  const key = buildCacheKey(query, variables);

  if (useCache) {
    const cached = getCached(key);
    if (cached) return cached;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('[AniList] Request start');
  }

  try {
    await waitForRateLimit();
    const response = await axios.post(
      ANILIST_URL,
      { query, variables },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': 'AniPick/1.0',
        },
        timeout: 15000,
        validateStatus: () => true,
      }
    );

    if (response.status === 429) {
      throw createAniListError('AniList rate limit exceeded.', 429, response.data || null);
    }

    if (response.data?.errors?.length) {
      console.error('[AniList] GraphQL errors:', response.data.errors);
      throw createAniListError('AniList GraphQL request failed.', 502, {
        status: response.status,
        graphqlErrors: response.data.errors,
      });
    }

    if (response.status >= 400) {
      throw createAniListError('AniList API is temporarily unavailable.', 502, {
        status: response.status,
        statusText: response.statusText,
        responseData: response.data || null,
      });
    }

    const data = response.data?.data;

    if (useCache) {
      setCache(key, data);
    }

    return data;
  } catch (error) {
    const status = error.response?.status;
    const statusText = error.response?.statusText;

    console.error('[AniList] request failed');
    console.error('error.code:', error.code);
    console.error('error.message:', error.message);
    console.error('error.response?.status:', status);
    console.error('error.response?.statusText:', statusText);
    console.error('error.response?.data:', error.response?.data || error.details || null);
    if (error.response?.data?.errors) {
      console.error('[AniList] GraphQL errors:', error.response.data.errors);
    }

    if (error.statusCode) {
      throw error;
    }

    if (status === 429) {
      throw createAniListError('AniList rate limit exceeded.', 429, error.response?.data || null);
    }

    if (['ENOTFOUND', 'ECONNRESET', 'ETIMEDOUT', 'ECONNABORTED'].includes(error.code)) {
      throw createAniListError('AniList API connection failed.', 502, { code: error.code });
    }

    if (status && status >= 400 && error.response?.data?.errors?.length) {
      throw createAniListError('AniList GraphQL request failed.', 502, {
        status,
        statusText,
        graphqlErrors: error.response.data.errors,
      });
    }

    if (status && status >= 400) {
      throw createAniListError('AniList API is temporarily unavailable.', 502, {
        status,
        statusText,
      });
    }

    throw mapNetworkError(error);
  }
}

module.exports = { requestAniList, createAniListError };

```

### File: `backend/src/services/anime-cache.service.js`

- size: `22,966` bytes

```javascript
const prisma = require('../lib/prisma');
const { animeTranslations } = require('../data/animeTranslations');
const { isAdultAnime } = require('../utils/animeContentSafety');

const VISIBLE_ANIME_WHERE = {
  dataStatus: 'ACTIVE',
  isHidden: false,
  isAdult: false,
};

function normalizeProvider(provider) {
  return String(provider || 'JIKAN').toUpperCase();
}

function getExternalId(anime) {
  return Number(anime?.malId || anime?.externalId || anime?.id || 0);
}

function safeJsonStringify(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return null;
  }
}

function safeJsonValue(value) {
  if (!value || typeof value !== 'object') return null;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return null;
  }
}

function safeJsonParse(value, fallback = []) {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function toNullableInt(value) {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;
  return Math.round(numeric);
}

function isMeaningfulText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isMeaningfulUrl(value) {
  return isMeaningfulText(value) && /^https?:\/\//i.test(value.trim());
}

function isPositiveNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0;
}

function pickPreferredValue(nextValue, currentValue, validator = isMeaningfulText) {
  if (validator(nextValue)) return nextValue;
  return currentValue ?? null;
}

function normalizeAverageScore(anime) {
  const candidates = [anime?.averageScore, anime?.meanScore, anime?.score];
  for (const candidate of candidates) {
    if (candidate === null || candidate === undefined || candidate === '') continue;
    const numeric = Number(candidate);
    if (!Number.isFinite(numeric) || numeric <= 0) continue;
    if (numeric <= 10) return Math.round(numeric * 10);
    return Math.round(numeric);
  }
  return null;
}

function normalizeAnimeInput(anime) {
  const externalId = getExternalId(anime);
  const genres = Array.isArray(anime?.genres) ? anime.genres.filter(Boolean) : [];

  const adultDetected = isAdultAnime({
    ...anime,
    genres,
    romajiTitle: anime?.title?.romaji || anime?.romajiTitle || null,
    englishTitle: anime?.title?.english || anime?.englishTitle || null,
    nativeTitle: anime?.title?.native || anime?.nativeTitle || null,
  });

  return {
    provider: normalizeProvider(anime?.provider),
    externalId,
    romajiTitle: anime?.title?.romaji || anime?.romajiTitle || null,
    englishTitle: anime?.title?.english || anime?.englishTitle || null,
    nativeTitle: anime?.title?.native || anime?.nativeTitle || null,
    imageUrl:
      anime?.coverImage?.extraLarge ||
      anime?.coverImage?.large ||
      anime?.coverImage?.medium ||
      anime?.animeImage ||
      anime?.imageUrl ||
      null,
    bannerUrl: anime?.bannerImage || anime?.bannerUrl || null,
    genres: genres.length ? safeJsonStringify(genres) : null,
    averageScore: normalizeAverageScore(anime),
    scoredBy: toNullableInt(anime?.scoredBy),
    rank: toNullableInt(anime?.rank),
    members: toNullableInt(anime?.members),
    favorites: toNullableInt(anime?.favorites),
    popularity: toNullableInt(anime?.popularity) || toNullableInt(anime?.members) || toNullableInt(anime?.trending),
    episodes: toNullableInt(anime?.episodes),
    status: anime?.status || null,
    season: anime?.season || null,
    seasonYear: anime?.seasonYear || null,
    format: anime?.format || null,
    siteUrl: anime?.siteUrl || null,
    description: anime?.description || null,
    sourcePayload: safeJsonValue(anime?.sourcePayload || anime?.raw || null),
    isAdult: adultDetected,
    isHidden: adultDetected,
    hiddenReason: adultDetected ? 'ADULT_CONTENT_AUTO_DETECTED' : null,
    hiddenAt: adultDetected ? new Date() : null,
    dataStatus: adultDetected ? 'ARCHIVED' : 'ACTIVE',
    lastSyncedAt: new Date(),
  };
}

function toAnimeLike(row) {
  const image = row?.imageUrl || null;
  const genres = safeJsonParse(row?.genres, []);

  return {
    id: row.id,
    animeId: row.id,
    routeId: row.externalId,
    externalId: row.externalId,
    malId: row.externalId,
    provider: row.provider,
    title: {
      romaji: row.romajiTitle || null,
      english: row.englishTitle || null,
      native: row.nativeTitle || null,
    },
    coverImage: {
      extraLarge: image,
      large: image,
      medium: image,
    },
    bannerImage: row.bannerUrl || image,
    description: row.description || '',
    genres,
    averageScore: row.averageScore,
    meanScore: row.averageScore,
    scoredBy: row.scoredBy ?? null,
    rank: row.rank ?? null,
    members: row.members ?? null,
    favorites: row.favorites ?? null,
    popularity: row.popularity ?? row.members ?? 0,
    trending: row.favorites ?? 0,
    episodes: row.episodes,
    status: row.status,
    season: row.season,
    seasonYear: row.seasonYear,
    format: row.format,
    siteUrl: row.siteUrl,
    isAdult: Boolean(row.isAdult),
    isHidden: Boolean(row.isHidden),
    hiddenReason: row.hiddenReason || null,
    hiddenAt: row.hiddenAt || null,
    dataStatus: row.dataStatus,
    studios: { nodes: [] },
  };
}

function toAnimeDto(row) {
  if (!row) return null;
  const anime = toAnimeLike(row);
  const translation = Array.isArray(row.translations) ? row.translations[0] || null : row.translation || null;

  return {
    id: row.id,
    animeId: row.id,
    routeId: row.externalId,
    provider: anime.provider,
    externalId: anime.externalId,
    malId: anime.externalId,
    romajiTitle: row.romajiTitle || null,
    englishTitle: row.englishTitle || null,
    nativeTitle: row.nativeTitle || null,
    description: row.description || null,
    imageUrl: row.imageUrl || null,
    bannerUrl: row.bannerUrl || null,
    siteUrl: row.siteUrl || null,
    averageScore: row.averageScore,
    scoredBy: row.scoredBy,
    rank: row.rank,
    members: row.members,
    favorites: row.favorites,
    popularity: row.popularity,
    episodes: row.episodes,
    status: row.status,
    season: row.season,
    seasonYear: row.seasonYear,
    format: row.format,
    genres: anime.genres,
    isAdult: Boolean(row.isAdult),
    isHidden: Boolean(row.isHidden),
    hiddenReason: row.hiddenReason || null,
    hiddenAt: row.hiddenAt || null,
    dataStatus: row.dataStatus,
    translation: translation
      ? {
          lang: translation.lang,
          title: translation.title,
          description: translation.description,
          source: translation.source,
          status: translation.status,
          failureReason: translation.failureReason,
        }
      : null,
  };
}

async function applySeedTranslationsForAnime(animeRow, externalId) {
  const seed = animeTranslations[Number(externalId)];
  if (!seed || !animeRow?.id) return;

  const payloads = [
    {
      lang: 'ko',
      title: seed.koTitle || null,
      description: seed.koDescription || null,
      status: seed.koDescription ? 'REVIEWED' : 'TITLE_ONLY',
    },
    {
      lang: 'en',
      title: seed.enTitle || null,
      description: seed.enDescription || null,
      status: seed.enDescription ? 'REVIEWED' : 'TITLE_ONLY',
    },
    {
      lang: 'ja',
      title: seed.jaTitle || null,
      description: seed.jaDescription || null,
      status: seed.jaDescription ? 'REVIEWED' : 'TITLE_ONLY',
    },
  ];

  for (const item of payloads) {
    if (!item.title && !item.description) continue;

    // eslint-disable-next-line no-await-in-loop
    const existing = await prisma.animeTranslation.findUnique({
      where: {
        animeId_lang: {
          animeId: animeRow.id,
          lang: item.lang,
        },
      },
    });

    if (existing?.source === 'MANUAL') continue;

    // eslint-disable-next-line no-await-in-loop
    await prisma.animeTranslation.upsert({
      where: {
        animeId_lang: {
          animeId: animeRow.id,
          lang: item.lang,
        },
      },
      create: {
        animeId: animeRow.id,
        lang: item.lang,
        title: item.title,
        description: item.description,
        source: 'SEED',
        status: item.status,
        failureReason: null,
      },
      update: {
        title: item.title,
        description: item.description,
        source: 'SEED',
        status: item.status,
        failureReason: null,
      },
    });
  }
}

async function upsertAnimeCache(anime) {
  const normalized = normalizeAnimeInput(anime);
  if (!normalized.externalId) return null;

  const key = {
    provider_externalId: {
      provider: normalized.provider,
      externalId: normalized.externalId,
    },
  };

  const existing = await prisma.anime.findUnique({ where: key });

  let saved;
  if (!existing) {
    saved = await prisma.anime.create({ data: normalized });
  } else {
    const adultLocked = Boolean(
      existing.isAdult ||
      existing.isHidden ||
      existing.dataStatus === 'ARCHIVED' ||
      normalized.isAdult
    );

    const updateData = {
      romajiTitle: pickPreferredValue(normalized.romajiTitle, existing.romajiTitle),
      englishTitle: pickPreferredValue(normalized.englishTitle, existing.englishTitle),
      nativeTitle: pickPreferredValue(normalized.nativeTitle, existing.nativeTitle),
      description: pickPreferredValue(normalized.description, existing.description),
      imageUrl: pickPreferredValue(normalized.imageUrl, existing.imageUrl, isMeaningfulUrl),
      bannerUrl: pickPreferredValue(normalized.bannerUrl, existing.bannerUrl, isMeaningfulUrl),
      siteUrl: pickPreferredValue(normalized.siteUrl, existing.siteUrl, isMeaningfulUrl),
      genres: pickPreferredValue(normalized.genres, existing.genres, isMeaningfulText),
      averageScore: pickPreferredValue(normalized.averageScore, existing.averageScore, isPositiveNumber),
      scoredBy: pickPreferredValue(normalized.scoredBy, existing.scoredBy, isPositiveNumber),
      rank: pickPreferredValue(normalized.rank, existing.rank, isPositiveNumber),
      members: pickPreferredValue(normalized.members, existing.members, isPositiveNumber),
      favorites: pickPreferredValue(normalized.favorites, existing.favorites, isPositiveNumber),
      popularity: pickPreferredValue(normalized.popularity, existing.popularity, isPositiveNumber),
      episodes: pickPreferredValue(normalized.episodes, existing.episodes, isPositiveNumber),
      status: pickPreferredValue(normalized.status, existing.status),
      season: pickPreferredValue(normalized.season, existing.season),
      seasonYear: pickPreferredValue(normalized.seasonYear, existing.seasonYear, isPositiveNumber),
      format: pickPreferredValue(normalized.format, existing.format),
      sourcePayload: normalized.sourcePayload || existing.sourcePayload || null,
      isAdult: adultLocked,
      isHidden: adultLocked ? true : Boolean(existing.isHidden),
      hiddenReason: adultLocked
        ? normalized.hiddenReason || existing.hiddenReason || 'ADULT_CONTENT_AUTO_DETECTED'
        : existing.hiddenReason || null,
      hiddenAt: adultLocked ? normalized.hiddenAt || existing.hiddenAt || new Date() : existing.hiddenAt,
      dataStatus: adultLocked ? 'ARCHIVED' : existing.dataStatus || 'ACTIVE',
      lastSyncedAt: new Date(),
    };

    saved = await prisma.anime.update({
      where: { id: existing.id },
      data: updateData,
    });
  }

  await applySeedTranslationsForAnime(saved, normalized.externalId);
  return saved;
}

async function getAnimeByProviderId(provider, externalId) {
  const p = normalizeProvider(provider);
  const id = Number(externalId);
  if (!id) return null;

  return prisma.anime.findUnique({
    where: {
      provider_externalId: {
        provider: p,
        externalId: id,
      },
    },
  });
}

async function getCachedAnime(provider, externalId) {
  return getAnimeByProviderId(provider, externalId);
}

async function getTranslationByAnimeId(animeId, lang) {
  const id = Number(animeId);
  if (!id || !lang) return null;

  return prisma.animeTranslation.findUnique({
    where: {
      animeId_lang: {
        animeId: id,
        lang,
      },
    },
  });
}

async function getTranslationByProviderId(provider, externalId, lang) {
  const anime = await getAnimeByProviderId(provider, externalId);
  if (!anime) return null;
  return getTranslationByAnimeId(anime.id, lang);
}

async function getTranslation({ provider, externalId, lang }) {
  return getTranslationByProviderId(provider, externalId, lang);
}

async function upsertTranslation({
  animeId,
  provider,
  externalId,
  lang,
  title,
  description,
  source = 'GPT',
  status = 'AUTO',
  failureReason = null,
}) {
  if (!lang) return null;

  let targetAnimeId = Number(animeId);

  if (!targetAnimeId) {
    const normalizedProvider = normalizeProvider(provider);
    const normalizedExternalId = Number(externalId);
    if (!normalizedExternalId) return null;

    let anime = await getAnimeByProviderId(normalizedProvider, normalizedExternalId);
    if (!anime) {
      anime = await prisma.anime.create({
        data: {
          provider: normalizedProvider,
          externalId: normalizedExternalId,
        },
      });
    }
    targetAnimeId = anime.id;
  }

  const existing = await prisma.animeTranslation.findUnique({
    where: {
      animeId_lang: {
        animeId: targetAnimeId,
        lang,
      },
    },
  });

  const isAutomaticWrite = !['MANUAL'].includes(source);
  if (existing && isAutomaticWrite && (existing.source === 'MANUAL' || existing.status === 'REVIEWED')) {
    return existing;
  }

  return prisma.animeTranslation.upsert({
    where: {
      animeId_lang: {
        animeId: targetAnimeId,
        lang,
      },
    },
    create: {
      animeId: targetAnimeId,
      lang,
      title: title || null,
      description: description || null,
      source,
      status,
      failureReason: failureReason || null,
      reviewedAt: status === 'REVIEWED' ? new Date() : null,
    },
    update: {
      title: title || null,
      description: description || null,
      source,
      status,
      failureReason: failureReason || null,
      reviewedAt: status === 'REVIEWED' ? new Date() : undefined,
    },
  });
}

async function getOrCreateAnimeWithTranslation(anime) {
  const cached = await upsertAnimeCache(anime);
  if (!cached) return null;

  return prisma.anime.findUnique({
    where: { id: cached.id },
    include: { translations: true },
  });
}

async function listCachedAnimeWithoutTranslation(lang, limit = 30) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 30, 300));

  return prisma.anime.findMany({
    where: {
      ...VISIBLE_ANIME_WHERE,
      translations: {
        none: {
          lang,
        },
      },
    },
    orderBy: [{ updatedAt: 'desc' }],
    take: safeLimit,
  });
}

function buildOrderBy(sort) {
  switch (String(sort || '').toUpperCase()) {
    case 'SCORE_DESC':
      return [{ averageScore: 'desc' }, { updatedAt: 'desc' }];
    case 'POPULARITY_DESC':
      return [{ popularity: 'desc' }, { averageScore: 'desc' }, { updatedAt: 'desc' }];
    case 'LATEST':
      return [{ seasonYear: 'desc' }, { updatedAt: 'desc' }];
    case 'TITLE':
      return [{ englishTitle: 'asc' }, { romajiTitle: 'asc' }];
    default:
      return [{ popularity: 'desc' }, { averageScore: 'desc' }, { seasonYear: 'desc' }, { updatedAt: 'desc' }];
  }
}

function buildWhere({ keyword, genre, year, season, format, status, lang = 'ko' }) {
  const where = {};
  const andConditions = [{ ...VISIBLE_ANIME_WHERE }];

  if (keyword) {
    where.OR = [
      { romajiTitle: { contains: keyword, mode: 'insensitive' } },
      { englishTitle: { contains: keyword, mode: 'insensitive' } },
      { nativeTitle: { contains: keyword, mode: 'insensitive' } },
      {
        translations: {
          some: {
            lang,
            title: { contains: keyword, mode: 'insensitive' },
          },
        },
      },
    ];
  }

  if (genre) {
    where.genres = { contains: genre, mode: 'insensitive' };
  }

  if (year && Number(year)) {
    where.seasonYear = Number(year);
  }

  if (season) {
    where.season = String(season).toUpperCase();
  }

  if (format) {
    where.format = String(format).toUpperCase();
  }

  if (status) {
    where.status = String(status).toUpperCase();
  }

  andConditions.push({
    OR: [
      { romajiTitle: { not: null } },
      { englishTitle: { not: null } },
      { nativeTitle: { not: null } },
      {
        translations: {
          some: {
            lang,
            title: { not: null },
          },
        },
      },
    ],
  });

  where.AND = andConditions;
  return where;
}

function isRenderableAnimeRow(row) {
  if (!row) return false;
  const hasId = Boolean(row.externalId || row.id || row.malId);
  const hasTitle = Boolean(
    row.romajiTitle ||
      row.englishTitle ||
      row.nativeTitle ||
      row.title?.romaji ||
      row.title?.english ||
      row.title?.native
  );
  return Boolean(hasId && hasTitle);
}

async function listCachedAnime({
  page = 1,
  perPage = 20,
  keyword = '',
  genre = '',
  year = '',
  season = '',
  format = '',
  status = '',
  sort = 'POPULARITY_DESC',
  lang = 'ko',
  qualityFirst = false,
  includeHidden = false,
  includeAdult = false,
  includeArchived = false,
} = {}) {
  const currentPage = Math.max(1, Number(page) || 1);
  const size = Math.max(1, Math.min(Number(perPage) || 20, 50));
  const skip = (currentPage - 1) * size;

  const where = buildWhere({ keyword, genre, year, season, format, status, lang });
  if (includeHidden || includeAdult || includeArchived) {
    where.AND = where.AND.filter((condition) => !('isHidden' in condition) && !('isAdult' in condition) && !('dataStatus' in condition));
    if (!includeHidden) where.AND.push({ isHidden: false });
    if (!includeAdult) where.AND.push({ isAdult: false });
    if (!includeArchived) where.AND.push({ dataStatus: 'ACTIVE' });
  }

  const orderBy = buildOrderBy(sort);
  const normalizedSort = String(sort || '').toUpperCase();
  const requiresNullSafeSort = ['POPULARITY_DESC', 'SCORE_DESC', 'LATEST', 'TITLE'].includes(normalizedSort);

  const queryTake = qualityFirst
    ? Math.min(220, Math.max(size * 4, size))
    : requiresNullSafeSort
      ? Math.min(520, skip + Math.max(size * 5, 100))
      : size;
  const querySkip = qualityFirst || requiresNullSafeSort ? 0 : skip;

  const [rawRows, total] = await Promise.all([
    prisma.anime.findMany({
      where,
      orderBy,
      skip: querySkip,
      take: qualityFirst ? skip + queryTake : queryTake,
      include: {
        translations: {
          where: { lang },
          take: 1,
        },
      },
    }),
    prisma.anime.count({ where }),
  ]);

  let rows = rawRows;

  if (requiresNullSafeSort) {
    rows = [...rawRows].sort((a, b) => {
      const aScore = Number(a.averageScore || 0);
      const bScore = Number(b.averageScore || 0);
      const aPopularity = Number(a.popularity || a.members || 0);
      const bPopularity = Number(b.popularity || b.members || 0);
      const aYear = Number(a.seasonYear || 0);
      const bYear = Number(b.seasonYear || 0);
      const aTitle = String(a.englishTitle || a.romajiTitle || a.nativeTitle || '').toLowerCase();
      const bTitle = String(b.englishTitle || b.romajiTitle || b.nativeTitle || '').toLowerCase();

      if (normalizedSort === 'SCORE_DESC') {
        const aHasScore = isPositiveNumber(a.averageScore);
        const bHasScore = isPositiveNumber(b.averageScore);
        if (aHasScore !== bHasScore) return aHasScore ? -1 : 1;
        if (aScore !== bScore) return bScore - aScore;
        if (aPopularity !== bPopularity) return bPopularity - aPopularity;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }

      if (normalizedSort === 'LATEST') {
        const aHasYear = isPositiveNumber(a.seasonYear);
        const bHasYear = isPositiveNumber(b.seasonYear);
        if (aHasYear !== bHasYear) return aHasYear ? -1 : 1;
        if (aYear !== bYear) return bYear - aYear;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }

      if (normalizedSort === 'TITLE') {
        if (aTitle && bTitle && aTitle !== bTitle) return aTitle.localeCompare(bTitle);
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }

      const aHasPopularity = isPositiveNumber(aPopularity);
      const bHasPopularity = isPositiveNumber(bPopularity);
      if (aHasPopularity !== bHasPopularity) return aHasPopularity ? -1 : 1;
      if (aPopularity !== bPopularity) return bPopularity - aPopularity;
      const aHasScore = isPositiveNumber(a.averageScore);
      const bHasScore = isPositiveNumber(b.averageScore);
      if (aHasScore !== bHasScore) return aHasScore ? -1 : 1;
      if (aScore !== bScore) return bScore - aScore;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    rows = rows.slice(skip, skip + size);
  }

  if (qualityFirst) {
    rows = [...rawRows].sort((a, b) => {
      const aHasRealImage = isMeaningfulUrl(a.imageUrl) && !String(a.imageUrl || '').toLowerCase().includes('placehold.co');
      const bHasRealImage = isMeaningfulUrl(b.imageUrl) && !String(b.imageUrl || '').toLowerCase().includes('placehold.co');
      if (aHasRealImage !== bHasRealImage) return aHasRealImage ? -1 : 1;

      const aHasScore = isPositiveNumber(a.averageScore);
      const bHasScore = isPositiveNumber(b.averageScore);
      if (aHasScore !== bHasScore) return aHasScore ? -1 : 1;

      const aPopularity = Number(a.popularity || a.members || 0);
      const bPopularity = Number(b.popularity || b.members || 0);
      if (aPopularity !== bPopularity) return bPopularity - aPopularity;

      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }).slice(skip, skip + size);
  }

  return {
    rows,
    items: rows.map(toAnimeLike),
    dtos: rows.map(toAnimeDto).filter(Boolean),
    pageInfo: {
      currentPage,
      perPage: size,
      total,
      lastPage: Math.max(1, Math.ceil(total / size)),
      hasNextPage: currentPage * size < total,
    },
  };
}

module.exports = {
  normalizeProvider,
  getExternalId,
  safeJsonParse,
  toAnimeLike,
  toAnimeDto,
  isRenderableAnimeRow,
  applySeedTranslationsForAnime,
  upsertAnimeCache,
  getCachedAnime,
  getAnimeByProviderId,
  getTranslation,
  getTranslationByAnimeId,
  getTranslationByProviderId,
  upsertTranslation,
  getOrCreateAnimeWithTranslation,
  listCachedAnimeWithoutTranslation,
  listCachedAnime,
  VISIBLE_ANIME_WHERE,
};

```

### File: `backend/src/services/anime-normalizer.service.js`

- size: `4,760` bytes

```javascript
function normalizeStatus(status) {
  const map = {
    'Currently Airing': 'RELEASING',
    'Finished Airing': 'FINISHED',
    'Not yet aired': 'NOT_YET_RELEASED',
  };
  return map[status] || status || '';
}

function normalizeFormat(type) {
  const map = {
    TV: 'TV',
    Movie: 'MOVIE',
    OVA: 'OVA',
    ONA: 'ONA',
    Special: 'SPECIAL',
    Music: 'MUSIC',
  };
  return map[type] || String(type || '').toUpperCase() || 'TV';
}

function normalizeScore(value) {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  // Jikan score is 0~10, cache uses 0~100 scale.
  return Math.round(numeric * 10);
}

function normalizeJikanAnime(item) {
  if (!item) return null;

  const coverExtra = item.images?.jpg?.large_image_url || item.images?.webp?.large_image_url || null;
  const coverLarge = item.images?.jpg?.image_url || item.images?.webp?.image_url || coverExtra;
  const coverMedium = item.images?.jpg?.small_image_url || item.images?.webp?.small_image_url || coverLarge;

  const score = normalizeScore(item.score);
  const genres = Array.isArray(item.genres) ? item.genres.map((g) => g.name).filter(Boolean) : [];
  const studios = Array.isArray(item.studios) ? item.studios.map((s) => ({ name: s.name })) : [];

  return {
    id: item.mal_id,
    malId: item.mal_id,
    provider: 'JIKAN',
    title: {
      romaji: item.title || item.title_english || item.title_japanese || 'Untitled',
      english: item.title_english || item.title || item.title_japanese || 'Untitled',
      native: item.title_japanese || item.title || item.title_english || 'Untitled',
    },
    coverImage: {
      extraLarge: coverExtra,
      large: coverLarge,
      medium: coverMedium,
    },
    bannerImage: coverExtra || coverLarge || null,
    description: item.synopsis || item.background || '',
    genres,
    averageScore: score,
    meanScore: score,
    scoredBy: Number.isFinite(Number(item.scored_by)) ? Number(item.scored_by) : null,
    rank: Number.isFinite(Number(item.rank)) ? Number(item.rank) : null,
    members: Number.isFinite(Number(item.members)) ? Number(item.members) : null,
    favorites: Number.isFinite(Number(item.favorites)) ? Number(item.favorites) : null,
    popularity: item.members || item.popularity || 0,
    trending: item.favorites || 0,
    episodes: item.episodes || null,
    status: normalizeStatus(item.status),
    season: item.season ? String(item.season).toUpperCase() : '',
    seasonYear: item.year || null,
    format: normalizeFormat(item.type),
    siteUrl: item.url || '',
    studios: { nodes: studios },
    sourcePayload: item,
  };
}

function normalizeJikanList(data = []) {
  return (data || []).map(normalizeJikanAnime).filter(Boolean);
}

function normalizeKitsuAnime(item) {
  if (!item) return null;
  const attrs = item.attributes || {};
  const names = attrs.titles || {};
  const score = normalizeScore(attrs.averageRating);
  const poster = attrs.posterImage || {};
  const cover = attrs.coverImage || {};

  return {
    id: Number(item.id),
    malId: null,
    provider: 'KITSU',
    title: {
      romaji: names.en_jp || names.en || names.ja_jp || 'Untitled',
      english: names.en || names.en_jp || names.ja_jp || 'Untitled',
      native: names.ja_jp || names.en_jp || names.en || 'Untitled',
    },
    coverImage: {
      extraLarge: poster.original || poster.large || poster.medium || null,
      large: poster.large || poster.medium || poster.original || null,
      medium: poster.medium || poster.small || poster.large || null,
    },
    bannerImage: cover.original || cover.large || null,
    description: attrs.synopsis || '',
    genres: [],
    averageScore: score,
    meanScore: score,
    scoredBy: Number.isFinite(Number(attrs.ratingFrequenciesCount)) ? Number(attrs.ratingFrequenciesCount) : null,
    rank: Number.isFinite(Number(attrs.ratingRank)) ? Number(attrs.ratingRank) : null,
    members: Number.isFinite(Number(attrs.userCount)) ? Number(attrs.userCount) : null,
    favorites: Number.isFinite(Number(attrs.favoritesCount)) ? Number(attrs.favoritesCount) : null,
    popularity: attrs.userCount || attrs.popularityRank || 0,
    trending: attrs.favoritesCount || 0,
    episodes: attrs.episodeCount || null,
    status: attrs.status || '',
    season: '',
    seasonYear: attrs.startDate ? Number(String(attrs.startDate).slice(0, 4)) : null,
    format: normalizeFormat(attrs.subtype || attrs.showType || 'TV'),
    siteUrl: attrs.canonicalUrl ? `https://kitsu.io${attrs.canonicalUrl}` : '',
    studios: { nodes: [] },
    sourcePayload: item,
  };
}

module.exports = {
  normalizeJikanAnime,
  normalizeJikanList,
  normalizeKitsuAnime,
};

```

### File: `backend/src/services/anime-prefetch.service.js`

- size: `3,918` bytes

```javascript
﻿const { getTopAnime, getSeasonNow, searchAnime } = require('./jikan.service');
const { normalizeJikanList } = require('./anime-normalizer.service');
const { upsertAnimeCache } = require('./anime-cache.service');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(min = 800, max = 1200) {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return delay(ms);
}

async function saveAnimeList(items = []) {
  let saved = 0;
  for (const anime of items) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const cached = await upsertAnimeCache({ ...anime, provider: 'JIKAN' });
      if (cached) saved += 1;
    } catch (error) {
      console.error('[PREFETCH] cache upsert failed:', error.message);
    }
  }
  return saved;
}

async function prefetchTopAnime({ pages = 3, limit = 25 } = {}) {
  let count = 0;

  for (let page = 1; page <= pages; page += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await getTopAnime({ page, limit });
      const items = normalizeJikanList(response.data || []);
      // eslint-disable-next-line no-await-in-loop
      count += await saveAnimeList(items);
      console.log(`[PREFETCH] top anime page ${page} cached: ${items.length}`);
    } catch (error) {
      console.error(`[PREFETCH] top anime page ${page} failed:`, error.message);
    }

    // eslint-disable-next-line no-await-in-loop
    await randomDelay();
  }

  return count;
}

async function prefetchSeasonAnime({ pages = 2, limit = 25 } = {}) {
  let count = 0;

  for (let page = 1; page <= pages; page += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await getSeasonNow({ page, limit });
      const items = normalizeJikanList(response.data || []);
      // eslint-disable-next-line no-await-in-loop
      count += await saveAnimeList(items);
      console.log(`[PREFETCH] season anime page ${page} cached: ${items.length}`);
    } catch (error) {
      console.error(`[PREFETCH] season anime page ${page} failed:`, error.message);
    }

    // eslint-disable-next-line no-await-in-loop
    await randomDelay();
  }

  return count;
}

async function prefetchByKeywords({ keywords = [], limit = 20 } = {}) {
  let count = 0;

  for (const keyword of keywords) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await searchAnime({ keyword, page: 1, limit, sort: 'POPULARITY_DESC' });
      const items = normalizeJikanList(response.data || []);
      // eslint-disable-next-line no-await-in-loop
      count += await saveAnimeList(items);
      console.log(`[PREFETCH] keyword "${keyword}" cached: ${items.length}`);
    } catch (error) {
      console.error(`[PREFETCH] keyword "${keyword}" failed:`, error.message);
    }

    // eslint-disable-next-line no-await-in-loop
    await randomDelay();
  }

  return count;
}

async function prefetchBaseAnimeCatalog({ limit = 25 } = {}) {
  const keywords = [
    'death',
    'naruto',
    'one piece',
    'attack',
    'demon',
    'jujutsu',
    'frieren',
    'spy',
    'chainsaw',
    'haikyuu',
    'conan',
    'dragon ball',
    'romance',
    'fantasy',
    'sports',
  ];

  const [topCount, seasonCount] = await Promise.all([
    prefetchTopAnime({ pages: 3, limit }),
    prefetchSeasonAnime({ pages: 2, limit }),
  ]);

  const keywordCount = await prefetchByKeywords({ keywords, limit });

  return {
    topCount,
    seasonCount,
    keywordCount,
    total: topCount + seasonCount + keywordCount,
  };
}

async function prefetchAndCacheAnimeCatalog() {
  const summary = await prefetchBaseAnimeCatalog({ limit: 25 });
  console.log('[PREFETCH] completed:', summary);
  return summary;
}

module.exports = {
  prefetchBaseAnimeCatalog,
  prefetchTopAnime,
  prefetchSeasonAnime,
  prefetchByKeywords,
  prefetchAndCacheAnimeCatalog,
};

```

### File: `backend/src/services/anime-pretranslate.service.js`

- size: `6,562` bytes

```javascript
﻿const prisma = require('../lib/prisma');
const {
  listCachedAnimeWithoutTranslation,
  getTranslationByAnimeId,
  upsertTranslation,
} = require('./anime-cache.service');
const { translateAnimeText } = require('./openai-translation.service');
const { getOpenAIClient, selectTranslationModel } = require('./openai-model.service');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(min = 500, max = 1000) {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return delay(ms);
}

function getSourceTitle(anime) {
  return anime.englishTitle || anime.romajiTitle || anime.nativeTitle || 'Untitled';
}

function getSourceDescription(anime, enTranslation) {
  const fromDb = enTranslation?.description || anime.description || '';
  return String(fromDb || '').slice(0, 3000).trim();
}

async function markFailedTranslation(anime, lang, reason, existingTitle = null) {
  await upsertTranslation({
    animeId: anime.id,
    lang,
    title: existingTitle || null,
    description: null,
    source: 'GPT',
    status: 'FAILED',
    failureReason: reason,
  });
}

async function translateOneAnime({ anime, lang, overwrite = false, mode = 'missing-all' }) {
  if (!anime?.id) return { skipped: true, reason: 'invalid_anime' };

  const existing = await getTranslationByAnimeId(anime.id, lang);

  if (existing && !overwrite) {
    const hasTitle = Boolean(String(existing.title || '').trim());
    const hasDescription = Boolean(String(existing.description || '').trim());
    if (
      (mode === 'missing-title' && hasTitle) ||
      (mode === 'missing-description' && hasDescription) ||
      (mode === 'missing-all' && hasTitle && hasDescription)
    ) {
      return { skipped: true, reason: 'existing_translation' };
    }
  }

  const enTranslation = await getTranslationByAnimeId(anime.id, 'en');
  const sourceTitle = getSourceTitle(anime);
  const sourceDescription = getSourceDescription(anime, enTranslation);

  const requiresDescription = mode !== 'missing-title';
  if (!sourceDescription && requiresDescription) {
    await markFailedTranslation(anime, lang, 'invalid_request', existing?.title || null);
    return { skipped: true, reason: 'invalid_request' };
  }

  const translated = await translateAnimeText({
    provider: anime.provider,
    externalId: anime.externalId,
    title: sourceTitle,
    description: sourceDescription,
    targetLang: lang,
    sourceLang: 'en',
  });

  if (!translated?.ok) {
    const reason = translated?.reason || 'unknown';
    await markFailedTranslation(anime, lang, reason, existing?.title || null);
    return { skipped: true, reason };
  }

  await upsertTranslation({
    animeId: anime.id,
    lang,
    title: translated.title,
    description: translated.description,
    source: 'GPT',
    status: 'AUTO',
    failureReason: null,
  });

  return { translated: true, model: translated.model || null };
}

async function getTargetAnimeList(lang, limit, overwrite, mode = 'missing-all') {
  if (!overwrite) {
    if (mode === 'missing-title') {
      return prisma.anime.findMany({
        where: {
          OR: [
            { translations: { none: { lang } } },
            {
              translations: {
                some: {
                  lang,
                  OR: [{ title: null }, { title: '' }],
                },
              },
            },
          ],
        },
        orderBy: [{ updatedAt: 'desc' }],
        take: limit,
      });
    }

    if (mode === 'missing-description') {
      return prisma.anime.findMany({
        where: {
          OR: [
            { translations: { none: { lang } } },
            {
              translations: {
                some: {
                  lang,
                  OR: [{ description: null }, { description: '' }],
                },
              },
            },
          ],
        },
        orderBy: [{ updatedAt: 'desc' }],
        take: limit,
      });
    }

    return listCachedAnimeWithoutTranslation(lang, limit);
  }

  return prisma.anime.findMany({
    orderBy: [{ updatedAt: 'desc' }],
    take: limit,
  });
}

async function pretranslateAnimeCatalog({ langs = ['ko', 'ja'], limit, overwrite = false, mode = 'missing-all' } = {}) {
  const normalizedMode = String(mode || 'missing-all');
  const safeLimit = Math.max(1, Number(limit || process.env.PRETRANSLATE_LIMIT || 30));
  const summary = [];

  const client = getOpenAIClient();
  if (!client) {
    console.log('[PRETRANSLATE] No accessible OpenAI translation model. Check your project model access.');
    return summary;
  }

  const selectedModel = await selectTranslationModel(client, { forceRefresh: true });
  if (!selectedModel) {
    console.log('[PRETRANSLATE] No accessible OpenAI translation model. Check your project model access.');
    return summary;
  }
  console.log(`[PRETRANSLATE] selected model: ${selectedModel}`);

  for (const lang of langs) {
    if (!['ko', 'ja'].includes(lang)) continue;

    // eslint-disable-next-line no-await-in-loop
    const targets = await getTargetAnimeList(lang, safeLimit, overwrite, normalizedMode);

    let translatedCount = 0;
    let skippedCount = 0;

    for (let index = 0; index < targets.length; index += 1) {
      const anime = targets[index];

      try {
        // eslint-disable-next-line no-await-in-loop
        const result = await translateOneAnime({ anime, lang, overwrite, mode: normalizedMode });

        if (result.translated) {
          translatedCount += 1;
          console.log(`[PRETRANSLATE] ${lang} ${index + 1}/${targets.length} translated.`);
        } else {
          skippedCount += 1;
          console.log(`[PRETRANSLATE] ${lang} ${index + 1}/${targets.length} failed: ${result.reason}`);

          if (result.reason === 'no_accessible_model') {
            summary.push({ lang, total: targets.length, translated: translatedCount, skipped: skippedCount });
            console.log('[PRETRANSLATE] stopped: no accessible model.');
            return summary;
          }
        }
      } catch (error) {
        skippedCount += 1;
        console.error(`[PRETRANSLATE] ${lang} ${index + 1}/${targets.length} failed:`, error.message);
      }

      // eslint-disable-next-line no-await-in-loop
      await randomDelay();
    }

    summary.push({ lang, total: targets.length, translated: translatedCount, skipped: skippedCount });
  }

  console.log('[PRETRANSLATE] completed:', summary);
  return summary;
}

module.exports = {
  pretranslateAnimeCatalog,
  translateOneAnime,
};

```

### File: `backend/src/services/anime-provider.service.js`

- size: `9,377` bytes

```javascript
﻿const axios = require('axios');
const {
  getTopAnime,
  getSeasonNow,
  searchAnime,
  getAnimeById,
  getRecommendationsFromGenre,
} = require('./jikan.service');
const {
  normalizeJikanAnime,
  normalizeJikanList,
  normalizeKitsuAnime,
} = require('./anime-normalizer.service');
const { FALLBACK_ANIME } = require('../data/fallbackAnime');
const { getCurrentSeasonAndYear } = require('../utils/season');
const { isAdultAnime } = require('../utils/animeContentSafety');

const EXTERNAL_FALLBACK_MESSAGE = '외부 애니메이션 데이터 서버가 불안정하여 임시 데이터를 표시합니다.';

function filterSafeItems(items = []) {
  return (items || []).filter((item) => !isAdultAnime(item));
}

function fallbackList({ page = 1, perPage = 20, genre = '' } = {}) {
  const sourceRaw = genre
    ? FALLBACK_ANIME.filter((item) => (item.genres || []).includes(genre))
    : FALLBACK_ANIME;
  const source = filterSafeItems(sourceRaw);

  const start = (page - 1) * perPage;
  const items = filterSafeItems(source.slice(start, start + perPage).map((item) => ({
    ...item,
    provider: 'FALLBACK',
    isFallback: true,
  })));

  return {
    items,
    pageInfo: {
      currentPage: page,
      perPage,
      total: source.length,
      lastPage: Math.max(1, Math.ceil(source.length / perPage)),
      hasNextPage: start + perPage < source.length,
    },
    provider: 'FALLBACK',
    isFallback: true,
    message: EXTERNAL_FALLBACK_MESSAGE,
  };
}

function applySearchFilters(items, { season, format, status, year }) {
  return (items || []).filter((item) => {
    if (season && String(item.season || '').toUpperCase() !== String(season).toUpperCase()) return false;
    if (format && String(item.format || '').toUpperCase() !== String(format).toUpperCase()) return false;
    if (status && String(item.status || '').toUpperCase() !== String(status).toUpperCase()) return false;
    if (year && Number(item.seasonYear) !== Number(year)) return false;
    return true;
  });
}

async function tryKitsuList({ page = 1, perPage = 20, keyword = '', sort = '-userCount' }) {
  const params = new URLSearchParams();
  params.set('page[limit]', String(perPage));
  params.set('page[offset]', String((page - 1) * perPage));
  params.set('sort', sort);
  if (keyword) params.set('filter[text]', keyword);

  const response = await axios.get(`https://kitsu.io/api/edge/anime?${params.toString()}`, {
    timeout: 15000,
    headers: { Accept: 'application/vnd.api+json', 'User-Agent': 'AniPick/1.0' },
  });

  const normalized = filterSafeItems((response.data?.data || []).map(normalizeKitsuAnime).filter(Boolean));
  const total = Number(response.data?.meta?.count || normalized.length);

  return {
    items: normalized,
    pageInfo: {
      currentPage: page,
      perPage,
      total,
      lastPage: Math.max(1, Math.ceil(total / perPage)),
      hasNextPage: page * perPage < total,
    },
    provider: 'KITSU',
    isFallback: false,
    message: '',
  };
}

async function fetchTrendingAnime({ page = 1, perPage = 12 } = {}) {
  try {
    const result = await getTopAnime({ page, limit: perPage });
    return {
      items: filterSafeItems(normalizeJikanList(result.data || [])),
      pageInfo: {
        currentPage: result.pagination?.current_page || page,
        perPage,
        total: result.pagination?.items?.total || (result.data || []).length,
        lastPage: result.pagination?.last_visible_page || page,
        hasNextPage: Boolean(result.pagination?.has_next_page),
      },
      provider: 'JIKAN',
      isFallback: false,
      message: '',
    };
  } catch (error) {
    try {
      return await tryKitsuList({ page, perPage, sort: '-userCount' });
    } catch {
      return fallbackList({ page, perPage });
    }
  }
}

async function fetchPopularThisSeason({ page = 1, perPage = 12 } = {}) {
  const { season, year } = getCurrentSeasonAndYear();

  try {
    const result = await getSeasonNow({ page, limit: perPage });
    return {
      season,
      year,
      items: filterSafeItems(normalizeJikanList(result.data || [])),
      provider: 'JIKAN',
      isFallback: false,
      message: '',
    };
  } catch {
    try {
      const kitsu = await tryKitsuList({ page, perPage, sort: '-averageRating' });
      return {
        season,
        year,
        items: kitsu.items,
        provider: kitsu.provider,
        isFallback: kitsu.isFallback,
        message: kitsu.message,
      };
    } catch {
      const fallback = fallbackList({ page, perPage });
      return {
        season,
        year,
        items: fallback.items,
        provider: fallback.provider,
        isFallback: true,
        message: fallback.message,
      };
    }
  }
}

async function fetchSearchAnime({
  keyword = '',
  genre = '',
  year = '',
  season = '',
  format = '',
  status = '',
  sort = 'POPULARITY_DESC',
  page = 1,
  perPage = 20,
} = {}) {
  try {
    const result = await searchAnime({
      keyword,
      page,
      limit: perPage,
      genre,
      year,
      season,
      format,
      status,
      sort,
    });

    const normalized = filterSafeItems(normalizeJikanList(result.data || []));
    const filtered = applySearchFilters(normalized, { season, format, status, year });
    const total = result.pagination?.items?.total || filtered.length;

    return {
      items: filtered,
      pageInfo: {
        currentPage: result.pagination?.current_page || page,
        perPage,
        total,
        lastPage: result.pagination?.last_visible_page || Math.max(1, Math.ceil(total / perPage)),
        hasNextPage: Boolean(result.pagination?.has_next_page),
      },
      provider: 'JIKAN',
      isFallback: false,
      message: '',
    };
  } catch {
    try {
      const kitsu = await tryKitsuList({ page, perPage, keyword, sort: '-userCount' });
      const filtered = applySearchFilters(filterSafeItems(kitsu.items), { season, format, status, year });
      return {
        items: filtered,
        pageInfo: {
          ...kitsu.pageInfo,
          total: filtered.length,
          lastPage: Math.max(1, Math.ceil(filtered.length / perPage)),
          hasNextPage: page * perPage < filtered.length,
        },
        provider: 'KITSU',
        isFallback: false,
        message: '',
      };
    } catch {
      return fallbackList({ page, perPage, genre });
    }
  }
}

async function fetchAnimeDetail(id) {
  try {
    const result = await getAnimeById(id);
    const item = normalizeJikanAnime(result.data);
    return {
      item: isAdultAnime(item) ? null : item,
      provider: 'JIKAN',
      isFallback: false,
      message: '',
    };
  } catch {
    try {
      const kitsu = await axios.get(`https://kitsu.io/api/edge/anime/${id}`, {
        timeout: 15000,
        headers: { Accept: 'application/vnd.api+json', 'User-Agent': 'AniPick/1.0' },
      });
      const item = normalizeKitsuAnime(kitsu.data?.data);
      return {
        item: isAdultAnime(item) ? null : item,
        provider: 'KITSU',
        isFallback: false,
        message: '',
      };
    } catch {
      const fallbackItem = FALLBACK_ANIME.find((item) => Number(item.id) === Number(id)) || FALLBACK_ANIME[0];
      return {
        item: isAdultAnime(fallbackItem) ? null : { ...fallbackItem, provider: 'FALLBACK', isFallback: true },
        provider: 'FALLBACK',
        isFallback: true,
        message: EXTERNAL_FALLBACK_MESSAGE,
      };
    }
  }
}

async function fetchGenreRecommendations({ genre = '', page = 1, perPage = 12 } = {}) {
  if (!genre) return fetchTrendingAnime({ page, perPage });

  try {
    const result = await getRecommendationsFromGenre({ genre, page, limit: perPage });
    return {
      items: filterSafeItems(normalizeJikanList(result.data || [])),
      provider: 'JIKAN',
      isFallback: false,
      message: '',
    };
  } catch {
    return fallbackList({ page, perPage, genre });
  }
}

async function fetchSimilarAnime({ animeId, genres = [], page = 1, perPage = 12 } = {}) {
  if (!animeId && genres.length === 0) return fetchTrendingAnime({ page, perPage });
  if (genres.length > 0) return fetchGenreRecommendations({ genre: genres[0], page, perPage });
  return fetchTrendingAnime({ page, perPage });
}

async function fetchRecommendations({ favoriteGenres = [], perPage = 12 } = {}) {
  const genre = favoriteGenres[0] || '';
  const base = await fetchGenreRecommendations({ genre, page: 1, perPage });

  return {
    type: genre ? 'GENRE_BASED' : 'TRENDING_DESC',
    genre: genre || null,
    reason: genre
      ? `${genre} 장르를 자주 선호해서 추천합니다.`
      : '선호 데이터가 부족해 인기 작품을 추천합니다.',
    items: base.items || [],
    provider: base.provider,
    isFallback: base.isFallback,
    message: base.message || '',
  };
}

async function testProviderConnection() {
  const trending = await fetchTrendingAnime({ page: 1, perPage: 1 });
  return {
    ok: true,
    provider: trending.provider,
    isFallback: Boolean(trending.isFallback),
    message: trending.isFallback ? EXTERNAL_FALLBACK_MESSAGE : '',
    sample: trending.items || [],
  };
}

module.exports = {
  EXTERNAL_FALLBACK_MESSAGE,
  fetchTrendingAnime,
  fetchPopularThisSeason,
  fetchSearchAnime,
  fetchAnimeDetail,
  fetchGenreRecommendations,
  fetchSimilarAnime,
  fetchRecommendations,
  testProviderConnection,
};

```

### File: `backend/src/services/anime-translation-orchestrator.service.js`

- size: `5,366` bytes

```javascript
const prisma = require('../lib/prisma');
const {
  getExternalId,
  normalizeProvider,
  upsertAnimeCache,
  getTranslationByAnimeId,
  upsertTranslation,
  getAnimeByProviderId,
} = require('./anime-cache.service');
const { getLocalizedAnime, normalizeLang, stripHtmlTags } = require('../utils/animeI18n');

function getEnglishSource(anime) {
  return stripHtmlTags(anime?.description || anime?.background || '');
}

function getFallbackDescription(lang) {
  if (lang === 'ja') return '日本語訳は準備中です。';
  if (lang === 'en') return 'No description available.';
  return '한국어 번역이 준비 중입니다.';
}

async function ensureEnglishTranslation(anime, animeRow) {
  if (!animeRow?.id) return null;
  const existing = await getTranslationByAnimeId(animeRow.id, 'en');
  if (existing) return existing;

  return upsertTranslation({
    animeId: animeRow.id,
    lang: 'en',
    title: anime?.title?.english || anime?.title?.romaji || anime?.title?.native || animeRow.englishTitle || 'Untitled',
    description: getEnglishSource(anime) || animeRow.description || 'No description available.',
    source: 'API',
    status: 'REVIEWED',
    failureReason: null,
  });
}

async function ensureAnimeTranslations(anime, targetLangs = ['ko', 'ja'], options = {}) {
  const provider = normalizeProvider(anime?.provider);
  const externalId = getExternalId(anime);
  if (!externalId) return { updated: [] };

  const animeRow = await upsertAnimeCache({ ...anime, provider, externalId });
  if (!animeRow) return { updated: [] };
  await ensureEnglishTranslation(anime, animeRow);

  const updated = [];
  for (const rawLang of targetLangs) {
    const lang = normalizeLang(rawLang);
    if (!['ko', 'ja'].includes(lang)) continue;

    // eslint-disable-next-line no-await-in-loop
    const existing = await getTranslationByAnimeId(animeRow.id, lang);
    if (existing && !options.overwrite) {
      updated.push({ lang, skipped: true, reason: 'exists' });
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    await prisma.translationJob.upsert({
      where: { animeId_lang: { animeId: animeRow.id, lang } },
      create: {
        animeId: animeRow.id,
        lang,
        status: 'PENDING',
        requestedBy: options.requestedBy || 'SYSTEM',
      },
      update: {
        status: 'PENDING',
        reason: null,
        finishedAt: null,
        requestedBy: options.requestedBy || 'SYSTEM',
      },
    });
    updated.push({ lang, queued: true });
  }

  return { updated, animeId: animeRow.id, provider, externalId };
}

async function getLocalizedAnimeFromDbOnly(anime, lang, options = {}) {
  const selectedLang = normalizeLang(lang);
  const provider = normalizeProvider(anime?.provider);
  const externalId = getExternalId(anime);

  let translation = null;
  let animeRow = null;

  if (externalId) {
    animeRow = options.skipCacheWrite
      ? await getAnimeByProviderId(provider, externalId)
      : await upsertAnimeCache({ ...anime, provider, externalId });
    if (animeRow) translation = await getTranslationByAnimeId(animeRow.id, selectedLang);
  }

  const localized = getLocalizedAnime(anime, selectedLang, translation);
  const displayDescription =
    !translation && selectedLang !== 'en'
      ? getFallbackDescription(selectedLang)
      : localized.displayDescription;

  return {
    ...localized,
    displayDescription,
    isTranslated: Boolean(translation?.description),
    translationSource: translation?.source || null,
    translationStatus: translation?.status || (selectedLang === 'en' ? 'REVIEWED' : 'PENDING'),
    translationFailureReason: translation?.failureReason || null,
  };
}

async function getLocalizedAnimeListWithTranslations(items, lang) {
  const selectedLang = normalizeLang(lang);
  const safeItems = Array.isArray(items) ? items : [];

  return Promise.all(
    safeItems.map(async (item) => {
      const provider = normalizeProvider(item?.provider);
      const externalId = getExternalId(item);
      let translation = null;
      if (externalId) {
        const cached = await getAnimeByProviderId(provider, externalId);
        if (cached) translation = await getTranslationByAnimeId(cached.id, selectedLang);
      }

      const localized = getLocalizedAnime(item, selectedLang, translation);
      return {
        ...localized,
        displayDescription:
          !translation && selectedLang !== 'en'
            ? getFallbackDescription(selectedLang)
            : localized.displayDescription,
        isTranslated: Boolean(translation?.description),
        translationSource: translation?.source || null,
        translationStatus: translation?.status || (selectedLang === 'en' ? 'REVIEWED' : 'PENDING'),
        translationFailureReason: translation?.failureReason || null,
      };
    })
  );
}

async function getStoredTranslations(provider, externalId) {
  const anime = await getAnimeByProviderId(provider, externalId);
  if (!anime) return [];

  const rows = await Promise.all([
    getTranslationByAnimeId(anime.id, 'ko'),
    getTranslationByAnimeId(anime.id, 'en'),
    getTranslationByAnimeId(anime.id, 'ja'),
  ]);

  return rows.filter(Boolean);
}

module.exports = {
  ensureAnimeTranslations,
  ensureEnglishTranslation,
  getLocalizedAnimeFromDbOnly,
  getLocalizedAnimeListWithTranslations,
  getStoredTranslations,
};

```

### File: `backend/src/services/jikan.service.js`

- size: `5,187` bytes

```javascript
const axios = require('axios');

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';
const CACHE_TTL_MS = 10 * 60 * 1000;
const cache = new Map();
let lastRequestAt = 0;

const genreIdMap = {
  Action: 1,
  Adventure: 2,
  Comedy: 4,
  Drama: 8,
  Fantasy: 10,
  Horror: 14,
  Mystery: 7,
  Romance: 22,
  'Sci-Fi': 24,
  Sports: 30,
  Supernatural: 37,
  'Slice of Life': 36,
  Thriller: 41,
};

function buildCacheKey(path, params) {
  return `${path}::${JSON.stringify(params || {})}`;
}

function getCached(key) {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() > hit.expiresAt) {
    cache.delete(key);
    return null;
  }
  return hit.data;
}

function setCached(key, data) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForRateLimit() {
  const perSecond = Math.max(1, Number(process.env.JIKAN_RATE_LIMIT_PER_SECOND || 2));
  const minInterval = Math.ceil(1000 / perSecond);
  const elapsed = Date.now() - lastRequestAt;
  if (elapsed < minInterval) {
    await delay(minInterval - elapsed);
  }
  lastRequestAt = Date.now();
}

async function requestJikan(path, params = {}, useCache = true) {
  const key = buildCacheKey(path, params);
  if (useCache) {
    const cached = getCached(key);
    if (cached) return cached;
  }

  try {
    await waitForRateLimit();
    const response = await axios.get(`${JIKAN_BASE_URL}${path}`, {
      params,
      timeout: 15000,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'AniPick/1.0',
      },
    });

    if (useCache) {
      setCached(key, response.data);
    }

    return response.data;
  } catch (error) {
    if (Number(error.response?.status) === 429) {
      const retryAfter = Number(error.response?.headers?.['retry-after'] || 2);
      await delay(Math.max(1, retryAfter) * 1000);
      await waitForRateLimit();
      const retry = await axios.get(`${JIKAN_BASE_URL}${path}`, {
        params,
        timeout: 15000,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'AniPick/1.0',
        },
      });
      if (useCache) setCached(key, retry.data);
      return retry.data;
    }

    console.error('[Jikan] request failed');
    console.error('error.code:', error.code);
    console.error('error.message:', error.message);
    console.error('error.response?.status:', error.response?.status || null);
    console.error('error.response?.data:', error.response?.data || null);
    throw error;
  }
}

function mapFormatToJikanType(format) {
  const map = {
    TV: 'tv',
    TV_SHORT: 'tv',
    MOVIE: 'movie',
    SPECIAL: 'special',
    OVA: 'ova',
    ONA: 'ona',
    MUSIC: 'music',
  };
  return map[format] || null;
}

function mapStatusToJikanStatus(status) {
  const map = {
    RELEASING: 'airing',
    FINISHED: 'complete',
    NOT_YET_RELEASED: 'upcoming',
  };
  return map[status] || null;
}

function mapSortToJikan(sort) {
  const map = {
    POPULARITY_DESC: { order_by: 'popularity', sort: 'asc' },
    SCORE_DESC: { order_by: 'score', sort: 'desc' },
    START_DATE_DESC: { order_by: 'start_date', sort: 'desc' },
    TITLE_ASC: { order_by: 'title', sort: 'asc' },
  };
  return map[sort] || map.POPULARITY_DESC;
}

async function getTopAnime({ page = 1, limit = 20 } = {}) {
  return requestJikan('/top/anime', { page, limit, sfw: true });
}

async function getSeasonNow({ page = 1, limit = 20 } = {}) {
  return requestJikan('/seasons/now', { page, limit, sfw: true });
}

async function searchAnime({
  keyword = '',
  page = 1,
  limit = 20,
  genre = '',
  year = '',
  season = '',
  format = '',
  status = '',
  sort = 'POPULARITY_DESC',
} = {}) {
  const sortParams = mapSortToJikan(sort);
  const params = {
    q: keyword || undefined,
    page,
    limit,
    sfw: true,
    order_by: sortParams.order_by,
    sort: sortParams.sort,
  };

  const genreId = genreIdMap[genre];
  if (genreId) params.genres = genreId;

  const jikanType = mapFormatToJikanType(format);
  if (jikanType) params.type = jikanType;

  const jikanStatus = mapStatusToJikanStatus(status);
  if (jikanStatus) params.status = jikanStatus;

  if (year) {
    params.start_date = `${year}-01-01`;
    params.end_date = `${year}-12-31`;
  }

  const result = await requestJikan('/anime', params);

  if (!season) return result;

  const filtered = (result.data || []).filter(
    (item) => String(item.season || '').toUpperCase() === String(season).toUpperCase()
  );

  return {
    ...result,
    data: filtered,
    pagination: {
      ...(result.pagination || {}),
      items: {
        ...(result.pagination?.items || {}),
        count: filtered.length,
      },
    },
  };
}

async function getAnimeById(id) {
  return requestJikan(`/anime/${id}`, { sfw: true });
}

async function getRecommendationsFromGenre({ genre = '', page = 1, limit = 12 } = {}) {
  return searchAnime({
    keyword: '',
    genre,
    page,
    limit,
    sort: 'SCORE_DESC',
  });
}

module.exports = {
  genreIdMap,
  getTopAnime,
  getSeasonNow,
  searchAnime,
  getAnimeById,
  getRecommendationsFromGenre,
};

```

### File: `backend/src/services/openai-model.service.js`

- size: `3,858` bytes

```javascript
﻿const DEFAULT_CANDIDATES = [
  'gpt-4o-mini',
  'gpt-4.1-mini',
  'gpt-4.1-nano',
  'gpt-5-mini',
  'gpt-5-nano',
  'gpt-5.4-mini',
  'gpt-5.4-nano',
  'gpt-5.5',
];

let cachedModel = null;
let cachedAccessibleModels = null;
let cachedAt = 0;
const MODEL_CACHE_TTL_MS = 10 * 60 * 1000;
const unavailableModels = new Set();

function uniqueCompact(values = []) {
  const seen = new Set();
  const result = [];
  values.forEach((value) => {
    const item = String(value || '').trim();
    if (!item || seen.has(item)) return;
    seen.add(item);
    result.push(item);
  });
  return result;
}

function getCandidateModels() {
  const explicit = String(process.env.OPENAI_TRANSLATION_MODEL || '').trim();
  const fromEnv = String(process.env.OPENAI_TRANSLATION_MODEL_CANDIDATES || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return uniqueCompact([
    ...(explicit ? [explicit] : []),
    ...fromEnv,
    ...DEFAULT_CANDIDATES,
  ]);
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    // eslint-disable-next-line global-require
    const OpenAI = require('openai');
    return new OpenAI({ apiKey });
  } catch {
    console.warn('[TRANSLATION] openai package is missing.');
    return null;
  }
}

async function listAccessibleModels(client) {
  if (!client) return null;

  try {
    const response = await client.models.list();
    const list = Array.isArray(response?.data) ? response.data : [];
    return list.map((item) => item?.id).filter(Boolean);
  } catch (error) {
    console.warn('[TRANSLATION] Failed to list models:', error.message);
    return null;
  }
}

function pickFromCandidates(candidates, accessibleModels) {
  if (!Array.isArray(accessibleModels)) return null;

  for (const model of candidates) {
    if (unavailableModels.has(model)) continue;
    if (accessibleModels.includes(model)) return model;
  }

  return null;
}

async function selectTranslationModel(client, options = {}) {
  const { forceRefresh = false } = options;
  const now = Date.now();

  if (!forceRefresh && cachedModel && !unavailableModels.has(cachedModel)) {
    return cachedModel;
  }

  const candidates = getCandidateModels();
  let accessibleModels = cachedAccessibleModels;

  const needsRefresh =
    forceRefresh ||
    !Array.isArray(cachedAccessibleModels) ||
    now - cachedAt > MODEL_CACHE_TTL_MS;

  if (needsRefresh) {
    accessibleModels = await listAccessibleModels(client);
    if (Array.isArray(accessibleModels)) {
      cachedAccessibleModels = accessibleModels;
      cachedAt = now;
    }
  }

  const selected = pickFromCandidates(candidates, accessibleModels);
  if (selected) {
    if (cachedModel !== selected) {
      console.log(`[TRANSLATION] Selected OpenAI model: ${selected}`);
    }
    cachedModel = selected;
    return selected;
  }

  if (!Array.isArray(accessibleModels)) {
    const fallback = candidates.find((model) => !unavailableModels.has(model)) || null;
    if (fallback) {
      if (cachedModel !== fallback) {
        console.log(`[TRANSLATION] Selected OpenAI model (fallback): ${fallback}`);
      }
      cachedModel = fallback;
      return fallback;
    }
  }

  cachedModel = null;
  return null;
}

function markModelUnavailable(model) {
  const name = String(model || '').trim();
  if (!name) return;
  unavailableModels.add(name);
  if (cachedModel === name) cachedModel = null;
}

function getUnavailableModels() {
  return Array.from(unavailableModels);
}

function resetModelCache() {
  cachedModel = null;
  cachedAccessibleModels = null;
  cachedAt = 0;
  unavailableModels.clear();
}

module.exports = {
  DEFAULT_CANDIDATES,
  getCandidateModels,
  getOpenAIClient,
  listAccessibleModels,
  selectTranslationModel,
  markModelUnavailable,
  getUnavailableModels,
  resetModelCache,
};

```

### File: `backend/src/services/openai-translation.service.js`

- size: `7,713` bytes

```javascript
﻿const { stripHtmlTags } = require('../utils/animeI18n');
const {
  getOpenAIClient,
  selectTranslationModel,
  markModelUnavailable,
} = require('./openai-model.service');

const FAILED_TRANSLATION_TTL_MS = 30 * 60 * 1000;
const failedTranslationCache = new Map();

function getFailureKey({ provider, externalId, targetLang }) {
  const p = String(provider || 'JIKAN').toUpperCase();
  const id = Number(externalId || 0);
  const lang = String(targetLang || '').toLowerCase();
  return `${p}:${id}:${lang}`;
}

function getRecentFailure(key) {
  const entry = failedTranslationCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    failedTranslationCache.delete(key);
    return null;
  }
  return entry;
}

function markFailure(key, reason) {
  failedTranslationCache.set(key, {
    reason,
    expiresAt: Date.now() + FAILED_TRANSLATION_TTL_MS,
  });
}

function clearFailure(key) {
  failedTranslationCache.delete(key);
}

function safeText(text, limit = 3000) {
  const cleaned = stripHtmlTags(text || '');
  if (!cleaned) return '';
  return cleaned.slice(0, limit);
}

function targetLanguageName(targetLang) {
  if (targetLang === 'ko') return 'Korean';
  if (targetLang === 'ja') return 'Japanese';
  return 'English';
}

function buildTranslationPrompt({ title, description, targetLang }) {
  const language = targetLanguageName(targetLang);

  return [
    `Target language: ${language}`,
    'Rules:',
    '- Keep original meaning, do not invent facts.',
    '- Keep proper nouns recognizable.',
    '- Remove source labels such as MAL Rewrite.',
    '- Output concise natural text.',
    '- Description should be 3 to 6 sentences when source is long.',
    '- Do not add spoilers that are not in the source text.',
    '',
    `Title: ${title || ''}`,
    `Description: ${description || ''}`,
  ].join('\n');
}

function extractOutputText(response) {
  if (response?.output_text) return response.output_text;

  const output = response?.output || [];
  for (const item of output) {
    const content = item?.content || [];
    for (const part of content) {
      if (part?.type === 'output_text' && part?.text) return part.text;
      if (part?.type === 'text' && part?.text) return part.text;
    }
  }

  return '';
}

function classifyOpenAIError(error) {
  const status = Number(error?.status || error?.response?.status || 0);
  const message = String(error?.message || '').toLowerCase();
  const code = String(error?.code || '').toLowerCase();

  if (
    status === 403 ||
    message.includes('does not have access to model') ||
    message.includes('model access denied')
  ) {
    return 'model_access_denied';
  }

  if (
    status === 400 &&
    (message.includes('does not exist') ||
      message.includes('model_not_found') ||
      code.includes('model_not_found'))
  ) {
    return 'invalid_request';
  }

  if (status === 429 || message.includes('rate limit')) {
    return 'rate_limited';
  }

  if (
    code.includes('enotfound') ||
    code.includes('econnreset') ||
    code.includes('etimedout') ||
    code.includes('econnaborted')
  ) {
    return 'network_error';
  }

  if (status >= 400 && status < 500) return 'invalid_request';
  if (status >= 500) return 'network_error';
  return 'unknown';
}

function isModelSwitchError(reason) {
  return reason === 'model_access_denied' || reason === 'invalid_request';
}

async function callTranslation(client, model, prompt) {
  return client.responses.create({
    model,
    input: [
      {
        role: 'system',
        content: 'You are a professional anime metadata translator. Return only valid JSON.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'anime_translation',
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
          },
          required: ['title', 'description'],
        },
      },
    },
  });
}

async function translateAnimeText({
  provider,
  externalId,
  title,
  description,
  targetLang,
}) {
  const failureKey = getFailureKey({ provider, externalId, targetLang });
  const recentFailure = getRecentFailure(failureKey);
  if (recentFailure) {
    console.log(
      `[TRANSLATION] skipped recent failed translation ${failureKey} reason=${recentFailure.reason}`
    );
    return {
      ok: false,
      reason: recentFailure.reason,
    };
  }

  const client = getOpenAIClient();
  if (!client) {
    return {
      ok: false,
      reason: 'no_accessible_model',
    };
  }

  const cleanedTitle = safeText(title, 300);
  const cleanedDescription = safeText(description, 3000);
  if (!cleanedDescription) {
    return {
      ok: false,
      reason: 'invalid_request',
    };
  }

  const prompt = buildTranslationPrompt({
    title: cleanedTitle,
    description: cleanedDescription,
    targetLang,
  });

  const triedModels = new Set();
  let selectedModel = await selectTranslationModel(client);

  if (!selectedModel) {
    markFailure(failureKey, 'no_accessible_model');
    return {
      ok: false,
      reason: 'no_accessible_model',
    };
  }

  while (selectedModel && !triedModels.has(selectedModel)) {
    triedModels.add(selectedModel);

    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await callTranslation(client, selectedModel, prompt);
      const outputText = extractOutputText(response);

      if (!outputText) {
        markFailure(failureKey, 'invalid_request');
        return { ok: false, reason: 'invalid_request' };
      }

      try {
        const parsed = JSON.parse(outputText);
        clearFailure(failureKey);
        return {
          ok: true,
          model: selectedModel,
          title: stripHtmlTags(parsed?.title || cleanedTitle),
          description: stripHtmlTags(parsed?.description || ''),
        };
      } catch (parseError) {
        console.error('[TRANSLATION] response parse failed:', parseError.message);
        markFailure(failureKey, 'invalid_request');
        return { ok: false, reason: 'invalid_request' };
      }
    } catch (error) {
      const reason = classifyOpenAIError(error);
      console.error('[TRANSLATION] OpenAI request failed:', error.message);

      if (isModelSwitchError(reason)) {
        markModelUnavailable(selectedModel);
        // eslint-disable-next-line no-await-in-loop
        selectedModel = await selectTranslationModel(client, { forceRefresh: true });
        if (!selectedModel || triedModels.has(selectedModel)) {
          markFailure(failureKey, 'no_accessible_model');
          return { ok: false, reason: 'no_accessible_model' };
        }
        continue;
      }

      markFailure(failureKey, reason);
      return {
        ok: false,
        reason,
      };
    }
  }

  markFailure(failureKey, 'no_accessible_model');
  return {
    ok: false,
    reason: 'no_accessible_model',
  };
}

async function translateAnimeTitle({ provider, externalId, title, targetLang }) {
  const result = await translateAnimeText({
    provider,
    externalId,
    title,
    description: 'Translate only title naturally.',
    targetLang,
  });

  return result?.ok ? result.title : null;
}

async function translateAnimeDescription({ provider, externalId, title, description, targetLang }) {
  const result = await translateAnimeText({ provider, externalId, title, description, targetLang });
  return result?.ok ? result.description : null;
}

module.exports = {
  translateAnimeText,
  translateAnimeTitle,
  translateAnimeDescription,
  buildTranslationPrompt,
};

```

### File: `backend/src/services/translation-job.service.js`

- size: `7,461` bytes

```javascript
const crypto = require('crypto');
const prisma = require('../lib/prisma');
const { upsertTranslation } = require('./anime-cache.service');
const { translateAnimeText } = require('./openai-translation.service');

const FINAL_REVIEWED_STATUSES = ['REVIEWED'];
const FINAL_REVIEWED_SOURCES = ['MANUAL'];

function normalizeLangs(langs = ['ko', 'ja']) {
  const list = Array.isArray(langs) ? langs : String(langs || '').split(',');
  return [...new Set(list.map((lang) => String(lang).trim().toLowerCase()).filter((lang) => ['ko', 'ja', 'en'].includes(lang)))];
}

function buildPromptHash(anime, lang) {
  const source = [
    anime.provider,
    anime.externalId,
    lang,
    anime.englishTitle,
    anime.romajiTitle,
    anime.nativeTitle,
    anime.description,
  ].join('|');
  return crypto.createHash('sha256').update(source).digest('hex');
}

function getSourceTitle(anime) {
  return anime.englishTitle || anime.romajiTitle || anime.nativeTitle || `Anime ${anime.externalId}`;
}

function getSourceDescription(anime) {
  return String(anime.description || '').trim().slice(0, 3000);
}

function isProtectedTranslation(translation) {
  if (!translation) return false;
  return FINAL_REVIEWED_SOURCES.includes(translation.source) || FINAL_REVIEWED_STATUSES.includes(translation.status);
}

async function createMissingTranslationJobs({ langs = ['ko', 'ja'], limit = 100, requestedBy = 'SYSTEM' } = {}) {
  const safeLangs = normalizeLangs(langs);
  const safeLimit = Math.max(1, Math.min(Number(limit) || 100, 1000));
  const created = [];

  for (const lang of safeLangs) {
    // eslint-disable-next-line no-await-in-loop
    const rows = await prisma.anime.findMany({
      where: {
        dataStatus: 'ACTIVE',
        translations: {
          none: { lang },
        },
      },
      orderBy: [{ popularity: 'desc' }, { averageScore: 'desc' }, { updatedAt: 'desc' }],
      take: safeLimit,
    });

    for (const anime of rows) {
      // eslint-disable-next-line no-await-in-loop
      const job = await prisma.translationJob.upsert({
        where: {
          animeId_lang: {
            animeId: anime.id,
            lang,
          },
        },
        create: {
          animeId: anime.id,
          lang,
          status: 'PENDING',
          promptHash: buildPromptHash(anime, lang),
          requestedBy,
        },
        update: {
          status: 'PENDING',
          reason: null,
          promptHash: buildPromptHash(anime, lang),
          requestedBy,
          finishedAt: null,
        },
      });
      created.push(job);
    }
  }

  return created;
}

async function markJobRunning(jobId) {
  return prisma.translationJob.update({
    where: { id: Number(jobId) },
    data: {
      status: 'RUNNING',
      attempts: { increment: 1 },
      reason: null,
      finishedAt: null,
    },
  });
}

async function markJobDone(jobId, model = null) {
  return prisma.translationJob.update({
    where: { id: Number(jobId) },
    data: {
      status: 'DONE',
      model,
      reason: null,
      finishedAt: new Date(),
    },
  });
}

async function markJobFailed(jobId, reason) {
  const current = await prisma.translationJob.findUnique({ where: { id: Number(jobId) } });
  const nextStatus = current && current.attempts >= 3 ? 'SKIPPED' : 'FAILED';
  return prisma.translationJob.update({
    where: { id: Number(jobId) },
    data: {
      status: nextStatus,
      reason: reason || 'unknown',
      finishedAt: new Date(),
    },
  });
}

async function runOneTranslationJob(jobId, { overwrite = false } = {}) {
  const job = await prisma.translationJob.findUnique({
    where: { id: Number(jobId) },
    include: {
      anime: {
        include: {
          translations: true,
        },
      },
    },
  });

  if (!job || !job.anime) return { ok: false, reason: 'job_not_found' };
  if (job.attempts >= 3 && job.status !== 'PENDING') {
    await markJobFailed(job.id, 'max_attempts');
    return { ok: false, reason: 'max_attempts' };
  }

  const existing = (job.anime.translations || []).find((translation) => translation.lang === job.lang);
  if (existing && !overwrite && isProtectedTranslation(existing)) {
    await prisma.translationJob.update({
      where: { id: job.id },
      data: { status: 'SKIPPED', reason: 'protected_translation', finishedAt: new Date() },
    });
    return { ok: true, skipped: true, reason: 'protected_translation' };
  }

  await markJobRunning(job.id);

  const sourceTitle = getSourceTitle(job.anime);
  const sourceDescription = getSourceDescription(job.anime);
  if (!sourceDescription) {
    await upsertTranslation({
      animeId: job.anime.id,
      lang: job.lang,
      title: existing?.title || null,
      description: null,
      source: 'GPT',
      status: 'FAILED',
      failureReason: 'invalid_request',
    });
    await markJobFailed(job.id, 'invalid_request');
    return { ok: false, reason: 'invalid_request' };
  }

  const translated = await translateAnimeText({
    provider: job.anime.provider,
    externalId: job.anime.externalId,
    title: sourceTitle,
    description: sourceDescription,
    targetLang: job.lang,
  });

  if (!translated?.ok) {
    const reason = translated?.reason || 'translation_failed';
    await upsertTranslation({
      animeId: job.anime.id,
      lang: job.lang,
      title: existing?.title || null,
      description: null,
      source: 'GPT',
      status: 'FAILED',
      failureReason: reason,
    });
    await markJobFailed(job.id, reason);
    return { ok: false, reason };
  }

  await upsertTranslation({
    animeId: job.anime.id,
    lang: job.lang,
    title: translated.title,
    description: translated.description,
    source: 'GPT',
    status: 'AUTO',
    failureReason: null,
  });
  await markJobDone(job.id, translated.model || null);
  return { ok: true, model: translated.model || null };
}

async function runTranslationJobs({ limit = 20, langs = ['ko', 'ja'], overwrite = false } = {}) {
  const safeLangs = normalizeLangs(langs);
  const safeLimit = Math.max(1, Math.min(Number(limit) || 20, 200));
  const jobs = await prisma.translationJob.findMany({
    where: {
      status: { in: ['PENDING', 'FAILED'] },
      attempts: { lt: 3 },
      lang: { in: safeLangs },
    },
    orderBy: [{ createdAt: 'asc' }],
    take: safeLimit,
  });

  const results = [];
  for (const job of jobs) {
    // eslint-disable-next-line no-await-in-loop
    const result = await runOneTranslationJob(job.id, { overwrite });
    results.push({ jobId: job.id, lang: job.lang, ...result });
  }
  return results;
}

async function getTranslationCoverage() {
  const [totalAnime, translations, jobs] = await Promise.all([
    prisma.anime.count({ where: { dataStatus: 'ACTIVE' } }),
    prisma.animeTranslation.groupBy({
      by: ['lang', 'status', 'source'],
      _count: { _all: true },
    }),
    prisma.translationJob.groupBy({
      by: ['lang', 'status'],
      _count: { _all: true },
    }),
  ]);

  return {
    totalAnime,
    translations: translations.map((row) => ({
      lang: row.lang,
      status: row.status,
      source: row.source,
      count: row._count._all,
    })),
    jobs: jobs.map((row) => ({
      lang: row.lang,
      status: row.status,
      count: row._count._all,
    })),
  };
}

module.exports = {
  createMissingTranslationJobs,
  runTranslationJobs,
  runOneTranslationJob,
  markJobRunning,
  markJobDone,
  markJobFailed,
  getTranslationCoverage,
};

```

### File: `backend/src/swagger/swagger.js`

- size: `1,105` bytes

```javascript
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AniPick API',
      version: '1.0.0',
      description: 'AniPick backend API documentation',
    },
    servers: [
      {
        url: 'http://localhost:4001',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                email: { type: 'string' },
                nickname: { type: 'string' },
                role: { type: 'string', enum: ['USER', 'ADMIN'] },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

```

### File: `backend/src/utils/animeContentSafety.js`

- size: `1,878` bytes

```javascript
const BLOCKED_GENRES = ['Hentai', 'Erotica', 'Ecchi'];
const BLOCKED_RATINGS = ['Rx - Hentai', 'R+ - Mild Nudity'];
const BLOCKED_KEYWORDS = [
  'hentai',
  'erotica',
  'ecchi',
  'sex friend',
  'sexfriend',
  'virgin',
  'doutei',
  'doujin',
  'oppai',
];

function normalizeText(value) {
  return String(value || '').toLowerCase().trim();
}

function parseGenres(genres) {
  if (!genres) return [];
  if (Array.isArray(genres)) return genres;

  if (typeof genres === 'string') {
    try {
      const parsed = JSON.parse(genres);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return genres
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function isAdultAnime(anime) {
  const normalizedBlockedGenres = BLOCKED_GENRES.map((item) => item.toLowerCase());
  const genres = parseGenres(anime?.genres).map((genre) => normalizeText(genre));
  const rating = normalizeText(anime?.rating || anime?.sourcePayload?.rating || anime?.sourcePayload?.rated);

  const titleText = [
    anime?.displayTitle,
    anime?.title,
    anime?.romajiTitle,
    anime?.englishTitle,
    anime?.nativeTitle,
    anime?.description,
    anime?.sourcePayload?.title,
    anime?.sourcePayload?.title_english,
    anime?.sourcePayload?.title_japanese,
    anime?.sourcePayload?.synopsis,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const hasBlockedGenre = genres.some((genre) => normalizedBlockedGenres.includes(genre));
  const hasBlockedRating = BLOCKED_RATINGS.some((blocked) => rating.includes(blocked.toLowerCase()));
  const hasBlockedKeyword = BLOCKED_KEYWORDS.some((keyword) => titleText.includes(keyword));

  return hasBlockedGenre || hasBlockedRating || hasBlockedKeyword;
}

module.exports = {
  isAdultAnime,
  BLOCKED_GENRES,
  BLOCKED_RATINGS,
  BLOCKED_KEYWORDS,
  parseGenres,
};

```

### File: `backend/src/utils/animeI18n.js`

- size: `9,246` bytes

```javascript
﻿const { animeTranslations } = require('../data/animeTranslations');

const SUPPORTED_LANGS = ['ko', 'en', 'ja'];

const genreMap = {
  ko: {
    Action: '액션', Adventure: '모험', Comedy: '코미디', Drama: '드라마', Fantasy: '판타지', Romance: '로맨스',
    'Sci-Fi': 'SF', 'Slice of Life': '일상', Sports: '스포츠', Supernatural: '초자연', Suspense: '서스펜스',
    Mystery: '미스터리', Horror: '공포', Music: '음악', Psychological: '심리', Mecha: '메카', School: '학원',
  },
  en: {
    Action: 'Action', Adventure: 'Adventure', Comedy: 'Comedy', Drama: 'Drama', Fantasy: 'Fantasy', Romance: 'Romance',
    'Sci-Fi': 'Sci-Fi', 'Slice of Life': 'Slice of Life', Sports: 'Sports', Supernatural: 'Supernatural', Suspense: 'Suspense',
    Mystery: 'Mystery', Horror: 'Horror', Music: 'Music', Psychological: 'Psychological', Mecha: 'Mecha', School: 'School',
  },
  ja: {
    Action: 'アクション', Adventure: '冒険', Comedy: 'コメディ', Drama: 'ドラマ', Fantasy: 'ファンタジー', Romance: '恋愛',
    'Sci-Fi': 'SF', 'Slice of Life': '日常', Sports: 'スポーツ', Supernatural: '超自然', Suspense: 'サスペンス',
    Mystery: 'ミステリー', Horror: 'ホラー', Music: '音楽', Psychological: '心理', Mecha: 'メカ', School: '学園',
  },
};

const statusMap = {
  ko: {
    FINISHED: '완결', RELEASING: '방영 중', NOT_YET_RELEASED: '방영 예정', CANCELLED: '취소됨', HIATUS: '중단',
    airing: '방영 중', complete: '완결', upcoming: '방영 예정',
  },
  en: {
    FINISHED: 'Finished', RELEASING: 'Airing', NOT_YET_RELEASED: 'Not yet released', CANCELLED: 'Cancelled', HIATUS: 'Hiatus',
    airing: 'Airing', complete: 'Finished', upcoming: 'Not yet released',
  },
  ja: {
    FINISHED: '完結', RELEASING: '放送中', NOT_YET_RELEASED: '放送予定', CANCELLED: 'キャンセル', HIATUS: '休止',
    airing: '放送中', complete: '完結', upcoming: '放送予定',
  },
};

const seasonMap = {
  ko: { WINTER: '겨울', SPRING: '봄', SUMMER: '여름', FALL: '가을' },
  en: { WINTER: 'Winter', SPRING: 'Spring', SUMMER: 'Summer', FALL: 'Fall' },
  ja: { WINTER: '冬', SPRING: '春', SUMMER: '夏', FALL: '秋' },
};

const formatMap = {
  ko: { TV: 'TV 애니메이션', TV_SHORT: '단편 TV', MOVIE: '극장판', SPECIAL: '스페셜', OVA: 'OVA', ONA: 'ONA', MUSIC: '뮤직' },
  en: { TV: 'TV', TV_SHORT: 'TV Short', MOVIE: 'Movie', SPECIAL: 'Special', OVA: 'OVA', ONA: 'ONA', MUSIC: 'Music' },
  ja: { TV: 'テレビアニメ', TV_SHORT: '短編テレビ', MOVIE: '劇場版', SPECIAL: 'スペシャル', OVA: 'OVA', ONA: 'ONA', MUSIC: '音楽' },
};

function stripHtmlTags(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\[Written by MAL Rewrite\]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeLang(lang) {
  const value = String(lang || 'ko').toLowerCase();
  return SUPPORTED_LANGS.includes(value) ? value : 'ko';
}

function hasHangul(text) {
  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(String(text || ''));
}

function isMeaningfulTitle(text) {
  const value = String(text || '').trim();
  if (!value) return false;
  const blocked = ['한국어 제목 준비 중', '제목 준비 중', 'Untitled', 'タイトルなし', '-'];
  return !blocked.includes(value);
}

function getIdCandidates(anime) {
  return [anime?.externalId, anime?.malId, anime?.id, anime?.providerId]
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && value > 0);
}

function getTranslationSeedByAnime(anime) {
  const ids = getIdCandidates(anime);
  for (const id of ids) {
    const row = animeTranslations[id];
    if (row) return { id, row };
  }
  return null;
}

function getBestOriginalTitle(anime) {
  return (
    anime?.title?.native ||
    anime?.title?.english ||
    anime?.title?.romaji ||
    anime?.nativeTitle ||
    anime?.englishTitle ||
    anime?.romajiTitle ||
    '제목 없음'
  );
}

function getTranslationByLang(translation, lang) {
  if (!translation) return null;
  if (translation.lang && translation.lang === lang) return translation;
  return null;
}

function getDisplayTitle(anime, lang, translation = null) {
  const normalizedLang = normalizeLang(lang);
  const row = getTranslationByLang(translation, normalizedLang);
  const seed = getTranslationSeedByAnime(anime)?.row;
  const ids = getIdCandidates(anime);

  if (normalizedLang === 'ko') {
    const translatedTitle = row?.title && String(row.title).trim();
    const seedKoTitle = seed?.koTitle || ids.map((id) => animeTranslations[id]?.koTitle).find(Boolean) || null;

    return (
      (isMeaningfulTitle(translatedTitle) ? translatedTitle : null) ||
      (isMeaningfulTitle(seedKoTitle) ? seedKoTitle : null) ||
      (hasHangul(anime?.title?.native) ? anime.title.native : null) ||
      (hasHangul(anime?.nativeTitle) ? anime.nativeTitle : null) ||
      anime?.title?.english ||
      anime?.title?.romaji ||
      anime?.englishTitle ||
      anime?.romajiTitle ||
      '제목 없음'
    );
  }

  if (normalizedLang === 'en') {
    return (
      (row?.title && String(row.title).trim()) ||
      anime?.title?.english ||
      anime?.title?.romaji ||
      anime?.title?.native ||
      anime?.englishTitle ||
      anime?.romajiTitle ||
      anime?.nativeTitle ||
      'Untitled'
    );
  }

  return (
    (row?.title && String(row.title).trim()) ||
    seed?.jaTitle ||
    anime?.title?.native ||
    anime?.nativeTitle ||
    anime?.title?.romaji ||
    anime?.title?.english ||
    anime?.romajiTitle ||
    anime?.englishTitle ||
    'タイトルなし'
  );
}

function getDisplayDescription(anime, lang, translation = null) {
  const normalizedLang = normalizeLang(lang);
  const row = getTranslationByLang(translation, normalizedLang);
  const seed = getTranslationSeedByAnime(anime)?.row;

  if (normalizedLang === 'ko') {
    if (row?.description) return stripHtmlTags(row.description);
    if (seed?.koDescription) return stripHtmlTags(seed.koDescription);
    return '한국어 번역이 준비 중입니다.';
  }

  if (normalizedLang === 'en') {
    if (row?.description) return stripHtmlTags(row.description);
    const seedDescription = stripHtmlTags(seed?.enDescription || '');
    if (seedDescription) return seedDescription;
    const raw = stripHtmlTags(anime?.description || anime?.background || '');
    return raw || 'No description available.';
  }

  if (row?.description) return stripHtmlTags(row.description);
  if (seed?.jaDescription) return stripHtmlTags(seed.jaDescription);
  return '日本語訳は準備中です。';
}

function translateGenres(genres = [], lang = 'ko') {
  const map = genreMap[normalizeLang(lang)] || genreMap.ko;
  return Array.isArray(genres) ? genres.map((genre) => map[genre] || genre) : [];
}

function translateStatus(status, lang = 'ko') {
  const map = statusMap[normalizeLang(lang)] || statusMap.ko;
  return map[status] || status || '';
}

function translateSeason(season, lang = 'ko') {
  const map = seasonMap[normalizeLang(lang)] || seasonMap.ko;
  return map[season] || season || '';
}

function translateFormat(format, lang = 'ko') {
  const map = formatMap[normalizeLang(lang)] || formatMap.ko;
  return map[format] || format || '';
}

function getLocalizedAnime(anime, lang = 'ko', translation = null) {
  if (!anime) return anime;

  const selected = normalizeLang(lang);

  const i18n = {
    ko: {
      title: getDisplayTitle(anime, 'ko', translation),
      description: getDisplayDescription(anime, 'ko', translation),
      genres: translateGenres(anime.genres || [], 'ko'),
      status: translateStatus(anime.status, 'ko'),
      season: translateSeason(anime.season, 'ko'),
      format: translateFormat(anime.format, 'ko'),
    },
    en: {
      title: getDisplayTitle(anime, 'en', translation),
      description: getDisplayDescription(anime, 'en', translation),
      genres: translateGenres(anime.genres || [], 'en'),
      status: translateStatus(anime.status, 'en'),
      season: translateSeason(anime.season, 'en'),
      format: translateFormat(anime.format, 'en'),
    },
    ja: {
      title: getDisplayTitle(anime, 'ja', translation),
      description: getDisplayDescription(anime, 'ja', translation),
      genres: translateGenres(anime.genres || [], 'ja'),
      status: translateStatus(anime.status, 'ja'),
      season: translateSeason(anime.season, 'ja'),
      format: translateFormat(anime.format, 'ja'),
    },
  };

  const view = i18n[selected];

  return {
    ...anime,
    lang: selected,
    displayTitle: view.title,
    displayDescription: view.description,
    displayGenres: view.genres,
    displayStatus: view.status,
    displaySeason: view.season,
    displayFormat: view.format,
    i18n,
    isTranslated: Boolean(translation?.description),
  };
}

module.exports = {
  normalizeLang,
  stripHtmlTags,
  hasHangul,
  isMeaningfulTitle,
  getIdCandidates,
  getBestOriginalTitle,
  getTranslationSeedByAnime,
  getLocalizedAnime,
  getDisplayTitle,
  getDisplayDescription,
  translateGenres,
  translateStatus,
  translateSeason,
  translateFormat,
};

```

### File: `backend/src/utils/koreanAnime.js`

- size: `4,320` bytes

```javascript
const genreKoMap = {
  Action: '액션',
  Adventure: '모험',
  Comedy: '코미디',
  Drama: '드라마',
  Fantasy: '판타지',
  Romance: '로맨스',
  'Sci-Fi': 'SF',
  'Slice of Life': '일상',
  Sports: '스포츠',
  Supernatural: '초자연',
  Thriller: '스릴러',
  Mystery: '미스터리',
  Horror: '공포',
  Music: '음악',
  Psychological: '심리',
  Mecha: '메카',
  School: '학원',
};

const seasonKoMap = {
  WINTER: '겨울',
  SPRING: '봄',
  SUMMER: '여름',
  FALL: '가을',
};

const statusKoMap = {
  FINISHED: '완결',
  RELEASING: '방영 중',
  NOT_YET_RELEASED: '방영 예정',
  CANCELLED: '취소됨',
  HIATUS: '중단',
  airing: '방영 중',
  complete: '완결',
  upcoming: '방영 예정',
};

const formatKoMap = {
  TV: 'TV 애니메이션',
  TV_SHORT: '단편 TV',
  MOVIE: '극장판',
  SPECIAL: '스페셜',
  OVA: 'OVA',
  ONA: 'ONA',
  MUSIC: '뮤직',
};

const titleKoMap = {
  1: '카우보이 비밥',
  5: '카우보이 비밥: 천국의 문',
  20: '나루토',
  21: '원피스',
  30: '신세기 에반게리온',
  1735: '나루토 질풍전',
  1535: '데스노트',
  1575: '코드 기아스: 반역의 를르슈',
  16498: '진격의 거인',
  18679: '킬라킬',
  19815: '노 게임 노 라이프',
  20507: '노라가미',
  20583: '하이큐',
  20605: '도쿄 구울 √A',
  21459: '나의 히어로 아카데미아 2기',
  21827: '바이올렛 에버가든',
  22319: '도쿄 구울',
  2251: '기생수',
  235: '명탐정 코난',
  269: '블리치',
  223: '드래곤볼',
  30276: '원펀맨',
  31964: '나의 히어로 아카데미아',
  33051: '쿠로코의 농구',
  33486: '나의 히어로 아카데미아',
  34240: '메이드 인 어비스',
  37991: '약속의 네버랜드 2기',
  40748: '주술회전 2기',
  5114: '강철의 연금술사 BROTHERHOOD',
  6547: 'Angel Beats!',
  9253: '슈타인즈 게이트',
  97938: '보루토',
  97940: '블랙 클로버',
  9919: '청의 엑소시스트',
  10087: '페이트/제로',
  101759: '약속의 네버랜드',
  101922: '귀멸의 칼날',
  10620: '미래일기',
  11061: '헌터×헌터',
  113415: '주술회전',
  116242: '체인소 맨',
  11757: '소드 아트 온라인',
  127230: '체인소 맨',
  129874: '스파이 패밀리',
  137822: '블루 록',
  140960: '최애의 아이',
  150672: '최애의 아이',
  154587: '장송의 프리렌',
  13601: '사이코패스',
  15125: '신세계에서',
  16417: '블리치',
  22370: '원펀맨 OVA',
  28223: '데스 퍼레이드',
  30015: '리제로',
};

function stripHtmlTags(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getBestOriginalTitle(anime) {
  return anime?.title?.english || anime?.title?.romaji || anime?.title?.native || '제목 없음';
}

function getKoreanTitle(anime) {
  if (!anime) return '제목 없음';
  if (titleKoMap[anime.id]) return titleKoMap[anime.id];
  if (anime?.title?.native) return anime.title.native;
  if (anime?.title?.english) return anime.title.english;
  if (anime?.title?.romaji) return anime.title.romaji;
  return '제목 없음';
}

function translateGenres(genres = []) {
  if (!Array.isArray(genres)) return [];
  return genres.map((genre) => genreKoMap[genre] || genre);
}

function localizeAnime(anime) {
  if (!anime) return anime;

  const koreanTitle = getKoreanTitle(anime);
  const originalTitle = getBestOriginalTitle(anime);
  const displayDescription = stripHtmlTags(anime.description || '');
  const koreanGenres = translateGenres(anime.genres || []);

  return {
    ...anime,
    koreanTitle,
    displayTitle: koreanTitle || originalTitle || '제목 없음',
    koreanDescription: '',
    displayDescription,
    koreanGenres,
    displayGenres: koreanGenres,
    koreanStatus: statusKoMap[anime.status] || anime.status || '',
    koreanSeason: seasonKoMap[anime.season] || anime.season || '',
    koreanFormat: formatKoMap[anime.format] || anime.format || '',
    isKoreanTranslated: false,
  };
}

module.exports = {
  genreKoMap,
  seasonKoMap,
  statusKoMap,
  formatKoMap,
  titleKoMap,
  stripHtmlTags,
  getBestOriginalTitle,
  getKoreanTitle,
  translateGenres,
  localizeAnime,
};

```

### File: `backend/src/utils/season.js`

- size: `414` bytes

```javascript
function getCurrentSeasonAndYear(date = new Date()) {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month >= 1 && month <= 3) return { season: 'WINTER', year };
  if (month >= 4 && month <= 6) return { season: 'SPRING', year };
  if (month >= 7 && month <= 9) return { season: 'SUMMER', year };

  return { season: 'FALL', year };
}

module.exports = { getCurrentSeasonAndYear };

```

### File: `frontend/.env.example`

- size: `142` bytes

```dotenv
# VITE_API_BASE_URL=http://localhost:4001/api
# 기본 개발 환경에서는 Vite proxy를 사용하므로 설정하지 않아도 됩니다.

```

### File: `frontend/build_err.txt`

- size: `0` bytes

```text

```

### File: `frontend/build_out.txt`

- size: `161` bytes

```text

> anipick-frontend@1.0.0 build
> vite build

[36mvite v5.4.21 [32mbuilding for production...[36m[39m
transforming...
[32m✓[39m 124 modules transformed.

```

### File: `frontend/src/App.jsx`

- size: `1,396` bytes

```jsx
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Browse from './pages/Browse';
import AnimeDetail from './pages/AnimeDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPage from './pages/MyPage';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

```

### File: `frontend/src/components/AdminRoute.jsx`

- size: `560` bytes

```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminRoute({ children }) {
  const { authLoading, isAuthenticated, isAdmin } = useAuth();

  if (authLoading) return <p className="page-message">Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!isAdmin) {
    return (
      <div className="empty-state">
        <h1>Access denied</h1>
        <p>ADMIN role is required to use this page.</p>
      </div>
    );
  }

  return children;
}

export default AdminRoute;

```

### File: `frontend/src/components/AnimeCard.jsx`

- size: `3,032` bytes

```jsx
﻿import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getAnimePoster, PLACEHOLDER_POSTER } from '../utils/image';
import { getSafeAnimeTitle } from '../utils/title';
import { formatAnimeScoreLabel } from '../utils/score';
import { getAnimeRouteId } from '../utils/animeRoute';
import GlassBadge from './GlassBadge';

function AnimeCard({ anime, hideIfNoImage = false }) {
  const { t, lang } = useLanguage();

  const title = getSafeAnimeTitle(anime, lang, t('noTitle'));
  const genres = anime?.displayGenres || anime?.genres || [];
  const season = anime?.displaySeason || anime?.season || '-';
  const format = anime?.displayFormat || anime?.format || '-';
  const status = anime?.displayStatus || anime?.status || '-';
  const scoreLabel = formatAnimeScoreLabel(anime);
  const translationStatus = anime?.translationStatus || anime?.translation?.status || '';

  const sourcePoster = getAnimePoster(anime);
  if (hideIfNoImage && !sourcePoster) return null;
  const poster = sourcePoster || PLACEHOLDER_POSTER;
  const routeId = getAnimeRouteId(anime);

  const handleImageError = (event) => {
    if (event.currentTarget.src !== PLACEHOLDER_POSTER) {
      event.currentTarget.src = PLACEHOLDER_POSTER;
    }
  };

  const content = (
    <article className="anime-card">
      <div className="anime-card-image-wrap">
        <img
          className="anime-card-image"
          src={poster}
          alt={title}
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      <div className="anime-card-body">
        <h3 className="anime-card-title">{title}</h3>
        {translationStatus && !['REVIEWED', 'AUTO'].includes(translationStatus) && (
          <GlassBadge tone={translationStatus === 'FAILED' ? 'danger' : 'muted'}>{translationStatus}</GlassBadge>
        )}
        {anime?.displayDescription && <p className="anime-card-description">{anime.displayDescription}</p>}
        <div className="anime-card-badges">
          {genres.slice(0, 2).map((genre) => (
            <GlassBadge key={genre}>{genre}</GlassBadge>
          ))}
          <GlassBadge tone="accent">{scoreLabel}</GlassBadge>
          {!sourcePoster && <GlassBadge tone="muted">이미지 준비 중</GlassBadge>}
        </div>
        <p className="anime-meta">
          {anime?.seasonYear || '-'} / {season}
        </p>
        <p className="anime-meta">
          {format} / {status}
        </p>
      </div>
    </article>
  );

  if (!routeId) {
    return (
      <div
        className="anime-card-link is-disabled"
        aria-disabled="true"
        title="상세 정보를 열 수 없습니다."
        onClick={() => console.warn('[AniPick] missing routeId', anime)}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      to={`/anime/${routeId}`}
      className="anime-card-link"
      aria-label={`${title} ${t('detail')}`}
      draggable={false}
    >
      {content}
    </Link>
  );
}

export default AnimeCard;

```

### File: `frontend/src/components/AnimeSection.jsx`

- size: `1,043` bytes

```jsx
﻿import AnimeCard from './AnimeCard';
import { useLanguage } from '../context/LanguageContext';

function AnimeSection({
  title,
  items = [],
  loading = false,
  error = '',
  isFallback = false,
  fallbackMessage = '',
  hideIfNoImage = false,
}) {
  const { t } = useLanguage();

  return (
    <section className="anime-section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>

      {isFallback && (
        <p className="page-message">{fallbackMessage || t('externalFallback')}</p>
      )}

      {loading && <p className="page-message">{t('loading')}</p>}
      {error && <p className="page-error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">{t('noData')}</p>}

      {!loading && !error && items.length > 0 && (
        <div className="anime-grid">
          {items.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} hideIfNoImage={hideIfNoImage} />
          ))}
        </div>
      )}
    </section>
  );
}

export default AnimeSection;

```

### File: `frontend/src/components/GlassBadge.jsx`

- size: `253` bytes

```jsx
function GlassBadge({ children, tone = 'neutral', className = '' }) {
  if (!children) return null;

  return (
    <span className={`glass-badge glass-badge-${tone} ${className}`.trim()}>
      {children}
    </span>
  );
}

export default GlassBadge;

```

### File: `frontend/src/components/HeroMedia.jsx`

- size: `2,217` bytes

```jsx
import { useEffect, useMemo, useState } from 'react';
import { PLACEHOLDER_BANNER } from '../utils/image';

function HeroMedia({
  imageUrl,
  fallbackImageUrl,
  foregroundImageUrl,
  alt,
  variant = 'detail',
  children,
}) {
  const initialSource = useMemo(
    () => imageUrl || fallbackImageUrl || PLACEHOLDER_BANNER,
    [imageUrl, fallbackImageUrl]
  );
  const [source, setSource] = useState(initialSource);
  const foregroundSource = useMemo(
    () => foregroundImageUrl || fallbackImageUrl || source,
    [foregroundImageUrl, fallbackImageUrl, source]
  );

  useEffect(() => {
    setSource(initialSource);
  }, [initialSource]);

  const handleError = () => {
    if (source !== fallbackImageUrl && fallbackImageUrl) {
      setSource(fallbackImageUrl);
      return;
    }

    if (source !== PLACEHOLDER_BANNER) {
      setSource(PLACEHOLDER_BANNER);
    }
  };

  const isHome = variant === 'home';

  return (
    <section className={`hero-media hero-media-${variant}`}>
      <div
        className="hero-media-bg"
        style={{ backgroundImage: `url("${source}")` }}
        aria-hidden="true"
      />
      <div className="hero-media-overlay" aria-hidden="true" />

      {isHome ? (
        <div className="hero-media-layout">
          {children && (
            <div className="hero-media-content">
              <div className="hero-media-copy-panel">{children}</div>
            </div>
          )}
          <div className="hero-media-frame">
            <div className="hero-media-poster-wrap">
              <img
                className="hero-media-image"
                src={foregroundSource}
                alt={alt}
                loading="eager"
                onError={handleError}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="hero-media-frame">
            <img
              className="hero-media-image"
              src={source}
              alt={alt}
              loading="lazy"
              onError={handleError}
            />
          </div>
          {children && <div className="hero-media-content">{children}</div>}
        </>
      )}
    </section>
  );
}

export default HeroMedia;

```

### File: `frontend/src/components/home/AnimePosterCard.jsx`

- size: `2,209` bytes

```jsx
import { Link } from 'react-router-dom';

import { getAnimePoster, PLACEHOLDER_POSTER } from '../../utils/image';
import { getAnimeRouteId } from '../../utils/animeRoute';
import { formatAnimeScoreLabel } from '../../utils/score';
import { getSafeAnimeTitle } from '../../utils/title';

function formatGenres(genres) {
  if (!Array.isArray(genres) || genres.length === 0) {
    return '장르 정보 없음';
  }

  return genres.filter(Boolean).slice(0, 2).join(', ');
}

function formatMeta(anime) {
  return [anime?.seasonYear, anime?.season, anime?.format]
    .filter((item) => item !== null && item !== undefined && String(item).trim() !== '')
    .join(' / ');
}

export default function AnimePosterCard({ anime }) {
  const routeId = getAnimeRouteId(anime);
  const title = getSafeAnimeTitle(anime, 'ko', '제목 없음');
  const poster = getAnimePoster(anime) || PLACEHOLDER_POSTER;
  const genres = formatGenres(anime?.genres);
  const meta = formatMeta(anime);

  const content = (
    <>
      <div className="anime-poster-card-imageWrap">
        <img
          className="anime-poster-card-image"
          src={poster}
          alt={title}
          draggable={false}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = PLACEHOLDER_POSTER;
          }}
        />
      </div>

      <div className="anime-poster-card-info">
        <h3 className="anime-poster-card-title">{title}</h3>
        <p className="anime-poster-card-score">{formatAnimeScoreLabel(anime)}</p>
        <p className="anime-poster-card-genres">{genres}</p>
        {meta ? <p className="anime-poster-card-meta">{meta}</p> : null}
      </div>
    </>
  );

  if (!routeId) {
    return (
      <div
        className="anime-poster-card is-disabled"
        aria-disabled="true"
        title="상세 정보를 열 수 없습니다."
        onClick={() => {
          console.warn('[AniPick] routeId missing', anime);
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      className="anime-poster-card"
      to={`/anime/${routeId}`}
      aria-label={`${title} 상세 보기`}
      draggable={false}
    >
      {content}
    </Link>
  );
}

```

### File: `frontend/src/components/home/HorizontalAnimeRail.jsx`

- size: `1,820` bytes

```jsx
import { useRailScroll } from '../../hooks/useRailScroll';
import AnimePosterCard from './AnimePosterCard';

export default function HorizontalAnimeRail({
  title,
  items = [],
  className = '',
  renderItem,
}) {
  const safeItems = Array.isArray(items) ? items : [];

  const {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollPrev,
    scrollNext,
    dragHandlers,
    onClickCapture,
  } = useRailScroll(safeItems.length);

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <section className={`anime-rail-section ${className}`.trim()}>
      <div className="anime-rail-header">
        <h2>{title}</h2>
      </div>

      <div className="anime-rail-shell">
        {canScrollLeft ? (
          <button
            type="button"
            className="rail-nav rail-nav-left"
            aria-label="이전"
            onClick={scrollPrev}
          >
            &lt;
          </button>
        ) : null}

        <div
          className="anime-rail-viewport"
          ref={scrollRef}
          onClickCapture={onClickCapture}
          {...dragHandlers}
        >
          <div className="anime-rail-track">
            {safeItems.map((anime, index) =>
              renderItem ? (
                renderItem(anime, index)
              ) : (
                <AnimePosterCard
                  key={anime.routeId || anime.externalId || anime.malId || anime.id || index}
                  anime={anime}
                />
              )
            )}
          </div>
        </div>

        {canScrollRight ? (
          <button
            type="button"
            className="rail-nav rail-nav-right"
            aria-label="다음"
            onClick={scrollNext}
          >
            &gt;
          </button>
        ) : null}
      </div>
    </section>
  );
}

```

### File: `frontend/src/components/home/TopTenAnimeCard.jsx`

- size: `1,641` bytes

```jsx
import { Link } from 'react-router-dom';

import { getAnimePoster, PLACEHOLDER_POSTER } from '../../utils/image';
import { getAnimeRouteId } from '../../utils/animeRoute';
import { formatAnimeScoreLabel } from '../../utils/score';
import { getSafeAnimeTitle } from '../../utils/title';

export default function TopTenAnimeCard({ anime, rank }) {
  const routeId = getAnimeRouteId(anime);
  const title = getSafeAnimeTitle(anime, 'ko', '제목 없음');
  const poster = getAnimePoster(anime) || PLACEHOLDER_POSTER;

  const content = (
    <>
      <span className="top10-rank" aria-hidden="true">
        {rank}
      </span>

      <div className="top10-posterWrap">
        <img
          className="top10-poster"
          src={poster}
          alt={title}
          draggable={false}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = PLACEHOLDER_POSTER;
          }}
        />
      </div>

      <div className="top10-info">
        <h3 className="top10-title">{title}</h3>
        <p className="top10-score">{formatAnimeScoreLabel(anime)}</p>
      </div>
    </>
  );

  if (!routeId) {
    return (
      <div
        className="top10-card is-disabled"
        aria-disabled="true"
        title="상세 정보를 열 수 없습니다."
        onClick={() => {
          console.warn('[AniPick] routeId missing', anime);
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      className="top10-card"
      to={`/anime/${routeId}`}
      aria-label={`${rank}위 ${title} 상세 보기`}
      draggable={false}
    >
      {content}
    </Link>
  );
}

```

### File: `frontend/src/components/home/TopTenAnimeRail.jsx`

- size: `1,797` bytes

```jsx
import { useRailScroll } from '../../hooks/useRailScroll';
import TopTenAnimeCard from './TopTenAnimeCard';

export default function TopTenAnimeRail({ title = '지금 뜨는 애니 TOP 10', items = [] }) {
  const safeItems = Array.isArray(items) ? items.slice(0, 10) : [];

  const {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollPrev,
    scrollNext,
    dragHandlers,
    onClickCapture,
  } = useRailScroll(safeItems.length);

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <section className="anime-rail-section top10-rail-section">
      <div className="anime-rail-header">
        <h2>{title}</h2>
      </div>

      <div className="anime-rail-shell top10-rail-shell">
        {canScrollLeft ? (
          <button
            type="button"
            className="rail-nav rail-nav-left"
            aria-label="이전"
            onClick={scrollPrev}
          >
            &lt;
          </button>
        ) : null}

        <div
          className="anime-rail-viewport top10-rail-viewport"
          ref={scrollRef}
          onClickCapture={onClickCapture}
          {...dragHandlers}
        >
          <div className="anime-rail-track top10-rail-track">
            {safeItems.map((anime, index) => (
              <TopTenAnimeCard
                key={anime.routeId || anime.externalId || anime.malId || anime.id || index}
                anime={anime}
                rank={index + 1}
              />
            ))}
          </div>
        </div>

        {canScrollRight ? (
          <button
            type="button"
            className="rail-nav rail-nav-right"
            aria-label="다음"
            onClick={scrollNext}
          >
            &gt;
          </button>
        ) : null}
      </div>
    </section>
  );
}

```

### File: `frontend/src/components/Navbar.jsx`

- size: `2,910` bytes

```jsx
﻿import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ThemeToggle from './ThemeToggle';

const langOptions = [
  { value: 'ko', label: '한국어', short: 'KO' },
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'ja', label: '日本語', short: 'JA' },
];

function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const selected = langOptions.find((item) => item.value === lang) || langOptions[0];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="logo">
          AniPick
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/">{t('home')}</NavLink>
          <NavLink to="/browse">{t('browse')}</NavLink>
          {user && <NavLink to="/mypage">{t('myPage')}</NavLink>}
          {isAdmin && <NavLink to="/admin">{t('admin')}</NavLink>}
        </nav>

        <div className="auth-actions">
          <ThemeToggle />
          <div className="lang-menu-wrap">
            <button
              type="button"
              className="button-outline lang-trigger"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Language"
            >
              <span aria-hidden="true">🌐</span>
              <span>{selected.short}</span>
            </button>
            {open && (
              <div className="lang-dropdown" role="menu">
                {langOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={`lang-option ${lang === option.value ? 'active' : ''}`}
                    onClick={() => {
                      setLang(option.value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <>
              <span className="nickname">{user.nickname}</span>
              <button type="button" className="button-outline" onClick={handleLogout}>
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="button-outline">
                {t('login')}
              </NavLink>
              <NavLink to="/register" className="button-primary nav-register">
                {t('register')}
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

```

### File: `frontend/src/components/ProtectedRoute.jsx`

- size: `474` bytes

```jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { authLoading, isAuthenticated } = useAuth();

  if (authLoading) return <p className="page-message">Loading...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;

```

### File: `frontend/src/components/ReviewForm.jsx`

- size: `1,434` bytes

```jsx
﻿import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function ReviewForm({ animeId, onSubmit }) {
  const { t } = useLanguage();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit({ animeId, rating: Number(rating), content: content.trim() });
      setContent('');
      setRating(5);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>{t('writeReview')}</h3>
      <label>
        {t('rating')}
        <select value={rating} onChange={(event) => setRating(event.target.value)}>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        {t('content')}
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={t('content')}
          rows={4}
        />
      </label>
      <button className="button-primary" type="submit" disabled={submitting}>
        {submitting ? t('loading') : t('submit')}
      </button>
    </form>
  );
}

export default ReviewForm;

```

### File: `frontend/src/components/ReviewList.jsx`

- size: `1,228` bytes

```jsx
﻿import { useLanguage } from '../context/LanguageContext';

function ReviewList({ reviews, currentUser, onEdit, onDelete }) {
  const { t } = useLanguage();

  if (!reviews.length) {
    return <p className="muted">{t('noReviews')}</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((review) => {
        const canManage = currentUser && (currentUser.id === review.userId || currentUser.role === 'ADMIN');
        const createdAt = review.createdAt ? new Date(review.createdAt).toLocaleDateString() : '-';

        return (
          <article key={review.id} className="review-item">
            <div className="review-head">
              <strong>{review.user?.nickname || '-'}</strong>
              <span>{t('rating')} {review.rating}/5 / {createdAt}</span>
            </div>
            <p>{review.content}</p>
            {canManage && (
              <div className="review-actions">
                <button type="button" onClick={() => onEdit(review)}>{t('edit')}</button>
                <button type="button" onClick={() => onDelete(review.id)}>{t('delete')}</button>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

export default ReviewList;

```

### File: `frontend/src/components/SearchFilters.jsx`

- size: `5,849` bytes

```jsx
﻿import { useLanguage } from '../context/LanguageContext';

const emptyFilters = {
  keyword: '',
  genre: '',
  year: '',
  season: '',
  format: '',
  status: '',
  sort: 'POPULARITY_DESC',
};

const labelMap = {
  ko: {
    all: '전체',
    genre: {
      Action: '액션', Adventure: '모험', Comedy: '코미디', Drama: '드라마', Fantasy: '판타지', Romance: '로맨스',
      'Sci-Fi': 'SF', 'Slice of Life': '일상', Sports: '스포츠', Supernatural: '초자연',
    },
    season: { WINTER: '겨울', SPRING: '봄', SUMMER: '여름', FALL: '가을' },
    format: { TV: 'TV 애니메이션', TV_SHORT: '단편 TV', MOVIE: '극장판', SPECIAL: '스페셜', OVA: 'OVA', ONA: 'ONA', MUSIC: '뮤직' },
    status: { RELEASING: '방영 중', FINISHED: '완결', NOT_YET_RELEASED: '방영 예정' },
    sort: {
      POPULARITY_DESC: '인기순',
      SCORE_DESC: '평점순',
      START_DATE_DESC: '최신순',
      TITLE_ASC: '제목순',
    },
  },
  en: {
    all: 'All',
    genre: {
      Action: 'Action', Adventure: 'Adventure', Comedy: 'Comedy', Drama: 'Drama', Fantasy: 'Fantasy', Romance: 'Romance',
      'Sci-Fi': 'Sci-Fi', 'Slice of Life': 'Slice of Life', Sports: 'Sports', Supernatural: 'Supernatural',
    },
    season: { WINTER: 'Winter', SPRING: 'Spring', SUMMER: 'Summer', FALL: 'Fall' },
    format: { TV: 'TV', TV_SHORT: 'TV Short', MOVIE: 'Movie', SPECIAL: 'Special', OVA: 'OVA', ONA: 'ONA', MUSIC: 'Music' },
    status: { RELEASING: 'Airing', FINISHED: 'Finished', NOT_YET_RELEASED: 'Not yet released' },
    sort: {
      POPULARITY_DESC: 'Popularity',
      SCORE_DESC: 'Score',
      START_DATE_DESC: 'Latest',
      TITLE_ASC: 'Title',
    },
  },
  ja: {
    all: 'すべて',
    genre: {
      Action: 'アクション', Adventure: '冒険', Comedy: 'コメディ', Drama: 'ドラマ', Fantasy: 'ファンタジー', Romance: '恋愛',
      'Sci-Fi': 'SF', 'Slice of Life': '日常', Sports: 'スポーツ', Supernatural: '超自然',
    },
    season: { WINTER: '冬', SPRING: '春', SUMMER: '夏', FALL: '秋' },
    format: { TV: 'テレビアニメ', TV_SHORT: '短編テレビ', MOVIE: '劇場版', SPECIAL: 'スペシャル', OVA: 'OVA', ONA: 'ONA', MUSIC: '音楽' },
    status: { RELEASING: '放送中', FINISHED: '完結', NOT_YET_RELEASED: '放送予定' },
    sort: {
      POPULARITY_DESC: '人気順',
      SCORE_DESC: '評価順',
      START_DATE_DESC: '新着順',
      TITLE_ASC: 'タイトル順',
    },
  },
};

const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural'];
const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
const formats = ['TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA', 'MUSIC'];
const statuses = ['RELEASING', 'FINISHED', 'NOT_YET_RELEASED'];
const sorts = ['POPULARITY_DESC', 'SCORE_DESC', 'START_DATE_DESC', 'TITLE_ASC'];

function SearchFilters({ filters, onChange, onSubmit, onReset }) {
  const { lang, t } = useLanguage();
  const dict = labelMap[lang] || labelMap.ko;

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    onChange(emptyFilters);
    onReset?.(emptyFilters);
  };

  return (
    <form
      className="search-filters"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label>
        {t('search')}
        <input
          name="keyword"
          value={filters.keyword || ''}
          onChange={handleChange}
          placeholder={t('searchPlaceholder')}
        />
      </label>

      <label>
        {t('genre')}
        <select name="genre" value={filters.genre || ''} onChange={handleChange}>
          <option value="">{dict.all}</option>
          {genres.map((value) => (
            <option key={value} value={value}>{dict.genre[value] || value}</option>
          ))}
        </select>
      </label>

      <label>
        {t('year')}
        <input
          name="year"
          type="number"
          min="1900"
          max="2100"
          value={filters.year || ''}
          onChange={handleChange}
          placeholder="YYYY"
        />
      </label>

      <label>
        {t('season')}
        <select name="season" value={filters.season || ''} onChange={handleChange}>
          <option value="">{dict.all}</option>
          {seasons.map((value) => (
            <option key={value} value={value}>{dict.season[value] || value}</option>
          ))}
        </select>
      </label>

      <label>
        {t('format')}
        <select name="format" value={filters.format || ''} onChange={handleChange}>
          <option value="">{dict.all}</option>
          {formats.map((value) => (
            <option key={value} value={value}>{dict.format[value] || value}</option>
          ))}
        </select>
      </label>

      <label>
        {t('status')}
        <select name="status" value={filters.status || ''} onChange={handleChange}>
          <option value="">{dict.all}</option>
          {statuses.map((value) => (
            <option key={value} value={value}>{dict.status[value] || value}</option>
          ))}
        </select>
      </label>

      <label>
        {t('sort')}
        <select name="sort" value={filters.sort || 'POPULARITY_DESC'} onChange={handleChange}>
          {sorts.map((value) => (
            <option key={value} value={value}>{dict.sort[value] || value}</option>
          ))}
        </select>
      </label>

      <div className="filter-actions">
        <button type="submit" className="button-primary">{t('search')}</button>
        <button type="button" className="button-secondary" onClick={handleReset}>{t('reset')}</button>
      </div>
    </form>
  );
}

export default SearchFilters;

```

### File: `frontend/src/components/ThemeToggle.jsx`

- size: `649` bytes

```jsx
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? '라이트 모드로 변경' : '다크 모드로 변경'}
      title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
      <span className="theme-toggle-text">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}

```

### File: `frontend/src/context/AuthContext.jsx`

- size: `2,618` bytes

```jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

function readSavedUser() {
  try {
    const savedUser = localStorage.getItem(USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(readSavedUser);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const me = await authApi.me();
        setUser(me);
        localStorage.setItem(USER_KEY, JSON.stringify(me));
      } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    bootstrap();
  }, [token]);

  useEffect(() => {
    const handleUnauthorized = () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
    };

    window.addEventListener('anipick:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('anipick:unauthorized', handleUnauthorized);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading: authLoading,
      authLoading,
      isAuthenticated: Boolean(token && user),
      isAdmin: user?.role === 'ADMIN',
      login: ({ token: nextToken, user: nextUser }) => {
        localStorage.setItem(TOKEN_KEY, nextToken);
        localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
        setToken(nextToken);
        setUser(nextUser);
      },
      logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      },
      refreshUser: async () => {
        const me = await authApi.me();
        setUser(me);
        localStorage.setItem(USER_KEY, JSON.stringify(me));
      },
    }),
    [token, user, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}

```

### File: `frontend/src/context/LanguageContext.jsx`

- size: `9,516` bytes

```jsx
﻿import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANG_KEY = 'anipick_lang';
const supported = ['ko', 'en', 'ja'];

const messages = {
  ko: {
    home: '홈',
    browse: '탐색',
    myPage: '마이페이지',
    admin: '관리자',
    login: '로그인',
    logout: '로그아웃',
    register: '회원가입',
    search: '검색',
    reset: '초기화',
    title: '제목',
    genre: '장르',
    year: '연도',
    season: '시즌',
    format: '형식',
    status: '상태',
    sort: '정렬',
    score: '평점',
    scorePending: '평점 집계 전',
    popularity: '인기도',
    episodes: '에피소드 수',
    officialInfo: '공식 정보 보기',
    favorite: '찜하기',
    unfavorite: '찜 취소',
    watchStatus: '시청 상태',
    saveStatus: '상태 저장',
    descriptionNotReady: '한국어 줄거리가 준비 중입니다.',
    externalFallback: '외부 애니메이션 데이터 서버가 불안정하여 임시 데이터를 표시합니다.',
    retryGuide: '잠시 후 다시 시도하거나 검색 조건을 변경해 주세요.',
    trendingNow: '지금 인기 있는 애니',
    top10Now: '지금 뜨는 애니 TOP 10',
    popularSeason: '이번 시즌 인기작',
    topRated: '고평점 추천',
    quickSearch: '빠른 탐색',
    loading: '불러오는 중입니다...',
    noData: '표시할 데이터가 없습니다.',
    noResult: '검색 결과가 없습니다.',
    prev: '이전',
    next: '다음',
    page: '페이지',
    detail: '상세 보기',
    reviews: '리뷰',
    writeReview: '리뷰 작성',
    rating: '별점',
    content: '내용',
    submit: '등록',
    save: '저장',
    edit: '수정',
    delete: '삭제',
    noReviews: '리뷰가 없습니다.',
    recommendation: '맞춤 추천 애니메이션',
    favorites: '내 찜 목록',
    myReviews: '내 리뷰',
    watchGroups: '시청 상태',
    loginRequired: '로그인 후 찜/리뷰/시청상태 기능을 사용할 수 있습니다.',
    fallbackKoDescription: '한국어 줄거리가 준비 중입니다.',
    fallbackJaDescription: '日本語のあらすじは準備中です。',
    fallbackEnDescription: 'No description available.',
    romajiTitle: '로마자 제목',
    englishTitle: '영문 제목',
    nativeTitle: '원어 제목',
    similarAnime: '유사 작품 추천',
    noTitle: '제목 없음',
    profileHint: '찜 목록, 시청 상태, 리뷰와 맞춤 추천을 확인해 보세요.',
    animeBrowseTitle: '애니메이션 탐색',
    animeBrowseHint: '제목, 장르, 연도, 시즌, 형식, 상태로 원하는 작품을 찾아보세요.',
    searchPlaceholder: '애니메이션 제목 검색',
    loadingDetail: '상세 정보를 불러오는 중입니다...',
    notFoundAnime: '애니메이션 정보를 찾을 수 없습니다.',
    saveStatusSuccess: '시청 상태를 저장했습니다.',
    addFavoriteSuccess: '찜 목록에 추가했습니다.',
    removeFavoriteSuccess: '찜 목록에서 삭제했습니다.',
    aiAutoTranslated: 'AI 자동 번역이 적용된 설명입니다.',
    translationPending: '한국어 번역이 아직 준비되지 않았습니다.',
  },
  en: {
    home: 'Home', browse: 'Browse', myPage: 'My Page', admin: 'Admin', login: 'Login', logout: 'Logout', register: 'Register',
    search: 'Search', reset: 'Reset', title: 'Title', genre: 'Genre', year: 'Year', season: 'Season', format: 'Format', status: 'Status', sort: 'Sort',
    score: 'Score', popularity: 'Popularity', episodes: 'Episodes', officialInfo: 'Official Info', favorite: 'Favorite', unfavorite: 'Unfavorite',
    scorePending: 'Not yet rated',
    watchStatus: 'Watch Status', saveStatus: 'Save Status', descriptionNotReady: 'No description available.',
    externalFallback: 'External anime data server is unstable. Showing temporary data.', retryGuide: 'Please try again later or change search filters.',
    trendingNow: 'Trending Now', top10Now: 'Top 10 Now', popularSeason: 'Popular This Season', topRated: 'Top Rated Picks', quickSearch: 'Quick Search',
    loading: 'Loading...', noData: 'No data available.', noResult: 'No results found.', prev: 'Prev', next: 'Next', page: 'Page', detail: 'View Detail',
    reviews: 'Reviews', writeReview: 'Write a Review', rating: 'Rating', content: 'Content', submit: 'Submit', save: 'Save', edit: 'Edit', delete: 'Delete',
    noReviews: 'No reviews yet.', recommendation: 'Personalized Recommendations', favorites: 'My Favorites', myReviews: 'My Reviews', watchGroups: 'Watch Status',
    loginRequired: 'Login required to use favorite/review/watch-status features.', fallbackKoDescription: 'No description available.',
    fallbackJaDescription: 'No description available.', fallbackEnDescription: 'No description available.', romajiTitle: 'Romaji Title', englishTitle: 'English Title',
    nativeTitle: 'Native Title', similarAnime: 'Similar Anime', noTitle: 'Untitled', profileHint: 'Check favorites, watch status, reviews, and recommendations.',
    animeBrowseTitle: 'Browse Anime', animeBrowseHint: 'Search by title, genre, year, season, format, and status.', searchPlaceholder: 'Search anime title',
    loadingDetail: 'Loading anime details...', notFoundAnime: 'Anime not found.', saveStatusSuccess: 'Watch status saved.',
    addFavoriteSuccess: 'Added to favorites.', removeFavoriteSuccess: 'Removed from favorites.',
    aiAutoTranslated: 'This description is AI auto-translated.',
    translationPending: 'No description available.',
  },
  ja: {
    home: 'ホーム', browse: '検索', myPage: 'マイページ', admin: '管理者', login: 'ログイン', logout: 'ログアウト', register: '新規登録',
    search: '検索', reset: 'リセット', title: 'タイトル', genre: 'ジャンル', year: '年', season: 'シーズン', format: '形式', status: '状態', sort: '並び替え',
    score: '評価', popularity: '人気度', episodes: '話数', officialInfo: '公式情報を見る', favorite: 'お気に入り', unfavorite: 'お気に入り解除',
    scorePending: '評価集計前',
    watchStatus: '視聴状態', saveStatus: '状態を保存', descriptionNotReady: '日本語のあらすじは準備中です。',
    externalFallback: '外部アニメデータサーバーが不安定なため、一時データを表示しています。', retryGuide: 'しばらくしてから再試行するか、検索条件を変更してください。',
    trendingNow: '人気アニメ', top10Now: '今話題のアニメ TOP 10', popularSeason: '今シーズンの人気作', topRated: '高評価おすすめ', quickSearch: 'クイック検索', loading: '読み込み中です...',
    noData: '表示できるデータがありません。', noResult: '検索結果がありません。', prev: '前へ', next: '次へ', page: 'ページ', detail: '詳細を見る',
    reviews: 'レビュー', writeReview: 'レビュー作成', rating: '評価', content: '内容', submit: '投稿', save: '保存', edit: '編集', delete: '削除',
    noReviews: 'レビューがありません。', recommendation: 'おすすめアニメ', favorites: 'お気に入り一覧', myReviews: '自分のレビュー', watchGroups: '視聴状態',
    loginRequired: 'お気に入り・レビュー・視聴状態機能はログイン後に利用できます。', fallbackKoDescription: '日本語のあらすじは準備中です。',
    fallbackJaDescription: '日本語のあらすじは準備中です。', fallbackEnDescription: 'No description available.', romajiTitle: 'ローマ字タイトル',
    englishTitle: '英語タイトル', nativeTitle: '原題', similarAnime: '類似作品', noTitle: 'タイトルなし',
    profileHint: 'お気に入り、視聴状態、レビュー、おすすめを確認できます。', animeBrowseTitle: 'アニメ検索',
    animeBrowseHint: 'タイトル、ジャンル、年、シーズン、形式、状態で検索できます。', searchPlaceholder: 'アニメタイトルを検索',
    loadingDetail: '詳細情報を読み込み中です...', notFoundAnime: 'アニメ情報が見つかりません。',
    saveStatusSuccess: '視聴状態を保存しました。', addFavoriteSuccess: 'お気に入りに追加しました。', removeFavoriteSuccess: 'お気に入りから削除しました。',
    aiAutoTranslated: 'この説明はAI自動翻訳です。',
    translationPending: '日本語訳はまだ準備されていません。',
  },
};

const LanguageContext = createContext(null);

function normalizeLang(lang) {
  const value = String(lang || '').toLowerCase();
  if (!supported.includes(value)) return 'ko';
  return value;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => normalizeLang(localStorage.getItem(LANG_KEY) || 'ko'));

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const setLang = (nextLang) => {
    setLangState(normalizeLang(nextLang));
  };

  const t = (key) => messages[lang]?.[key] || messages.ko?.[key] || key;

  const value = useMemo(() => ({ lang, setLang, t, messages, supported }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}

export { LANG_KEY, normalizeLang };

```

### File: `frontend/src/hooks/useRailScroll.js`

- size: `5,567` bytes

```javascript
import { useCallback, useEffect, useRef, useState } from 'react';

const DRAG_THRESHOLD = 8;

export function useRailScroll(itemCount = 0) {
  const scrollRef = useRef(null);

  const isPointerDownRef = useRef(false);
  const isRealDraggingRef = useRef(false);
  const wasDraggedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const capturedPointerIdRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const current = Math.max(0, el.scrollLeft);
    const epsilon = 4;

    setCanScrollLeft(current > epsilon);
    setCanScrollRight(current < maxScrollLeft - epsilon);
  }, []);

  const scrollByPage = useCallback(
    (direction) => {
      const el = scrollRef.current;
      if (!el) return;

      const amount = Math.max(260, el.clientWidth * 0.82);

      el.scrollBy({
        left: direction === 'next' ? amount : -amount,
        behavior: 'smooth',
      });

      window.requestAnimationFrame(updateScrollState);
      window.setTimeout(updateScrollState, 250);
      window.setTimeout(updateScrollState, 500);
    },
    [updateScrollState]
  );

  const scrollPrev = useCallback(() => {
    scrollByPage('prev');
  }, [scrollByPage]);

  const scrollNext = useCallback(() => {
    scrollByPage('next');
  }, [scrollByPage]);

  const clearDrag = useCallback(
    (event) => {
      const el = scrollRef.current;

      isPointerDownRef.current = false;
      isRealDraggingRef.current = false;

      if (el) {
        el.classList.remove('is-dragging-ready');
        el.classList.remove('is-dragging');

        const pointerId = event?.pointerId ?? capturedPointerIdRef.current;

        if (pointerId !== null && pointerId !== undefined) {
          try {
            if (el.hasPointerCapture?.(pointerId)) {
              el.releasePointerCapture(pointerId);
            }
          } catch {
            // ignore
          }
        }
      }

      capturedPointerIdRef.current = null;
      updateScrollState();
    },
    [updateScrollState]
  );

  const onPointerDown = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const el = scrollRef.current;
    if (!el) return;

    isPointerDownRef.current = true;
    isRealDraggingRef.current = false;
    wasDraggedRef.current = false;

    startXRef.current = event.clientX;
    startScrollLeftRef.current = el.scrollLeft;

    el.classList.add('is-dragging-ready');
  }, []);

  const onPointerMove = useCallback((event) => {
    const el = scrollRef.current;
    if (!el || !isPointerDownRef.current) return;

    const dx = event.clientX - startXRef.current;

    if (Math.abs(dx) < DRAG_THRESHOLD && !isRealDraggingRef.current) {
      return;
    }

    if (!isRealDraggingRef.current) {
      isRealDraggingRef.current = true;
      wasDraggedRef.current = true;

      el.classList.add('is-dragging');

      try {
        el.setPointerCapture?.(event.pointerId);
        capturedPointerIdRef.current = event.pointerId;
      } catch {
        // ignore
      }
    }

    el.scrollLeft = startScrollLeftRef.current - dx;
  }, []);

  const onClickCapture = useCallback((event) => {
    if (!wasDraggedRef.current) return;

    event.preventDefault();
    event.stopPropagation();

    window.setTimeout(() => {
      wasDraggedRef.current = false;
    }, 0);
  }, []);

  const onWheel = useCallback(
    (event) => {
      const el = scrollRef.current;
      if (!el) return;

      if (!event.shiftKey) return;

      event.preventDefault();
      el.scrollLeft += event.deltaY;

      window.requestAnimationFrame(updateScrollState);
    },
    [updateScrollState]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    updateScrollState();

    const rafId = window.requestAnimationFrame(updateScrollState);
    const timeout300 = window.setTimeout(updateScrollState, 300);
    const timeout800 = window.setTimeout(updateScrollState, 800);
    const timeout1400 = window.setTimeout(updateScrollState, 1400);

    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    const handleImageLoad = () => {
      window.requestAnimationFrame(updateScrollState);
    };

    const imageNodes = Array.from(el.querySelectorAll('img'));
    imageNodes.forEach((img) => {
      img.addEventListener('load', handleImageLoad);
      img.addEventListener('error', handleImageLoad);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeout300);
      window.clearTimeout(timeout800);
      window.clearTimeout(timeout1400);

      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);

      imageNodes.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, [updateScrollState, itemCount]);

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollPrev,
    scrollNext,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: clearDrag,
      onPointerCancel: clearDrag,
      onPointerLeave: clearDrag,
      onWheel,
    },
    onClickCapture,
  };
}

```

### File: `frontend/src/hooks/useTheme.js`

- size: `740` bytes

```javascript
import { useCallback, useEffect, useState } from 'react';
import { applyTheme, getInitialTheme, toggleTheme as getNextTheme } from '../utils/theme';

export function useTheme() {
  const [theme, setTheme] = useState(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => applyTheme(getNextTheme(current)));
  }, []);

  const setLightTheme = useCallback(() => {
    setTheme(applyTheme('light'));
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme(applyTheme('dark'));
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setLightTheme,
    setDarkTheme,
  };
}

```

### File: `frontend/src/main.jsx`

- size: `648` bytes

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { applyTheme, getInitialTheme } from './utils/theme';
import './styles/global.css';

applyTheme(getInitialTheme());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

```

### File: `frontend/src/pages/Admin.jsx`

- size: `22,616` bytes

```jsx
﻿import { useEffect, useState } from 'react';
import { adminApi } from '../api/adminApi';
import { noticeApi } from '../api/noticeApi';
import { translationApi } from '../api/translationApi';

function Admin() {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notices, setNotices] = useState([]);
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '' });
  const [translationForm, setTranslationForm] = useState({
    provider: 'JIKAN',
    externalId: '',
    lang: 'ko',
    title: '',
    description: '',
    source: 'MANUAL',
    status: 'REVIEWED',
  });
  const [translationsView, setTranslationsView] = useState([]);
  const [coverage, setCoverage] = useState(null);
  const [missingTranslations, setMissingTranslations] = useState([]);
  const [translationMessage, setTranslationMessage] = useState('');
  const [translationLoading, setTranslationLoading] = useState(false);
  const [animeRows, setAnimeRows] = useState([]);
  const [animePageInfo, setAnimePageInfo] = useState(null);
  const [animeQuery, setAnimeQuery] = useState({
    keyword: '',
    status: 'ALL',
    isAdult: 'ALL',
    isHidden: 'ALL',
    page: 1,
    perPage: 20,
  });
  const [animeMessage, setAnimeMessage] = useState('');
  const [animeLoading, setAnimeLoading] = useState(false);
  const [modelInfo, setModelInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    setLoading(true);
    setError('');

    try {
      const [userData, reviewData, noticeData] = await Promise.all([
        adminApi.getUsers(),
        adminApi.getAllReviews(),
        noticeApi.getNotices(),
      ]);

      setUsers(userData);
      setReviews(reviewData);
      setNotices(noticeData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  useEffect(() => {
    loadAnimeRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAnimeRows = async (nextQuery = animeQuery) => {
    setAnimeLoading(true);
    setAnimeMessage('');
    try {
      const params = {
        ...nextQuery,
      };
      if (params.status === 'ALL') delete params.status;
      if (params.isAdult === 'ALL') delete params.isAdult;
      if (params.isHidden === 'ALL') delete params.isHidden;
      if (!params.keyword) delete params.keyword;

      const data = await adminApi.getAnime(params);
      setAnimeRows(data.items || []);
      setAnimePageInfo(data.pageInfo || null);
    } catch (err) {
      setAnimeMessage(err.response?.data?.message || '애니 목록을 불러오지 못했습니다.');
    } finally {
      setAnimeLoading(false);
    }
  };

  const handleDeleteReview = async (id) => {
    await adminApi.deleteReview(id);
    setReviews((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCreateNotice = async (event) => {
    event.preventDefault();
    if (!noticeForm.title.trim() || !noticeForm.content.trim()) return;

    const created = await noticeApi.createNotice(noticeForm);
    setNotices((prev) => [created, ...prev]);
    setNoticeForm({ title: '', content: '' });
  };

  const handleDeleteNotice = async (id) => {
    await noticeApi.deleteNotice(id);
    setNotices((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAnimeAction = async (action, anime) => {
    try {
      setAnimeMessage('');
      setAnimeLoading(true);
      if (action === 'hide') {
        await adminApi.hideAnime(anime.id, 'ADMIN_HIDDEN_MANUAL');
      } else if (action === 'unhide') {
        await adminApi.unhideAnime(anime.id);
      } else if (action === 'adult') {
        await adminApi.markAnimeAdult(anime.id);
      } else if (action === 'archive') {
        await adminApi.archiveAnime(anime.id);
      }
      await loadAnimeRows();
    } catch (err) {
      setAnimeMessage(err.response?.data?.message || '애니 상태 변경에 실패했습니다.');
    } finally {
      setAnimeLoading(false);
    }
  };

  const validateExternalId = () => {
    const id = Number(translationForm.externalId);
    if (!Number.isInteger(id) || id <= 0) {
      setTranslationMessage('externalId must be a positive number.');
      return null;
    }
    return id;
  };

  const handleFetchTranslations = async () => {
    setTranslationMessage('');
    const id = validateExternalId();
    if (!id) return;

    try {
      setTranslationLoading(true);
      const data = await translationApi.getTranslations(translationForm.provider, id);
      setTranslationsView(data.translations || []);
      setTranslationMessage('Translations loaded.');
    } catch (err) {
      setTranslationsView([]);
      setTranslationMessage(err.response?.data?.message || 'Failed to load translations.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleSaveTranslation = async () => {
    setTranslationMessage('');
    const id = validateExternalId();
    if (!id) return;

    try {
      setTranslationLoading(true);
      await translationApi.upsertTranslation(translationForm.provider, id, {
        lang: translationForm.lang,
        title: translationForm.title,
        description: translationForm.description,
        source: translationForm.source,
        status: translationForm.status,
      });
      setTranslationMessage('Translation saved.');
      await handleFetchTranslations();
    } catch (err) {
      setTranslationMessage(err.response?.data?.message || 'Failed to save translation.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleAutoTranslate = async () => {
    setTranslationMessage('');
    const id = validateExternalId();
    if (!id) return;

    try {
      setTranslationLoading(true);
      await translationApi.autoTranslate(translationForm.provider, id, {
        targetLangs: ['ko', 'ja'],
        overwrite: true,
      });
      setTranslationMessage('Auto translation completed.');
      await handleFetchTranslations();
    } catch (err) {
      setTranslationMessage(err.response?.data?.message || 'Auto translation failed.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleDeleteTranslation = async (lang) => {
    const id = validateExternalId();
    if (!id) return;

    await translationApi.deleteTranslation(translationForm.provider, id, lang);
    await handleFetchTranslations();
  };

  const handleCheckOpenAIModels = async () => {
    setTranslationMessage('');
    setTranslationLoading(true);
    try {
      const info = await translationApi.getOpenAIModels();
      setModelInfo(info);
      if (info.ok) {
        setTranslationMessage(`선택 모델: ${info.selectedModel}`);
      } else {
        setTranslationMessage(info.message || '모델 접근 권한을 확인해 주세요.');
      }
    } catch (err) {
      setModelInfo(null);
      setTranslationMessage(err.response?.data?.message || '모델 조회에 실패했습니다.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleLoadCoverage = async () => {
    setTranslationMessage('');
    setTranslationLoading(true);
    try {
      const data = await translationApi.getCoverage();
      setCoverage(data);
      setTranslationMessage('Translation coverage loaded.');
    } catch (err) {
      setTranslationMessage(err.response?.data?.message || 'Failed to load translation coverage.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleLoadMissing = async () => {
    setTranslationMessage('');
    setTranslationLoading(true);
    try {
      const rows = await translationApi.getMissingTranslations({ lang: translationForm.lang, limit: 50 });
      setMissingTranslations(rows);
      setTranslationMessage(`Missing translations loaded: ${rows.length}`);
    } catch (err) {
      setTranslationMessage(err.response?.data?.message || 'Failed to load missing translations.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleCreateJobs = async () => {
    setTranslationMessage('');
    setTranslationLoading(true);
    try {
      const data = await translationApi.createJobs({ langs: ['ko', 'ja'], limit: 100 });
      setTranslationMessage(`Translation jobs created: ${data.created}`);
      await handleLoadCoverage();
    } catch (err) {
      setTranslationMessage(err.response?.data?.message || 'Failed to create translation jobs.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleRunJobs = async () => {
    setTranslationMessage('');
    setTranslationLoading(true);
    try {
      const data = await translationApi.runJobs({ langs: ['ko', 'ja'], limit: 10 });
      setTranslationMessage(`Translation jobs finished: ${(data.results || []).length}`);
      await handleLoadCoverage();
    } catch (err) {
      setTranslationMessage(err.response?.data?.message || 'Failed to run translation jobs.');
    } finally {
      setTranslationLoading(false);
    }
  };

  if (loading) return <p className="page-message">Loading admin page...</p>;

  return (
    <div className="page-wrap">
      <h1>Admin Page</h1>
      {error && <p className="page-error">{error}</p>}

      <section className="anime-section">
        <h2>Users</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Nickname</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.nickname}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="anime-section">
        <h2>All Reviews</h2>
        {reviews.map((review) => (
          <article key={review.id} className="review-item">
            <div className="review-head">
              <strong>{review.user?.nickname || 'Unknown'} ({review.user?.email || '-'})</strong>
              <span>Anime #{review.animeId} | {review.rating}/5</span>
            </div>
            <p>{review.content}</p>
            <button type="button" onClick={() => handleDeleteReview(review.id)}>
              Delete Review
            </button>
          </article>
        ))}
      </section>

      <section className="anime-section">
        <h2>Notices</h2>
        <form className="review-form" onSubmit={handleCreateNotice}>
          <label>
            Title
            <input
              value={noticeForm.title}
              onChange={(event) => setNoticeForm((prev) => ({ ...prev, title: event.target.value }))}
            />
          </label>
          <label>
            Content
            <textarea
              value={noticeForm.content}
              onChange={(event) => setNoticeForm((prev) => ({ ...prev, content: event.target.value }))}
              rows={3}
            />
          </label>
          <button className="button-primary" type="submit">Create Notice</button>
        </form>

        {notices.map((notice) => (
          <article key={notice.id} className="review-item">
            <div className="review-head">
              <strong>{notice.title}</strong>
              <button type="button" onClick={() => handleDeleteNotice(notice.id)}>Delete</button>
            </div>
            <p>{notice.content}</p>
          </article>
        ))}
      </section>

      <section className="anime-section">
        <h2>Anime Management</h2>
        <div className="search-filters">
          <label>
            Keyword
            <input
              value={animeQuery.keyword}
              onChange={(event) => setAnimeQuery((prev) => ({ ...prev, keyword: event.target.value }))}
            />
          </label>
          <label>
            Status
            <select
              value={animeQuery.status}
              onChange={(event) => setAnimeQuery((prev) => ({ ...prev, status: event.target.value, page: 1 }))}
            >
              <option value="ALL">ALL</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="HIDDEN">HIDDEN</option>
              <option value="ADULT">ADULT</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </label>
          <label>
            isAdult
            <select
              value={animeQuery.isAdult}
              onChange={(event) => setAnimeQuery((prev) => ({ ...prev, isAdult: event.target.value, page: 1 }))}
            >
              <option value="ALL">ALL</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
          <label>
            isHidden
            <select
              value={animeQuery.isHidden}
              onChange={(event) => setAnimeQuery((prev) => ({ ...prev, isHidden: event.target.value, page: 1 }))}
            >
              <option value="ALL">ALL</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
        </div>
        <div className="filter-actions">
          <button type="button" className="button-secondary" onClick={() => loadAnimeRows()} disabled={animeLoading}>
            {animeLoading ? 'Loading...' : '조회'}
          </button>
        </div>
        {animeMessage && <p className="page-message">{animeMessage}</p>}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Poster</th>
                <th>DB ID</th>
                <th>External ID</th>
                <th>Provider</th>
                <th>Title</th>
                <th>Flags</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {animeRows.map((anime) => (
                <tr key={anime.id}>
                  <td>
                    {anime.imageUrl ? (
                      <img src={anime.imageUrl} alt={anime.englishTitle || anime.romajiTitle || String(anime.externalId)} style={{ width: 48, borderRadius: 8 }} />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{anime.id}</td>
                  <td>{anime.externalId}</td>
                  <td>{anime.provider}</td>
                  <td>{anime.englishTitle || anime.romajiTitle || anime.nativeTitle || '-'}</td>
                  <td>
                    {anime.isAdult ? '[ADULT] ' : ''}
                    {anime.isHidden ? '[HIDDEN]' : ''}
                  </td>
                  <td>{anime.dataStatus}</td>
                  <td>
                    <div className="filter-actions">
                      <button type="button" className="button-small" onClick={() => handleAnimeAction('hide', anime)}>숨김</button>
                      <button type="button" className="button-small" onClick={() => handleAnimeAction('adult', anime)}>성인 표시</button>
                      <button type="button" className="button-small" onClick={() => handleAnimeAction('unhide', anime)}>복구</button>
                      <button type="button" className="button-small" onClick={() => handleAnimeAction('archive', anime)}>삭제(보관)</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {animePageInfo && (
          <p className="muted">
            page {animePageInfo.currentPage} / {animePageInfo.lastPage} (total {animePageInfo.total})
          </p>
        )}
      </section>

      <section className="anime-section">
        <h2>Translation Management</h2>
        <div className="search-filters">
          <label>
            Provider
            <input
              value={translationForm.provider}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, provider: event.target.value.toUpperCase() }))}
            />
          </label>
          <label>
            External ID
            <input
              value={translationForm.externalId}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, externalId: event.target.value }))}
            />
          </label>
          <label>
            Lang
            <select
              value={translationForm.lang}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, lang: event.target.value }))}
            >
              <option value="ko">ko</option>
              <option value="en">en</option>
              <option value="ja">ja</option>
            </select>
          </label>
          <label>
            Source
            <select
              value={translationForm.source}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, source: event.target.value }))}
            >
              <option value="MANUAL">MANUAL</option>
              <option value="GPT">GPT</option>
              <option value="API">API</option>
            </select>
          </label>
          <label>
            Status
            <select
              value={translationForm.status}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, status: event.target.value }))}
            >
              <option value="REVIEWED">REVIEWED</option>
              <option value="AUTO">AUTO</option>
            </select>
          </label>
        </div>

        <div className="review-form">
          <label>
            Title
            <input
              value={translationForm.title}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, title: event.target.value }))}
            />
          </label>
          <label>
            Description
            <textarea
              rows={5}
              value={translationForm.description}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, description: event.target.value }))}
            />
          </label>
        </div>

        <div className="filter-actions">
          <button type="button" className="button-secondary" onClick={handleCheckOpenAIModels} disabled={translationLoading}>
            {translationLoading ? '처리 중...' : 'OpenAI 모델 확인'}
          </button>
          <button type="button" className="button-secondary" onClick={handleLoadCoverage} disabled={translationLoading}>
            커버리지
          </button>
          <button type="button" className="button-secondary" onClick={handleLoadMissing} disabled={translationLoading}>
            누락 목록
          </button>
          <button type="button" className="button-secondary" onClick={handleCreateJobs} disabled={translationLoading}>
            작업 생성
          </button>
          <button type="button" className="button-secondary" onClick={handleRunJobs} disabled={translationLoading}>
            작업 실행
          </button>
          <button type="button" className="button-secondary" onClick={handleFetchTranslations} disabled={translationLoading}>
            {translationLoading ? '처리 중...' : '조회'}
          </button>
          <button type="button" className="button-primary" onClick={handleSaveTranslation} disabled={translationLoading}>
            {translationLoading ? '처리 중...' : '저장'}
          </button>
          <button type="button" className="button-secondary" onClick={handleAutoTranslate} disabled={translationLoading}>
            {translationLoading ? '처리 중...' : '자동 번역'}
          </button>
        </div>

        {translationMessage && <p className="page-message">{translationMessage}</p>}
        {modelInfo && (
          <article className="review-item">
            <p><strong>Selected:</strong> {modelInfo.selectedModel || '-'}</p>
            <p><strong>Accessible:</strong> {(modelInfo.accessibleCandidates || []).join(', ') || '-'}</p>
            <p><strong>Candidates:</strong> {(modelInfo.candidates || []).join(', ') || '-'}</p>
            <p><strong>Unavailable:</strong> {(modelInfo.unavailableModels || []).join(', ') || '-'}</p>
          </article>
        )}

        {coverage && (
          <article className="review-item">
            <p><strong>Total Anime:</strong> {coverage.totalAnime}</p>
            <p><strong>Translations:</strong> {(coverage.translations || []).map((row) => `${row.lang}/${row.source}/${row.status}: ${row.count}`).join(' | ') || '-'}</p>
            <p><strong>Jobs:</strong> {(coverage.jobs || []).map((row) => `${row.lang}/${row.status}: ${row.count}`).join(' | ') || '-'}</p>
          </article>
        )}

        {missingTranslations.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Provider</th>
                  <th>Title</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {missingTranslations.map((anime) => (
                  <tr key={`${anime.provider}-${anime.externalId}`}>
                    <td>{anime.externalId}</td>
                    <td>{anime.provider}</td>
                    <td>{anime.englishTitle || anime.romajiTitle || anime.nativeTitle || '-'}</td>
                    <td>{anime.averageScore || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="review-list">
          {translationsView.map((row) => (
            <article key={row.id} className="review-item">
              <div className="review-head">
                <strong>{row.lang} / {row.source} / {row.status}</strong>
                <button type="button" onClick={() => handleDeleteTranslation(row.lang)}>Delete</button>
              </div>
              <p><strong>Title:</strong> {row.title || '-'}</p>
              <p>{row.description || '-'}</p>
              {row.failureReason && <p><strong>Failure:</strong> {row.failureReason}</p>}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Admin;

```

### File: `frontend/src/pages/AnimeDetail.jsx`

- size: `12,634` bytes

```jsx
﻿import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { animeApi } from '../api/animeApi';
import { favoriteApi } from '../api/favoriteApi';
import { reviewApi } from '../api/reviewApi';
import { watchStatusApi } from '../api/watchStatusApi';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import AnimeCard from '../components/AnimeCard';
import HeroMedia from '../components/HeroMedia';
import GlassBadge from '../components/GlassBadge';
import { useAuth } from '../context/AuthContext';
import { getAnimeBanner, getAnimePoster, PLACEHOLDER_BANNER, PLACEHOLDER_POSTER } from '../utils/image';
import { toUserErrorMessage } from '../utils/error';
import { useLanguage } from '../context/LanguageContext';
import { getSafeAnimeTitle } from '../utils/title';
import { formatAnimeScore } from '../utils/score';
import { getAnimeRouteId } from '../utils/animeRoute';

function getWatchStatusOptions(lang) {
  if (lang === 'en') {
    return [
      { value: 'PLAN_TO_WATCH', label: 'Plan to Watch' },
      { value: 'WATCHING', label: 'Watching' },
      { value: 'COMPLETED', label: 'Completed' },
      { value: 'DROPPED', label: 'Dropped' },
    ];
  }

  if (lang === 'ja') {
    return [
      { value: 'PLAN_TO_WATCH', label: '視聴予定' },
      { value: 'WATCHING', label: '視聴中' },
      { value: 'COMPLETED', label: '視聴完了' },
      { value: 'DROPPED', label: '中断' },
    ];
  }

  return [
    { value: 'PLAN_TO_WATCH', label: '볼 예정' },
    { value: 'WATCHING', label: '보는 중' },
    { value: 'COMPLETED', label: '시청 완료' },
    { value: 'DROPPED', label: '중단' },
  ];
}

function AnimeDetail() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { t, lang } = useLanguage();

  const [anime, setAnime] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [watchStatus, setWatchStatus] = useState('PLAN_TO_WATCH');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const watchStatusOptions = useMemo(() => getWatchStatusOptions(lang), [lang]);

  const displayTitle = useMemo(() => getSafeAnimeTitle(anime, lang, t('noTitle')), [anime, lang, t]);
  const externalAnimeId = useMemo(() => getAnimeRouteId(anime) || Number(id), [anime, id]);

  const poster = getAnimePoster(anime) || PLACEHOLDER_POSTER;
  const banner = getAnimeBanner(anime) || PLACEHOLDER_BANNER;
  const displayGenres = anime?.displayGenres || anime?.genres || [];
  const displayStatus = anime?.displayStatus || anime?.status || '-';
  const displaySeason = anime?.displaySeason || anime?.season || '-';
  const displayFormat = anime?.displayFormat || anime?.format || '-';
  const displayDescription = anime?.displayDescription || t('descriptionNotReady');
  const translationStatus = anime?.translationStatus || '';
  const scoreLabel = formatAnimeScore(anime);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError('');
      setActionMessage('');

      try {
        const [animeData, reviewData] = await Promise.all([
          animeApi.getAnimeDetail(id),
          reviewApi.getReviewsByAnime(id),
        ]);

        setAnime(animeData);
        setReviews(reviewData);

        if (isAuthenticated) {
          const [favoriteState, watchList] = await Promise.all([
            favoriteApi.checkFavorite(id),
            watchStatusApi.getMyWatchStatus(),
          ]);
          setIsFavorite(Boolean(favoriteState.isFavorite));
          const matched = watchList.find((item) => item.animeId === externalAnimeId);
          setWatchStatus(matched?.status || 'PLAN_TO_WATCH');
        }
      } catch (err) {
        setError(toUserErrorMessage(err, `${t('externalFallback')} ${t('retryGuide')}`));
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [id, isAuthenticated, lang, t, externalAnimeId]);

  const refreshReviews = async () => {
    const reviewData = await reviewApi.getReviewsByAnime(id);
    setReviews(reviewData);
  };

  const handleToggleFavorite = async () => {
    try {
      if (!anime) return;
      const safeTitle = getSafeAnimeTitle(anime, lang, `애니메이션 #${anime.id}`);
      if (safeTitle === '한국어 제목 준비 중' || safeTitle === '제목 준비 중') {
        throw new Error('Invalid anime title');
      }

      if (isFavorite) {
        await favoriteApi.removeFavorite(externalAnimeId);
        setIsFavorite(false);
        setActionMessage(t('removeFavoriteSuccess'));
      } else {
        await favoriteApi.addFavorite({
          animeId: externalAnimeId,
          animeTitle: safeTitle,
          animeImage: poster === PLACEHOLDER_POSTER ? null : poster,
        });
        setIsFavorite(true);
        setActionMessage(t('addFavoriteSuccess'));
      }
    } catch (err) {
      setActionMessage(toUserErrorMessage(err));
    }
  };

  const handleSaveWatchStatus = async () => {
    try {
      const safeTitle = getSafeAnimeTitle(anime, lang, `애니메이션 #${anime.id}`);
      if (safeTitle === '한국어 제목 준비 중' || safeTitle === '제목 준비 중') {
        throw new Error('Invalid anime title');
      }

      await watchStatusApi.upsertWatchStatus({
        animeId: externalAnimeId,
        animeTitle: safeTitle,
        animeImage: poster === PLACEHOLDER_POSTER ? null : poster,
        status: watchStatus,
      });
      setActionMessage(t('saveStatusSuccess'));
    } catch (err) {
      setActionMessage(toUserErrorMessage(err));
    }
  };

  const handleCreateReview = async (payload) => {
    await reviewApi.createReview(payload);
    await refreshReviews();
    setActionMessage(t('submit'));
  };

  const handleEditReview = async (review) => {
    const nextRating = window.prompt(`${t('rating')} (1-5)`, String(review.rating));
    if (!nextRating) return;
    const nextContent = window.prompt(t('content'), review.content);
    if (!nextContent) return;

    await reviewApi.updateReview(review.id, {
      rating: Number(nextRating),
      content: nextContent,
    });
    await refreshReviews();
    setActionMessage(t('edit'));
  };

  const handleDeleteReview = async (reviewId) => {
    await reviewApi.deleteReview(reviewId);
    await refreshReviews();
    setActionMessage(t('delete'));
  };

  const handlePosterError = (event) => {
    if (event.currentTarget.src !== PLACEHOLDER_POSTER) {
      event.currentTarget.src = PLACEHOLDER_POSTER;
    }
  };

  if (loading) return <p className="page-message">{t('loadingDetail')}</p>;
  if (error) return <p className="page-error">{error}</p>;
  if (!anime) return <p className="page-message">{t('notFoundAnime')}</p>;

  return (
    <div className="page-wrap">
      {anime?.isFallback && <p className="page-message">{t('externalFallback')}</p>}

      <HeroMedia imageUrl={banner} fallbackImageUrl={poster} alt={`${displayTitle} banner`} variant="detail" />

      <section className="detail-hero">
        <div className="detail-main">
          <div className="detail-poster-shell">
            <img className="detail-cover" src={poster} alt={displayTitle} onError={handlePosterError} />
          </div>

          <div className="detail-info">
            <h1>{displayTitle}</h1>
            <div className="detail-badge-row">
              <GlassBadge tone="accent">{displayFormat}</GlassBadge>
              <GlassBadge>{displayStatus}</GlassBadge>
              {translationStatus && <GlassBadge tone={translationStatus === 'FAILED' ? 'danger' : 'muted'}>{translationStatus}</GlassBadge>}
            </div>

            {lang === 'ko' && (
              <>
                <p><strong>{t('romajiTitle')}:</strong> {anime.title?.romaji || '-'}</p>
                <p><strong>{t('englishTitle')}:</strong> {anime.title?.english || '-'}</p>
                <p><strong>{t('nativeTitle')}:</strong> {anime.title?.native || '-'}</p>
              </>
            )}

            {lang === 'en' && (
              <>
                <p><strong>{t('romajiTitle')}:</strong> {anime.title?.romaji || '-'}</p>
                <p><strong>{t('nativeTitle')}:</strong> {anime.title?.native || '-'}</p>
              </>
            )}

            {lang === 'ja' && (
              <>
                <p><strong>{t('englishTitle')}:</strong> {anime.title?.english || '-'}</p>
                <p><strong>{t('romajiTitle')}:</strong> {anime.title?.romaji || '-'}</p>
              </>
            )}

            <p className="description">{displayDescription || t('descriptionNotReady')}</p>
            {anime?.translationStatus === 'AUTO' && (
              <p className="muted">{t('aiAutoTranslated')}</p>
            )}
            {translationStatus === 'FAILED' && lang === 'ko' && (
              <p className="muted">한국어 번역 생성에 실패했습니다. 관리자 페이지에서 모델 권한을 확인해 주세요.</p>
            )}
            {translationStatus === 'FAILED' && lang === 'ja' && (
              <p className="muted">日本語訳の生成に失敗しました。管理画面でモデル権限を確認してください。</p>
            )}
            {translationStatus !== 'FAILED' && !anime?.isTranslated && (lang === 'ko' || lang === 'ja') && (
              <p className="muted">{t('translationPending')}</p>
            )}

            <div className="detail-meta-grid">
              <p><strong>{t('genre')}:</strong> {displayGenres.join(', ') || '-'}</p>
              <p><strong>{t('score')}:</strong> {scoreLabel}</p>
              <p><strong>{t('popularity')}:</strong> {anime.popularity || '-'}</p>
              <p><strong>{t('episodes')}:</strong> {anime.episodes || '-'}</p>
              <p><strong>{t('status')}:</strong> {displayStatus}</p>
              <p><strong>{t('season')}:</strong> {displaySeason} {anime.seasonYear || ''}</p>
              <p><strong>{t('format')}:</strong> {displayFormat}</p>
              <p><strong>Studio:</strong> {(anime.studios?.nodes || []).map((node) => node.name).join(', ') || '-'}</p>
            </div>

            <div className="detail-actions">
              <a href={anime.siteUrl} target="_blank" rel="noreferrer" className="button-primary">
                {t('officialInfo')}
              </a>
              {isAuthenticated && (
                <button type="button" className="button-secondary" onClick={handleToggleFavorite}>
                  {isFavorite ? t('unfavorite') : t('favorite')}
                </button>
              )}
            </div>

            {isAuthenticated ? (
              <div className="watch-status-box">
                <label>
                  {t('watchStatus')}
                  <select value={watchStatus} onChange={(event) => setWatchStatus(event.target.value)}>
                    {watchStatusOptions.map((status) => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </label>
                <button type="button" className="button-primary" onClick={handleSaveWatchStatus}>
                  {t('saveStatus')}
                </button>
              </div>
            ) : (
              <p className="muted auth-hint">
                {t('loginRequired')} <Link to="/login">{t('login')}</Link>
              </p>
            )}

            {actionMessage && <p className="page-message">{actionMessage}</p>}
          </div>
        </div>
      </section>

      {anime?.similarItems?.length > 0 && (
        <section className="anime-section">
          <h2>{t('similarAnime')}</h2>
          <div className="anime-grid">
            {anime.similarItems.map((item) => (
              <AnimeCard
                key={`${item.externalId || item.malId || item.id}-${item.provider || 'JIKAN'}`}
                anime={item}
                hideIfNoImage={false}
              />
            ))}
          </div>
        </section>
      )}

      <section className="anime-section">
        <h2>{t('reviews')}</h2>
        {isAuthenticated ? (
          <ReviewForm animeId={externalAnimeId} onSubmit={handleCreateReview} />
        ) : (
          <p className="muted">{t('loginRequired')}</p>
        )}
        <ReviewList reviews={reviews} currentUser={user} onEdit={handleEditReview} onDelete={handleDeleteReview} />
      </section>
    </div>
  );
}

export default AnimeDetail;

```

### File: `frontend/src/pages/Browse.jsx`

- size: `6,279` bytes

```jsx
﻿import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilters from '../components/SearchFilters';
import AnimeCard from '../components/AnimeCard';
import { animeApi } from '../api/animeApi';
import { toUserErrorMessage } from '../utils/error';
import { useLanguage } from '../context/LanguageContext';
import { isBlockedAnimeClientSide } from '../utils/contentSafety';

const emptyFilters = {
  keyword: '',
  genre: '',
  year: '',
  season: '',
  format: '',
  status: '',
  sort: 'POPULARITY_DESC',
};

function normalizeBrowseAnimeItem(anime) {
  const rawExternalId =
    anime?.routeId ??
    anime?.externalId ??
    anime?.malId ??
    anime?.animeExternalId ??
    anime?.animeIdExternal ??
    anime?.sourcePayload?.mal_id ??
    null;

  if (rawExternalId == null && anime?.id != null) {
    console.warn('[AniPick] route id missing; refusing to use internal id fallback', anime);
  }

  const numericExternalId = Number(rawExternalId);
  const normalizedRouteId =
    Number.isInteger(numericExternalId) && numericExternalId > 0 ? numericExternalId : null;

  const numericMalId = Number(anime?.malId ?? normalizedRouteId);
  const normalizedMalId = Number.isInteger(numericMalId) && numericMalId > 0 ? numericMalId : null;

  const normalizedAnime = {
    ...anime,
    externalId: normalizedRouteId,
    malId: normalizedMalId,
    routeId: normalizedRouteId,
  };

  if (!normalizedAnime.routeId && !normalizedAnime.externalId && !normalizedAnime.malId) {
    console.warn('[AniPick] missing route id in browse item', anime);
  }

  return normalizedAnime;
}

function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, lang } = useLanguage();
  const queryString = searchParams.toString();

  const initialFilters = useMemo(
    () => ({
      keyword: searchParams.get('keyword') || '',
      genre: searchParams.get('genre') || '',
      year: searchParams.get('year') || '',
      season: searchParams.get('season') || '',
      format: searchParams.get('format') || '',
      status: searchParams.get('status') || '',
      sort: searchParams.get('sort') || 'POPULARITY_DESC',
    }),
    [queryString, searchParams]
  );
  const initialPage = useMemo(() => Number(searchParams.get('page')) || 1, [queryString, searchParams]);

  const [filters, setFilters] = useState(initialFilters);
  const [submittedFilters, setSubmittedFilters] = useState(initialFilters);
  const [page, setPage] = useState(initialPage);
  const [result, setResult] = useState({ pageInfo: null, items: [] });
  const [fallbackMessage, setFallbackMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFilters(initialFilters);
    setSubmittedFilters(initialFilters);
    setPage(initialPage);
  }, [initialFilters, initialPage]);

  useEffect(() => {
    async function runSearch() {
      setLoading(true);
      setError('');

      try {
        const data = await animeApi.searchAnime({
          ...submittedFilters,
          page,
          perPage: 18,
        });
        const safeItems = (data.items || [])
          .filter((anime) => !isBlockedAnimeClientSide(anime))
          .map(normalizeBrowseAnimeItem);
        setResult({
          ...data,
          items: safeItems,
          pageInfo: data.pageInfo
            ? {
                ...data.pageInfo,
                total: Math.max(safeItems.length, data.pageInfo.total || 0),
              }
            : data.pageInfo,
        });
        setFallbackMessage(data?.isFallback ? t('externalFallback') : '');
      } catch (err) {
        setError(toUserErrorMessage(err, `${t('externalFallback')} ${t('retryGuide')}`));
      } finally {
        setLoading(false);
      }
    }

    runSearch();
  }, [submittedFilters, page, lang, t]);

  const writeParams = (nextFilters, nextPage) => {
    const next = new URLSearchParams();
    Object.entries(nextFilters).forEach(([key, value]) => {
      if (value) next.set(key, value);
    });
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  const submitSearch = () => {
    setSubmittedFilters(filters);
    setPage(1);
    writeParams(filters, 1);
  };

  const resetSearch = () => {
    setFilters(emptyFilters);
    setSubmittedFilters(emptyFilters);
    setPage(1);
    writeParams(emptyFilters, 1);
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < 1) return;
    if (result.pageInfo && nextPage > result.pageInfo.lastPage) return;

    setPage(nextPage);
    writeParams(submittedFilters, nextPage);
  };

  return (
    <div className="page-wrap">
      <div className="page-heading">
        <h1>{t('animeBrowseTitle')}</h1>
        <p>{t('animeBrowseHint')}</p>
      </div>

      <SearchFilters filters={filters} onChange={setFilters} onSubmit={submitSearch} onReset={resetSearch} />

      {loading && <p className="page-message">{t('loading')}</p>}
      {error && <p className="page-error">{error}</p>}
      {!loading && !error && fallbackMessage && <p className="page-message">{fallbackMessage}</p>}

      {!loading && !error && (
        <>
          {result.items.length === 0 ? (
            <div className="empty-state">
              <h2>{t('noResult')}</h2>
              <p>{t('retryGuide')}</p>
            </div>
          ) : (
            <div className="anime-grid">
              {result.items.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} hideIfNoImage={false} />
              ))}
            </div>
          )}

          <div className="pagination">
            <button type="button" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
              {t('prev')}
            </button>
            <span>
              {t('page')} {result.pageInfo?.currentPage || page} / {result.pageInfo?.lastPage || page}
            </span>
            <button
              type="button"
              onClick={() => handlePageChange(page + 1)}
              disabled={Boolean(result.pageInfo && !result.pageInfo.hasNextPage)}
            >
              {t('next')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Browse;

```

### File: `frontend/src/pages/Home.jsx`

- size: `6,056` bytes

```jsx
import { useEffect, useMemo, useState } from 'react';

import { animeApi } from '../api/animeApi';
import { normalizeAnimeRouteFields } from '../utils/animeRoute';
import TopTenAnimeRail from '../components/home/TopTenAnimeRail';
import HorizontalAnimeRail from '../components/home/HorizontalAnimeRail';
import AnimePosterCard from '../components/home/AnimePosterCard';
import '../styles/homeRails.css';

function isBlockedAnimeClientSide(anime) {
  const genres = Array.isArray(anime?.genres) ? anime.genres : [];
  const text = [
    anime?.displayTitle,
    anime?.title,
    anime?.romajiTitle,
    anime?.englishTitle,
    anime?.nativeTitle,
    anime?.description,
    anime?.format,
    anime?.status,
    ...genres,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return (
    text.includes('hentai') ||
    text.includes('erotica') ||
    text.includes('rx - hentai')
  );
}

function getItemsFromResponse(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.data)) return value.data;
  return [];
}

function hasImage(anime) {
  return Boolean(
    anime?.imageUrl ||
      anime?.animeImage ||
      anime?.coverImage?.extraLarge ||
      anime?.coverImage?.large ||
      anime?.coverImage?.medium
  );
}

function getScore(anime) {
  const value = Number(anime?.averageScore ?? anime?.meanScore ?? anime?.score ?? 0);
  return Number.isFinite(value) ? value : 0;
}

function normalizeHomeAnimeItem(anime) {
  return normalizeAnimeRouteFields(anime);
}

function dedupeByRouteId(items) {
  const seen = new Set();
  const result = [];

  for (const item of items) {
    const key = item?.routeId || item?.externalId || item?.malId || item?.id;
    if (!key) {
      result.push(item);
      continue;
    }

    if (seen.has(String(key))) continue;
    seen.add(String(key));
    result.push(item);
  }

  return result;
}

function sortQualityFirst(items) {
  return [...items].sort((a, b) => {
    const aImage = hasImage(a) ? 1 : 0;
    const bImage = hasImage(b) ? 1 : 0;

    if (aImage !== bImage) return bImage - aImage;

    return getScore(b) - getScore(a);
  });
}

function prepareItems(items, limit = 20) {
  return dedupeByRouteId(
    sortQualityFirst(
      getItemsFromResponse(items)
        .map(normalizeHomeAnimeItem)
        .filter((anime) => !isBlockedAnimeClientSide(anime))
    )
  ).slice(0, limit);
}

async function loadHomeData() {
  const calls = [];

  if (typeof animeApi.getTrending === 'function') {
    calls.push(['trending', animeApi.getTrending({ page: 1, perPage: 30 })]);
  }

  if (typeof animeApi.getPopularSeason === 'function') {
    calls.push(['season', animeApi.getPopularSeason({ page: 1, perPage: 30 })]);
  } else if (typeof animeApi.getPopularThisSeason === 'function') {
    calls.push(['season', animeApi.getPopularThisSeason({ page: 1, perPage: 30 })]);
  }

  if (typeof animeApi.searchAnime === 'function') {
    calls.push(['topRated', animeApi.searchAnime({ page: 1, perPage: 30, sort: 'SCORE_DESC' })]);
  }

  const settled = await Promise.allSettled(calls.map(([, promise]) => promise));
  const result = {
    trending: [],
    season: [],
    topRated: [],
    failedCount: 0,
  };

  settled.forEach((item, index) => {
    const key = calls[index][0];

    if (item.status === 'fulfilled') {
      result[key] = getItemsFromResponse(item.value);
    } else {
      result.failedCount += 1;
      console.warn(`[AniPick] home ${key} load failed`, item.reason);
    }
  });

  return result;
}

export default function Home() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [seasonItems, setSeasonItems] = useState([]);
  const [topRatedItems, setTopRatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let ignore = false;

    async function run() {
      setLoading(true);
      setMessage('');

      const data = await loadHomeData();

      if (ignore) return;

      setTrendingItems(prepareItems(data.trending, 30));
      setSeasonItems(prepareItems(data.season, 30));
      setTopRatedItems(prepareItems(data.topRated, 30));

      if (data.failedCount > 0) {
        setMessage('일부 애니메이션 정보를 불러오지 못했습니다.');
      }

      setLoading(false);
    }

    run();

    return () => {
      ignore = true;
    };
  }, []);

  const topTen = useMemo(() => trendingItems.slice(0, 10), [trendingItems]);
  const popular = useMemo(() => trendingItems.slice(0, 24), [trendingItems]);
  const season = useMemo(() => seasonItems.slice(0, 24), [seasonItems]);
  const topRated = useMemo(() => topRatedItems.slice(0, 24), [topRatedItems]);

  if (loading) {
    return (
      <main className="home-page">
        <section className="anime-rail-section">
          <div className="anime-rail-header">
            <h2>불러오는 중...</h2>
          </div>
          <div className="anime-rail-shell">
            <div className="anime-rail-viewport">
              <div className="anime-rail-track">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="anime-poster-card skeleton-card" />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="home-page">
      {message ? <p className="home-message">{message}</p> : null}

      <TopTenAnimeRail title="지금 뜨는 애니 TOP 10" items={topTen} />

      <HorizontalAnimeRail title="지금 인기 있는 애니" items={popular} />

      <HorizontalAnimeRail title="이번 시즌 인기작" items={season} />

      <HorizontalAnimeRail
        title="고평점 추천"
        items={topRated}
        renderItem={(anime, index) => (
          <AnimePosterCard
            key={anime.routeId || anime.externalId || anime.malId || anime.id || index}
            anime={anime}
          />
        )}
      />
    </main>
  );
}

```

### File: `frontend/src/pages/Login.jsx`

- size: `2,272` bytes

```jsx
﻿import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);

    try {
      const data = await authApi.login(form);
      login(data);
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>{t('login')}</h1>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            required
          />
        </label>

        {error && <p className="page-error">{error}</p>}

        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? t('loading') : t('login')}
        </button>

        <p>
          No account? <Link to="/register">{t('register')}</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

```

### File: `frontend/src/pages/MyPage.jsx`

- size: `7,530` bytes

```jsx
﻿import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import { favoriteApi } from '../api/favoriteApi';
import { watchStatusApi } from '../api/watchStatusApi';
import { animeApi } from '../api/animeApi';
import { reviewApi } from '../api/reviewApi';
import { getAnimePoster, PLACEHOLDER_POSTER } from '../utils/image';
import { toUserErrorMessage } from '../utils/error';
import { useLanguage } from '../context/LanguageContext';
import { getSafeAnimeTitle } from '../utils/title';

function getWatchStatusLabelMap(lang) {
  if (lang === 'en') {
    return {
      PLAN_TO_WATCH: 'Plan to Watch',
      WATCHING: 'Watching',
      COMPLETED: 'Completed',
      DROPPED: 'Dropped',
    };
  }

  if (lang === 'ja') {
    return {
      PLAN_TO_WATCH: '視聴予定',
      WATCHING: '視聴中',
      COMPLETED: '視聴完了',
      DROPPED: '中断',
    };
  }

  return {
    PLAN_TO_WATCH: '볼 예정',
    WATCHING: '보는 중',
    COMPLETED: '시청 완료',
    DROPPED: '중단',
  };
}

function StoredAnimeCard({ item, onDelete, deleteLabel, noTitleText, lang }) {
  const title = getSafeAnimeTitle(
    {
      displayTitle: item.animeTitleDisplay,
      animeTitle: item.animeTitle,
      animeId: item.animeId,
    },
    lang,
    `애니메이션 #${item.animeId || ''}`.trim() || noTitleText
  );
  const sourcePoster = getAnimePoster({ ...item, animeImage: item.animeImageDisplay || item.animeImage });
  if (!sourcePoster) return null;
  const poster = sourcePoster || PLACEHOLDER_POSTER;

  const handleImageError = (event) => {
    if (event.currentTarget.src !== PLACEHOLDER_POSTER) {
      event.currentTarget.src = PLACEHOLDER_POSTER;
    }
  };

  return (
    <article className="anime-card compact">
      <Link to={`/anime/${item.animeId}`}>
        <div className="anime-card-image-wrap">
          <img
            className="anime-card-image"
            src={poster}
            alt={title}
            loading="lazy"
            onError={handleImageError}
          />
        </div>
      </Link>
      <div className="anime-card-body">
        <h3 className="anime-card-title">{title}</h3>
        {item.status && <p className="anime-meta">{item.statusLabel || item.status}</p>}
        {onDelete && (
          <button type="button" className="button-small" onClick={() => onDelete(item.animeId)}>
            {deleteLabel}
          </button>
        )}
      </div>
    </article>
  );
}

function MyPage() {
  const { t, lang } = useLanguage();
  const watchStatusLabel = useMemo(() => getWatchStatusLabelMap(lang), [lang]);

  const [favorites, setFavorites] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [recommendation, setRecommendation] = useState({ type: '', genre: '', reason: '', items: [] });
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchMyData = async () => {
    setLoading(true);
    setError('');

    try {
      const [favData, watchData, recData, reviewData] = await Promise.all([
        favoriteApi.getFavorites(),
        watchStatusApi.getMyWatchStatus(),
        animeApi.getRecommendations({ perPage: 12 }),
        reviewApi.getMyReviews(),
      ]);

      setFavorites(favData.map((item) => ({ ...item, statusLabel: '' })));
      setWatchList(watchData.map((item) => ({ ...item, statusLabel: watchStatusLabel[item.status] || item.status })));
      setRecommendation(recData);
      setMyReviews(reviewData);
    } catch (err) {
      setError(toUserErrorMessage(err, `${t('externalFallback')} ${t('retryGuide')}`));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, [lang]);

  const groupedWatchStatus = useMemo(() => {
    const groups = {
      PLAN_TO_WATCH: [],
      WATCHING: [],
      COMPLETED: [],
      DROPPED: [],
    };

    watchList.forEach((item) => {
      groups[item.status]?.push(item);
    });
    return groups;
  }, [watchList]);

  const handleRemoveFavorite = async (animeId) => {
    await favoriteApi.removeFavorite(animeId);
    setFavorites((prev) => prev.filter((item) => item.animeId !== animeId));
    setMessage(t('removeFavoriteSuccess'));
  };

  const handleRemoveWatchStatus = async (animeId) => {
    await watchStatusApi.removeWatchStatus(animeId);
    setWatchList((prev) => prev.filter((item) => item.animeId !== animeId));
    setMessage(t('delete'));
  };

  if (loading) return <p className="page-message">{t('loading')}</p>;
  if (error) return <p className="page-error">{error}</p>;

  return (
    <div className="page-wrap">
      <div className="page-heading">
        <h1>{t('myPage')}</h1>
        <p>{t('profileHint')}</p>
      </div>

      {message && <p className="page-message">{message}</p>}

      <section className="anime-section">
        <h2>{t('favorites')}</h2>
        {!favorites.length && <p className="muted">{t('noData')}</p>}
        <div className="anime-grid">
          {favorites.map((fav) => (
            <StoredAnimeCard
              key={fav.id}
              item={fav}
              onDelete={handleRemoveFavorite}
              deleteLabel={t('delete')}
              noTitleText={t('noTitle')}
              lang={lang}
            />
          ))}
        </div>
      </section>

      <section className="anime-section">
        <h2>{t('watchGroups')}</h2>
        {Object.entries(groupedWatchStatus).map(([status, items]) => (
          <div key={status} className="watch-group">
            <h3>{watchStatusLabel[status] || status}</h3>
            {!items.length ? (
              <p className="muted">{t('noData')}</p>
            ) : (
              <div className="anime-grid">
                {items.map((item) => (
                  <StoredAnimeCard
                    key={item.id}
                    item={item}
                    onDelete={handleRemoveWatchStatus}
                    deleteLabel={t('delete')}
                    noTitleText={t('noTitle')}
                    lang={lang}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="anime-section">
        <h2>{t('recommendation')}</h2>
        {recommendation?.isFallback && <p className="page-message">{t('externalFallback')}</p>}
        {recommendation.reason ? (
          <p className="muted">{recommendation.reason}</p>
        ) : (
          <p className="muted">{t('noData')}</p>
        )}
        <div className="anime-grid">
          {(recommendation.items || []).map((anime) => (
            <AnimeCard key={anime.id} anime={anime} hideIfNoImage={false} />
          ))}
        </div>
      </section>

      <section className="anime-section">
        <h2>{t('myReviews')}</h2>
        {!myReviews.length && <p className="muted">{t('noReviews')}</p>}
        <div className="review-list">
          {myReviews.map((review) => (
            <article key={review.id} className="review-item">
              <div className="review-head">
                <Link to={`/anime/${review.animeId}`}>{t('title')} ID: {review.animeId}</Link>
                <span>{t('rating')} {review.rating}/5</span>
              </div>
              <p>{review.content}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyPage;

```

### File: `frontend/src/pages/NotFound.jsx`

- size: `312` bytes

```jsx
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="empty-state">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link className="button-primary" to="/">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;

```

### File: `frontend/src/pages/Register.jsx`

- size: `3,331` bytes

```jsx
﻿import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

function Register() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const email = form.email.trim();
    const nickname = form.nickname.trim();

    if (!email || !nickname || !form.password || !form.confirmPassword) {
      setError('Email, nickname, password, and password confirmation are required.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Password and confirmation do not match.');
      return;
    }

    setLoading(true);

    try {
      const data = await authApi.register({
        email,
        nickname,
        password: form.password,
      });
      login(data);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>{t('register')}</h1>

        <label>
          Nickname
          <input
            type="text"
            value={form.nickname}
            onChange={(event) => setForm((prev) => ({ ...prev, nickname: event.target.value }))}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            minLength={6}
            required
          />
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
            minLength={6}
            required
          />
        </label>

        {error && <p className="page-error">{error}</p>}

        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? t('loading') : t('register')}
        </button>

        <p>
          Already registered? <Link to="/login">{t('login')}</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;

```

### File: `frontend/src/styles/global.css`

- size: `22,867` bytes

```css
:root {
  color-scheme: dark;

  --bg-page: #06111f;
  --bg-page-soft: #081a2d;
  --bg-panel: rgba(15, 23, 42, 0.56);
  --bg-panel-strong: rgba(2, 6, 23, 0.78);
  --bg-card: rgba(255, 255, 255, 0.075);
  --bg-card-hover: rgba(255, 255, 255, 0.11);

  --text-main: #f8fafc;
  --text-strong: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.72);
  --text-subtle: rgba(255, 255, 255, 0.54);

  --border-soft: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.18);

  --accent: #5eead4;
  --accent-2: #38bdf8;
  --accent-3: #818cf8;

  --shadow-soft: 0 18px 48px rgba(0, 0, 0, 0.22);
  --shadow-card: 0 18px 42px rgba(0, 0, 0, 0.36);

  --glass-blur: blur(18px);
  --radius-panel: 28px;
  --radius-card: 16px;

  /* backward-compatible aliases used in existing styles */
  --bg: var(--bg-page);
  --surface: var(--bg-panel);
  --surface-2: var(--bg-card);
  --text: var(--text-main);
  --muted: var(--text-muted);
  --primary: var(--accent-2);
  --primary-hover: #67cdfc;
  --border: var(--border-soft);
  --danger: #ff8a9a;
  --shadow: var(--shadow-soft);
  --blur: var(--glass-blur);
  --radius-sm: 12px;
  --radius-md: var(--radius-card);
  --radius-lg: var(--radius-panel);
}

html[data-theme='light'] {
  color-scheme: light;

  --bg-page: #eef7fb;
  --bg-page-soft: #f8fbff;
  --bg-panel: rgba(255, 255, 255, 0.64);
  --bg-panel-strong: rgba(255, 255, 255, 0.82);
  --bg-card: rgba(255, 255, 255, 0.72);
  --bg-card-hover: rgba(255, 255, 255, 0.92);

  --text-main: #0f172a;
  --text-strong: #020617;
  --text-muted: rgba(15, 23, 42, 0.72);
  --text-subtle: rgba(15, 23, 42, 0.52);

  --border-soft: rgba(15, 23, 42, 0.1);
  --border-strong: rgba(15, 23, 42, 0.16);

  --accent: #0f766e;
  --accent-2: #0284c7;
  --accent-3: #4f46e5;

  --shadow-soft: 0 18px 48px rgba(15, 23, 42, 0.12);
  --shadow-card: 0 18px 42px rgba(15, 23, 42, 0.18);

  --primary: var(--accent-2);
  --primary-hover: #0369a1;
  --border: var(--border-soft);
  --danger: #b42333;
}

html[data-theme='dark'] {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: var(--bg-page);
  color: var(--text-main);
  transition: background-color 180ms ease, color 180ms ease;
}

a {
  color: inherit;
  text-decoration: none;
}

.app-main {
  width: min(1280px, 94%);
  margin: 0 auto;
  padding: 24px 0 48px;
}

.page-wrap {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-heading h1 {
  margin: 0 0 6px;
}

.page-heading p {
  margin: 0;
  color: var(--muted);
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: linear-gradient(135deg, #102947 0%, #0d1f38 100%);
  color: #dce7f5;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-inner {
  width: min(1280px, 94%);
  margin: 0 auto;
  min-height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.logo {
  font-size: 1.45rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #ffffff;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.nav-links a {
  padding: 6px 9px;
  border-radius: 8px;
  color: #dce7f5;
}

.nav-links a.active,
.nav-links a:hover {
  background: rgba(255, 255, 255, 0.14);
}

.auth-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--border-soft);
  color: var(--text-main);
  background: var(--bg-panel);
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition:
    transform 160ms ease,
    background 160ms ease,
    border-color 160ms ease,
    color 160ms ease;
}

.theme-toggle:hover {
  transform: translateY(-1px);
  background: var(--bg-card-hover);
  border-color: var(--border-strong);
}

.theme-toggle-icon {
  display: inline-grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 16px;
  line-height: 1;
}

.theme-toggle-text {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: -0.01em;
}

.lang-menu-wrap {
  position: relative;
}

.lang-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 132px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 6px;
  box-shadow: var(--shadow);
  z-index: 30;
}

.lang-option {
  width: 100%;
  text-align: left;
  background: transparent;
  border: 0;
  padding: 8px 10px;
  border-radius: 8px;
  color: var(--text);
}

.lang-option:hover,
.lang-option.active {
  background: #eef4fb;
}

.nickname {
  font-size: 0.9rem;
  color: #c7d8ef;
}

.hero-card,
.anime-section,
.detail-hero,
.auth-form {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow);
}

.hero-card h1 {
  margin: 0 0 8px;
  font-size: 2rem;
}

.hero-card p {
  margin: 0 0 16px;
  color: var(--muted);
}

.search-filters {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  align-items: end;
}

.search-filters label,
.auth-form label,
.review-form label,
.watch-status-box label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
  font-size: 0.9rem;
}

input,
select,
textarea,
button {
  font: inherit;
}

input,
select,
textarea {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  padding: 10px 12px;
}

textarea {
  resize: vertical;
}

button,
.button-primary,
.button-outline,
.button-secondary,
.button-small {
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 600;
}

.button-primary,
button.button-primary {
  background: var(--primary);
  color: #fff;
}

.button-primary:hover,
button.button-primary:hover {
  background: var(--primary-hover);
}

.button-outline {
  background: transparent;
  color: inherit;
  border-color: rgba(255, 255, 255, 0.35);
}

.button-secondary {
  background: #eef4fb;
  color: var(--text);
  border-color: var(--border);
}

.button-secondary:hover,
.button-small:hover {
  background: #dfeaf7;
}

.button-small {
  width: 100%;
  margin-top: 10px;
  padding: 8px 10px;
  background: #f1f6fd;
  color: var(--text);
  border-color: var(--border);
}

.filter-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.anime-grid {
  margin-top: 14px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
}

.anime-card {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.anime-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 24px rgba(23, 58, 99, 0.16);
}

.anime-card-image-wrap {
  position: relative;
  width: 100%;
  padding-top: 140%;
  background: #dce5f3;
}

.anime-card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.anime-card-body {
  padding: 12px;
}

.anime-card-title {
  margin: 0 0 8px;
  font-size: 0.95rem;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.anime-card-description {
  margin: 0 0 8px;
  color: var(--muted);
  font-size: 0.8rem;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.translation-badge {
  display: inline-flex;
  width: fit-content;
  margin: 0 0 8px;
  padding: 3px 7px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #eef4fb;
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 700;
}

.translation-badge.failed {
  border-color: #f1b8bf;
  background: #fff0f2;
  color: var(--danger);
}

.anime-meta {
  margin: 0;
  font-size: 0.82rem;
  color: var(--muted);
}

.section-header h2,
.anime-section h2,
.anime-section h3 {
  margin: 0;
}

.detail-banner {
  width: 100%;
  max-height: 270px;
  object-fit: cover;
  border-radius: 12px;
}

.detail-main {
  margin-top: 16px;
  display: grid;
  gap: 16px;
  grid-template-columns: 240px 1fr;
}

.detail-cover {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.detail-info h1 {
  margin: 0 0 8px;
}

.description {
  color: #253a57;
  line-height: 1.6;
}

.detail-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px 14px;
}

.detail-meta-grid p {
  margin: 0;
}

.detail-actions {
  margin-top: 14px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.watch-status-box {
  margin-top: 14px;
  display: flex;
  gap: 10px;
  align-items: end;
  flex-wrap: wrap;
}

.auth-hint a,
.auth-form a,
.review-head a {
  color: var(--accent);
  font-weight: 700;
}

.review-form {
  margin: 14px 0;
  display: grid;
  gap: 12px;
}

.review-form h3 {
  margin: 0;
}

.review-list {
  display: grid;
  gap: 12px;
}

.review-item {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px;
  background: #fff;
}

.review-item p {
  margin-bottom: 0;
}

.review-head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.review-actions {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}

.review-actions button,
.review-item button,
.pagination button {
  background: #f1f6fd;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 8px 10px;
  border-radius: 8px;
}

.pagination {
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.empty-state {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow);
}

.empty-state h1,
.empty-state h2 {
  margin: 0 0 8px;
}

.empty-state p {
  margin: 0 0 14px;
  color: var(--muted);
}

.placeholder {
  display: grid;
  place-items: center;
  color: var(--muted);
  font-weight: 700;
}

.auth-page {
  display: flex;
  justify-content: center;
}

.auth-form {
  width: min(460px, 100%);
  display: grid;
  gap: 12px;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  border-bottom: 1px solid var(--border);
  padding: 10px;
}

.simple-list {
  margin: 8px 0 0;
  padding-left: 18px;
}

.page-message {
  color: var(--muted);
}

.page-error {
  color: var(--danger);
  font-weight: 600;
}

.muted {
  color: var(--muted);
}

@media (max-width: 980px) {
  .detail-main {
    grid-template-columns: 1fr;
  }

  .detail-cover {
    width: min(300px, 100%);
  }
}

@media (max-width: 780px) {
  .navbar-inner {
    flex-wrap: wrap;
    padding: 10px 0;
  }

  .nav-links {
    width: 100%;
  }

  .auth-actions {
    margin-left: auto;
  }

  .theme-toggle-text {
    display: none;
  }

  .theme-toggle {
    width: 40px;
    justify-content: center;
    padding-inline: 0;
  }

  .search-filters {
    grid-template-columns: 1fr;
  }

  .filter-actions {
    align-items: stretch;
  }

  .filter-actions button {
    flex: 1;
  }
}

/* Premium glassmorphism redesign */

body {
  min-height: 100vh;
  background:
    radial-gradient(circle at 14% 8%, rgba(56, 189, 248, 0.16), transparent 34%),
    radial-gradient(circle at 86% 12%, rgba(94, 234, 212, 0.13), transparent 32%),
    linear-gradient(150deg, var(--bg-page) 0%, var(--bg-page-soft) 46%, var(--bg-page) 100%);
  color: var(--text-main);
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.65), transparent 72%);
}

.app-main {
  padding-top: 28px;
}

.navbar {
  background: var(--bg-panel-strong);
  border-bottom: 1px solid var(--border-soft);
  box-shadow: var(--shadow-soft);
  backdrop-filter: var(--glass-blur);
}

.logo {
  color: var(--text-strong);
}

.nav-links a,
.button-outline,
.nav-register {
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.nav-links a {
  color: var(--text-muted);
  border: 1px solid transparent;
}

.nav-links a.active,
.nav-links a:hover {
  color: var(--text-strong);
  background: var(--bg-card-hover);
  border-color: var(--border-strong);
}

.nickname {
  color: var(--text-muted);
}

.lang-dropdown,
.hero-card,
.anime-section,
.detail-hero,
.auth-form,
.empty-state,
.review-item,
.anime-card {
  background: linear-gradient(145deg, var(--bg-card-hover), var(--bg-card));
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow);
  backdrop-filter: var(--glass-blur);
}

.hero-card,
.anime-section,
.detail-hero,
.auth-form,
.empty-state {
  border-radius: var(--radius-lg);
}

.review-item,
.anime-card {
  border-radius: var(--radius-md);
}

.page-heading p,
.hero-card p,
.anime-meta,
.muted,
.page-message {
  color: var(--muted);
}

input,
select,
textarea {
  min-height: 44px;
  background: var(--bg-panel);
  border: 1px solid var(--border-soft);
  color: var(--text-main);
  border-radius: var(--radius-sm);
  outline: none;
}

input::placeholder,
textarea::placeholder {
  color: var(--text-subtle);
}

select option {
  color: var(--text-strong);
}

input:focus-visible,
select:focus-visible,
textarea:focus-visible,
button:focus-visible,
a:focus-visible {
  outline: 2px solid rgba(124, 199, 255, 0.82);
  outline-offset: 3px;
}

button,
.button-primary,
.button-outline,
.button-secondary,
.button-small {
  border-radius: var(--radius-sm);
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.button-primary,
button.button-primary {
  background: linear-gradient(135deg, var(--accent-2), var(--accent));
  color: var(--text-strong);
  border-color: var(--border-soft);
  box-shadow: var(--shadow-soft);
}

.button-primary:hover,
button.button-primary:hover,
.button-secondary:hover,
.button-outline:hover {
  transform: translateY(-1px);
}

.button-secondary,
.button-small,
.review-actions button,
.review-item button,
.pagination button {
  background: var(--bg-card);
  color: var(--text-main);
  border-color: var(--border-soft);
}

.button-outline {
  background: var(--bg-card);
  color: var(--text-main);
  border-color: var(--border-soft);
}

.lang-option {
  color: var(--text);
}

.lang-option:hover,
.lang-option.active {
  background: rgba(124, 199, 255, 0.18);
}

.search-filters {
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 14px;
}

.filter-actions {
  min-height: 44px;
}

.anime-grid {
  gap: 18px;
}

.anime-card-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.anime-card-link.is-disabled {
  display: block;
  cursor: not-allowed;
  opacity: 0.72;
}

.anime-card {
  overflow: hidden;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.07));
}

.anime-card-link:hover .anime-card,
.anime-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 24px 55px rgba(0, 0, 0, 0.34);
}

.anime-card-image-wrap {
  aspect-ratio: 2 / 3;
  padding-top: 0;
  background: rgba(255, 255, 255, 0.08);
}

.anime-card-image {
  object-fit: cover;
}

.anime-card-body {
  display: grid;
  gap: 8px;
  padding: 14px;
}

.anime-card-title {
  margin: 0;
  color: #ffffff;
}

.anime-card-badges,
.detail-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.glass-badge,
.translation-badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 24px;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.1);
  color: #dce9f8;
  font-size: 0.74rem;
  font-weight: 700;
}

.glass-badge-accent {
  background: rgba(132, 240, 208, 0.16);
  color: #c5fff0;
  border-color: rgba(132, 240, 208, 0.32);
}

.glass-badge-muted {
  color: var(--muted);
}

.glass-badge-danger,
.translation-badge.failed {
  background: rgba(255, 138, 154, 0.14);
  color: #ffd4da;
  border-color: rgba(255, 138, 154, 0.38);
}

.hero-media {
  position: relative;
  display: grid;
  place-items: center;
  min-height: clamp(280px, 38vw, 520px);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: var(--shadow);
  isolation: isolate;
}

.hero-media-home {
  min-height: clamp(420px, 52vw, 660px);
}

.hero-media-bg {
  position: absolute;
  inset: -30px;
  background-position: center;
  background-size: cover;
  filter: blur(24px) saturate(1.1);
  transform: scale(1.08);
  opacity: 0.32;
  z-index: -3;
}

.hero-media-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 70% 35%, rgba(125, 92, 255, 0.22), transparent 38%),
    linear-gradient(90deg, rgba(2, 6, 23, 0.92), rgba(2, 6, 23, 0.62), rgba(2, 6, 23, 0.82));
  z-index: -2;
}

.hero-media-layout {
  width: min(92%, 1180px);
  min-height: calc(100% - 56px);
  padding: clamp(20px, 3.2vw, 34px) 0;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 420px);
  gap: clamp(24px, 5vw, 72px);
  align-items: center;
}

.hero-media-frame {
  width: min(92%, 1120px);
  height: calc(100% - 56px);
  min-height: 220px;
  display: grid;
  place-items: center;
  padding: clamp(18px, 3vw, 36px);
}

.hero-media-image {
  width: 100%;
  height: 100%;
  max-height: clamp(210px, 32vw, 430px);
  object-fit: contain;
  filter: drop-shadow(0 20px 42px rgba(0, 0, 0, 0.34));
}

.hero-media-content {
  position: absolute;
  left: clamp(18px, 5vw, 64px);
  bottom: clamp(18px, 5vw, 58px);
  width: min(620px, calc(100% - 36px));
  z-index: 1;
}

.hero-media-home .hero-media-content {
  position: relative;
  left: auto;
  right: auto;
  bottom: auto;
  width: 100%;
  z-index: 3;
}

.hero-media-copy-panel {
  padding: clamp(24px, 4vw, 56px);
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(2, 8, 23, 0.78), rgba(15, 23, 42, 0.48));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28);
}

.hero-media-home .hero-media-frame {
  width: 100%;
  height: auto;
  min-height: auto;
  padding: 0;
  justify-self: center;
  z-index: 2;
}

.hero-media-poster-wrap {
  width: clamp(220px, 28vw, 360px);
  max-height: 520px;
  aspect-ratio: 2 / 3;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.34);
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(3, 12, 24, 0.32);
}

.hero-media-home .hero-media-image {
  width: 100%;
  height: 100%;
  max-height: none;
  object-fit: cover;
  filter: none;
}

.home-hero-copy {
  display: grid;
  gap: 12px;
}

.home-hero-copy h1 {
  margin: 0;
  max-width: 12ch;
  font-size: clamp(2rem, 5vw, 4.5rem);
  line-height: 1;
}

.home-hero-copy p {
  max-width: 62ch;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.65;
}

.home-hero-copy .anime-meta {
  color: rgba(255, 255, 255, 0.78);
}

.home-hero-cta {
  width: fit-content;
  min-width: 140px;
  max-width: 220px;
  justify-content: center;
}

.detail-hero {
  padding: clamp(18px, 3vw, 30px);
}

.detail-main {
  margin-top: 0;
  grid-template-columns: minmax(190px, 260px) minmax(0, 1fr);
  gap: clamp(18px, 3vw, 34px);
  align-items: start;
}

.detail-poster-shell {
  position: sticky;
  top: 92px;
  padding: 10px;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--glass-border);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.28);
}

.detail-cover {
  aspect-ratio: 2 / 3;
  height: auto;
  object-fit: cover;
  border-radius: calc(var(--radius-md) - 4px);
  border-color: rgba(255, 255, 255, 0.24);
}

.detail-info {
  max-width: 880px;
}

.detail-info h1 {
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1.08;
  margin-bottom: 12px;
}

.detail-info p {
  color: var(--muted);
}

.description {
  color: #e2ecf8;
  line-height: 1.78;
  max-width: 78ch;
}

.detail-meta-grid {
  margin-top: 18px;
}

.detail-meta-grid p,
.review-item,
td,
th {
  color: #d9e6f8;
}

.detail-actions,
.watch-status-box {
  margin-top: 18px;
}

.page-error {
  color: #ffd1d8;
}

@media (max-width: 980px) {
  .hero-media {
    min-height: clamp(240px, 48vw, 420px);
  }

  .hero-media-home {
    min-height: clamp(360px, 70vw, 560px);
  }

  .detail-main {
    grid-template-columns: minmax(160px, 220px) minmax(0, 1fr);
  }
}

@media (max-width: 780px) {
  .app-main {
    width: min(100% - 24px, 1280px);
  }

  .hero-media {
    min-height: 300px;
  }

  .hero-media-frame {
    width: 100%;
    height: 72%;
    padding: 18px;
  }

  .hero-media-layout {
    width: calc(100% - 24px);
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 14px 0 22px;
  }

  .hero-media-home .hero-media-content {
    order: 1;
  }

  .hero-media-home .hero-media-frame {
    order: 2;
    justify-self: start;
  }

  .hero-media-copy-panel {
    width: 100%;
    padding: 20px 18px;
    border-radius: 18px;
  }

  .hero-media-poster-wrap {
    width: min(58vw, 240px);
    max-height: 360px;
  }

  .hero-media-content {
    left: 18px;
    right: 18px;
    bottom: 18px;
    width: auto;
  }

  .hero-media-home .hero-media-content {
    left: auto;
    right: auto;
    bottom: auto;
    width: 100%;
  }

  .home-hero-copy h1 {
    font-size: clamp(1.8rem, 10vw, 3rem);
  }

  .detail-main {
    grid-template-columns: 1fr;
  }

  .detail-poster-shell {
    position: relative;
    top: auto;
    width: min(240px, 78vw);
  }

  .detail-info h1 {
    font-size: 2rem;
  }
}

html[data-theme='light'] body::before {
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
}

html[data-theme='light'] .home-hero-copy p,
html[data-theme='light'] .anime-meta,
html[data-theme='light'] .description,
html[data-theme='light'] .detail-meta-grid p,
html[data-theme='light'] .top10-score,
html[data-theme='light'] .anime-poster-card-score,
html[data-theme='light'] .anime-poster-card-genres,
html[data-theme='light'] .anime-poster-card-meta {
  color: var(--text-muted);
}

html[data-theme='light'] .anime-card-title,
html[data-theme='light'] .top10-title,
html[data-theme='light'] .anime-poster-card-title,
html[data-theme='light'] .hero-media-copy-panel h1,
html[data-theme='light'] .logo {
  color: var(--text-strong);
  text-shadow: none;
}

```

### File: `frontend/src/styles/homeRails.css`

- size: `11,870` bytes

```css
html,
body,
#root {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
}

.home-page {
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  padding-block: 34px 90px;
  color: var(--text-main);
  background:
    radial-gradient(circle at 12% 8%, rgba(45, 212, 191, 0.2), transparent 28%),
    radial-gradient(circle at 88% 0%, rgba(99, 102, 241, 0.24), transparent 34%),
    radial-gradient(circle at 50% 60%, rgba(14, 165, 233, 0.1), transparent 42%),
    linear-gradient(135deg, var(--bg-page) 0%, var(--bg-page-soft) 44%, var(--bg-page) 100%);
}

html[data-theme='light'] .home-page {
  background:
    radial-gradient(circle at 12% 8%, rgba(2, 132, 199, 0.12), transparent 32%),
    radial-gradient(circle at 88% 0%, rgba(79, 70, 229, 0.12), transparent 36%),
    linear-gradient(135deg, var(--bg-page) 0%, var(--bg-page-soft) 52%, var(--bg-page) 100%);
}

.home-page::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.027) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.027) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), transparent 82%);
}

html[data-theme='light'] .home-page::before {
  background:
    linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
}

.home-page > * {
  position: relative;
  z-index: 1;
}

.home-message {
  width: min(1320px, calc(100vw - 32px));
  margin: 0 auto 24px;
  padding: 14px 18px;
  border-radius: 18px;
  color: var(--text-muted);
  background: var(--bg-panel);
  border: 1px solid var(--border-soft);
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-soft);
}

.anime-rail-section {
  position: relative;
  width: min(1320px, calc(100vw - 32px));
  max-width: 100%;
  margin: 0 auto clamp(48px, 6vw, 82px);
  overflow: hidden;
  padding: clamp(18px, 2vw, 26px);
  border-radius: clamp(24px, 3vw, 34px);
  background: linear-gradient(135deg, var(--bg-card-hover), var(--bg-card));
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow-soft);
  backdrop-filter: var(--glass-blur);
}

.anime-rail-section::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    radial-gradient(circle at 15% 0%, rgba(45, 212, 191, 0.16), transparent 30%),
    radial-gradient(circle at 95% 0%, rgba(99, 102, 241, 0.15), transparent 34%),
    linear-gradient(90deg, rgba(255, 255, 255, 0.055), transparent 38%, rgba(255, 255, 255, 0.032));
}

html[data-theme='light'] .anime-rail-section::before {
  background:
    radial-gradient(circle at 15% 0%, rgba(2, 132, 199, 0.12), transparent 30%),
    radial-gradient(circle at 95% 0%, rgba(79, 70, 229, 0.11), transparent 34%);
}

.anime-rail-section > * {
  position: relative;
  z-index: 1;
}

.anime-rail-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: clamp(18px, 2.2vw, 28px);
  padding: clamp(16px, 2vw, 24px) clamp(16px, 2.4vw, 30px);
  border-radius: 24px;
  background: var(--bg-panel-strong);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow-soft);
  backdrop-filter: var(--glass-blur);
  overflow: hidden;
}

.anime-rail-header::before {
  content: '';
  position: absolute;
  left: clamp(16px, 2.4vw, 30px);
  top: 50%;
  width: 5px;
  height: calc(100% - 28px);
  min-height: 32px;
  transform: translateY(-50%);
  border-radius: 999px;
  background: linear-gradient(180deg, var(--accent), var(--accent-2), var(--accent-3));
}

.anime-rail-header h2 {
  position: relative;
  margin: 0;
  padding-left: clamp(18px, 2vw, 26px);
  max-width: min(760px, 80%);
  font-size: clamp(25px, 3.1vw, 44px);
  line-height: 1.05;
  font-weight: 950;
  letter-spacing: -0.055em;
  color: var(--text-strong);
}

.top10-rail-section {
  width: min(1360px, calc(100vw - 32px));
}

.top10-rail-section .anime-rail-header h2 {
  font-size: clamp(30px, 3.8vw, 54px);
}

.top10-rail-section .anime-rail-header h2::before {
  content: 'TOP 10';
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;
  padding: 6px 12px;
  transform: translateY(-5px);
  border-radius: 999px;
  font-size: clamp(12px, 1vw, 14px);
  line-height: 1;
  font-weight: 950;
  letter-spacing: 0.04em;
  color: var(--bg-page);
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}

.anime-rail-shell {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.anime-rail-viewport {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
  touch-action: pan-x;
  overscroll-behavior-inline: contain;
}

.anime-rail-viewport::-webkit-scrollbar {
  display: none;
}

.anime-rail-viewport.is-dragging {
  cursor: grabbing;
  user-select: none;
  scroll-behavior: auto;
}

.anime-rail-viewport.is-dragging .anime-poster-card,
.anime-rail-viewport.is-dragging .top10-card {
  pointer-events: none;
}

.anime-rail-track {
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  gap: clamp(16px, 1.8vw, 28px);
  width: max-content;
  min-width: 100%;
  padding: 6px 8px 20px;
}

.rail-nav {
  position: absolute;
  top: 6px;
  bottom: 20px;
  z-index: 30;
  width: clamp(44px, 4vw, 64px);
  border: 0;
  color: var(--text-strong);
  background: var(--bg-panel-strong);
  border: 1px solid var(--border-soft);
  backdrop-filter: var(--glass-blur);
  cursor: pointer;
  font-size: clamp(30px, 4vw, 54px);
  font-weight: 900;
  display: grid;
  place-items: center;
  transition: background 160ms ease, transform 160ms ease, opacity 160ms ease;
}

.rail-nav:hover {
  background: var(--bg-card-hover);
  transform: scale(1.025);
}

.rail-nav-left {
  left: 0;
  border-radius: 0 20px 20px 0;
}

.rail-nav-right {
  right: 0;
  border-radius: 20px 0 0 20px;
}

html[data-theme='light'] .rail-nav {
  color: #0f172a;
  background: rgba(255, 255, 255, 0.78);
}

.anime-poster-card {
  position: relative;
  display: block;
  flex: 0 0 clamp(150px, 13vw, 210px);
  width: clamp(150px, 13vw, 210px);
  max-width: clamp(150px, 13vw, 210px);
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: transform 180ms ease, filter 180ms ease;
}

.anime-poster-card:hover {
  transform: translateY(-7px) scale(1.035);
  filter: brightness(1.08);
}

.anime-poster-card.is-disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.anime-poster-card-imageWrap {
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border-radius: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow-card);
}

.anime-poster-card-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.anime-poster-card-info {
  padding-top: 12px;
}

.anime-poster-card-title {
  margin: 0 0 8px;
  min-height: 2.5em;
  font-size: clamp(14px, 1.05vw, 17px);
  line-height: 1.25;
  font-weight: 850;
  color: var(--text-strong);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.anime-poster-card-score,
.anime-poster-card-genres,
.anime-poster-card-meta {
  margin: 4px 0 0;
  font-size: 13px;
  line-height: 1.35;
  color: var(--text-muted);
}

.top10-rail-track {
  gap: clamp(36px, 4vw, 72px);
  padding-top: 8px;
}

.top10-card {
  position: relative;
  isolation: isolate;
  display: block;
  flex: 0 0 clamp(260px, 26vw, 390px);
  width: clamp(260px, 26vw, 390px);
  height: clamp(300px, 31vw, 430px);
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: transform 180ms ease, filter 180ms ease;
}

.top10-card:hover {
  transform: translateY(-7px);
  filter: brightness(1.08);
}

.top10-card.is-disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.top10-rank {
    position: absolute;
    left: 0;
    bottom: 38px;
    z-index: 1;
    font-size: clamp(112px, 13vw, 190px);
    font-weight: 950;
    line-height: 0.8;
    color: rgba(0, 0, 0, 0.88);
    -webkit-text-stroke: 3px rgba(255, 255, 255, 0.72);
    text-shadow:
            0 16px 34px rgba(0, 0, 0, 0.58),
            0 0 28px rgba(56, 189, 248, 0.16);
    pointer-events: none;
}

html[data-theme="light"] .top10-rank {
    color: rgba(0, 0, 0, 0.86);
    -webkit-text-stroke: 3px rgba(255, 255, 255, 0.82);
    text-shadow:
            0 12px 28px rgba(15, 23, 42, 0.18),
            0 0 18px rgba(255, 255, 255, 0.42);
}

html[data-theme="dark"] .top10-rank {
    color: rgba(0, 0, 0, 0.92);
    -webkit-text-stroke: 3px rgba(255, 255, 255, 0.72);
    text-shadow:
            0 16px 34px rgba(0, 0, 0, 0.62),
            0 0 28px rgba(56, 189, 248, 0.18);
}

html[data-theme='light'] .top10-rank {
  -webkit-text-stroke: 3px rgba(15, 23, 42, 0.3);
  text-shadow: 0 12px 28px rgba(15, 23, 42, 0.18);
}

.top10-posterWrap {
  position: absolute;
  right: clamp(8px, 2vw, 28px);
  top: 0;
  z-index: 2;
  width: clamp(150px, 14vw, 215px);
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border-radius: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow-card);
}

.top10-poster {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.top10-info {
  position: absolute;
  left: clamp(70px, 7vw, 116px);
  right: 8px;
  bottom: 0;
  z-index: 3;
  padding: 12px 14px;
  border-radius: 18px;
  background: var(--bg-panel-strong);
  border: 1px solid var(--border-soft);
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-soft);
}

html[data-theme='light'] .top10-info {
  background: rgba(255, 255, 255, 0.74);
}

.top10-title {
  margin: 0 0 8px;
  font-size: clamp(14px, 1.1vw, 18px);
  line-height: 1.25;
  font-weight: 900;
  color: var(--text-strong);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.top10-score {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
}

.top10-rank,
.anime-card-overlay,
.card-gradient-overlay {
  pointer-events: none;
}

.skeleton-card {
  height: 315px;
  border-radius: 16px;
  background: linear-gradient(90deg, var(--bg-card), var(--bg-card-hover), var(--bg-card));
  background-size: 200% 100%;
  animation: anipick-skeleton 1.2s ease-in-out infinite;
}

@keyframes anipick-skeleton {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding-block: 20px 64px;
  }

  .anime-rail-section,
  .top10-rail-section {
    width: calc(100vw - 24px);
    padding: 14px;
    border-radius: 24px;
  }

  .anime-rail-header {
    padding: 15px 16px;
    border-radius: 20px;
    margin-bottom: 18px;
  }

  .anime-rail-header::before {
    left: 14px;
    width: 4px;
    height: calc(100% - 26px);
  }

  .anime-rail-header h2 {
    max-width: 100%;
    padding-left: 18px;
    font-size: clamp(23px, 7vw, 34px);
    letter-spacing: -0.05em;
  }

  .top10-rail-section .anime-rail-header h2 {
    font-size: clamp(25px, 8vw, 38px);
  }

  .top10-rail-section .anime-rail-header h2::before {
    display: flex;
    width: fit-content;
    margin: 0 0 10px;
    transform: none;
  }

  .rail-nav {
    display: none;
  }

  .anime-poster-card {
    flex-basis: 142px;
    width: 142px;
    max-width: 142px;
  }

  .top10-card {
    flex-basis: 240px;
    width: 240px;
    height: 320px;
  }

  .top10-posterWrap {
    width: 150px;
  }

  .top10-rank {
    font-size: 116px;
  }

  .top10-info {
    left: 58px;
    padding: 10px 12px;
  }
}

```

### File: `frontend/src/utils/animeRoute.js`

- size: `648` bytes

```javascript
export function getAnimeRouteId(anime) {
  const candidates = [
    anime?.routeId,
    anime?.externalId,
    anime?.malId,
    anime?.animeExternalId,
    anime?.animeIdExternal,
    anime?.sourcePayload?.mal_id,
  ];

  for (const value of candidates) {
    const id = Number(value);
    if (Number.isInteger(id) && id > 0) return id;
  }

  return null;
}

export function normalizeAnimeRouteFields(anime) {
  if (!anime || typeof anime !== 'object') {
    return anime;
  }

  const routeId = getAnimeRouteId(anime);

  return {
    ...anime,
    routeId,
    externalId: anime.externalId ?? routeId,
    malId: anime.malId ?? routeId,
  };
}

```

### File: `frontend/src/utils/contentSafety.js`

- size: `793` bytes

```javascript
const BLOCKED_KEYWORDS = ['hentai', 'erotica', 'ecchi', 'rx - hentai', 'r+ - mild nudity'];

function normalizeText(value) {
  return String(value || '').toLowerCase();
}

export function isBlockedAnimeClientSide(anime) {
  if (anime?.isAdult || anime?.isHidden || anime?.dataStatus === 'ARCHIVED') return true;

  const genres = Array.isArray(anime?.genres) ? anime.genres : [];
  const text = [
    anime?.displayTitle,
    anime?.title?.romaji,
    anime?.title?.english,
    anime?.title?.native,
    anime?.romajiTitle,
    anime?.englishTitle,
    anime?.nativeTitle,
    anime?.description,
    anime?.rating,
    ...genres,
  ]
    .filter(Boolean)
    .join(' ');

  const normalized = normalizeText(text);
  return BLOCKED_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

```

### File: `frontend/src/utils/error.js`

- size: `716` bytes

```javascript
const FALLBACK_MESSAGE = '외부 애니메이션 데이터 서버가 불안정하여 임시 데이터를 표시합니다.';
const RETRY_MESSAGE = '잠시 후 다시 시도하거나 검색 조건을 변경해 주세요.';

export function toUserErrorMessage(error, fallback = `${FALLBACK_MESSAGE} ${RETRY_MESSAGE}`) {
  const raw = error?.response?.data?.message || error?.message || '';
  const text = String(raw);

  if (
    text.includes('AniList GraphQL request failed') ||
    text.includes('AxiosError') ||
    text.includes('provider failed') ||
    text.includes('403') ||
    text.includes('AniList')
  ) {
    return fallback;
  }

  return text || fallback;
}

export { FALLBACK_MESSAGE, RETRY_MESSAGE };

```

### File: `frontend/src/utils/image.js`

- size: `610` bytes

```javascript
export const PLACEHOLDER_POSTER = 'https://placehold.co/300x420/d9d9d9/777777?text=AniPick';
export const PLACEHOLDER_BANNER = 'https://placehold.co/1200x360/d9d9d9/777777?text=AniPick';

export function getAnimePoster(anime) {
  if (!anime) return null;
  return (
    anime.coverImage?.extraLarge ||
    anime.coverImage?.large ||
    anime.coverImage?.medium ||
    anime.animeImage ||
    anime.imageUrl ||
    null
  );
}

export function getAnimeBanner(anime) {
  if (!anime) return null;
  return anime.bannerImage || anime.coverImage?.extraLarge || anime.coverImage?.large || anime.imageUrl || null;
}

```

### File: `frontend/src/utils/score.js`

- size: `971` bytes

```javascript
﻿export function getAnimeScoreValue(animeOrScore) {
  const raw =
    typeof animeOrScore === 'object' && animeOrScore !== null
      ? animeOrScore.averageScore ?? animeOrScore.meanScore ?? animeOrScore.score
      : animeOrScore;

  if (raw === null || raw === undefined || raw === '') {
    return null;
  }

  const value = Number(raw);

  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }

  return value > 10 ? value / 10 : value;
}

export function hasAnimeScore(animeOrScore) {
  return getAnimeScoreValue(animeOrScore) !== null;
}

export function formatAnimeScore(animeOrScore) {
  const value = getAnimeScoreValue(animeOrScore);

  if (value === null) {
    return '평점 집계 전';
  }

  return `${value.toFixed(1)}점`;
}

export function formatAnimeScoreLabel(animeOrScore) {
  const value = getAnimeScoreValue(animeOrScore);

  if (value === null) {
    return '평점 집계 전';
  }

  return `평점 ${value.toFixed(1)}점`;
}


```

### File: `frontend/src/utils/text.js`

- size: `116` bytes

```javascript
export function stripHtmlTags(value = '') {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

```

### File: `frontend/src/utils/theme.js`

- size: `943` bytes

```javascript
const THEME_STORAGE_KEY = 'anipick-theme';

export function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function getSystemTheme() {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function getInitialTheme() {
  const stored = getStoredTheme();
  if (stored === 'light' || stored === 'dark') return stored;
  return getSystemTheme();
}

export function applyTheme(theme) {
  const nextTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {
    // ignore
  }

  return nextTheme;
}

export function toggleTheme(currentTheme) {
  return currentTheme === 'light' ? 'dark' : 'light';
}

```

### File: `frontend/src/utils/title.js`

- size: `2,172` bytes

```javascript
﻿const BLOCKED_TITLES = new Set(['한국어 제목 준비 중', '제목 준비 중', 'Untitled', 'タイトルなし', '-']);

function hasHangul(text) {
  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(String(text || ''));
}

function normalizeArgs(langOrFallback = 'ko', fallbackArg = '제목 없음') {
  const isLang = ['ko', 'en', 'ja'].includes(String(langOrFallback || '').toLowerCase());
  if (isLang) {
    return {
      lang: String(langOrFallback).toLowerCase(),
      fallback: fallbackArg || '제목 없음',
    };
  }

  return {
    lang: 'ko',
    fallback: langOrFallback || '제목 없음',
  };
}

function pickFirstMeaningful(candidates) {
  for (const value of candidates) {
    const text = String(value || '').trim();
    if (!text) continue;
    if (BLOCKED_TITLES.has(text)) continue;
    return text;
  }
  return '';
}

export function getSafeAnimeTitle(anime, langOrFallback = 'ko', fallbackArg = '제목 없음') {
  const { lang, fallback } = normalizeArgs(langOrFallback, fallbackArg);

  const koCandidates = [
    anime?.displayTitle,
    anime?.koreanTitle,
    anime?.animeTitleDisplay,
    anime?.title?.english,
    anime?.title?.romaji,
    anime?.englishTitle,
    anime?.romajiTitle,
    hasHangul(anime?.title?.native) ? anime?.title?.native : null,
    hasHangul(anime?.nativeTitle) ? anime?.nativeTitle : null,
  ];

  const enCandidates = [
    anime?.displayTitle,
    anime?.animeTitleDisplay,
    anime?.title?.english,
    anime?.title?.romaji,
    anime?.title?.native,
    anime?.englishTitle,
    anime?.romajiTitle,
    anime?.nativeTitle,
  ];

  const jaCandidates = [
    anime?.displayTitle,
    anime?.animeTitleDisplay,
    anime?.title?.native,
    anime?.nativeTitle,
    anime?.title?.romaji,
    anime?.title?.english,
    anime?.romajiTitle,
    anime?.englishTitle,
  ];

  const commonTail = [anime?.animeTitle];

  const source = lang === 'ja' ? jaCandidates : lang === 'en' ? enCandidates : koCandidates;
  const selected = pickFirstMeaningful([...source, ...commonTail]);

  if (selected) return selected;
  return String(fallback || '제목 없음').trim() || '제목 없음';
}

export { BLOCKED_TITLES };

```

### File: `make_project_overview.py`

- size: `28,888` bytes

```python
from __future__ import annotations

import argparse
import json
import os
import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable


EXCLUDE_DIRS = {
    ".git",
    ".idea",
    ".vscode",
    ".venv",
    "venv",
    "node_modules",
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    ".ruff_cache",
    ".turbo",
    ".cache",
    "coverage",
    "dist",
    "build",
    ".next",
    ".nuxt",
    ".output",
    "target",
    "out",
    "logs",
    "tmp",
    "temp",
    "submission_outputs",

    # Law Compass 같은 프로젝트에서 커질 수 있는 실행/업로드 산출물
    "storage",
    "uploads",
    "processed",
    "reports",
    "db-backups",
    "quarantine",
}

TARGET_EXTENSIONS = {
    ".py",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".ts",
    ".tsx",
    ".vue",
    ".html",
    ".css",
    ".scss",
    ".sass",
    ".less",
    ".json",
    ".md",
    ".txt",
    ".example",
    ".sample",
    ".yml",
    ".yaml",
    ".toml",
    ".ini",
    ".cfg",
    ".sql",
    ".sh",
    ".bash",
    ".bat",
    ".ps1",
    ".dockerignore",
    ".gitignore",
}

INCLUDE_FILE_NAMES = {
    "Dockerfile",
    "dockerfile",
    "Containerfile",
    "Makefile",
    "Caddyfile",
    "Procfile",
    "requirements.txt",
    "requirements-dev.txt",
    "pyproject.toml",
    "Pipfile",
    "package.json",
    "vite.config.ts",
    "vite.config.js",
    "tsconfig.json",
    "README.md",
}

EXCLUDE_FILES = {
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test",
    "project_combined.txt",
    "project_overview.md",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "poetry.lock",
}

PRIORITY_FILE_PATTERNS = [
    "README",
    "docker-compose",
    "compose",
    "Dockerfile",
    "Caddyfile",
    "package.json",
    "requirements",
    "pyproject.toml",
    "main.py",
    "app.py",
    "server.",
    "index.",
    "routes",
    "router",
    "api",
    "gateway",
    "agent",
    "worker",
    "schema",
    "models",
    "migration",
    "migrations",
    "vite.config",
    "tsconfig",
]


@dataclass(frozen=True)
class FileInfo:
    path: Path
    rel: str
    size: int


def should_skip_dir(directory_name: str) -> bool:
    # GitHub Actions 흐름 파악용
    if directory_name == ".github":
        return False
    return directory_name in EXCLUDE_DIRS or directory_name.startswith(".")


def should_include_file(path: Path) -> bool:
    name = path.name

    if name in EXCLUDE_FILES:
        return False

    # 실제 비밀값이 들어갈 수 있는 env는 제외하고 예시 파일만 포함
    if name.startswith(".env") and name not in {".env.example", ".env.sample"}:
        return False

    if name in INCLUDE_FILE_NAMES:
        return True

    return path.suffix.lower() in TARGET_EXTENSIONS


def is_binary_file(path: Path, sample_size: int = 2048) -> bool:
    try:
        chunk = path.read_bytes()[:sample_size]
    except Exception:
        return True
    return b"\x00" in chunk


def sort_key(info: FileInfo) -> tuple[int, str]:
    rel_lower = info.rel.lower()
    priority = 99

    for index, pattern in enumerate(PRIORITY_FILE_PATTERNS):
        if pattern.lower() in rel_lower:
            priority = min(priority, index)

    return priority, rel_lower


def collect_files(root_path: Path, max_file_size: int) -> list[FileInfo]:
    files: list[FileInfo] = []

    for root, dirs, file_names in os.walk(root_path):
        dirs[:] = [d for d in dirs if not should_skip_dir(d)]

        for file_name in file_names:
            path = Path(root) / file_name

            if not should_include_file(path):
                continue

            try:
                resolved = path.resolve()
                size = resolved.stat().st_size
            except OSError:
                continue

            if size > max_file_size:
                continue

            if is_binary_file(path):
                continue

            rel = str(path.relative_to(root_path)).replace("\\", "/")
            files.append(FileInfo(path=path, rel=rel, size=size))

    return sorted(files, key=sort_key)


def read_text(path: Path, max_chars: int | None = None) -> str:
    try:
        text = path.read_text(encoding="utf-8", errors="ignore")
    except Exception as exc:
        return f"[Error reading file: {exc}]"

    if max_chars is not None and len(text) > max_chars:
        omitted = len(text) - max_chars
        return text[:max_chars] + f"\n\n... [TRUNCATED: {omitted:,} chars omitted] ...\n"

    return text


def code_fence_lang(path: Path) -> str:
    name = path.name.lower()
    suffix = path.suffix.lower()

    if name in {"dockerfile", "containerfile"}:
        return "dockerfile"
    if name == "caddyfile":
        return "caddyfile"
    if name.startswith(".env") or suffix in {".example", ".sample"}:
        return "dotenv"

    mapping = {
        ".py": "python",
        ".js": "javascript",
        ".jsx": "jsx",
        ".mjs": "javascript",
        ".cjs": "javascript",
        ".ts": "typescript",
        ".tsx": "tsx",
        ".vue": "vue",
        ".html": "html",
        ".css": "css",
        ".scss": "scss",
        ".sass": "sass",
        ".less": "less",
        ".json": "json",
        ".md": "markdown",
        ".yml": "yaml",
        ".yaml": "yaml",
        ".toml": "toml",
        ".ini": "ini",
        ".cfg": "ini",
        ".sql": "sql",
        ".sh": "bash",
        ".bash": "bash",
        ".bat": "bat",
        ".ps1": "powershell",
        ".txt": "text",
    }
    return mapping.get(suffix, "text")


def safe_for_markdown_fence(text: str) -> str:
    return text.replace("``​`", "``\u200b`")


def write_directory_tree(outfile, root_path: Path, max_depth: int) -> None:
    outfile.write("## 1. 프로젝트 디렉터리 구조\n\n")
    outfile.write("``​`text\n")
    outfile.write(f"{root_path.name}/\n")

    for root, dirs, file_names in os.walk(root_path):
        dirs[:] = [d for d in dirs if not should_skip_dir(d)]
        current = Path(root)
        depth = len(current.relative_to(root_path).parts)

        if depth >= max_depth:
            dirs[:] = []
            continue

        indent = "    " * depth

        for directory in sorted(dirs):
            outfile.write(f"{indent}    - {directory}/\n")

        included_files = [
            f for f in sorted(file_names)
            if should_include_file(current / f)
        ]

        for file_name in included_files:
            outfile.write(f"{indent}    - {file_name}\n")

    outfile.write("``​`\n\n")


def extract_package_info(files: list[FileInfo]) -> list[dict]:
    result: list[dict] = []

    for info in files:
        if info.path.name != "package.json":
            continue

        text = read_text(info.path)
        try:
            data = json.loads(text)
        except json.JSONDecodeError:
            result.append({"file": info.rel, "error": "Invalid package.json"})
            continue

        result.append({
            "file": info.rel,
            "name": data.get("name"),
            "version": data.get("version"),
            "scripts": data.get("scripts", {}),
            "dependencies": sorted((data.get("dependencies") or {}).keys()),
            "devDependencies": sorted((data.get("devDependencies") or {}).keys()),
        })

    return result


def extract_requirements(files: list[FileInfo]) -> list[dict]:
    result: list[dict] = []

    for info in files:
        lower = info.path.name.lower()
        if not (lower.startswith("requirements") and lower.endswith(".txt")):
            continue

        lines = []
        for raw_line in read_text(info.path).splitlines():
            line = raw_line.strip()
            if not line or line.startswith("#"):
                continue
            lines.append(line)

        result.append({
            "file": info.rel,
            "packages": lines,
        })

    return result


def extract_env_keys(files: list[FileInfo]) -> dict[str, list[str]]:
    env_files: dict[str, list[str]] = {}

    env_file_names = {
        ".env.example",
        ".env.sample",
        "env.example",
        "env.sample",
    }

    for info in files:
        if info.path.name not in env_file_names and not info.path.name.endswith(".env.example"):
            continue

        keys: list[str] = []
        for line in read_text(info.path).splitlines():
            stripped = line.strip()
            if not stripped or stripped.startswith("#") or "=" not in stripped:
                continue
            key = stripped.split("=", 1)[0].strip()
            if key:
                keys.append(key)

        env_files[info.rel] = sorted(set(keys))

    return env_files


def extract_env_usages(files: list[FileInfo]) -> dict[str, list[str]]:
    patterns = [
        re.compile(r"os\.getenv\(\s*[\"']([A-Za-z_][A-Za-z0-9_]*)[\"']"),
        re.compile(r"os\.environ\.get\(\s*[\"']([A-Za-z_][A-Za-z0-9_]*)[\"']"),
        re.compile(r"os\.environ\[\s*[\"']([A-Za-z_][A-Za-z0-9_]*)[\"']\s*\]"),
        re.compile(r"process\.env\.([A-Za-z_][A-Za-z0-9_]*)"),
        re.compile(r"import\.meta\.env\.([A-Za-z_][A-Za-z0-9_]*)"),
    ]

    usages: dict[str, list[str]] = {}

    for info in files:
        if info.path.suffix.lower() not in {".py", ".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".vue"}:
            continue

        text = read_text(info.path)
        found: set[str] = set()

        for pattern in patterns:
            found.update(pattern.findall(text))

        if found:
            usages[info.rel] = sorted(found)

    return usages


def extract_python_routes(files: list[FileInfo]) -> list[dict]:
    route_pattern = re.compile(
        r"^\s*@(?P<object>[A-Za-z_][A-Za-z0-9_\.]*)\."
        r"(?P<method>get|post|put|patch|delete|options|head)"
        r"\(\s*[\"'](?P<path>[^\"']+)[\"']",
        re.MULTILINE,
    )
    prefix_pattern = re.compile(
        r"(?P<var>[A-Za-z_][A-Za-z0-9_]*)\s*=\s*APIRouter\("
        r"(?P<body>.*?)\)",
        re.DOTALL,
    )
    prefix_value_pattern = re.compile(r"prefix\s*=\s*[\"']([^\"']+)[\"']")

    routes: list[dict] = []

    for info in files:
        if info.path.suffix.lower() != ".py":
            continue

        text = read_text(info.path)

        prefixes: dict[str, str] = {}
        for prefix_match in prefix_pattern.finditer(text):
            var = prefix_match.group("var")
            body = prefix_match.group("body")
            prefix_value = prefix_value_pattern.search(body)
            if prefix_value:
                prefixes[var] = prefix_value.group(1)

        for match in route_pattern.finditer(text):
            obj = match.group("object").split(".")[-1]
            method = match.group("method").upper()
            path = match.group("path")
            prefix = prefixes.get(obj, "")

            routes.append({
                "file": info.rel,
                "method": method,
                "path": prefix + path if prefix and not path.startswith(prefix) else path,
                "decorator_object": match.group("object"),
            })

    return routes


def extract_js_routes(files: list[FileInfo]) -> list[dict]:
    route_pattern = re.compile(
        r"(?P<object>\b(?:app|router|server|fastify|expressRouter)\b)"
        r"\.(?P<method>get|post|put|patch|delete|options|head|use)"
        r"\(\s*[\"'`](?P<path>[^\"'`]+)[\"'`]",
        re.MULTILINE,
    )

    routes: list[dict] = []

    for info in files:
        if info.path.suffix.lower() not in {".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx"}:
            continue

        text = read_text(info.path)
        for match in route_pattern.finditer(text):
            routes.append({
                "file": info.rel,
                "method": match.group("method").upper(),
                "path": match.group("path"),
                "object": match.group("object"),
            })

    return routes


def extract_frontend_routes(files: list[FileInfo]) -> list[dict]:
    path_pattern = re.compile(r"\bpath\s*:\s*[\"'`]([^\"'`]+)[\"'`]")
    routes: list[dict] = []

    for info in files:
        if info.path.suffix.lower() not in {".js", ".jsx", ".ts", ".tsx", ".vue"}:
            continue

        rel_lower = info.rel.lower()
        if "router" not in rel_lower and "routes" not in rel_lower:
            continue

        text = read_text(info.path)
        for match in path_pattern.finditer(text):
            routes.append({
                "file": info.rel,
                "path": match.group(1),
            })

    return routes


def extract_http_calls(files: list[FileInfo]) -> list[dict]:
    patterns = [
        re.compile(r"\bfetch\(\s*[\"'`]([^\"'`]+)[\"'`]"),
        re.compile(r"\baxios\.(?:get|post|put|patch|delete)\(\s*[\"'`]([^\"'`]+)[\"'`]"),
        re.compile(r"\bapi\.(?:get|post|put|patch|delete)\(\s*[\"'`]([^\"'`]+)[\"'`]"),
        re.compile(r"\bhttp\.(?:get|post|put|patch|delete)\(\s*[\"'`]([^\"'`]+)[\"'`]"),
    ]

    calls: list[dict] = []

    for info in files:
        if info.path.suffix.lower() not in {".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".vue"}:
            continue

        text = read_text(info.path)
        found: set[str] = set()

        for pattern in patterns:
            found.update(pattern.findall(text))

        for url in sorted(found):
            calls.append({
                "file": info.rel,
                "url": url,
            })

    return calls


def extract_compose_services(files: list[FileInfo]) -> list[dict]:
    compose_files = [
        info for info in files
        if "compose" in info.path.name.lower() and info.path.suffix.lower() in {".yml", ".yaml"}
    ]

    services: list[dict] = []

    for info in compose_files:
        lines = read_text(info.path).splitlines()
        in_services = False
        services_indent = 0
        current_service: dict | None = None
        current_indent = 0

        for line in lines:
            if not line.strip() or line.lstrip().startswith("#"):
                continue

            indent = len(line) - len(line.lstrip(" "))
            stripped = line.strip()

            if stripped == "services:":
                in_services = True
                services_indent = indent
                continue

            if not in_services:
                continue

            if indent <= services_indent and not stripped.startswith("-"):
                current_service = None
                break

            service_match = re.match(r"^([A-Za-z0-9_-]+):\s*$", stripped)
            if service_match and indent == services_indent + 2:
                current_service = {
                    "compose_file": info.rel,
                    "name": service_match.group(1),
                    "build": None,
                    "image": None,
                    "ports": [],
                    "depends_on": [],
                }
                current_indent = indent
                services.append(current_service)
                continue

            if current_service is None:
                continue

            if indent <= current_indent:
                current_service = None
                continue

            if stripped.startswith("build:"):
                current_service["build"] = stripped.split(":", 1)[1].strip() or "(object)"
            elif stripped.startswith("image:"):
                current_service["image"] = stripped.split(":", 1)[1].strip()
            elif stripped.startswith("- ") and ("\"" in stripped or ":" in stripped):
                value = stripped[2:].strip().strip("\"'")
                if re.search(r"\d+:\d+", value):
                    current_service["ports"].append(value)
            elif stripped.startswith("depends_on:"):
                current_service["depends_on"].append("(see compose file)")

    return services


def classify_important_files(files: list[FileInfo]) -> dict[str, list[str]]:
    categories = {
        "컨테이너/배포": [],
        "백엔드/API": [],
        "프론트엔드": [],
        "워커/비동기 작업": [],
        "DB/스키마/마이그레이션": [],
        "설정/환경": [],
        "문서": [],
        "테스트": [],
    }

    for info in files:
        rel = info.rel.lower()
        name = info.path.name.lower()

        if "docker" in name or "compose" in name or name in {"caddyfile", "makefile"}:
            categories["컨테이너/배포"].append(info.rel)
        elif any(token in rel for token in ["/api/", "/routes/", "/routers/", "gateway", "server.", "main.py", "app.py"]):
            categories["백엔드/API"].append(info.rel)
        elif any(token in rel for token in ["frontend", "src/", ".vue", "vite.config", "components", "pages", "views"]):
            categories["프론트엔드"].append(info.rel)
        elif "worker" in rel or "queue" in rel or "celery" in rel or "rq" in rel:
            categories["워커/비동기 작업"].append(info.rel)
        elif any(token in rel for token in ["migration", "migrations", "schema", "models", "database", ".sql"]):
            categories["DB/스키마/마이그레이션"].append(info.rel)
        elif any(token in name for token in ["requirements", "package.json", "pyproject", "tsconfig"]) or ".env.example" in name:
            categories["설정/환경"].append(info.rel)
        elif name.endswith(".md") or "readme" in name:
            categories["문서"].append(info.rel)
        elif "test" in rel or "spec" in rel:
            categories["테스트"].append(info.rel)

    return {key: sorted(set(value)) for key, value in categories.items() if value}


def write_list_section(outfile, title: str, items: Iterable[str], empty_text: str = "감지된 항목 없음") -> None:
    outfile.write(f"### {title}\n\n")
    item_list = list(items)

    if not item_list:
        outfile.write(f"- {empty_text}\n\n")
        return

    for item in item_list:
        outfile.write(f"- `{item}`\n")
    outfile.write("\n")


def write_analysis_sections(outfile, files: list[FileInfo]) -> None:
    outfile.write("## 2. 자동 감지 요약\n\n")

    categories = classify_important_files(files)
    for category, items in categories.items():
        write_list_section(outfile, category, items[:80])

    compose_services = extract_compose_services(files)
    outfile.write("## 3. Docker Compose 서비스 추정\n\n")
    if compose_services:
        outfile.write("| compose 파일 | 서비스 | build | image | ports |\n")
        outfile.write("|---|---|---|---|---|\n")
        for service in compose_services:
            ports = ", ".join(service.get("ports") or [])
            outfile.write(
                f"| `{service['compose_file']}` "
                f"| `{service['name']}` "
                f"| `{service.get('build') or ''}` "
                f"| `{service.get('image') or ''}` "
                f"| `{ports}` |\n"
            )
        outfile.write("\n")
    else:
        outfile.write("감지된 docker-compose 서비스가 없습니다.\n\n")

    packages = extract_package_info(files)
    outfile.write("## 4. Node/Frontend package.json 요약\n\n")
    if packages:
        for package in packages:
            outfile.write(f"### `{package['file']}`\n\n")
            outfile.write(f"- name: `{package.get('name')}`\n")
            outfile.write(f"- version: `{package.get('version')}`\n")
            outfile.write("- scripts:\n")
            for key, value in (package.get("scripts") or {}).items():
                outfile.write(f"  - `{key}`: `{value}`\n")
            outfile.write("- dependencies:\n")
            deps = package.get("dependencies") or []
            outfile.write("  - " + (", ".join(f"`{dep}`" for dep in deps[:80]) if deps else "없음") + "\n")
            outfile.write("- devDependencies:\n")
            dev_deps = package.get("devDependencies") or []
            outfile.write("  - " + (", ".join(f"`{dep}`" for dep in dev_deps[:80]) if dev_deps else "없음") + "\n\n")
    else:
        outfile.write("감지된 package.json이 없습니다.\n\n")

    requirements = extract_requirements(files)
    outfile.write("## 5. Python requirements 요약\n\n")
    if requirements:
        for req in requirements:
            outfile.write(f"### `{req['file']}`\n\n")
            for package in req["packages"][:120]:
                outfile.write(f"- `{package}`\n")
            if len(req["packages"]) > 120:
                outfile.write(f"- ... {len(req['packages']) - 120}개 생략\n")
            outfile.write("\n")
    else:
        outfile.write("감지된 requirements.txt가 없습니다.\n\n")

    env_keys = extract_env_keys(files)
    env_usages = extract_env_usages(files)
    outfile.write("## 6. 환경변수 흐름\n\n")
    outfile.write("### .env.example / .env.sample에 정의된 키\n\n")
    if env_keys:
        for file, keys in env_keys.items():
            outfile.write(f"- `{file}`: " + ", ".join(f"`{key}`" for key in keys) + "\n")
        outfile.write("\n")
    else:
        outfile.write("- 감지된 예시 env 파일이 없습니다.\n\n")

    outfile.write("### 코드에서 사용되는 환경변수\n\n")
    if env_usages:
        for file, keys in sorted(env_usages.items()):
            outfile.write(f"- `{file}`: " + ", ".join(f"`{key}`" for key in keys) + "\n")
        outfile.write("\n")
    else:
        outfile.write("- 코드에서 직접 감지된 환경변수가 없습니다.\n\n")

    python_routes = extract_python_routes(files)
    js_routes = extract_js_routes(files)
    frontend_routes = extract_frontend_routes(files)
    http_calls = extract_http_calls(files)

    outfile.write("## 7. API / 라우트 흐름 추정\n\n")

    outfile.write("### Python FastAPI/Flask 계열 라우트\n\n")
    if python_routes:
        outfile.write("| Method | Path | File |\n")
        outfile.write("|---|---|---|\n")
        for route in python_routes:
            outfile.write(f"| `{route['method']}` | `{route['path']}` | `{route['file']}` |\n")
        outfile.write("\n")
    else:
        outfile.write("- 감지된 Python 라우트가 없습니다.\n\n")

    outfile.write("### JS/TS Express 계열 라우트\n\n")
    if js_routes:
        outfile.write("| Method | Path | File |\n")
        outfile.write("|---|---|---|\n")
        for route in js_routes:
            outfile.write(f"| `{route['method']}` | `{route['path']}` | `{route['file']}` |\n")
        outfile.write("\n")
    else:
        outfile.write("- 감지된 JS/TS 라우트가 없습니다.\n\n")

    outfile.write("### Frontend Router path\n\n")
    if frontend_routes:
        outfile.write("| Path | File |\n")
        outfile.write("|---|---|\n")
        for route in frontend_routes:
            outfile.write(f"| `{route['path']}` | `{route['file']}` |\n")
        outfile.write("\n")
    else:
        outfile.write("- 감지된 프론트엔드 라우터 path가 없습니다.\n\n")

    outfile.write("### 프론트엔드/클라이언트에서 호출하는 API URL 후보\n\n")
    if http_calls:
        outfile.write("| URL | File |\n")
        outfile.write("|---|---|\n")
        for call in http_calls[:300]:
            outfile.write(f"| `{call['url']}` | `{call['file']}` |\n")
        if len(http_calls) > 300:
            outfile.write(f"\n> {len(http_calls) - 300}개 URL 후보 생략\n")
        outfile.write("\n")
    else:
        outfile.write("- 감지된 fetch/axios/api 호출이 없습니다.\n\n")


def write_file_contents(
    outfile,
    files: list[FileInfo],
    max_file_chars: int,
    max_total_chars: int,
) -> None:
    outfile.write("## 8. 주요 파일 내용\n\n")
    outfile.write(
        "아래 내용은 프로젝트 흐름 파악용으로 자동 병합된 파일입니다. "
        "민감한 `.env` 파일과 대용량 실행 산출물은 제외됩니다.\n\n"
    )

    total_chars = 0

    for info in files:
        if total_chars >= max_total_chars:
            outfile.write(f"\n> 전체 출력 제한 `{max_total_chars:,}`자를 초과하여 이후 파일은 생략했습니다.\n")
            break

        remaining = max_total_chars - total_chars
        limit = min(max_file_chars, remaining)
        text = read_text(info.path, max_chars=limit)
        text = safe_for_markdown_fence(text)

        outfile.write(f"### File: `{info.rel}`\n\n")
        outfile.write(f"- size: `{info.size:,}` bytes\n\n")
        outfile.write(f"``​`{code_fence_lang(info.path)}\n")
        outfile.write(text)
        outfile.write("\n``​`\n\n")

        total_chars += len(text)


def generate_project_overview(
    root_dir: str,
    output_file: str,
    max_depth: int,
    max_file_size: int,
    max_file_chars: int,
    max_total_chars: int,
) -> None:
    root_path = Path(root_dir).resolve()
    output_path = Path(output_file).resolve()

    if not root_path.exists():
        raise FileNotFoundError(f"root_dir not found: {root_path}")

    files = collect_files(root_path, max_file_size=max_file_size)
    files = [info for info in files if info.path.resolve() != output_path]

    with output_path.open("w", encoding="utf-8") as outfile:
        outfile.write("# PROJECT OVERVIEW FOR CODE ANALYSIS\n\n")
        outfile.write(
            "이 문서는 프로젝트의 전체 구조, 실행 흐름, 서비스 구성, API 라우트, "
            "환경변수, 주요 파일 내용을 파악하기 위해 자동 생성되었습니다.\n\n"
        )

        outfile.write("## 0. 생성 정보\n\n")
        outfile.write(f"- Root: `{root_path}`\n")
        outfile.write(f"- Generated at: `{datetime.now().isoformat(timespec='seconds')}`\n")
        outfile.write(f"- Included files: `{len(files)}`\n")
        outfile.write(f"- Max file size: `{max_file_size:,}` bytes\n")
        outfile.write(f"- Max chars per file: `{max_file_chars:,}` chars\n")
        outfile.write(f"- Max total chars: `{max_total_chars:,}` chars\n\n")

        write_directory_tree(outfile, root_path, max_depth=max_depth)
        write_analysis_sections(outfile, files)
        write_file_contents(
            outfile,
            files,
            max_file_chars=max_file_chars,
            max_total_chars=max_total_chars,
        )

    print(f"프로젝트 분석용 문서 생성 완료: {output_path}")
    print(f"포함 파일 수: {len(files)}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="프로젝트 구조와 흐름 파악용 Markdown 문서를 생성합니다."
    )
    parser.add_argument(
        "--root",
        default="./",
        help="분석할 프로젝트 루트 경로. 기본값: ./",
    )
    parser.add_argument(
        "--out",
        default="project_overview.md",
        help="출력 파일명. 기본값: project_overview.md",
    )
    parser.add_argument(
        "--max-depth",
        type=int,
        default=5,
        help="디렉터리 트리 출력 깊이. 기본값: 5",
    )
    parser.add_argument(
        "--max-file-size",
        type=int,
        default=1_000_000,
        help="포함할 개별 파일 최대 크기 bytes. 기본값: 1,000,000",
    )
    parser.add_argument(
        "--max-file-chars",
        type=int,
        default=80_000,
        help="파일 하나당 출력할 최대 문자 수. 기본값: 80,000",
    )
    parser.add_argument(
        "--max-total-chars",
        type=int,
        default=3_000_000,
        help="전체 파일 내용 출력 최대 문자 수. 기본값: 3,000,000",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    generate_project_overview(
        root_dir=args.root,
        output_file=args.out,
        max_depth=args.max_depth,
        max_file_size=args.max_file_size,
        max_file_chars=args.max_file_chars,
        max_total_chars=args.max_total_chars,
    )
```

