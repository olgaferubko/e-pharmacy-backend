import { getAllReviews } from '../services/reviews.js';

export const getCustomerReviewsController = async (req, res, next) => {
  try {
    const reviews = await getAllReviews();

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched customer reviews!',
      data: reviews,
    });
  } catch (error) {
    next(error); 
  }
};
