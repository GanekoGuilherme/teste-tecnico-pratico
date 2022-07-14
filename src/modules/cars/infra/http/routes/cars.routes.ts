import { Router } from "express";

import CarsController from "../controllers/CarsController";

const carsController = new CarsController();

const carsRouter = Router();

carsRouter.post("/", carsController.store);

export default carsRouter;
