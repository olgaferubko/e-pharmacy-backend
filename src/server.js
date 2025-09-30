import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerConfig } from './middlewares/swaggerConfig.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import reviewRoutes from './routes/reviews.js';
import storeRoutes from './routes/stores.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';

dotenv.config();

export async function setupServer() {
  const PORT = Number(getEnvVar('PORT', '3000'));
  const app = express();

  const swagger = await swaggerConfig();
  app.use('/api-docs', ...swagger);

  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://e-pharmacy-frontend.vercel.app',
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) callback(null, true);
        else callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(cookieParser());

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );


  app.use('/api/user/refresh', (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
  });

  app.use('/api/user', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/customer-reviews', reviewRoutes);
  app.use('/api/stores', storeRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/cart', cartRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
};
