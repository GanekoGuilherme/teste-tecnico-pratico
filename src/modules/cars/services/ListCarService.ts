import ICarRepository, {
  IListCarDTO,
} from "@shared/infra/database/mongoose/repositories/CarRepository/models/ICarRepository";
import { ICarDTO } from "@shared/infra/database/mongoose/repositories/CarRepository/schemas/Car";
import { inject, injectable } from "tsyringe";

interface IRequestDTO {
  color?: string;
  brand?: string;
}

interface IResponseDTO {
  cars: ICarDTO[];
}

@injectable()
export default class ListCarService {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute({ color, brand }: IRequestDTO): Promise<IResponseDTO> {
    const filter: IListCarDTO = {
      color: color?.toUpperCase(),
      brand: brand?.toUpperCase(),
      trashed: false,
    };

    if (!color) delete filter.color;
    if (!brand) delete filter.brand;

    const cars = await this.carRepository.listCar(filter);

    return { cars };
  }
}
