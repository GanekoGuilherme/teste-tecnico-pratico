import "reflect-metadata";
import FakeDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/fakes/FakeDriverRepository";

import AppError from "@shared/errors/AppError";
import SoftDeleteDriverService from "@modules/drivers/services/SoftDeleteDriverService";

let softDeleteDriverService: SoftDeleteDriverService;
let fakeDriverRepository: FakeDriverRepository;

describe("Soft Delete Driver", () => {
  beforeEach(() => {
    fakeDriverRepository = new FakeDriverRepository();
  });

  it("should be able to soft delete a Driver", async () => {
    softDeleteDriverService = new SoftDeleteDriverService(fakeDriverRepository);

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "guilherme",
    });

    await softDeleteDriverService.execute(driverMocked._id);

    const driver = await fakeDriverRepository.listDriverTrashed();

    expect(driver[0]?._id).toBe(driverMocked._id);
    expect(driver[0]?.name).toBe(driverMocked.name);
    expect(driver[0]?.trashed).toBe(true);
  });

  it("should not be able to soft delete a driver when not found", async () => {
    softDeleteDriverService = new SoftDeleteDriverService(fakeDriverRepository);

    const driverMocked = await fakeDriverRepository.createDriver({
      name: "guilherme",
    });

    await expect(softDeleteDriverService.execute("123")).rejects.toEqual(
      new AppError("Driver not found.", 404)
    );
  });
});
