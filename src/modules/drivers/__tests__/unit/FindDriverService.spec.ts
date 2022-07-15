import "reflect-metadata";
import AppError from "@shared/errors/AppError";
import FakeDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/fakes/FakeDriverRepository";
import FindDriverService from "@modules/drivers/services/FindDriverService";

let findDriverService: FindDriverService;
let fakeDriverRepository: FakeDriverRepository;

describe("Find Driver", () => {
  beforeEach(() => {
    fakeDriverRepository = new FakeDriverRepository();
  });

  it("should be able to find a driver", async () => {
    findDriverService = new FindDriverService(fakeDriverRepository);

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "GUILHERME",
    });

    const { driver } = await findDriverService.execute(driverMocked._id);

    expect(driver._id).toBeDefined();
    expect(driver.name).toBe("GUILHERME");
    expect(driver.trashed).toBe(false);
  });

  it("should not be able to create a driver when _id not match", async () => {
    findDriverService = new FindDriverService(fakeDriverRepository);

    await expect(findDriverService.execute("123")).rejects.toEqual(
      new AppError("Driver not found.", 404)
    );
  });
});
