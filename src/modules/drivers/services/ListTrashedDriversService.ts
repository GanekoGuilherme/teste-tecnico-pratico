import IDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/models/IDriverRepository";
import { IDriverDTO } from "@shared/infra/database/mongoose/repositories/DriverRepository/schemas/Driver";
import { inject, injectable } from "tsyringe";

interface IResponseDTO {
  drivers: IDriverDTO[];
}

@injectable()
export default class ListTrashedDriverService {
  constructor(
    @inject("DriverRepository") private driverRepository: IDriverRepository
  ) {}

  async execute(): Promise<IResponseDTO> {
    const drivers = await this.driverRepository.listDriverTrashed();

    return { drivers };
  }
}
