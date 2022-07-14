import CreateCarService from "@modules/cars/services/CreateCarService";
import FindCarService from "@modules/cars/services/FindCarService";
import ListCarService from "@modules/cars/services/ListCarService";
import ListTrashedCarService from "@modules/cars/services/ListTrashedCarService";
import RecoverCarService from "@modules/cars/services/RecoverCarService";
import SoftDeleteCarService from "@modules/cars/services/SoftDeleteCarService";
import UpdateCarService from "@modules/cars/services/UpdateCarService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class CarsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { licensePlate, color, brand } = request.body;

    const createCarSerivce = container.resolve(CreateCarService);
    const car = await createCarSerivce.execute({ licensePlate, color, brand });

    return response.status(201).json(car);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { _id } = request.params;
    const { licensePlate, color, brand } = request.body;

    const updateCarService = container.resolve(UpdateCarService);
    const car = await updateCarService.execute({
      _id,
      licensePlate,
      color,
      brand,
    });

    return response.status(200).json(car);
  }

  public async softDelete(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { _id } = request.params;

    const softDeleteCarService = container.resolve(SoftDeleteCarService);
    await softDeleteCarService.execute(_id);

    return response.status(200).json({ message: "Car deleted." });
  }

  public async recover(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { _id } = request.params;

    const recoverCarService = container.resolve(RecoverCarService);
    const car = await recoverCarService.execute(_id);

    return response.status(200).json(car);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listCarService = container.resolve(ListCarService);
    const cars = await listCarService.execute({
      color: request.query.color?.toString(),
      brand: request.query.brand?.toString(),
    });

    return response.status(200).json(cars);
  }

  public async listTrashed(
    _request: Request,
    response: Response
  ): Promise<Response> {
    const listTrashedCarService = container.resolve(ListTrashedCarService);
    const cars = await listTrashedCarService.execute();

    return response.status(200).json(cars);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { _id } = request.params;

    const findCarService = container.resolve(FindCarService);
    const car = await findCarService.execute(_id);

    return response.status(200).json(car);
  }
}
