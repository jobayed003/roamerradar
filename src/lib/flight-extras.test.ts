import { describe, expect, it } from 'vitest';
import {
  calculateFlightExtrasTotal,
  parseFlightExtras,
  parseFlightExtrasParam,
} from '@/lib/flight-extras';

describe('flight extras', () => {
  it('parses known extras and drops unknown values', () => {
    expect(parseFlightExtras(['cabin_bag', 'seat', 'wifi'])).toEqual(['cabin_bag', 'seat']);
  });

  it('parses comma-separated checkout query params', () => {
    expect(parseFlightExtrasParam('cabin_bag,checked_bag')).toEqual(['cabin_bag', 'checked_bag']);
    expect(parseFlightExtrasParam('')).toEqual([]);
  });

  it('sums demo add-on prices', () => {
    expect(calculateFlightExtrasTotal(['cabin_bag', 'seat'])).toBe(60);
  });
});
