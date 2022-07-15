import CreateDriverService from "@modules/drivers/services/CreateDriverService";
import RecoverDriverService from "@modules/drivers/services/RecoverDriverService";
import SoftDeleteDriverService from "@modules/drivers/services/SoftDeleteDriverService";
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

  public async softDelete(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { _id } = request.params;

    const softDeleteDriverService = container.resolve(SoftDeleteDriverService);
    await softDeleteDriverService.execute(_id);

    return response.status(200).json({ message: "Driver deleted." });
  }

  public async recover(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { _id } = request.params;

    const recoverDriverService = container.resolve(RecoverDriverService);
    const driver = await recoverDriverService.execute(_id);

    return response.status(200).json(driver);
  }
}
