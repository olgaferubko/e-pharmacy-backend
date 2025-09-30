import { model, Schema } from 'mongoose';
import { CATEGORIES } from '../../constants/categories.js';

const productsSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    photo: { type: String },
    name: { type: String, required: true, index: true },
    suppliers: { type: String },
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: CATEGORIES, index: true },
    description: { type: [String], default: [] },
  },
  { timestamps: true, versionKey: false }
);

productsSchema.index({ name: 'text', category: 1 });

export const ProductsCollection = model('products', productsSchema);
