import { ProductReviewsCollection } from '../db/models/productReviews.js';
import createHttpError from 'http-errors';

export const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReviewsCollection.find({ productId }).lean();

    if (!reviews.length) {
      throw createHttpError(404, 'No reviews found for this product');
    }

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
