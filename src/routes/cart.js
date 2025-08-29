import express from 'express';
import {
  getCartItemsController,
  updateCartController,
  checkoutController,
} from '../controllers/cart.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getCartItemsController);
router.put('/update', authenticate, updateCartController);
router.post('/checkout', authenticate, checkoutController);

export default router;
