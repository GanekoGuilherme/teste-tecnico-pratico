import UUID from "@shared/utils/uuid";
import ICarRepository, {
  ICreateCarDTO,
  IListCarDTO,
  IUpdateCarDTO,
} from "../models/ICarRepository";
import Car, { ICarDTO } from "../schemas/Car";

export default class CarRepository implements ICarRepository {
  async createCar({
    licensePlate,
    color,
    brand,
  }: ICreateCarDTO): Promise<ICarDTO> {
    const car = await Car.create({
      _id: new UUID().getV4(),
      licensePlate,
      color,
      brand,
    });

    return car;
  }

  async updateCar({
    _id,
    licensePlate,
    color,
    brand,
  }: IUpdateCarDTO): Promise<ICarDTO | null> {
    const car = await Car.findOneAndUpdate(
      { _id },
      { licensePlate, color, brand },
      { new: true }
    );

    return car ?? null;
  }

  softDeleteCar(_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  recoveryCar(_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listCar({ color, brand }: IListCarDTO): Promise<ICarDTO[]> {
    throw new Error("Method not implemented.");
  }
  listCarTrashed(): Promise<ICarDTO[]> {
    throw new Error("Method not implemented.");
  }

  async findCarByLicensePlate(licensePlate: string): Promise<ICarDTO | null> {
    const car = await Car.findOne({ licensePlate, trashed: false });

    return car ?? null;
  }

  async listCarByLicensePlate(licensePlate: string): Promise<ICarDTO[]> {
    const car = await Car.find({ licensePlate, trashed: false });

    return car;
  }
}
