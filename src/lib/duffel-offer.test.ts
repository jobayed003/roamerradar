import { describe, expect, it } from 'vitest';
import { isDuffelOfferId } from '@/lib/duffel-offer-id';

describe('isDuffelOfferId', () => {
  it('accepts Duffel offer ids', () => {
    expect(isDuffelOfferId('off_00009htYpSCXrwaB9DnUm2')).toBe(true);
  });

  it('rejects non-offer ids', () => {
    expect(isDuffelOfferId('clxyz123')).toBe(false);
    expect(isDuffelOfferId('ord_123')).toBe(false);
    expect(isDuffelOfferId(null)).toBe(false);
  });
});
