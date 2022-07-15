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

  async findDriver(_id: string): Promise<IDriverDTO | null> {
    const driver = await Driver.findOne({ _id, trashed: false });

    return driver ?? null;
  }

  async softDeleteDriver(_id: string): Promise<IDriverDTO | null> {
    const driver = await Driver.findOneAndUpdate(
      { _id, trashed: false },
      { trashed: true },
      { new: true }
    );

    return driver ?? null;
  }

  async recoverDriver(_id: string): Promise<IDriverDTO | null> {
    const driver = await Driver.findOneAndUpdate(
      { _id, trashed: true },
      { trashed: false },
      { new: true }
    );

    return driver ?? null;
  }

  async listDriver(filter: IListDriverDTO): Promise<IDriverDTO[]> {
    const drivers = await Driver.find(filter).sort({
      createdAt: -1,
    });

    return drivers;
  }

  async listDriverTrashed(): Promise<IDriverDTO[]> {
    const drivers = await Driver.find({ trashed: true }).sort({
      createdAt: -1,
    });

    return drivers;
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
