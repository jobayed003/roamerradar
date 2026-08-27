/** Pure helpers for Duffel offer ids — kept separate from API client so unit tests need no env. */

export function isDuffelOfferId(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('off_');
}
