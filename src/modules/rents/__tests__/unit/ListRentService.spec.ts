import "reflect-metadata";
import FakeDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/fakes/FakeDriverRepository";
import FakeCarRepository from "@shared/infra/database/mongoose/repositories/CarRepository/fakes/FakeCarRepository";
import FakeRentRepository from "@shared/infra/database/mongoose/repositories/RentRepository/fakes/FakeRentRepository";
import ListRentService from "@modules/rents/services/ListRentService";

let listRentService: ListRentService;
let fakeDriverRepository: FakeDriverRepository;
let fakeCarRepository: FakeCarRepository;
let fakeRentRepository: FakeRentRepository;

describe("List Rent", () => {
  beforeEach(() => {
    fakeCarRepository = new FakeCarRepository();
    fakeDriverRepository = new FakeDriverRepository();
    fakeRentRepository = new FakeRentRepository();
  });

  it("should be able to list rents", async () => {
    listRentService = new ListRentService(fakeRentRepository);

    const carMocked = await fakeCarRepository.createCar({
      licensePlate: "ABC1124",
      color: "BLACK",
      brand: "UNO",
    });

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "GUILHERME",
    });

    const rentMocked = await fakeRentRepository.createRent({
      startDate: new Date(),
      driver: driverMocked,
      car: carMocked,
      reason: "reason".toUpperCase(),
    });

    const { rents } = await listRentService.execute();

    expect(rents[0]._id).toBe(rentMocked._id);
    expect(rents[0].startDate).toBe(rentMocked.startDate);
    expect(rents[0].endDate).toBe(rentMocked.endDate);
    expect(rents[0].reason).toBe(rentMocked.reason);
    expect(rents[0].driver).toBe(driverMocked);
    expect(rents[0].car).toBe(carMocked);
  });
});
