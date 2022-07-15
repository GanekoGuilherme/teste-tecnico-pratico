import "reflect-metadata";
import AppError from "@shared/errors/AppError";
import FakeDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/fakes/FakeDriverRepository";
import FakeCarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/fakes/FakeCarRepository";
import CreateRentService from "@modules/rents/services/CreateRentService";
import FakeRentRepository from "@shared/infra/database/mongoose/repositories/RentRepository/fakes/FakeRentRepository";

let createRentService: CreateRentService;
let fakeDriverRepository: FakeDriverRepository;
let fakeCarRepository: FakeCarRepository;
let fakeRentRepository: FakeRentRepository;

describe("Create Rent", () => {
  beforeEach(() => {
    fakeCarRepository = new FakeCarRepository();
    fakeDriverRepository = new FakeDriverRepository();
    fakeRentRepository = new FakeRentRepository();
  });

  it("should be able to create a rent", async () => {
    createRentService = new CreateRentService(
      fakeCarRepository,
      fakeDriverRepository,
      fakeRentRepository
    );

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "GUILHERME",
    });

    const { rent } = await createRentService.execute({
      carId: carMocked._id,
      driverId: driverMocked._id,
      reason: "trabalho",
    });

    expect(rent._id).toBeDefined();
    expect(rent.startDate).toBeDefined();
    expect(rent.endDate).toBe(null);
    expect(rent.reason).toBe("TRABALHO");
  });

  it("should not be able to create a rent when driver not found", async () => {
    createRentService = new CreateRentService(
      fakeCarRepository,
      fakeDriverRepository,
      fakeRentRepository
    );

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "GUILHERME",
    });

    await expect(
      createRentService.execute({
        carId: carMocked._id,
        driverId: "123",
        reason: "trabalho",
      })
    ).rejects.toEqual(new AppError("Driver not found.", 404));
  });

  it("should not be able to create a rent when driver is unavailable", async () => {
    createRentService = new CreateRentService(
      fakeCarRepository,
      fakeDriverRepository,
      fakeRentRepository
    );

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "GUILHERME",
    });

    await fakeRentRepository.createRent({
      startDate: new Date(),
      driver: driverMocked._id,
      car: carMocked._id,
      reason: "reason".toUpperCase(),
    });

    const carMocked2 = await fakeCarRepository.createCar({
      licensePlate: "ABC1144",
      color: "BLACK",
      brand: "UNO",
    });

    await expect(
      createRentService.execute({
        carId: carMocked2._id,
        driverId: driverMocked._id,
        reason: "trabalho",
      })
    ).rejects.toEqual(new AppError("Driver unavailable.", 400));
  });

  it("should not be able to create a rent when car not found", async () => {
    createRentService = new CreateRentService(
      fakeCarRepository,
      fakeDriverRepository,
      fakeRentRepository
    );

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "GUILHERME",
    });

    await expect(
      createRentService.execute({
        carId: "123",
        driverId: driverMocked._id,
        reason: "trabalho",
      })
    ).rejects.toEqual(new AppError("Car not found.", 404));
  });

  it("should not be able to create a rent when car is unavailable", async () => {
    createRentService = new CreateRentService(
      fakeCarRepository,
      fakeDriverRepository,
      fakeRentRepository
    );

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "GUILHERME",
    });

    await fakeRentRepository.createRent({
      startDate: new Date(),
      driver: driverMocked._id,
      car: carMocked._id,
      reason: "reason".toUpperCase(),
    });

    const driverMocked2 = await fakeDriverRepository.createDriver({
      name: "GUILHERME 2",
    });

    await expect(
      createRentService.execute({
        carId: carMocked._id,
        driverId: driverMocked2._id,
        reason: "trabalho",
      })
    ).rejects.toEqual(new AppError("Car unavailable.", 400));
  });
});
