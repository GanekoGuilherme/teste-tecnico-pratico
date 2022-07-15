import AppError from "@shared/errors/AppError";
import IRentRepository from "@shared/infra/database/mongoose/repositories/RentRepository/models/IRentRepository";
import { IRentDTO } from "@shared/infra/database/mongoose/repositories/RentRepository/schemas/Rent";
import { inject, injectable } from "tsyringe";

interface IResponseDTO {
  rent: IRentDTO;
}

@injectable()
export default class FinishRentService {
  constructor(
    @inject("RentRepository") private rentRepository: IRentRepository
  ) {}

  async execute(_id: string): Promise<IResponseDTO> {
    const rent = await this.rentRepository.finishRent({
      _id,
      endDate: new Date(),
    });

    if (!rent) {
      throw new AppError("Rent not found.", 404);
    }

    return { rent };
  }
}
