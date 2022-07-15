import CreateDriverService from "@modules/drivers/services/CreateDriverService";
import ListDriversService from "@modules/drivers/services/ListDriversService";
import ListTrashedDriverService from "@modules/drivers/services/ListTrashedDriversService";
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

  public async list(request: Request, response: Response): Promise<Response> {
    const listDriversService = container.resolve(ListDriversService);
    const drivers = await listDriversService.execute({
      name: request.query.name?.toString(),
    });

    return response.status(200).json(drivers);
  }

  public async listTrashed(
    _request: Request,
    response: Response
  ): Promise<Response> {
    const listTrashedDriverService = container.resolve(
      ListTrashedDriverService
    );
    const drivers = await listTrashedDriverService.execute();

    return response.status(200).json(drivers);
  }

  // public async find(request: Request, response: Response): Promise<Response> {
  //   const { _id } = request.params;

  //   const findCarService = container.resolve(FindCarService);
  //   const car = await findCarService.execute(_id);

  //   return response.status(200).json(car);
  // }
}
