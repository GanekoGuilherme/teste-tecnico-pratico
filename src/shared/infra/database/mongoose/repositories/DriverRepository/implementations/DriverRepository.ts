import IDriverRepository, {
  ICreateDriverDTO,
  IListDriverDTO,
  IUpdateDriverDTO,
} from "../models/IDriverRepository";
import { IDriverDTO } from "../schemas/Driver";

export default class DriverRepository implements IDriverRepository {
  createDriver({ name }: ICreateDriverDTO): Promise<IDriverDTO> {
    throw new Error("Method not implemented.");
  }
  updateDriver({ _id, name }: IUpdateDriverDTO): Promise<IDriverDTO | null> {
    throw new Error("Method not implemented.");
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
  findDriverByName(name: string): Promise<IDriverDTO | null> {
    throw new Error("Method not implemented.");
  }
  listDriverByName(name: string): Promise<IDriverDTO[]> {
    throw new Error("Method not implemented.");
  }
}
