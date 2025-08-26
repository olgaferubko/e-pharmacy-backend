import { ProductsCollection } from '../db/models/product.js';
import { ProductReviewsCollection } from '../db/models/productReviews.js';
import createHttpError from 'http-errors';

export const getProducts = async (queryParams) => {
  const filter = {};

  if (queryParams.name) {
    filter.name = { $regex: queryParams.name, $options: 'i' };
  }
  if (queryParams.category) {
    filter.category = queryParams.category;
  }

  const products = await ProductsCollection.find(filter);


  const productsWithReviews = await Promise.all(
    products.map(async (product) => {
      const reviews = await ProductReviewsCollection.find({ productId: product.id });
      return { ...product.toObject(), reviews };
    })
  );

  return productsWithReviews;
};

export const getProductById = async (id) => {
  const product = await ProductsCollection.findOne({ id });
  if (!product) throw createHttpError(404, 'Product not found');

  const reviews = await ProductReviewsCollection.find({ productId: id });
  return { ...product.toObject(), reviews };
};
