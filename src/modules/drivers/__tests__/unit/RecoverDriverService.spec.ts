import "reflect-metadata";
import FakeDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/fakes/FakeDriverRepository";

import RecoverDriverService from "@modules/drivers/services/RecoverDriverService";
import AppError from "@shared/errors/AppError";

let recoverDriverService: RecoverDriverService;
let fakeDriverRepository: FakeDriverRepository;

describe("Recover Driver", () => {
  beforeEach(() => {
    fakeDriverRepository = new FakeDriverRepository();
  });

  it("should be able to recover a Driver", async () => {
    recoverDriverService = new RecoverDriverService(fakeDriverRepository);

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "guilherme",
    });

    await fakeDriverRepository.softDeleteDriver(driverMocked._id);

    const { driver } = await recoverDriverService.execute(driverMocked._id);

    expect(driver._id).toBeDefined();
    expect(driver.name).toBe(driverMocked.name);
    expect(driver.trashed).toBe(false);
  });

  it("should not be able to recover a driver when not found", async () => {
    recoverDriverService = new RecoverDriverService(fakeDriverRepository);

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "guilherme",
    });

    await fakeDriverRepository.softDeleteDriver(driverMocked._id);

    await expect(recoverDriverService.execute("123")).rejects.toEqual(
      new AppError("Driver not found.", 404)
    );
  });

  it("should not be able to recover a driver when he already recovered", async () => {
    recoverDriverService = new RecoverDriverService(fakeDriverRepository);

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "guilherme",
    });

    await fakeDriverRepository.softDeleteDriver(driverMocked._id);

    await recoverDriverService.execute(driverMocked._id);

    await expect(
      recoverDriverService.execute(driverMocked._id)
    ).rejects.toEqual(new AppError("Driver not found.", 404));
  });
});
