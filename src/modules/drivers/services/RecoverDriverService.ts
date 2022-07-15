import AppError from "@shared/errors/AppError";
import IDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/models/IDriverRepository";
import { IDriverDTO } from "@shared/infra/database/mongoose/repositories/DriverRepository/schemas/Driver";
import { inject, injectable } from "tsyringe";

interface IResponseDTO {
  driver: IDriverDTO;
}

@injectable()
export default class RecoverDriverService {
  constructor(
    @inject("DriverRepository") private driverRepository: IDriverRepository
  ) {}

  async execute(_id: string): Promise<IResponseDTO> {
    const driverRecovered = await this.driverRepository.recoverDriver(_id);

    if (!driverRecovered) {
      throw new AppError("Driver not found.", 404);
    }

    return { driver: driverRecovered };
  }
}
