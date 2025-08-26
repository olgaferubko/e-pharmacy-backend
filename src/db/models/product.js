import { model, Schema } from 'mongoose';

const productsSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    photo: { type: String },
    name: { type: String, required: true },
    suppliers: { type: String },
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: [String], default: [] },
  },
  { timestamps: true, versionKey: false }
);

export const ProductsCollection = model('products', productsSchema);
