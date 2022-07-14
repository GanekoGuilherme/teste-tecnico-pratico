import { container } from "tsyringe";
import DriverRepository from "./implementations/DriverRepository";
import IDriverRepository from "./models/IDriverRepository";

container.registerSingleton<IDriverRepository>(
  "DriverRepository",
  DriverRepository
);
