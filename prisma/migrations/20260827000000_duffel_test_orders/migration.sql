-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "passengerDetails" JSONB,
ADD COLUMN     "duffelOrderId" TEXT,
ADD COLUMN     "duffelBookingReference" TEXT,
ADD COLUMN     "duffelFulfillmentStatus" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_duffelOrderId_key" ON "Booking"("duffelOrderId");
