import { model, Schema } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
        quantity: { type: Number, default: 1 },
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

export const CartCollection = model('cart', cartSchema);
