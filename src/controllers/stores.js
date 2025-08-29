import { getStoresList, getNearestStores } from '../services/stores.js';

export const getStoresController = async (req, res, next) => {
  try {
    const stores = await getStoresList();

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched stores list!',
      data: stores,
    });
  } catch (error) {
    next(error);
  }
};

export const getNearestStoresController = async (req, res, next) => {
  try {
    const stores = await getNearestStores();

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched nearest stores!',
      data: stores,
    });
  } catch (error) {
    next(error);
  }
};
