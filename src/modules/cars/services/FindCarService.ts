import AppError from "@shared/errors/AppError";
import ICarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/models/ICarRepository";
import { ICarDTO } from "@shared/infra/database/mongoose/repositories/CarRepository/schemas/Car";
import { inject, injectable } from "tsyringe";

interface IResponseDTO {
  car: ICarDTO;
}

@injectable()
export default class FindCarService {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute(_id: string): Promise<IResponseDTO> {
    const car = await this.carRepository.findCar(_id);

    if (!car) {
      throw new AppError("Car not found.", 404);
    }

    return { car };
  }
}
