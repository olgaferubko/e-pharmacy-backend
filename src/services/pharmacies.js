import { PharmaciesCollection } from '../db/models/pharmacy.js';

export const getStoresList = async () => {
  return await PharmaciesCollection.find({});
};

export const getNearestStores = async () => {
  return await PharmaciesCollection.find({});
};
