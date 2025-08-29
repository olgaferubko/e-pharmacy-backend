import express from 'express';
import { getCustomerReviewsController } from '../controllers/reviews.js';

const router = express.Router();

router.get('/', getCustomerReviewsController);

export default router;
