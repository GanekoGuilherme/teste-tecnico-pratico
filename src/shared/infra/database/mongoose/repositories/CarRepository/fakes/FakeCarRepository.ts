import ICarRepository, {
  ICreateCarDTO,
  IListCarDTO,
  IUpdateCarDTO,
} from "../models/ICarRepository";
import { ICarDTO } from "../schemas/Car";

export default class CarRepository implements ICarRepository {
  private cars: ICarDTO[];

  constructor() {
    this.cars = [];
  }

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
  softDeleteCar(_id: string): Promise<ICarDTO> {
    throw new Error("Method not implemented.");
  }
  recoverCar(_id: string): Promise<ICarDTO> {
    throw new Error("Method not implemented.");
  }
  async listCar({ color, brand }: IListCarDTO): Promise<ICarDTO[]> {
    return this.cars;
  }
  listCarTrashed(): Promise<ICarDTO[]> {
    throw new Error("Method not implemented.");
  }
  findCarByLicensePlate(licensePlate: string): Promise<ICarDTO | null> {
    throw new Error("Method not implemented.");
  }
  listCarByLicensePlate(licensePlate: string): Promise<ICarDTO[]> {
    throw new Error("Method not implemented.");
  }
}
