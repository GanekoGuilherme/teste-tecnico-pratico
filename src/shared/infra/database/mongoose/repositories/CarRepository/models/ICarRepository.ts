import { ICarDTO } from "../schemas/Car";

export interface ICreateCarDTO {
  licensePlate: string;
  color: string;
  brand: string;
}

export interface IUpdateCarDTO {
  _id: string;
  licensePlate: string;
  color: string;
  brand: string;
}

export interface IListCarDTO {
  color?: string;
  brand?: string;
}

export default interface ICarRepository {
  createCar({ licensePlate, color, brand }: ICreateCarDTO): Promise<ICarDTO>;

  updateCar({
    _id,
    licensePlate,
    color,
    brand,
  }: IUpdateCarDTO): Promise<ICarDTO>;

  softDeleteCar(_id: string): Promise<void>;

  recoveryCar(_id: string): Promise<void>;

  listCar({ color, brand }: IListCarDTO): Promise<ICarDTO[]>;

  listCarTrashed(): Promise<ICarDTO[]>;

  findCarByLicensePlate(licensePlate: string): Promise<ICarDTO | null>;
}
