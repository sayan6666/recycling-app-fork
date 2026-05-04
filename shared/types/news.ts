export type PlaceNews = {
  id: string;
  placeId: string;
  title: string;
  date: string;
  type: "update" | "promotion" | "schedule";
  content: string;
};
