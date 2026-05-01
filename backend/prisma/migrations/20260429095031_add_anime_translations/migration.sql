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
