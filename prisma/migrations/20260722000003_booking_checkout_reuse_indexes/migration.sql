-- CreateIndex
CREATE INDEX IF NOT EXISTS "Booking_userId_listingId_status_idx" ON "Booking"("userId", "listingId", "status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Booking_userId_flightOfferId_status_idx" ON "Booking"("userId", "flightOfferId", "status");
