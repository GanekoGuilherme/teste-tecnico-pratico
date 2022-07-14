import { container } from "tsyringe";
import CarRepository from "./implementations/CarRepository";
import ICarRepository from "./models/ICarRepository";

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
