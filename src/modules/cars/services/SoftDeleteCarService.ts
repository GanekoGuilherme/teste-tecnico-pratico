import AppError from "@shared/errors/AppError";
import ICarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/models/ICarRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class SoftDeleteCarService {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute(_id: string): Promise<void> {
    const carDeleted = await this.carRepository.softDeleteCar(_id);

    if (!carDeleted) {
      throw new AppError("Car not found.", 404);
    }
  }
}
