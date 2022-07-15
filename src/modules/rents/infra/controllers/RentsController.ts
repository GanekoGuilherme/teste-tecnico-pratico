import CreateRentService from "@modules/rents/services/CreateRentService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class RentsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { driverId, carId, reason } = request.body;

    const createRentSerivce = container.resolve(CreateRentService);
    const rent = await createRentSerivce.execute({
      driverId,
      carId,
      reason,
    });

    return response.status(201).json(rent);
  }
}
