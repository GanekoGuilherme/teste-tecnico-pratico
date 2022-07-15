import IDriverRepository, {
  IListDriverDTO,
} from "@shared/infra/database/mongoose/repositories/DriverRepository/models/IDriverRepository";
import { IDriverDTO } from "@shared/infra/database/mongoose/repositories/DriverRepository/schemas/Driver";
import { inject, injectable } from "tsyringe";

interface IRequestDTO {
  name?: string;
}

interface IResponseDTO {
  drivers: IDriverDTO[];
}

@injectable()
export default class ListDriversService {
  constructor(
    @inject("DriverRepository") private driverRepository: IDriverRepository
  ) {}

  async execute({ name }: IRequestDTO): Promise<IResponseDTO> {
    const filter: IListDriverDTO = {
      name: new RegExp(String(name?.toUpperCase()), "i"),
      trashed: false,
    };

    if (!name) delete filter.name;

    const drivers = await this.driverRepository.listDriver(filter);

    return { drivers };
  }
}
