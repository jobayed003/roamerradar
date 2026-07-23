-- CreateTable
CREATE TABLE "PlaceSuggestion" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlaceSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlaceSuggestion_name_idx" ON "PlaceSuggestion"("name");

-- CreateIndex
CREATE INDEX "PlaceSuggestion_country_idx" ON "PlaceSuggestion"("country");

-- CreateIndex
CREATE UNIQUE INDEX "PlaceSuggestion_country_name_key" ON "PlaceSuggestion"("country", "name");
