export type UserActivity = {
  id: string;
  title: string;
  date: string;
  status: "completed" | "planned";
};

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  city: string;
  role: "user";
  favoriteWasteTypes: string[];
  reviewsCount: number;
  visitedPlacesCount: number;
  recentActivity: UserActivity[];
};
