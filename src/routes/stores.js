import express from 'express';
import { getStoresController, getNearestStoresController } from '../controllers/stores.js';

const router = express.Router();

router.get('/', getStoresController);

router.get('/nearest', getNearestStoresController);

export default router;
