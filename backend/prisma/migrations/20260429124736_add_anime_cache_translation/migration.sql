-- AlterTable
ALTER TABLE "Anime" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE INDEX "Anime_format_idx" ON "Anime"("format");
