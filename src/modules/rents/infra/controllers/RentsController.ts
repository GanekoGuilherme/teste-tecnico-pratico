import CreateRentService from "@modules/rents/services/CreateRentService";
import FinishRentService from "@modules/rents/services/FinishRentService";
import ListRentService from "@modules/rents/services/ListRentService";
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

  public async finish(request: Request, response: Response): Promise<Response> {
    const { _id } = request.params;

    const finishRentSerivce = container.resolve(FinishRentService);
    const rent = await finishRentSerivce.execute(_id);

    return response.status(200).json(rent);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listRentSerivce = container.resolve(ListRentService);
    const rents = await listRentSerivce.execute();

    return response.status(200).json(rents);
  }
}
