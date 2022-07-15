import "reflect-metadata";
import FakeCarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/fakes/FakeCarRepository";

import RecoverCarService from "@modules/cars/services/RecoverCarService";
import AppError from "@shared/errors/AppError";

let recoverCarService: RecoverCarService;
let fakeCarRepository: FakeCarRepository;

describe("Recover Car", () => {
  beforeEach(() => {
    fakeCarRepository = new FakeCarRepository();
  });

  it("should be able to recover a car", async () => {
    recoverCarService = new RecoverCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    await fakeCarRepository.softDeleteCar(carMocked._id);

    const { car } = await recoverCarService.execute(carMocked._id);

    expect(car._id).toBeDefined();
    expect(car.licensePlate).toBe(carMocked.licensePlate);
    expect(car.brand).toBe(carMocked.brand);
    expect(car.color).toBe(carMocked.color);
    expect(car.trashed).toBe(false);
  });

  it("should not be able to recover a car when not found", async () => {
    recoverCarService = new RecoverCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    await fakeCarRepository.softDeleteCar(carMocked._id);

    await expect(recoverCarService.execute("123")).rejects.toEqual(
      new AppError("Car not found.", 404)
    );
  });

  it("should not be able to recover a car when he already recovered", async () => {
    recoverCarService = new RecoverCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    await fakeCarRepository.softDeleteCar(carMocked._id);

    await recoverCarService.execute(carMocked._id);

    await expect(recoverCarService.execute(carMocked._id)).rejects.toEqual(
      new AppError("Car not found.", 404)
    );
  });
});
