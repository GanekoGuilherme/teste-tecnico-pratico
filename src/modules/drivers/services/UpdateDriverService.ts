import AppError from "@shared/errors/AppError";
import IDriverRepository, {
  IUpdateDriverDTO,
} from "@shared/infra/database/mongoose/repositories/DriverRepository/models/IDriverRepository";
import { IDriverDTO } from "@shared/infra/database/mongoose/repositories/DriverRepository/schemas/Driver";
import { inject, injectable } from "tsyringe";

interface IResponseDTO {
  driver: IDriverDTO;
}

@injectable()
export default class UpdateDriverService {
  constructor(
    @inject("DriverRepository") private driverRepository: IDriverRepository
  ) {}

  async execute({ _id, name }: IUpdateDriverDTO): Promise<IResponseDTO> {
    const drivers = await this.driverRepository.listDriversByName(
      name.toUpperCase()
    );

    if (drivers.length !== 0) {
      if (drivers.length > 1 || drivers[0]._id !== _id) {
        throw new AppError("Name is unavailable.", 400);
      }
    }

    const driver = await this.driverRepository.updateDriver({
      _id,
      name: name.toUpperCase(),
    });

    if (!driver) {
      throw new AppError("Driver not found.", 404);
    }

    return { driver };
  }
}
