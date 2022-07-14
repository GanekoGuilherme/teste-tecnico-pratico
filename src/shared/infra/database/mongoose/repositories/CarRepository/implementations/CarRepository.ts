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
      { _id, trashed: false },
      { licensePlate, color, brand },
      { new: true }
    );

    return car ?? null;
  }

  async softDeleteCar(_id: string): Promise<ICarDTO | null> {
    const car = await Car.findOneAndUpdate(
      { _id, trashed: false },
      { trashed: true },
      { new: true }
    );

    return car ?? null;
  }

  async recoverCar(_id: string): Promise<ICarDTO | null> {
    const car = await Car.findOneAndUpdate(
      { _id, trashed: true },
      { trashed: false },
      { new: true }
    );

    return car ?? null;
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
