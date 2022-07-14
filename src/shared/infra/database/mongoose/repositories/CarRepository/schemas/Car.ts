import { model, Document, Schema } from "mongoose";

export interface ICarDTO {
  _id: string;
  licensePlate: string;
  color: string;
  brand: string;
  trashed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ICarDocument = ICarDTO & Document;

const CarSchema = new Schema(
  {
    _id: {
      type: String,
    },
    licensePlate: {
      type: String,
      unique: true,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    trashed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);

export default model<ICarDocument>("Car", CarSchema, "Car");
