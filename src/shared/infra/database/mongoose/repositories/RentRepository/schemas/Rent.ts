import { model, Document, Schema } from "mongoose";
import { ICarDTO } from "../../CarRepository/schemas/Car";
import { IDriverDTO } from "../../DriverRepository/schemas/Driver";

export interface IRentDTO {
  _id: string;
  startDate: Date;
  endDate: Date | null;
  driver: string | IDriverDTO;
  car: string | ICarDTO;
  reason: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IRentDocument = IRentDTO & Document;

const RentSchema = new Schema(
  {
    _id: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    driver: {
      type: String,
      required: true,
      ref: "Driver",
    },
    car: {
      type: String,
      required: true,
      ref: "Car",
    },
    reason: {
      types: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);

export default model<IRentDocument>("Rent", RentSchema, "Rent");
