import createHttpError from 'http-errors';
import { CartCollection } from '../db/models/cart.js';

export const getCart = async (userId) => {
  const cart = await CartCollection.findOne({ userId }).populate('items.productId');
  if (!cart) {
    return { userId, items: [] };
  }
  return cart;
};

export const updateCart = async (userId, items) => {
  const cart = await CartCollection.findOne({ userId });

  if (!cart) {
    return await CartCollection.create({ userId, items });
  }

  cart.items = items;
  await cart.save();
  return cart;
};


export const checkoutCart = async (userId) => {
  const cart = await CartCollection.findOne({ userId }).populate('items.productId');
  if (!cart || cart.items.length === 0) {
    throw createHttpError(400, 'Cart is empty');
  }

  cart.items = [];
  await cart.save();

  return { message: 'Order successfully placed', cart };
};
