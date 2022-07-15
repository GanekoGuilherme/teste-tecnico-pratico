import "reflect-metadata";
import AppError from "@shared/errors/AppError";
import CreateDriverService from "@modules/drivers/services/CreateDriverService";
import FakeDriverRepository from "@shared/infra/database/mongoose/repositories/DriverRepository/fakes/FakeDriverRepository";

let createDriverService: CreateDriverService;
let fakeDriverRepository: FakeDriverRepository;

describe("Create Driver", () => {
  beforeEach(() => {
    fakeDriverRepository = new FakeDriverRepository();
  });

  it("should be able to create a driver", async () => {
    createDriverService = new CreateDriverService(fakeDriverRepository);
    const { driver } = await createDriverService.execute({
      name: "guilherme",
    });

    expect(driver._id).toBeDefined();
    expect(driver.name).toBe("GUILHERME");
    expect(driver.trashed).toBe(false);
  });

  it("should not be able to create a driver when name is not available", async () => {
    createDriverService = new CreateDriverService(fakeDriverRepository);

    await fakeDriverRepository.createDriver({ name: "GUILHERME" });

    await expect(
      createDriverService.execute({
        name: "guilherme",
      })
    ).rejects.toEqual(new AppError("Name is unavailable.", 400));
  });
});
