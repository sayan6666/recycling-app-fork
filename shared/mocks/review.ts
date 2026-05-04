import type { Review } from "../types/review";

export const reviewsMock: Review[] = [
  {
    id: "r1",
    placeId: "1",
    author: "Анна",
    rating: 5,
    date: "2026-04-20",
    text: "Очень удобно, быстро приняли пластик и бумагу.",
  },
  {
    id: "r2",
    placeId: "1",
    author: "Дмитрий",
    rating: 4,
    date: "2026-04-18",
    text: "Хорошая точка, но хотелось бы больше информации по графику.",
  },
  {
    id: "r3",
    placeId: "2",
    author: "Мария",
    rating: 5,
    date: "2026-04-19",
    text: "Удобный пункт для сдачи электроники.",
  },
  {
    id: "r4",
    placeId: "3",
    author: "Илья",
    rating: 3,
    date: "2026-04-17",
    text: "Нормально, но не все категории отходов принимаются.",
  },
];
