import { model, Schema } from 'mongoose';

const productReviewsSchema = new Schema(
  {
    productId: { type: String, required: true }, 
    userName: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    daysAgo: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const ProductReviewsCollection = model('productReviews', productReviewsSchema);
