# AniPick

AniPick은 애니메이션 정보를 탐색하고 추천받을 수 있는 애니메이션 정보 플랫폼입니다.  
사용자는 인기 애니, 시즌별 인기작, 고평점 추천작을 확인하고, 검색/필터를 통해 원하는 작품을 찾을 수 있습니다.

프론트엔드는 React + Vite 기반으로 구성되어 있으며, 백엔드는 Express + Prisma + PostgreSQL 기반으로 동작합니다.

---

## 주요 기능

### 사용자 기능

- 애니메이션 목록 조회
- 애니메이션 상세 정보 조회
- 제목, 장르, 연도, 시즌, 형식, 상태 기준 검색
- 인기 애니 / 시즌 인기작 / 고평점 추천
- 넷플릭스 스타일 카드 슬라이드 메인 화면
- 한국어 번역 제목 및 설명 표시
- 회원가입 / 로그인
- 찜하기
- 리뷰 작성
- 시청 상태 관리

### 관리자 기능

- 관리자 로그인
- 공지 관리
- 번역 상태 관리
- 애니메이션 숨김 / 성인 콘텐츠 처리 / 아카이브 처리
- 캐시 데이터 정리 스크립트 지원

### 데이터 관리

- Jikan / AniList 기반 애니메이션 메타데이터 수집
- PostgreSQL DB 캐시 저장
- CSV 기반 한국어 번역 데이터 관리
- 서버 실행 시 GPT 토큰을 쓰지 않고 사전 저장된 번역 데이터 사용
- 평점, 인기도, 포스터 이미지 캐시 관리
- 성인/Hentai/Erotica 콘텐츠 일반 사용자 화면 차단

---

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
- JWT 인증
- Swagger 문서

### External API

- Jikan API
- AniList API
- OpenAI API: 번역 사전 작업용, 서버 실행 중 실시간 호출 목적 아님

---

## 프로젝트 구조

```text
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
````

---

## 실행 전 준비

### 필수 설치

* Node.js
* npm
* PostgreSQL
* Python 3
* Git

---

## 환경변수 설정

### backend/.env

`backend/.env` 파일을 생성하고 아래 형식으로 작성합니다.

```env
DATABASE_URL="postgresql://anipick_user:anipick_password@localhost:5433/anipick_db?schema=public"
JWT_SECRET="change_this_secret"
PORT=4001

OPENAI_API_KEY=""
OPENAI_TRANSLATION_MODEL="gpt-4.1-mini"

BOOTSTRAP_ANIME_ON_START=false
PRETRANSLATE_LIMIT=30
```

주의:

* `.env` 파일은 GitHub에 올리면 안 됩니다.
* `OPENAI_API_KEY`는 번역 사전 작업이 필요할 때만 사용합니다.
* 서버 실행 중 실시간 번역 호출을 기본 흐름으로 사용하지 않습니다.

### frontend/.env

배포 환경에서는 아래 값을 설정합니다.

```env
VITE_API_BASE_URL="https://your-backend-url.com/api"
```

로컬 개발 시 프록시 설정을 사용하는 경우 생략할 수 있습니다.

---

## 로컬 실행 방법

### 1. 백엔드 실행

새 PowerShell 또는 터미널에서 실행합니다.

```powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\backend"

npm install
npx prisma generate
npx prisma migrate dev

python scripts/translate_pending_ko.py sync-db

npm run dev
```

백엔드 상태 확인:

```text
http://localhost:4001/health
```

정상 응답 예시:

```json
{
  "message": "AniPick backend is running."
}
```

---

### 2. 프론트엔드 실행

다른 PowerShell 또는 터미널에서 실행합니다.

```powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\frontend"

npm install
npm run dev
```

프론트 접속:

```text
http://localhost:5173
```

---

## 자주 사용하는 명령어

### 백엔드

```powershell
cd backend
npm run dev
```

### 프론트엔드

```powershell
cd frontend
npm run dev
```

### Prisma Client 생성

```powershell
cd backend
npx prisma generate
```

### DB 마이그레이션

```powershell
cd backend
npx prisma migrate dev
```

### Seed 실행

```powershell
cd backend
node prisma/seed.js
```

### 애니메이션 메타데이터 사전 수집

```powershell
cd backend
node scripts/prefetchAnime.js
```

### CSV 번역 데이터 DB 반영

```powershell
cd backend
python scripts/translate_pending_ko.py sync-db
```

### 번역 상태 확인

```powershell
cd backend
python scripts/translate_pending_ko.py status
```

### PENDING 번역 CSV/DB 작업

```powershell
cd backend
python scripts/translate_pending_ko.py translate-pending --limit 100 --batch-size 100
```

### 캐시 진단

```powershell
cd backend
npm run anime:repair
```

### 성인 콘텐츠 자동 숨김 처리

```powershell
cd backend
npm run anime:repair -- --mark-adult --apply
```

### 누락 이미지/평점 갱신

```powershell
cd backend
npm run anime:repair -- --refresh-missing --limit=100 --apply
```

---

## 주요 API

### Health Check

```http
GET /health
```

### Auth

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Anime

```http
GET /api/anime/trending
GET /api/anime/popular-season
GET /api/anime/search
GET /api/anime/:id
GET /api/anime/recommendations
```

### Favorites

```http
GET    /api/favorites
POST   /api/favorites
DELETE /api/favorites/:animeId
GET    /api/favorites/:animeId/status
```

### Reviews

```http
GET    /api/reviews/:animeId
POST   /api/reviews
DELETE /api/reviews/:id
```

### Watch Status

```http
GET    /api/watch-status
PUT    /api/watch-status
DELETE /api/watch-status/:animeId
```

### Admin

```http
GET    /api/admin/*
POST   /api/admin/*
PATCH  /api/admin/*
DELETE /api/admin/*
```

### Swagger

```text
http://localhost:4001/api-docs
```

---

## 메인 화면 구조

메인 페이지는 카드 슬라이드 기반으로 구성됩니다.

* 지금 뜨는 애니 TOP 10
* 지금 인기 있는 애니
* 이번 시즌 인기작
* 고평점 추천

각 카드 rail은 좌우 버튼으로 이동할 수 있으며, 포스터 클릭 시 해당 애니메이션 상세 페이지로 이동합니다.

상세 이동에는 내부 DB ID가 아니라 Jikan/MAL 기준 `externalId`, `malId`, `routeId` 값을 사용합니다.

---

## 한국어 번역 관리 방식

AniPick은 서버 실행 중 매번 GPT 토큰을 사용해 번역하지 않습니다.

기본 흐름은 다음과 같습니다.

```text
외부 API에서 원본 애니 정보 수집
→ DB에 Anime 캐시 저장
→ translate_pending_ko.py로 한국어 번역 CSV 생성/관리
→ CSV 번역 데이터를 DB에 sync-db로 반영
→ 프론트에서 DB에 저장된 한국어 제목/설명 표시
```

CSV 위치:

```text
backend/data/anime_csv/
├─ anime_catalog.csv
└─ items/
```

개별 애니 CSV는 provider와 externalId 기준으로 관리됩니다.

예:

```text
JIKAN_5114.csv
JIKAN_9253.csv
```

---

## 캐시 정리 정책

불완전하거나 중복된 Anime 캐시는 `repairAnimeCache.js`를 통해 관리합니다.

지원 작업:

* 누락된 이미지/평점 갱신
* 중복 캐시 탐지
* ghost row 정리
* 성인 콘텐츠 자동 숨김 처리
* dry-run 기본 동작
* `--apply` 옵션을 줄 때만 실제 반영

예시:

```powershell
npm run anime:repair
npm run anime:repair -- --refresh-missing --limit=100
npm run anime:repair -- --dedupe
npm run anime:repair -- --cleanup-ghosts
npm run anime:repair -- --mark-adult --apply
```

---

## 성인 콘텐츠 차단 정책

일반 사용자 화면에서는 아래 콘텐츠가 노출되지 않도록 처리합니다.

* Hentai
* Erotica
* Ecchi
* Rx - Hentai
* 명백한 성인 키워드가 포함된 작품

성인 콘텐츠는 hard delete보다 soft delete/archive 방식으로 처리합니다.

기본 처리 방식:

```text
isAdult = true
isHidden = true
dataStatus = ARCHIVED
hiddenReason = ADULT_CONTENT_AUTO_DETECTED
```

관리자는 필요 시 숨김, 복구, 성인 콘텐츠 표시, 아카이브 처리를 할 수 있습니다.

---

## 관리자 계정

Seed 실행 시 기본 관리자 계정이 생성됩니다.

```text
Email: admin@anipick.com
Password: admin1234
```

운영 배포 전에는 반드시 관리자 비밀번호를 변경해야 합니다.

---

## 배포 가이드

추천 배포 구조:

```text
Frontend: Vercel
Backend: Render
Database: Neon PostgreSQL 또는 Supabase PostgreSQL
```

### 1. GitHub 업로드

```powershell
git init
git remote add origin https://github.com/shy0401/AniPick.git
git add .
git commit -m "Deploy-ready AniPick"
git branch -M main
git push -u origin main
```

이미 origin이 있다면:

```powershell
git remote set-url origin https://github.com/shy0401/AniPick.git
git push -u origin main
```

---

### 2. 백엔드 배포 예시: Render

Render Web Service 설정 예시:

```text
Root Directory: backend
Build Command: npm install && npx prisma generate && npx prisma migrate deploy
Start Command: npm run start
```

`backend/package.json`에 start script가 필요합니다.

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "seed": "node prisma/seed.js"
  }
}
```

Render 환경변수 예시:

```env
DATABASE_URL="배포 PostgreSQL URL"
JWT_SECRET="충분히 긴 랜덤 문자열"
PORT=4001
BOOTSTRAP_ANIME_ON_START=false
PRETRANSLATE_LIMIT=30
OPENAI_API_KEY=""
OPENAI_TRANSLATION_MODEL="gpt-4.1-mini"
```

배포 후 확인:

```text
https://your-backend-url.com/health
```

---

### 3. 프론트엔드 배포 예시: Vercel

Vercel 설정 예시:

```text
Root Directory: frontend
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

Vercel 환경변수:

```env
VITE_API_BASE_URL="https://your-backend-url.com/api"
```

---

## GitHub 업로드 전 주의사항

반드시 `.gitignore`에 아래 항목이 포함되어 있어야 합니다.

```gitignore
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
```

절대 커밋하면 안 되는 값:

```text
DATABASE_URL
JWT_SECRET
OPENAI_API_KEY
gpt.jbnu.ai API key
```

이미 노출된 API 키는 폐기하고 새로 발급하는 것을 권장합니다.

---

## 문제 해결

### 프론트에서 API 요청이 실패하는 경우

`frontend/.env` 또는 Vercel 환경변수 확인:

```env
VITE_API_BASE_URL="http://localhost:4001/api"
```

로컬에서 백엔드가 실행 중인지 확인:

```text
http://localhost:4001/health
```

### CORS 오류가 발생하는 경우

백엔드 CORS 설정에 프론트 배포 주소가 포함되어야 합니다.

로컬 개발 주소:

```text
http://localhost:5173
http://127.0.0.1:5173
```

배포 주소 예시:

```text
https://your-frontend-url.vercel.app
```

### 메인 화면 카드 클릭이 안 되는 경우

확인할 것:

* 카드 컴포넌트가 `Link`로 되어 있는지
* 상세 URL에 내부 DB id가 아니라 `externalId`, `malId`, `routeId`가 들어가는지
* 브라우저 콘솔에 `routeId missing` 경고가 있는지
* rail의 드래그 이벤트가 일반 클릭을 막고 있지 않은지

### 애니 포스터가 placeholder로만 보이는 경우

캐시 갱신:

```powershell
cd backend
npm run anime:repair -- --refresh-missing --limit=100 --apply
```

### 평점이 보이지 않는 경우

평점 갱신:

```powershell
cd backend
npm run anime:repair -- --refresh-missing --limit=100 --apply
```

### 한국어 번역이 PENDING으로 보이는 경우

CSV 상태 확인:

```powershell
cd backend
python scripts/translate_pending_ko.py status
```

CSV 데이터를 DB에 반영:

```powershell
python scripts/translate_pending_ko.py sync-db
```

---

## 라이선스

이 프로젝트는 학습 및 포트폴리오 목적의 프로젝트입니다.
외부 API 데이터와 이미지의 저작권은 각 제공처 및 원저작권자에게 있습니다.

```

README에 들어간 실행 흐름은 현재 `translate_pending_ko.py`가 `sync-db`, `translate-pending`, `status` 명령을 지원하는 구조와 맞췄고, 이 스크립트는 CSV 기반 한국어 번역 데이터를 DB에 반영하는 용도로 작성되어 있습니다. :contentReference[oaicite:3]{index=3} `repairAnimeCache.js`는 캐시 진단, 누락 메타데이터 갱신, 중복 정리, ghost row 정리, 성인 콘텐츠 마킹 옵션을 갖고 있어 README의 캐시 관리 명령에 반영했습니다. :contentReference[oaicite:4]{index=4}
```
