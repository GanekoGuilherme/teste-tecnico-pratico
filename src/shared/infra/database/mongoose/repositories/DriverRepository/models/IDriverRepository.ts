import { IDriverDTO } from "../schemas/Driver";

export interface ICreateDriverDTO {
  name: string;
}

export interface IUpdateDriverDTO {
  _id: string;
  name: string;
}

export interface IListDriverDTO {
  name?: string;
  trashed: boolean;
}

export default interface IDriverRepository {
  createDriver({ name }: ICreateDriverDTO): Promise<IDriverDTO>;

  updateDriver({ _id, name }: IUpdateDriverDTO): Promise<IDriverDTO | null>;

  findDriver(_id: string): Promise<IDriverDTO | null>;

  softDeleteDriver(_id: string): Promise<IDriverDTO | null>;

  recoverDriver(_id: string): Promise<IDriverDTO | null>;

  listDriver(filter: IListDriverDTO): Promise<IDriverDTO[]>;

  listDriverTrashed(): Promise<IDriverDTO[]>;

  findDriverByName(name: string): Promise<IDriverDTO | null>;

  listDriverByName(name: string): Promise<IDriverDTO[]>;
}
