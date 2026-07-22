-- AlterTable
ALTER TABLE "Booking" ADD COLUMN "checkIn" TIMESTAMP(3),
ADD COLUMN "checkOut" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Booking_checkIn_idx" ON "Booking"("checkIn");

-- CreateIndex
CREATE INDEX "Booking_checkOut_idx" ON "Booking"("checkOut");
