import type { Place } from "../types/place";

export const placesMock: Place[] = [
  {
    id: "1",
    name: "ЭкоПункт Центральный",
    address: "ул. Абая, 10",
    lat: 43.2389,
    lng: 76.8897,
    wasteTypes: ["plastic", "paper", "glass"],
    workHours: "09:00–18:00",
    contacts: "+7 777 123 45 67",
    description: "Принимаем основные виды вторсырья.",
  },
  {
    id: "2",
    name: "GreenDrop",
    address: "пр. Назарбаева, 52",
    lat: 43.245,
    lng: 76.93,
    wasteTypes: ["plastic", "metal", "electronics"],
    workHours: "10:00–19:00",
    contacts: "+7 777 222 11 00",
    description: "Специализация на пластике и электронике.",
  },
  {
    id: "3",
    name: "Recycle Hub",
    address: "ул. Толе би, 101",
    lat: 43.256,
    lng: 76.905,
    wasteTypes: ["paper", "glass"],
    workHours: "08:30–17:30",
    contacts: "+7 701 555 33 44",
    description: "Приём стекла и макулатуры.",
  },
];
