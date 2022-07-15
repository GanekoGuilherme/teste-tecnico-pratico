import "reflect-metadata";
import FakeDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/fakes/FakeDriverRepository";

import ListTrashedDriversService from "@modules/drivers/services/ListTrashedDriversService";

let listTrashedDriversService: ListTrashedDriversService;
let fakeDriverRepository: FakeDriverRepository;

describe("List Driver (trashed)", () => {
  beforeEach(() => {
    fakeDriverRepository = new FakeDriverRepository();
  });

  it("should be able to list drivers trashed", async () => {
    listTrashedDriversService = new ListTrashedDriversService(
      fakeDriverRepository
    );

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "guilherme",
    });

    await fakeDriverRepository.softDeleteDriver(driverMocked._id);

    const { drivers } = await listTrashedDriversService.execute();

    expect(drivers[0]._id).toBeDefined();
    expect(drivers[0].name).toBe(driverMocked.name);
    expect(drivers[0].trashed).toBe(true);
  });

  it("should not be able to list drivers when there are not trashed", async () => {
    listTrashedDriversService = new ListTrashedDriversService(
      fakeDriverRepository
    );

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "guilherme",
    });

    const { drivers } = await listTrashedDriversService.execute();

    expect(drivers.length).toBe(0);
  });
});
