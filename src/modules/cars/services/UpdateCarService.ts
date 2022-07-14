import AppError from "@shared/errors/AppError";
import ICarRepository, {
  IUpdateCarDTO,
} from "@shared/infra/database/mongoose/repositories/CarRepository/models/ICarRepository";
import { ICarDTO } from "@shared/infra/database/mongoose/repositories/CarRepository/schemas/Car";
import { inject, injectable } from "tsyringe";

interface IResponseDTO {
  car: ICarDTO;
}

@injectable()
export default class UpdateCarService {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute({
    _id,
    licensePlate,
    color,
    brand,
  }: IUpdateCarDTO): Promise<IResponseDTO> {
    const cars = await this.carRepository.listCarByLicensePlate(licensePlate);

    if (cars.length !== 0) {
      if (cars.length > 1 || cars[0]._id !== _id) {
        throw new AppError("License plate is unavailable.", 400);
      }
    }

    const car = await this.carRepository.updateCar({
      _id,
      licensePlate,
      color: color.toUpperCase(),
      brand: brand.toUpperCase(),
    });

    if (!car) {
      throw new AppError("Car not found.", 404);
    }

    return { car };
  }
}
