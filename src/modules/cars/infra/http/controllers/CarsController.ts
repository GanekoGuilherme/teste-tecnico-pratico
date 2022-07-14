import CreateCarService from "@modules/cars/services/CreateCarService";
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
}
