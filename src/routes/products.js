import express from 'express';
import { getProductsController, getProductDetailsController } from '../controllers/products.js';

const router = express.Router();

router.get('/', getProductsController);

router.get('/:id', getProductDetailsController);

export default router;
