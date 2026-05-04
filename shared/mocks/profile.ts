import type { UserProfile } from "../types/profile";

export const profileMock: UserProfile = {
  id: "u1",
  fullName: "Алексей Иванов",
  email: "alexey@example.com",
  city: "Алматы",
  role: "user",
  favoriteWasteTypes: ["plastic", "paper", "glass"],
  reviewsCount: 3,
  visitedPlacesCount: 7,
  recentActivity: [
    {
      id: "a1",
      title: "Сдал пластиковые бутылки",
      date: "2026-04-18",
      status: "completed",
    },
    {
      id: "a2",
      title: "Посетил ЭкоПункт Центральный",
      date: "2026-04-15",
      status: "completed",
    },
    {
      id: "a3",
      title: "Планирует сдать стекло",
      date: "2026-04-22",
      status: "planned",
    },
  ],
};
