export type WasteType = "plastic" | "paper" | "glass" | "metal" | "electronics";

export type Place = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  wasteTypes: WasteType[];
  workHours?: string;
  contacts?: string;
  description?: string;
};
