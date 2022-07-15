import AppError from "@shared/errors/AppError";
import IDriverRepository, {
  ICreateDriverDTO,
} from "@shared/infra/database/mongoose/repositories/DriverRepository/models/IDriverRepository";
import { IDriverDTO } from "@shared/infra/database/mongoose/repositories/DriverRepository/schemas/Driver";
import { inject, injectable } from "tsyringe";

interface IResponseDTO {
  driver: IDriverDTO;
}

@injectable()
export default class CreateDriverService {
  constructor(
    @inject("DriverRepository") private driverRepository: IDriverRepository
  ) {}

  async execute({ name }: ICreateDriverDTO): Promise<IResponseDTO> {
    const driverAlreadyExists = await this.driverRepository.findDriverByName(
      name.toUpperCase()
    );

    if (driverAlreadyExists) {
      throw new AppError("Name is unavailable.", 400);
    }

    const driver = await this.driverRepository.createDriver({
      name: name.toUpperCase(),
    });

    return { driver };
  }
}
