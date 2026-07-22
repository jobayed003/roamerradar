import { describe, expect, it } from 'vitest';
import {
  buildCheckoutUrl,
  calculateStayPricing,
  ensureStayDateRange,
  parseBookingDate,
} from '@/lib/booking-pricing';

describe('parseBookingDate', () => {
  it('parses ISO date strings', () => {
    const date = parseBookingDate('2026-08-01');
    expect(date).toBeDefined();
    expect(date!.getFullYear()).toBe(2026);
    expect(date!.getMonth()).toBe(7);
    expect(date!.getDate()).toBe(1);
  });

  it('returns undefined for empty values', () => {
    expect(parseBookingDate('')).toBeUndefined();
    expect(parseBookingDate(null)).toBeUndefined();
  });
});

describe('ensureStayDateRange', () => {
  it('defaults to at least one night', () => {
    const from = new Date('2026-08-01T00:00:00.000Z');
    const range = ensureStayDateRange(from, from);
    expect(range.nights).toBe(1);
    expect(range.checkOut.getTime()).toBeGreaterThan(range.checkIn.getTime());
  });
});

describe('calculateStayPricing', () => {
  it('applies nightly rate and service fee', () => {
    const pricing = calculateStayPricing({
      nightlyRate: 100,
      checkIn: new Date('2026-08-01T00:00:00.000Z'),
      checkOut: new Date('2026-08-04T00:00:00.000Z'),
      serviceFeeRate: 0.1,
    });

    expect(pricing.nights).toBe(3);
    expect(pricing.subtotal).toBe(300);
    expect(pricing.serviceFee).toBe(30);
    expect(pricing.total).toBe(330);
  });
});

describe('buildCheckoutUrl', () => {
  it('includes booking query params', () => {
    const href = buildCheckoutUrl({
      itemId: 'cmrtest000000000000000001',
      checkIn: new Date('2026-08-01T00:00:00.000Z'),
      checkOut: new Date('2026-08-03T00:00:00.000Z'),
      guests: 2,
    });

    expect(href).toContain('/checkout/cmrtest000000000000000001');
    expect(href).toContain('checkIn=2026-08-01');
    expect(href).toContain('checkOut=2026-08-03');
    expect(href).toContain('guests=2');
  });
});
