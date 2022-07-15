import CreateDriverService from "@modules/drivers/services/CreateDriverService";
import UpdateDriverService from "@modules/drivers/services/UpdateDriverService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class DriversController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createDriverSerivce = container.resolve(CreateDriverService);
    const driver = await createDriverSerivce.execute({
      name,
    });

    return response.status(201).json(driver);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { _id } = request.params;
    const { name } = request.body;

    const updateDriverService = container.resolve(UpdateDriverService);
    const driver = await updateDriverService.execute({
      _id,
      name,
    });

    return response.status(200).json(driver);
  }
}
