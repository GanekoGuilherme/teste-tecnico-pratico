import { container } from "tsyringe";
import RentRepository from "./implementations/RentRepository";
import IRentRepository from "./models/IRentRepository";

container.registerSingleton<IRentRepository>("RentRepository", RentRepository);
