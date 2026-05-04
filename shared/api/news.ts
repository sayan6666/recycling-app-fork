import { newsMock } from "../mocks/news";
import type { PlaceNews } from "../types/news";

export async function getNewsByPlaceId(placeId: string): Promise<PlaceNews[]> {
  return newsMock.filter((item) => item.placeId === placeId);
}
