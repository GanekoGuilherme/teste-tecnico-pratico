import "reflect-metadata";
import FakeCarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/fakes/FakeCarRepository";

import AppError from "@shared/errors/AppError";
import SoftDeleteCarService from "@modules/cars/services/SoftDeleteCarService";

let softDeleteCarService: SoftDeleteCarService;
let fakeCarRepository: FakeCarRepository;

describe("Soft Delete Car", () => {
  beforeEach(() => {
    fakeCarRepository = new FakeCarRepository();
  });

  it("should be able to soft delete a car", async () => {
    softDeleteCarService = new SoftDeleteCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    await softDeleteCarService.execute(carMocked._id);

    const car = await fakeCarRepository.listCar({ trashed: true });

    expect(car[0]?._id).toBe(carMocked._id);
    expect(car[0]?.licensePlate).toBe(carMocked.licensePlate);
    expect(car[0]?.brand).toBe(carMocked.brand);
    expect(car[0]?.color).toBe(carMocked.color);
    expect(car[0]?.trashed).toBe(true);
  });

  it("should not be able to soft delete a car when not found", async () => {
    softDeleteCarService = new SoftDeleteCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    await expect(softDeleteCarService.execute("123")).rejects.toEqual(
      new AppError("Car not found.", 404)
    );
  });
});
