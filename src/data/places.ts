import { db } from '@/lib/db';

export async function getPlaceNames() {
  try {
    const places = await db.placeSuggestion.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      select: { name: true },
    });
    return places.map((place) => place.name);
  } catch (error) {
    console.error('[getPlaceNames]', error);
    return [];
  }
}

export async function getPlaceCountryMap() {
  try {
    const places = await db.placeSuggestion.findMany({
      select: { name: true, country: true },
    });
    return Object.fromEntries(places.map((place) => [place.name, place.country]));
  } catch (error) {
    console.error('[getPlaceCountryMap]', error);
    return {} as Record<string, string>;
  }
}

export async function getCountryByPlaceName(placeName: string) {
  if (!placeName?.trim()) return '';

  try {
    const place = await db.placeSuggestion.findFirst({
      where: { name: placeName },
      select: { country: true },
    });
    return place?.country ?? '';
  } catch (error) {
    console.error('[getCountryByPlaceName]', error);
    return '';
  }
}
