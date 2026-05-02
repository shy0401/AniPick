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
```

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

```env
DATABASE_URL="postgresql://anipick_user:anipick_password@localhost:5433/anipick_db?schema=public"
JWT_SECRET="change_this_secret"
PORT=4001

OPENAI_API_KEY=""
OPENAI_TRANSLATION_MODEL="gpt-4.1-mini"

BOOTSTRAP_ANIME_ON_START=false
PRETRANSLATE_LIMIT=30
```

주의사항:

- `.env` 파일은 GitHub에 올리면 안 됩니다.
- `OPENAI_API_KEY`는 번역 사전 작업이 필요할 때만 사용합니다.
- 서버 실행 중 실시간 번역 호출을 기본 흐름으로 사용하지 않습니다.
- 이미 노출된 API 키는 폐기하고 새로 발급하는 것을 권장합니다.

### frontend/.env

로컬 개발에서는 Vite proxy를 사용한다면 생략할 수 있습니다.

배포 환경에서는 아래처럼 백엔드 주소를 지정합니다.

```env
VITE_API_BASE_URL="https://your-backend-url.com/api"
```

로컬에서 직접 지정하고 싶다면 아래처럼 작성할 수 있습니다.

```env
VITE_API_BASE_URL="http://localhost:4001/api"
```

## 로컬 실행 전 DB 준비

AniPick 백엔드는 PostgreSQL 데이터베이스가 먼저 실행되어 있어야 합니다.

기본 DB 연결 주소는 다음과 같습니다.

```env
DATABASE_URL="postgresql://anipick_user:anipick_password@localhost:5433/anipick_db?schema=public"
```

따라서 로컬 실행 전에 `localhost:5433` 포트에 PostgreSQL이 실행 중이어야 합니다.

### 1. Docker Desktop 실행

Windows에서 Docker Desktop을 먼저 실행합니다.

PowerShell에서 Docker가 정상 실행 중인지 확인합니다.

```powershell
docker version
```

정상적으로 버전 정보가 출력되면 다음 단계로 진행합니다.

### 2. PostgreSQL 컨테이너 생성

처음 실행하는 경우 아래 명령어로 PostgreSQL 컨테이너를 생성합니다.

```powershell
docker run --name anipick_postgres `
  -e POSTGRES_USER=anipick_user `
  -e POSTGRES_PASSWORD=anipick_password `
  -e POSTGRES_DB=anipick_db `
  -p 5433:5432 `
  -d postgres:15
```

이미 같은 이름의 컨테이너가 있다면 생성하지 말고 아래 명령어로 실행합니다.

```powershell
docker start anipick_postgres
```

실행 확인:

```powershell
docker ps
```

아래와 비슷하게 `5433->5432` 포트가 보이면 정상입니다.

```text
0.0.0.0:5433->5432/tcp
```

## 처음 실행할 때

처음 실행하거나 DB를 새로 만든 경우 아래 순서대로 실행합니다.

### 1. Docker Desktop 실행

Docker Desktop을 실행합니다.

### 2. PostgreSQL 컨테이너 실행

처음이면 컨테이너를 생성합니다.

```powershell
docker run --name anipick_postgres `
  -e POSTGRES_USER=anipick_user `
  -e POSTGRES_PASSWORD=anipick_password `
  -e POSTGRES_DB=anipick_db `
  -p 5433:5432 `
  -d postgres:15
```

이미 만든 적이 있다면 실행만 합니다.

```powershell
docker start anipick_postgres
```

### 3. 백엔드 초기 설정 및 실행

```powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\backend"

npm install
npx prisma generate
npx prisma migrate dev
node prisma/seed.js
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

### 4. 프론트엔드 실행

새 PowerShell 터미널을 열고 실행합니다.

```powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\frontend"

npm install
npm run dev
```

프론트 접속:

```text
http://localhost:5173
```

Swagger 문서:

```text
http://localhost:4001/api-docs
```

## 평소 실행할 때

이미 `npm install`, `prisma migrate`, `seed`가 끝난 상태라면 아래만 실행하면 됩니다.

### 1. Docker Desktop 실행

먼저 Docker Desktop을 실행합니다.

### 2. PostgreSQL 컨테이너 실행

```powershell
docker start anipick_postgres
```

### 3. 백엔드 실행

```powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\backend"

python scripts/translate_pending_ko.py sync-db
npm run dev
```

### 4. 프론트엔드 실행

새 PowerShell 터미널에서 실행합니다.

```powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\frontend"

npm run dev
```

접속 주소:

```text
Frontend: http://localhost:5173
Backend Health Check: http://localhost:4001/health
Swagger: http://localhost:4001/api-docs
```

## 데이터까지 새로 갱신할 때

외부 API에서 애니메이션 메타데이터를 다시 가져오고, 번역 CSV를 DB에 반영하고, 누락된 이미지/평점과 성인 콘텐츠 숨김 처리를 함께 수행할 때 사용합니다.

```powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\backend"

node scripts/prefetchAnime.js
python scripts/translate_pending_ko.py sync-db
node scripts/repairAnimeCache.js --refresh-missing --limit=100 --apply
node scripts/repairAnimeCache.js --mark-adult --apply
npm run dev
```

프론트엔드는 별도 터미널에서 실행합니다.

```powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick\frontend"

npm run dev
```

## 주요 명령어 정리

### 백엔드 개발 서버 실행

```powershell
cd backend
npm run dev
```

### 프론트엔드 개발 서버 실행

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

### 관리자 계정 생성 또는 복구

```powershell
cd backend
node prisma/seed.js
```

### 애니메이션 메타데이터 수집

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

### PENDING 번역 작업

```powershell
cd backend
python scripts/translate_pending_ko.py translate-pending --limit 100 --batch-size 100
python scripts/translate_pending_ko.py sync-db
```

### 캐시 진단

```powershell
cd backend
node scripts/repairAnimeCache.js
```

### 누락 이미지/평점 갱신

```powershell
cd backend
node scripts/repairAnimeCache.js --refresh-missing --limit=100 --apply
```

### 성인 콘텐츠 숨김 처리

```powershell
cd backend
node scripts/repairAnimeCache.js --mark-adult --apply
```

### ghost row 정리

```powershell
cd backend
node scripts/repairAnimeCache.js --cleanup-ghosts --apply
```

### 전체 캐시 정리

```powershell
cd backend
node scripts/repairAnimeCache.js --all --apply
```

## 관리자 로그인

Seed 실행 시 기본 관리자 계정이 생성됩니다.

```text
Email: admin@anipick.com
Password: admin1234
```

로그인 화면에서 `admin`이 아니라 반드시 `admin@anipick.com`을 입력해야 합니다.

관리자 API는 JWT 인증 후 `role`이 `ADMIN`인 사용자만 접근할 수 있습니다.

## 관리자가 접속되지 않을 때

### 1. 관리자 계정 다시 생성

백엔드 폴더에서 실행합니다.

```powershell
cd backend
node prisma/seed.js
```

이 명령은 관리자 계정을 다시 생성하거나 기존 관리자 계정을 갱신합니다.

```text
Email: admin@anipick.com
Password: admin1234
Role: ADMIN
```

### 2. Prisma Studio에서 확인

```powershell
cd backend
npx prisma studio
```

브라우저에서 `User` 테이블을 확인합니다.

관리자 계정이 아래처럼 되어 있어야 합니다.

```text
email: admin@anipick.com
nickname: admin
role: ADMIN
```

### 3. 강제로 관리자 계정 복구

`node prisma/seed.js`로 해결되지 않으면 아래 명령을 실행합니다.

```powershell
cd backend

node -e "require('dotenv').config(); const bcrypt=require('bcrypt'); const prisma=require('./src/lib/prisma'); (async()=>{const password=await bcrypt.hash('admin1234',10); await prisma.user.upsert({where:{email:'admin@anipick.com'},update:{password,nickname:'admin',role:'ADMIN'},create:{email:'admin@anipick.com',password,nickname:'admin',role:'ADMIN'}}); console.log('admin ready: admin@anipick.com / admin1234'); await prisma.$disconnect();})().catch(async e=>{console.error(e); await prisma.$disconnect(); process.exit(1);});"
```

그 다음 다시 로그인합니다.

```text
Email: admin@anipick.com
Password: admin1234
```

### 4. 그래도 안 될 때 확인할 것

백엔드가 실행 중인지 확인합니다.

```text
http://localhost:4001/health
```

로그인 요청이 성공하는지 개발자 도구 Network 탭에서 확인합니다.

```text
POST /api/auth/login
```

관리자 페이지 접근 시 403이 뜬다면 현재 로그인한 계정이 관리자가 아니거나, JWT token 안의 `role` 값이 `ADMIN`이 아닌 상태입니다.

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
GET    /api/reviews/anime/:animeId
GET    /api/reviews/me
POST   /api/reviews
PUT    /api/reviews/:id
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
```

### Swagger

```text
http://localhost:4001/api-docs
```

## 메인 화면 구조

메인 페이지는 카드 슬라이드 기반으로 구성됩니다.

```text
지금 뜨는 애니 TOP 10
지금 인기 있는 애니
이번 시즌 인기작
고평점 추천
```

각 카드 rail은 좌우 버튼으로 이동할 수 있으며, 포스터 클릭 시 해당 애니메이션 상세 페이지로 이동합니다.

상세 이동에는 내부 DB ID가 아니라 Jikan/MAL 기준 `externalId`, `malId`, `routeId` 값을 사용합니다.

## 한국어 번역 관리 방식

AniPick은 서버 실행 중 매번 GPT 토큰을 사용해 번역하지 않습니다.

기본 흐름:

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

예시:

```text
JIKAN_5114.csv
JIKAN_9253.csv
```

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

```powershell
cd backend

node scripts/repairAnimeCache.js
node scripts/repairAnimeCache.js --refresh-missing --limit=100
node scripts/repairAnimeCache.js --refresh-missing --limit=100 --apply
node scripts/repairAnimeCache.js --dedupe
node scripts/repairAnimeCache.js --cleanup-ghosts --apply
node scripts/repairAnimeCache.js --mark-adult --apply
node scripts/repairAnimeCache.js --all --apply
```

주의사항:

- 기본 진단은 안전하게 실행할 수 있습니다.
- 실제 DB 반영은 `--apply` 옵션이 있을 때만 수행됩니다.
- 사용자 리뷰, 찜, 시청 상태가 연결된 데이터는 무작정 삭제하지 않는 방향으로 관리합니다.

## 성인 콘텐츠 차단 정책

일반 사용자 화면에서는 아래 콘텐츠를 노출하지 않습니다.

```text
Hentai
Erotica
Ecchi
Rx - Hentai
명백한 성인 키워드가 포함된 작품
```

성인 콘텐츠는 기본적으로 hard delete가 아니라 soft delete/archive 방식으로 처리합니다.

```text
isAdult = true
isHidden = true
dataStatus = ARCHIVED
hiddenReason = ADULT_CONTENT_AUTO_DETECTED
```

## GitHub 업로드 전 확인

`.gitignore`에 아래 항목이 포함되어야 합니다.

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

## GitHub 업로드

프로젝트 루트에서 실행합니다.

```powershell
cd "C:\Users\shy\Documents\4학년 1학기\OSS\애니 클론사이트 만들기\AniPick"

git status
git add .
git commit -m "Prepare AniPick for deployment"
git branch -M main
git remote set-url origin https://github.com/shy0401/AniPick.git
git push -u origin main
```

원격 저장소가 처음인 경우:

```powershell
git remote add origin https://github.com/shy0401/AniPick.git
git push -u origin main
```

## 배포 가이드

추천 배포 구조:

```text
Frontend: Vercel
Backend: Render
Database: Neon PostgreSQL 또는 Supabase PostgreSQL
```

### Backend 배포 예시: Render

Render Web Service 설정:

```text
Root Directory: backend
Build Command: npm install && npx prisma generate && npx prisma migrate deploy
Start Command: npm run start
```

`backend/package.json`에 아래 script가 필요합니다.

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "seed": "node prisma/seed.js"
  }
}
```

Render 환경변수:

```env
DATABASE_URL="배포 PostgreSQL URL"
JWT_SECRET="충분히 긴 랜덤 문자열"
PORT=4001
BOOTSTRAP_ANIME_ON_START=false
PRETRANSLATE_LIMIT=30
OPENAI_API_KEY=""
OPENAI_TRANSLATION_MODEL="gpt-4.1-mini"
FRONTEND_URL="https://your-frontend-url.vercel.app"
```

배포 후 확인:

```text
https://your-backend-url.com/health
```

### Frontend 배포 예시: Vercel

Vercel 설정:

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

## 문제 해결

### P1001: Can't reach database server 오류

아래 오류가 발생하면 PostgreSQL DB가 실행 중이 아닌 상태입니다.

```text
Error: P1001: Can't reach database server at `localhost:5433`
```

해결 방법:

```powershell
# Docker Desktop 실행 후

docker start anipick_postgres
docker ps
```

그 다음 다시 실행합니다.

```powershell
cd backend

npx prisma migrate dev
python scripts/translate_pending_ko.py sync-db
npm run dev
```

### Docker 컨테이너가 없다는 오류

아래 명령어에서 컨테이너가 없다는 오류가 나면:

```powershell
docker start anipick_postgres
```

처음 생성 명령어를 실행합니다.

```powershell
docker run --name anipick_postgres `
  -e POSTGRES_USER=anipick_user `
  -e POSTGRES_PASSWORD=anipick_password `
  -e POSTGRES_DB=anipick_db `
  -p 5433:5432 `
  -d postgres:15
```

### 프론트에서 API 요청이 실패하는 경우

백엔드가 실행 중인지 확인합니다.

```text
http://localhost:4001/health
```

프론트 환경변수를 확인합니다.

```env
VITE_API_BASE_URL="http://localhost:4001/api"
```

로컬 Vite proxy를 사용하는 경우 생략할 수 있습니다.

### CORS 오류가 발생하는 경우

백엔드 CORS 설정에 프론트 주소가 포함되어야 합니다.

로컬 주소:

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

```text
1. 카드 컴포넌트가 Link로 되어 있는지
2. 상세 URL에 내부 DB id가 아니라 externalId, malId, routeId가 들어가는지
3. 브라우저 콘솔에 routeId missing 경고가 있는지
4. rail의 드래그 이벤트가 일반 클릭을 막고 있지 않은지
```

### 애니 포스터가 placeholder로만 보이는 경우

```powershell
cd backend

node scripts/repairAnimeCache.js --refresh-missing --limit=100 --apply
```

### 평점이 보이지 않는 경우

```powershell
cd backend

node scripts/repairAnimeCache.js --refresh-missing --limit=100 --apply
```

### 한국어 번역이 PENDING으로 보이는 경우

```powershell
cd backend

python scripts/translate_pending_ko.py status
python scripts/translate_pending_ko.py sync-db
```

## 라이선스

이 프로젝트는 학습 및 포트폴리오 목적의 프로젝트입니다.

외부 API 데이터와 이미지의 저작권은 각 제공처 및 원저작권자에게 있습니다.