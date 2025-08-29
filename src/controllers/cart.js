import { getCart, updateCart, checkoutCart } from '../services/cart.js';

export const getCartItemsController = async (req, res, next) => {
  try {
    const userId = req.user._id; 
    const cart = await getCart(userId);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched cart items!',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { items } = req.body;

    const cart = await updateCart(userId, items);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated cart!',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const checkoutController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await checkoutCart(userId);

    res.status(200).json({
      status: 200,
      message: result.message,
      data: result.cart,
    });
  } catch (error) {
    next(error);
  }
};
