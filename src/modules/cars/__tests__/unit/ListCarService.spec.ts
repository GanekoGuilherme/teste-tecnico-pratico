import "reflect-metadata";
import FakeCarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/fakes/FakeCarRepository";

import ListCarService from "@modules/cars/services/ListCarService";

let listCarService: ListCarService;
let fakeCarRepository: FakeCarRepository;

describe("List Car", () => {
  beforeEach(() => {
    fakeCarRepository = new FakeCarRepository();
  });

  it("should be able to list cars with filters (color and brand)", async () => {
    listCarService = new ListCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const { cars } = await listCarService.execute({
      color: "black",
      brand: "uno",
    });

    expect(cars[0]._id).toBeDefined();
    expect(cars[0].licensePlate).toBe(carMocked.licensePlate);
    expect(cars[0].brand).toBe(carMocked.brand);
    expect(cars[0].color).toBe(carMocked.color);
    expect(cars[0].trashed).toBe(carMocked.trashed);
  });

  it("should be able to list cars with filters (color)", async () => {
    listCarService = new ListCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const { cars } = await listCarService.execute({
      color: "black",
    });

    expect(cars[0]._id).toBeDefined();
    expect(cars[0].licensePlate).toBe(carMocked.licensePlate);
    expect(cars[0].brand).toBe(carMocked.brand);
    expect(cars[0].color).toBe(carMocked.color);
    expect(cars[0].trashed).toBe(carMocked.trashed);
  });

  it("should be able to list cars with filters (brand)", async () => {
    listCarService = new ListCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const { cars } = await listCarService.execute({
      brand: "uno",
    });

    expect(cars[0]._id).toBeDefined();
    expect(cars[0].licensePlate).toBe(carMocked.licensePlate);
    expect(cars[0].brand).toBe(carMocked.brand);
    expect(cars[0].color).toBe(carMocked.color);
    expect(cars[0].trashed).toBe(carMocked.trashed);
  });

  it("should not be able to list cars (not matches)", async () => {
    listCarService = new ListCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const { cars } = await listCarService.execute({
      brand: "ford",
    });

    expect(cars.length).toBe(0);
  });

  it("should be able to list (without filters)", async () => {
    listCarService = new ListCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const { cars } = await listCarService.execute({});

    expect(cars[0]._id).toBeDefined();
    expect(cars[0].licensePlate).toBe(carMocked.licensePlate);
    expect(cars[0].brand).toBe(carMocked.brand);
    expect(cars[0].color).toBe(carMocked.color);
    expect(cars[0].trashed).toBe(carMocked.trashed);
  });
});
