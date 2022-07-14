import { Router } from "express";

import CarsController from "../controllers/CarsController";
import createCarValidate from "../middlewares/CreateCarValidate";
import updateCarValidate from "../middlewares/UpdateCarValidate";

const carsController = new CarsController();

const carsRouter = Router();

carsRouter.post("/", createCarValidate, carsController.store);

carsRouter.patch("/:_id", updateCarValidate, carsController.update);

carsRouter.delete("/:_id", carsController.softDelete);

carsRouter.post("/recover/:_id", carsController.recover);

export default carsRouter;
