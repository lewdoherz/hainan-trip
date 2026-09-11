import type { Place } from '../data/types';

/**
 * Deep links for checking a place on a real map. We do not bundle a map SDK —
 * the schematic map is offline-safe and these links open the user's map app.
 */
export const amapSearch = (place: Place): string =>
  `https://uri.amap.com/search?keyword=${encodeURIComponent(place.name + ' ' + place.cn)}`;

export const gmapsPoint = (place: Place): string =>
  `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;

export const baiduSearch = (place: Place): string =>
  `https://map.baidu.com/search/${encodeURIComponent(place.name)}/@11100000,1900000,7z`;
