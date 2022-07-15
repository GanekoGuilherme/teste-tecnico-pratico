import "reflect-metadata";
import FakeDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/fakes/FakeDriverRepository";
import ListDriversService from "@modules/drivers/services/ListDriversService";

let listDriversService: ListDriversService;
let fakeDriverRepository: FakeDriverRepository;

describe("List Drivers", () => {
  beforeEach(() => {
    fakeDriverRepository = new FakeDriverRepository();
  });

  it("should be able to list a driver (without regex)", async () => {
    listDriversService = new ListDriversService(fakeDriverRepository);

    await fakeDriverRepository.createDriver({
      name: "GUILHERME",
    });

    const { drivers } = await listDriversService.execute({});

    expect(drivers[0]._id).toBeDefined();
    expect(drivers[0].name).toBe("GUILHERME");
    expect(drivers[0].trashed).toBe(false);
  });

  it("should be able to list a driver with regex by name", async () => {
    listDriversService = new ListDriversService(fakeDriverRepository);

    await fakeDriverRepository.createDriver({
      name: "GUILHERME",
    });

    const { drivers } = await listDriversService.execute({ name: "gui" });

    expect(drivers[0]._id).toBeDefined();
    expect(drivers[0].name).toBe("GUILHERME");
    expect(drivers[0].trashed).toBe(false);
  });

  it("should not be able to list a driver when name does not match", async () => {
    listDriversService = new ListDriversService(fakeDriverRepository);

    await fakeDriverRepository.createDriver({
      name: "GUILHERME",
    });

    const { drivers } = await listDriversService.execute({ name: "teste" });

    expect(drivers.length).toBe(0);
  });
});
