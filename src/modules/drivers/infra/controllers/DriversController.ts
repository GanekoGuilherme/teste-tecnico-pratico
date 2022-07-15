import CreateDriverService from "@modules/drivers/services/CreateDriverService";
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
}
