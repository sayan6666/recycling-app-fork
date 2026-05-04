import { catalogMock } from "../mocks/catalog";
import type { WasteItem } from "../types/waste";
import type { WasteType } from "../types/place";

export async function getCatalog(
  category?: WasteType | "all",
): Promise<WasteItem[]> {
  if (!category || category === "all") return catalogMock;
  return catalogMock.filter((item) => item.category === category);
}

export async function getWasteById(id: string): Promise<WasteItem | null> {
  return catalogMock.find((item) => item.id === id) ?? null;
}
