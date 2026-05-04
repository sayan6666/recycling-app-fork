import type { WasteItem } from "../types/waste";

export const catalogMock: WasteItem[] = [
  {
    id: "w1",
    name: "Пластиковая бутылка",
    category: "plastic",
    preparation: "Промыть, снять крышку, сжать.",
    description: "Подходит для переработки как бытовой пластик.",
    relatedPlaceIds: ["1", "2"],
  },
  {
    id: "w2",
    name: "Газета и бумага",
    category: "paper",
    preparation: "Сухая, чистая, без остатков еды.",
    description: "Макулатура принимается в сухом виде.",
    relatedPlaceIds: ["1", "3"],
  },
  {
    id: "w3",
    name: "Стеклянная бутылка",
    category: "glass",
    preparation: "Ополоснуть, убрать пробку и крышку.",
    description: "Подходит прозрачное и цветное стекло.",
    relatedPlaceIds: ["1", "3"],
  },
];
