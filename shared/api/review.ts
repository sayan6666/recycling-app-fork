import { reviewsMock } from "../mocks/review";
import type { RatingSummary, Review } from "../types/review";

export async function getReviewsByPlaceId(placeId: string): Promise<Review[]> {
  return reviewsMock.filter((review) => review.placeId === placeId);
}

export async function getRatingSummaryByPlaceId(
  placeId: string,
): Promise<RatingSummary> {
  const reviews = reviewsMock.filter((review) => review.placeId === placeId);

  if (reviews.length === 0) {
    return {
      placeId,
      average: 0,
      total: 0,
    };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const average = Number((totalRating / reviews.length).toFixed(1));

  return {
    placeId,
    average,
    total: reviews.length,
  };
}
