import type { Place } from '../data/types';

/**
 * Deep links for checking a place on a real map. We do not bundle a map SDK —
 * the schematic map is offline-safe and these links open the user's map app.
 * Place names are searched in Chinese, which is what Chinese map services index.
 */
export const amapSearch = (place: Place): string =>
  `https://uri.amap.com/search?keyword=${encodeURIComponent(place.cn)}`;

export const gmapsPoint = (place: Place): string =>
  `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
