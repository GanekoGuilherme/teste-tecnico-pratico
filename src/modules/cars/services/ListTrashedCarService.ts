import ICarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/models/ICarRepository";
import { ICarDTO } from "@shared/infra/database/mongoose/repositories/CarRepository/schemas/Car";
import { inject, injectable } from "tsyringe";

interface IResponseDTO {
  cars: ICarDTO[];
}

@injectable()
export default class ListTrashedCarService {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute(): Promise<IResponseDTO> {
    const cars = await this.carRepository.listCarTrashed();

    return { cars };
  }
}
