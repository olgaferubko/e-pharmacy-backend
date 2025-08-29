import { PharmaciesCollection } from '../db/models/pharmacies.js';

export const getStoresList = async () => {
  return await PharmaciesCollection.find({});
};

export const getNearestStores = async () => {
  return await PharmaciesCollection.find({});
};
