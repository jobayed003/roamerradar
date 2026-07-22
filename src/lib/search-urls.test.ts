import { describe, expect, it } from 'vitest';
import { buildFlightsSearchUrl, parseFlightsSearchParams } from '@/lib/search-urls';

describe('buildFlightsSearchUrl', () => {
  it('builds a flights category URL with route and dates', () => {
    const href = buildFlightsSearchUrl({
      from: 'NYC',
      to: 'LON',
      departure: new Date('2026-09-01T00:00:00.000Z'),
      return: new Date('2026-09-10T00:00:00.000Z'),
    });

    expect(href).toContain('/flights-category?');
    expect(href).toContain('from=NYC');
    expect(href).toContain('to=LON');
    expect(href).toContain('departure=2026-09-01');
    expect(href).toContain('return=2026-09-10');
  });

  it('omits return date for one-way trips', () => {
    const href = buildFlightsSearchUrl({
      from: 'NYC',
      to: 'LON',
      departure: new Date('2026-09-01T00:00:00.000Z'),
      return: new Date('2026-09-10T00:00:00.000Z'),
      isOneWay: true,
    });

    expect(href).not.toContain('return=');
  });
});

describe('parseFlightsSearchParams', () => {
  it('trims locations and parses dates', () => {
    const parsed = parseFlightsSearchParams({
      from: ' NYC ',
      to: ' LON ',
      departure: '2026-09-01',
      return: '2026-09-10',
    });

    expect(parsed.from).toBe('NYC');
    expect(parsed.to).toBe('LON');
    expect(parsed.departure).toBeDefined();
    expect(parsed.departure!.getFullYear()).toBe(2026);
    expect(parsed.departure!.getMonth()).toBe(8);
    expect(parsed.departure!.getDate()).toBe(1);
  });
});
