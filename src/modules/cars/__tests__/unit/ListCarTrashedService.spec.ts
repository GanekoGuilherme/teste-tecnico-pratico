import "reflect-metadata";
import FakeCarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/fakes/FakeCarRepository";

import ListTrashedCarService from "@modules/cars/services/ListTrashedCarService";

let listTrashedCarService: ListTrashedCarService;
let fakeCarRepository: FakeCarRepository;

describe("List Car (trashed)", () => {
  beforeEach(() => {
    fakeCarRepository = new FakeCarRepository();
  });

  it("should be able to list cars trashed", async () => {
    listTrashedCarService = new ListTrashedCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    await fakeCarRepository.softDeleteCar(carMocked._id);

    const { cars } = await listTrashedCarService.execute();

    expect(cars[0]._id).toBeDefined();
    expect(cars[0].licensePlate).toBe(carMocked.licensePlate);
    expect(cars[0].brand).toBe(carMocked.brand);
    expect(cars[0].color).toBe(carMocked.color);
    expect(cars[0].trashed).toBe(true);
  });

  it("should not be able to list cars when there are not trashed", async () => {
    listTrashedCarService = new ListTrashedCarService(fakeCarRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const { cars } = await listTrashedCarService.execute();

    expect(cars.length).toBe(0);
  });
});
