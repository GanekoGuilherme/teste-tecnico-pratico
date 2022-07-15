import UUID from "@shared/utils/uuid";
import IRentRepository, {
  ICreateRentDTO,
  IFinishRentDTO,
} from "../models/IRentRepository";
import Rent, { IRentDTO } from "../schemas/Rent";

export default class RentRepository implements IRentRepository {
  async createRent({
    startDate,
    driver,
    car,
    reason,
  }: ICreateRentDTO): Promise<IRentDTO> {
    const rent = await Rent.create({
      _id: new UUID().getV4(),
      startDate,
      driver,
      car,
      reason,
    });

    return rent;
  }

  async finishRent({ _id, endDate }: IFinishRentDTO): Promise<IRentDTO | null> {
    const rent = await Rent.findOneAndUpdate(
      { _id, endDate: null },
      { endDate },
      { new: true }
    );

    return rent ?? null;
  }

  async listRents(): Promise<IRentDTO[]> {
    const rents = await Rent.find()
      .populate({ model: "Car", path: "car" })
      .populate({ model: "Driver", path: "driver" });

    return rents;
  }

  async findOneRentByDriverAndEndDateNull(
    driver: string
  ): Promise<IRentDTO | null> {
    const rent = await Rent.findOne({ driver, endDate: null });

    return rent;
  }

  async findOneRentByCarAndEndDateNull(car: string): Promise<IRentDTO | null> {
    const rent = await Rent.findOne({ car, endDate: null });

    return rent;
  }
}
