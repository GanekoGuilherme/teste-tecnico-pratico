import "reflect-metadata";
import FakeCarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/fakes/FakeCarRepository";
import AppError from "@shared/errors/AppError";
import FindCarService from "@modules/cars/services/FindCarService";

let findCarService: FindCarService;
let fakeCarRepository: FakeCarRepository;

describe("Find Car", () => {
  beforeEach(() => {
    fakeCarRepository = new FakeCarRepository();
  });

  it("should be able to find a car", async () => {
    findCarService = new FindCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const { car } = await findCarService.execute(carMocked._id);

    expect(car._id).toBeDefined();
    expect(car.licensePlate).toBe(carMocked.licensePlate);
    expect(car.brand).toBe(carMocked.brand);
    expect(car.color).toBe(carMocked.color);
    expect(car.trashed).toBe(carMocked.trashed);
  });

  it("should not be able to find a car when _id not matche", async () => {
    findCarService = new FindCarService(fakeCarRepository);

    await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    await expect(findCarService.execute("123")).rejects.toEqual(
      new AppError("Car not found.", 404)
    );
  });
});
