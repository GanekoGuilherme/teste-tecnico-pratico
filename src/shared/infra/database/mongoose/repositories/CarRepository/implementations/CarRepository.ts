import ICarRepository, {
  ICreateCarDTO,
  IListCarDTO,
  IUpdateCarDTO,
} from "../models/ICarRepository";
import { ICarDTO } from "../schemas/Car";

export default class CarRepository implements ICarRepository {
  createCar({ licensePlate, color, brand }: ICreateCarDTO): Promise<ICarDTO> {
    throw new Error("Method not implemented.");
  }
  updateCar({
    _id,
    licensePlate,
    color,
    brand,
  }: IUpdateCarDTO): Promise<ICarDTO> {
    throw new Error("Method not implemented.");
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
  findCarByLicensePlate(licensePlate: string): Promise<ICarDTO | null> {
    throw new Error("Method not implemented.");
  }
}
