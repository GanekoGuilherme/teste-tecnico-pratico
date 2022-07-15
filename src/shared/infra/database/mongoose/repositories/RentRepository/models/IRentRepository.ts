import { ICarDTO } from "../../CarRepository/schemas/Car";
import { IDriverDTO } from "../../DriverRepository/schemas/Driver";
import { IRentDTO } from "../schemas/Rent";

export interface ICreateRentDTO {
  _id: string;
  startDate: Date;
  driver: string | IDriverDTO;
  car: string | ICarDTO;
  reason: string;
}

export interface IFinishRentDTO {
  _id: string;
  endDate: Date;
}

export default interface IRentRepository {
  createRent({
    _id,
    startDate,
    driver,
    car,
    reason,
  }: ICreateRentDTO): Promise<IRentDTO>;

  finishRent({ _id, endDate }: IFinishRentDTO): Promise<IRentDTO | null>;

  listRent(): Promise<IRentDTO[]>;

  findOneRentByDriverAndEndDateDefined(
    driver: string
  ): Promise<IRentDTO | null>;

  findOneRentByCarAndEndDateDefined(car: string): Promise<IRentDTO | null>;
}
