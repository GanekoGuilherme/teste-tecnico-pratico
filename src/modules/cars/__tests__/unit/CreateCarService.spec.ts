import "reflect-metadata";
import CreateCarService from "@modules/cars/services/CreateCarService";
import FakeCarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/fakes/FakeCarRepository";
import AppError from "@shared/errors/AppError";

let createCarService: CreateCarService;
let fakeCarRepository: FakeCarRepository;

describe("Create Car", () => {
  beforeEach(() => {
    fakeCarRepository = new FakeCarRepository();
  });

  it("should be able to create a car", async () => {
    createCarService = new CreateCarService(fakeCarRepository);
    const { car } = await createCarService.execute({
      licensePlate: "ABC1124",
      color: "black",
      brand: "uno",
    });

    expect(car._id).toBeDefined();
    expect(car.licensePlate).toBe("ABC1124");
    expect(car.brand).toBe("UNO");
    expect(car.color).toBe("BLACK");
    expect(car.trashed).toBe(false);
  });

  it("should not be able to create a car when license plate is unavailable.", async () => {
    createCarService = new CreateCarService(fakeCarRepository);

    await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    await expect(
      createCarService.execute({
        licensePlate: "ABC1124",
        color: "black",
        brand: "uno",
      })
    ).rejects.toEqual(new AppError("License plate is unavailable.", 400));
  });
});
