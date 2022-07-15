import UUID from "@shared/utils/uuid";
import IRentRepository, {
  ICreateRentDTO,
  IFinishRentDTO,
} from "../models/IRentRepository";
import { IRentDTO } from "../schemas/Rent";

export default class FakeRentRepository implements IRentRepository {
  private rents: IRentDTO[];

  constructor() {
    this.rents = [];
  }
  async createRent({
    startDate,
    driver,
    car,
    reason,
  }: ICreateRentDTO): Promise<IRentDTO> {
    const rent = {
      _id: new UUID().getV4(),
      startDate,
      endDate: null,
      driver,
      car,
      reason,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.rents.push(rent);

    return rent;
  }

  async finishRent({ _id, endDate }: IFinishRentDTO): Promise<IRentDTO | null> {
    let response: IRentDTO | null = null;

    this.rents.forEach((rent) => {
      if (rent._id === _id && rent.endDate === null) {
        rent.endDate = endDate;
        response = rent;
      }
    });

    return response;
  }

  async listRents(): Promise<IRentDTO[]> {
    return this.rents;
  }

  async findOneRentByDriverAndEndDateNull(
    driver: string
  ): Promise<IRentDTO | null> {
    const rent = this.rents.find(
      (rent) => rent.driver === driver && rent.endDate === null
    );

    return rent ?? null;
  }

  async findOneRentByCarAndEndDateNull(car: string): Promise<IRentDTO | null> {
    const rent = this.rents.find(
      (rent) => rent.car === car && rent.endDate === null
    );

    return rent ?? null;
  }
}
