import { UserLocation } from '../types';

/**
 * Calculates the distance between two points on Earth using the Haversine formula.
 * @param point1 - The first location with latitude and longitude.
 * @param point2 - The second location with latitude and longitude.
 * @returns The distance in kilometers.
 */
export function calculateDistance(point1: UserLocation, point2: UserLocation): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(point2.latitude - point1.latitude);
  const dLon = deg2rad(point2.longitude - point1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point1.latitude)) * Math.cos(deg2rad(point2.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
