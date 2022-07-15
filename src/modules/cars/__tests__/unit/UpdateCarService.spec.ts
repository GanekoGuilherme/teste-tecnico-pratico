import "reflect-metadata";
import FakeCarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/fakes/FakeCarRepository";

import AppError from "@shared/errors/AppError";
import UpdateCarService from "@modules/cars/services/UpdateCarService";

let updateCarService: UpdateCarService;
let fakeCarRepository: FakeCarRepository;

describe("Update Car", () => {
  beforeEach(() => {
    fakeCarRepository = new FakeCarRepository();
  });

  it("should be able to update a car", async () => {
    updateCarService = new UpdateCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const { car } = await updateCarService.execute({
      _id: carMocked._id,
      licensePlate: "ABC1124",
      color: "blue",
      brand: "UNO",
    });

    expect(car._id).toBe(carMocked._id);
    expect(car.licensePlate).toBe(carMocked.licensePlate);
    expect(car.brand).toBe(carMocked.brand);
    expect(car.color).toBe("BLUE");
    expect(car.trashed).toBe(false);
  });

  it("should not be able to update a car when license plate is unavailable", async () => {
    updateCarService = new UpdateCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    await fakeCarRepository.createCar({
      licensePlate: "ABC1144",
      color: "BLACK",
      brand: "UNO",
    });

    await expect(
      updateCarService.execute({
        _id: carMocked._id,
        licensePlate: "ABC1144",
        color: "blue",
        brand: "UNO",
      })
    ).rejects.toEqual(new AppError("License plate is unavailable.", 400));
  });

  it("should not be able to update a car when not found.", async () => {
    updateCarService = new UpdateCarService(fakeCarRepository);

    await expect(
      updateCarService.execute({
        _id: "123",
        licensePlate: "ABC1144",
        color: "blue",
        brand: "UNO",
      })
    ).rejects.toEqual(new AppError("Car not found.", 404));
  });
});
