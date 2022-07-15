import IRentRepository from "@shared/infra/database/mongoose/repositories/RentRepository/models/IRentRepository";
import { IRentDTO } from "@shared/infra/database/mongoose/repositories/RentRepository/schemas/Rent";
import { inject, injectable } from "tsyringe";

interface IResponseDTO {
  rents: IRentDTO[];
}

@injectable()
export default class ListRentService {
  constructor(
    @inject("RentRepository") private rentRepository: IRentRepository
  ) {}

  async execute(): Promise<IResponseDTO> {
    const rents = await this.rentRepository.listRents();

    return { rents };
  }
}
