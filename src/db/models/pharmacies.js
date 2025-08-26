import { model, Schema } from 'mongoose';

const pharmaciesSchema = new Schema(
  {
    name: { type: String, required: true },         
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    rating: { type: Number, default: 0 },
    isOpen: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);

export const PharmaciesCollection = model('pharmacies', pharmaciesSchema);
