import { ProductsCollection } from '../db/models/product.js';
import { ProductReviewsCollection } from '../models/productReviews.js';
import { CATEGORIES } from '../constants/categories.js';
import createHttpError from 'http-errors';

export const findProducts = async (queryParams = {}) => {
  const { name = '', category = '', page = 1, limit = 12 } = queryParams;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const lim     = Math.max(1, Math.min(50, parseInt(limit, 10) || 12));
  const skip    = (pageNum - 1) * lim;

  const filter = {};
  if (name)     filter.name     = { $regex: String(name), $options: 'i' };
  if (category) filter.category = String(category);

  const [items, total] = await Promise.all([
    ProductsCollection.find(filter).skip(skip).limit(lim).lean(),
    ProductsCollection.countDocuments(filter),
  ]);

  return { items, total };
};


export const findById = async (id) => {
  const product = await ProductsCollection.findOne({ id }).lean();
  if (!product) throw createHttpError(404, 'Product not found');

  const reviews = await ProductReviewsCollection.find({ productId: id }).lean();
  return { ...product, reviews };
};


export const getCategories = async () => {
  return [...CATEGORIES];
};

export const getProducts = findProducts;
export const getProductById = findById;
