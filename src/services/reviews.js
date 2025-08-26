import { ReviewsCollection } from '../db/models/reviews.js';

export const getAllReviews = async () => {
  return await ReviewsCollection.find({});
};
