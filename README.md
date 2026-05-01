# AniPick

AniPick is an anime information platform using AniList GraphQL API.
No video streaming or download features are implemented.

## Environment

`backend/.env`
```env
DATABASE_URL="postgresql://anipick_user:anipick_password@localhost:5433/anipick_db?schema=public"
JWT_SECRET="change_this_secret"
PORT=4001
```

`frontend/.env`
```env
VITE_API_BASE_URL=http://localhost:4001/api
```

## Run (4001 / 5433)

Root:
```powershell
docker compose up -d
```

Backend:
```powershell
cd backend
copy .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Frontend:
```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

Access:
- Frontend: http://localhost:5173
- Backend: http://localhost:4001
- Health: http://localhost:4001/health
- AniList test: http://localhost:4001/api/anime/test-anilist
- Swagger: http://localhost:4001/api-docs

## AniList API Test

PowerShell:
```powershell
Invoke-RestMethod http://localhost:4001/health
Invoke-RestMethod http://localhost:4001/api/anime/test-anilist
Invoke-RestMethod http://localhost:4001/api/anime/trending
```

Browser:
- http://localhost:4001/health
- http://localhost:4001/api/anime/test-anilist
- http://localhost:4001/api/anime/trending
- http://localhost:4001/api-docs

## AniList Failure Checklist

- Check internet connectivity.
- Check if `https://graphql.anilist.co` is reachable from browser.
- School/company/public Wi-Fi may block external APIs.
- VPN, firewall, or antivirus may block Node.js HTTPS requests.
- AniList may have temporary rate limit or outage.
- Check backend terminal logs prefixed with `[AniList]`.

## Note for Docker Volume Reset

`docker compose down -v` removes data for volumes in this AniPick compose file.
If you use other project databases, do not remove their volumes by mistake.
