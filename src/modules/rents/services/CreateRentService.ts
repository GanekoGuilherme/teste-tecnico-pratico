import AppError from "@shared/errors/AppError";
import ICarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/models/ICarRepository";
import IDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/models/IDriverRepository";
import IRentRepository from "@shared/infra/database/mongoose/repositories/RentRepository/models/IRentRepository";
import { IRentDTO } from "@shared/infra/database/mongoose/repositories/RentRepository/schemas/Rent";
import { inject, injectable } from "tsyringe";

interface IResponseDTO {
  rent: IRentDTO;
}

interface IRequestDTO {
  driverId: string;
  carId: string;
  reason: string;
}

@injectable()
export default class CreateRentService {
  constructor(
    @inject("CarRepository") private carRepository: ICarRepository,
    @inject("DriverRepository") private driverRepository: IDriverRepository,
    @inject("RentRepository") private rentRepository: IRentRepository
  ) {}

  async execute({
    driverId,
    carId,
    reason,
  }: IRequestDTO): Promise<IResponseDTO> {
    const driverExists = await this.driverRepository.findDriver(driverId);

    if (!driverExists) {
      throw new AppError("Driver not found.", 404);
    }

    const driverUnavailable =
      await this.rentRepository.findOneRentByDriverAndEndDateNull(driverId);

    if (driverUnavailable) {
      throw new AppError("Driver unavailable.", 400);
    }

    const carExists = await this.carRepository.findCar(carId);

    if (!carExists) {
      throw new AppError("Car not found.", 404);
    }

    const carUnavailable =
      await this.rentRepository.findOneRentByCarAndEndDateNull(carId);

    if (carUnavailable) {
      throw new AppError("Car unavailable.", 400);
    }

    const rent = await this.rentRepository.createRent({
      startDate: new Date(),
      driver: driverId,
      car: carId,
      reason: reason.toUpperCase(),
    });

    return { rent };
  }
}
