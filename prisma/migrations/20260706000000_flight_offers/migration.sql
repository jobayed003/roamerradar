-- CreateTable
CREATE TABLE "FlightOffer" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "listingData" JSONB NOT NULL,
    "offerData" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FlightOffer_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN "flightOfferId" TEXT,
ADD COLUMN "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN "title" TEXT,
ADD COLUMN "image" TEXT;

-- Make listingId optional for flight-only bookings
ALTER TABLE "Booking" ALTER COLUMN "listingId" DROP NOT NULL;

-- Backfill title from listing for existing bookings
UPDATE "Booking" b
SET "title" = l."title", "image" = l."image"
FROM "Listing" l
WHERE b."listingId" = l."id" AND b."title" IS NULL;

ALTER TABLE "Booking" ALTER COLUMN "title" SET NOT NULL;

-- Drop old FK to allow nullable listingId
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_listingId_fkey";

-- CreateIndex
CREATE INDEX "FlightOffer_expiresAt_idx" ON "FlightOffer"("expiresAt");

CREATE INDEX "Booking_flightOfferId_idx" ON "Booking"("flightOfferId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Booking" ADD CONSTRAINT "Booking_flightOfferId_fkey" FOREIGN KEY ("flightOfferId") REFERENCES "FlightOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
