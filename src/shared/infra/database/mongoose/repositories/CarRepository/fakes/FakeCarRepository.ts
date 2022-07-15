import UUID from "@shared/utils/uuid";
import ICarRepository, {
  ICreateCarDTO,
  IListCarDTO,
  IUpdateCarDTO,
} from "../models/ICarRepository";
import { ICarDTO } from "../schemas/Car";

export default class FakeCarRepository implements ICarRepository {
  private cars: ICarDTO[];

  constructor() {
    this.cars = [];
  }

  async findCar(_id: string): Promise<ICarDTO | null> {
    const car = this.cars.find(
      (car) => car._id === _id && car.trashed === false
    );

    return car ?? null;
  }

  async createCar({
    licensePlate,
    color,
    brand,
  }: ICreateCarDTO): Promise<ICarDTO> {
    const car = {
      _id: new UUID().getV4(),
      licensePlate,
      color,
      brand,
      trashed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.cars.push(car);

    return car;
  }

  async updateCar({
    _id,
    licensePlate,
    color,
    brand,
  }: IUpdateCarDTO): Promise<ICarDTO | null> {
    let response: ICarDTO | null = null;

    this.cars.forEach((car) => {
      if (car._id === _id) {
        car.licensePlate = licensePlate;
        car.color = color;
        car.brand = brand;
        response = car;
      }
    });

    return response;
  }

  async softDeleteCar(_id: string): Promise<ICarDTO | null> {
    let response: ICarDTO | null = null;

    this.cars.forEach((car) => {
      if (car._id === _id) {
        car.trashed = true;
        response = car;
      }
    });

    return response;
  }

  async recoverCar(_id: string): Promise<ICarDTO | null> {
    let response = null;

    this.cars.forEach((car) => {
      if (car._id === _id && car.trashed === true) {
        car.trashed = false;
        response = car;
      }
    });

    return response;
  }

  async listCar(filter: IListCarDTO): Promise<ICarDTO[]> {
    const response: ICarDTO[] = [];

    if (filter.brand && filter.color) {
      this.cars.forEach((car) => {
        if (
          car.color === filter.color &&
          car.brand === filter.brand &&
          car.trashed === false
        )
          response.push(car);
      });
    } else if (filter.brand) {
      this.cars.forEach((car) => {
        if (car.brand === filter.brand && car.trashed === false)
          response.push(car);
      });
    } else if (filter.color) {
      this.cars.forEach((car) => {
        if (car.color === filter.color && car.trashed === false)
          response.push(car);
      });
    } else {
      return this.cars;
    }

    return response;
  }

  async listCarTrashed(): Promise<ICarDTO[]> {
    const response: ICarDTO[] = [];

    this.cars.forEach((car) => {
      if (car.trashed === true) response.push(car);
    });

    return response;
  }

  async findCarByLicensePlate(licensePlate: string): Promise<ICarDTO | null> {
    const car = this.cars.find(
      (car) => car.licensePlate === licensePlate && car.trashed === false
    );

    return car ?? null;
  }

  async listCarByLicensePlate(licensePlate: string): Promise<ICarDTO[]> {
    const response: ICarDTO[] = [];

    this.cars.forEach((car) => {
      if (car.trashed === false && car.licensePlate === licensePlate)
        response.push(car);
    });

    return response;
  }
}
