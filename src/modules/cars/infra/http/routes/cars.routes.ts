import { Router } from "express";

import CarsController from "../controllers/CarsController";
import createCarValidate from "../middlewares/CreateCarValidate";

const carsController = new CarsController();

const carsRouter = Router();

carsRouter.post("/", createCarValidate, carsController.store);

export default carsRouter;
