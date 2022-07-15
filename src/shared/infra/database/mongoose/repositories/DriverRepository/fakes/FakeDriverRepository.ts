import UUID from "@shared/utils/uuid";
import IDriverRepository, {
  ICreateDriverDTO,
  IListDriverDTO,
  IUpdateDriverDTO,
} from "../models/IDriverRepository";
import { IDriverDTO } from "../schemas/Driver";

export default class FakeDriverRepository implements IDriverRepository {
  private drivers: IDriverDTO[];

  constructor() {
    this.drivers = [];
  }

  async createDriver({ name }: ICreateDriverDTO): Promise<IDriverDTO> {
    const driver = {
      _id: new UUID().getV4(),
      name,
      trashed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.drivers.push(driver);

    return driver;
  }

  async updateDriver({
    _id,
    name,
  }: IUpdateDriverDTO): Promise<IDriverDTO | null> {
    let response: IDriverDTO | null = null;

    this.drivers.forEach((driver) => {
      if (driver._id === _id) {
        driver.name = name;
        response = driver;
      }
    });

    return response;
  }

  async findDriver(_id: string): Promise<IDriverDTO | null> {
    const driver = this.drivers.find(
      (driver) => driver._id === _id && driver.trashed === false
    );

    return driver ?? null;
  }

  async softDeleteDriver(_id: string): Promise<IDriverDTO | null> {
    let response: IDriverDTO | null = null;

    this.drivers.forEach((driver) => {
      if (driver._id === _id) {
        driver.trashed = true;
        response = driver;
      }
    });

    return response;
  }

  async recoverDriver(_id: string): Promise<IDriverDTO | null> {
    let response = null;

    this.drivers.forEach((driver) => {
      if (driver._id === _id && driver.trashed === true) {
        driver.trashed = false;
        response = driver;
      }
    });

    return response;
  }

  async listDriver(filter: IListDriverDTO): Promise<IDriverDTO[]> {
    const response: IDriverDTO[] = [];

    if (filter.name) {
      this.drivers.forEach((driver) => {
        if (filter.name?.test(driver.name) && driver.trashed === false)
          response.push(driver);
      });
    } else {
      this.drivers.forEach((driver) => {
        if (driver.trashed === false) response.push(driver);
      });
    }

    return response;
  }

  async listDriverTrashed(): Promise<IDriverDTO[]> {
    const response: IDriverDTO[] = [];

    this.drivers.forEach((driver) => {
      if (driver.trashed === true) response.push(driver);
    });

    return response;
  }

  async findDriverByName(name: string): Promise<IDriverDTO | null> {
    let response: IDriverDTO | null = null;

    this.drivers.forEach((driver) => {
      if (driver.name === name && driver.trashed === false) {
        response = driver;
      }
    });

    return response;
  }

  async listDriversByName(name: string): Promise<IDriverDTO[]> {
    const response: IDriverDTO[] = [];

    this.drivers.forEach((driver) => {
      if (driver.trashed === false && driver.name === name)
        response.push(driver);
    });

    return response;
  }
}
