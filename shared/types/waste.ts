import type { WasteType } from "./place";

export type WasteItem = {
  id: string;
  name: string;
  category: WasteType;
  preparation: string;
  description: string;
  relatedPlaceIds: string[];
};
