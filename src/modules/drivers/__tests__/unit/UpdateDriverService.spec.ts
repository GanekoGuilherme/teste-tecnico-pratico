import "reflect-metadata";
import FakeDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/fakes/FakeDriverRepository";

import AppError from "@shared/errors/AppError";
import UpdateDriverService from "@modules/drivers/services/UpdateDriverService";

let updateDriverService: UpdateDriverService;
let fakeDriverRepository: FakeDriverRepository;

describe("Update Driver", () => {
  beforeEach(() => {
    fakeDriverRepository = new FakeDriverRepository();
  });

  it("should be able to update a Driver", async () => {
    updateDriverService = new UpdateDriverService(fakeDriverRepository);

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "guilherme",
    });

    const { driver } = await updateDriverService.execute({
      _id: driverMocked._id,
      name: "guilherme",
    });

    expect(driver._id).toBe(driverMocked._id);
    expect(driver.name).toBe(driverMocked.name);
    expect(driver.trashed).toBe(false);
  });

  it("should not be able to update a driver when name is unavailable", async () => {
    updateDriverService = new UpdateDriverService(fakeDriverRepository);

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "guilherme",
    });

    await fakeDriverRepository.createDriver({
      name: "GUI",
    });

    await expect(
      updateDriverService.execute({
        _id: driverMocked._id,
        name: "gui",
      })
    ).rejects.toEqual(new AppError("Name is unavailable.", 400));
  });

  it("should not be able to update a driver when not found.", async () => {
    updateDriverService = new UpdateDriverService(fakeDriverRepository);

    await expect(
      updateDriverService.execute({
        _id: "123",
        name: "guilherme",
      })
    ).rejects.toEqual(new AppError("Driver not found.", 404));
  });
});
