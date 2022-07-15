import AppError from "@shared/errors/AppError";
import IDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/models/IDriverRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class SoftDeleteDriverService {
  constructor(
    @inject("DriverRepository") private driverRepository: IDriverRepository
  ) {}

  async execute(_id: string): Promise<void> {
    const driverDeleted = await this.driverRepository.softDeleteDriver(_id);

    if (!driverDeleted) {
      throw new AppError("Driver not found.", 404);
    }
  }
}
