import AppError from "@shared/errors/AppError";
import ICarRepository, {
  ICreateCarDTO,
} from "@shared/infra/database/mongoose/repositories/CarRepository/models/ICarRepository";
import { ICarDTO } from "@shared/infra/database/mongoose/repositories/CarRepository/schemas/Car";
import { inject, injectable } from "tsyringe";

interface IResponseDTO {
  car: ICarDTO;
}

@injectable()
export default class CreateCarService {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute({
    licensePlate,
    color,
    brand,
  }: ICreateCarDTO): Promise<IResponseDTO> {
    const carAlreadyExists = await this.carRepository.findCarByLicensePlate(
      licensePlate
    );

    if (carAlreadyExists) {
      throw new AppError("License plate is unavailable.", 400);
    }

    const car = await this.carRepository.createCar({
      licensePlate,
      color: color.toUpperCase(),
      brand: brand.toUpperCase(),
    });

    return { car };
  }
}
