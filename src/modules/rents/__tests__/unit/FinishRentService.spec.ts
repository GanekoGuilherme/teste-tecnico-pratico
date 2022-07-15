import "reflect-metadata";
import AppError from "@shared/errors/AppError";
import FakeRentRepository from "@shared/infra/database/mongoose/repositories/RentRepository/fakes/FakeRentRepository";
import FinishRentService from "@modules/rents/services/FinishRentService";

let finishRentService: FinishRentService;
let fakeRentRepository: FakeRentRepository;

describe("Finish Rent", () => {
  beforeEach(() => {
    fakeRentRepository = new FakeRentRepository();
  });

  it("should be able to finish a rent", async () => {
    finishRentService = new FinishRentService(fakeRentRepository);

    const rentMocked = await fakeRentRepository.createRent({
      startDate: new Date(),
      driver: "1",
      car: "1",
      reason: "reason".toUpperCase(),
    });

    const { rent } = await finishRentService.execute(rentMocked._id);

    expect(rent._id).toBeDefined();
    expect(rent.startDate).toBe(rentMocked.startDate);
    expect(rent.endDate).toBeDefined();
    expect(rent.reason).toBe(rentMocked.reason);
  });

  it("should not be able to finish a rent when _id not match", async () => {
    finishRentService = new FinishRentService(fakeRentRepository);

    await fakeRentRepository.createRent({
      startDate: new Date(),
      driver: "1",
      car: "1",
      reason: "reason".toUpperCase(),
    });

    await expect(finishRentService.execute("123")).rejects.toEqual(
      new AppError("Rent not found.", 404)
    );
  });
});
