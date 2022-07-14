import { model, Document, Schema } from "mongoose";

export interface IDriverDTO {
  _id: string;
  name: string;
  trashed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IDriverDocument = IDriverDTO & Document;

const DriverSchema = new Schema(
  {
    _id: {
      type: String,
    },
    name: {
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

export default model<IDriverDocument>("Driver", DriverSchema, "Driver");
