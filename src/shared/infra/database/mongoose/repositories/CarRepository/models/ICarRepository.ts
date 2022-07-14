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
  trashed: boolean;
}

export default interface ICarRepository {
  createCar({ licensePlate, color, brand }: ICreateCarDTO): Promise<ICarDTO>;

  updateCar({
    _id,
    licensePlate,
    color,
    brand,
  }: IUpdateCarDTO): Promise<ICarDTO | null>;

  findCar(_id: string): Promise<ICarDTO | null>;

  softDeleteCar(_id: string): Promise<ICarDTO | null>;

  recoverCar(_id: string): Promise<ICarDTO | null>;

  listCar(filter: IListCarDTO): Promise<ICarDTO[]>;

  listCarTrashed(): Promise<ICarDTO[]>;

  findCarByLicensePlate(licensePlate: string): Promise<ICarDTO | null>;

  listCarByLicensePlate(licensePlate: string): Promise<ICarDTO[]>;
}
