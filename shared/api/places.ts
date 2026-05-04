import { placesMock } from "../mocks/places";
import type { Place, WasteType } from "../types/place";

export async function getPlaces(params?: {
  wasteType?: WasteType | "all";
  search?: string;
}): Promise<Place[]> {
  let data = [...placesMock];

  if (params?.wasteType && params.wasteType !== "all") {
    data = data.filter((place) =>
      place.wasteTypes.includes(params.wasteType as WasteType),
    );
  }

  if (params?.search) {
    const search = params.search.toLowerCase();
    data = data.filter(
      (place) =>
        place.name.toLowerCase().includes(search) ||
        place.address.toLowerCase().includes(search),
    );
  }

  return data;
}

export async function getPlaceById(id: string): Promise<Place | null> {
  return placesMock.find((place) => place.id === id) ?? null;
}
