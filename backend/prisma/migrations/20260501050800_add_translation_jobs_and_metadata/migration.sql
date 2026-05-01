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
