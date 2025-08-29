import { getProducts, getProductById } from '../services/products.js';

export const getProductsController = async (req, res, next) => {
  try {
    const products = await getProducts(req.query);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched products!',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductDetailsController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched product details!',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
