import express from 'express';
import { getProductsController, getProductDetailsController, getProductCategoriesController } from '../controllers/products.js';

const router = express.Router();

router.get('/categories', getProductCategoriesController);

router.get('/', getProductsController);

router.get('/:id', getProductDetailsController);

export default router;
