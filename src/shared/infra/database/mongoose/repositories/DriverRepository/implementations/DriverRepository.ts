import UUID from "@shared/utils/uuid";
import IDriverRepository, {
  ICreateDriverDTO,
  IListDriverDTO,
  IUpdateDriverDTO,
} from "../models/IDriverRepository";
import Driver, { IDriverDTO } from "../schemas/Driver";

export default class DriverRepository implements IDriverRepository {
  async createDriver({ name }: ICreateDriverDTO): Promise<IDriverDTO> {
    const driver = await Driver.create({ _id: new UUID().getV4(), name });

    return driver;
  }

  async updateDriver({
    _id,
    name,
  }: IUpdateDriverDTO): Promise<IDriverDTO | null> {
    const driver = await Driver.findOneAndUpdate(
      { _id, trashed: false },
      { name },
      { new: true }
    );

    return driver ?? null;
  }

  findDriver(_id: string): Promise<IDriverDTO | null> {
    throw new Error("Method not implemented.");
  }
  softDeleteDriver(_id: string): Promise<IDriverDTO | null> {
    throw new Error("Method not implemented.");
  }
  recoverDriver(_id: string): Promise<IDriverDTO | null> {
    throw new Error("Method not implemented.");
  }
  listDriver(filter: IListDriverDTO): Promise<IDriverDTO[]> {
    throw new Error("Method not implemented.");
  }
  listDriverTrashed(): Promise<IDriverDTO[]> {
    throw new Error("Method not implemented.");
  }

  async findDriverByName(name: string): Promise<IDriverDTO | null> {
    const driver = await Driver.findOne({ name, trashed: false });

    return driver ?? null;
  }

  async listDriversByName(name: string): Promise<IDriverDTO[]> {
    const drivers = await Driver.find({ name, trashed: false });

    return drivers;
  }
}
