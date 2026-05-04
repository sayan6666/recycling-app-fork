export type Review = {
  id: string;
  placeId: string;
  author: string;
  rating: number;
  date: string;
  text: string;
};

export type RatingSummary = {
  placeId: string;
  average: number;
  total: number;
};
