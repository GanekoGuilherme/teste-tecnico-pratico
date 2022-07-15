import IRentRepository, {
  ICreateRentDTO,
  IFinishRentDTO,
} from "../models/IRentRepository";
import { IRentDTO } from "../schemas/Rent";

export default class RentRepository implements IRentRepository {
  createRent({
    _id,
    startDate,
    driver,
    car,
    reason,
  }: ICreateRentDTO): Promise<IRentDTO> {
    throw new Error("Method not implemented.");
  }
  finishRent({ _id, endDate }: IFinishRentDTO): Promise<IRentDTO | null> {
    throw new Error("Method not implemented.");
  }
  listRent(): Promise<IRentDTO[]> {
    throw new Error("Method not implemented.");
  }
  findOneRentByDriverAndEndDateDefined(
    driver: string
  ): Promise<IRentDTO | null> {
    throw new Error("Method not implemented.");
  }
  findOneRentByCarAndEndDateDefined(car: string): Promise<IRentDTO | null> {
    throw new Error("Method not implemented.");
  }
}
