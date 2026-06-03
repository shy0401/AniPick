# API Usage

## External APIs

The assignment app can run without external API keys. In this repository, the default execution path uses fallback sample data.

Supported environment variables in `.env.example`:

- `OPENAI_API_KEY`
- `KAKAO_REST_API_KEY`
- `NAVER_CLIENT_ID`
- `NAVER_CLIENT_SECRET`
- `GOOGLE_PLACES_API_KEY`
- `USE_LLM`
- `WEATHER_API_MODE`

## Kakao Local API

Kakao Local can be used for place lookup when `KAKAO_REST_API_KEY` is set. If the key is absent, the app uses `app/data/restaurants.json`.

## Naver Search API

Naver search keys are documented for extension. The fallback mode does not require them.

## Google Places API

Google Places keys are documented for extension. The fallback mode uses local place detail data.

## Open-Meteo

The weather tool returns fallback weather when no external weather API is configured.

## Secret Policy

Do not commit `.env` or real API keys. The packaging script scans for non-empty secret-like API key values and aborts if they are found.
