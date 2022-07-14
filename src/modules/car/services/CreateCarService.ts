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

    if (!carAlreadyExists) {
      //TODO criar class AppError
      throw new Error("License Plate already is unavailable.");
    }

    const car = await this.carRepository.createCar({
      licensePlate,
      color,
      brand,
    });

    return { car };
  }
}
