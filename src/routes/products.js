import express from 'express';
import { getProductsController, getProductDetailsController, getProductCategoriesController } from '../controllers/products.js';
import { getProductReviews } from '../controllers/productReviews.js';

const router = express.Router();

router.get('/categories', getProductCategoriesController);

router.get('/', getProductsController);

router.get('/:id', getProductDetailsController);

router.get('/:productId/reviews', getProductReviews);

export default router;
