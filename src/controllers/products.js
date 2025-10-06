import {
  findProducts,
  findById,
} from '../services/products.js';

import { CATEGORIES } from '../constants/categories.js';

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;

export const getProductsController = async (req, res, next) => {
  try {
    const {
      name = '',
      category = '',
      page = '1',
      limit = String(DEFAULT_LIMIT),
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const lim     = Math.min(MAX_LIMIT, Math.max(1, parseInt(limit, 10) || DEFAULT_LIMIT));

    const { items, total } = await findProducts({
      name,
      category,
      page: pageNum,
      limit: lim,
    });

    const totalPages = Math.max(1, Math.ceil(total / lim));

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched products!',
      data: items,
      meta: { page: pageNum, limit: lim, total, totalPages },
    });
  } catch (error) {
    next(error);
  }
};

export const getProductDetailsController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await findById(id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: 'NotFoundError',
        data: 'Not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched product details!',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductCategoriesController = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched categories!',
      data: CATEGORIES,
    });
  } catch (error) {
    next(error);
  }
};
