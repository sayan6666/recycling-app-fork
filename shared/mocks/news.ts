import type { PlaceNews } from "../types/news";

export const newsMock: PlaceNews[] = [
  {
    id: "n1",
    placeId: "1",
    title: "Изменение графика работы",
    date: "2026-04-21",
    type: "schedule",
    content: "С понедельника пункт работает до 19:00 по будням.",
  },
  {
    id: "n2",
    placeId: "1",
    title: "Весенняя акция",
    date: "2026-04-19",
    type: "promotion",
    content: "При сдаче стекла и пластика действует расширенный прием.",
  },
  {
    id: "n3",
    placeId: "2",
    title: "Обновлен список принимаемых отходов",
    date: "2026-04-22",
    type: "update",
    content: "Добавлена категория мелкой бытовой электроники.",
  },
];
