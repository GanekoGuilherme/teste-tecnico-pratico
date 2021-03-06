import { Router } from "express";

import CarsController from "../controllers/CarsController";
import createCarValidate from "../middlewares/CreateCarValidate";
import updateCarValidate from "../middlewares/UpdateCarValidate";

const carsController = new CarsController();

const carsRouter = Router();

carsRouter.post("/", createCarValidate, carsController.store);

carsRouter.put("/:_id", updateCarValidate, carsController.update);

carsRouter.delete("/:_id", carsController.softDelete);

carsRouter.post("/recover/:_id", carsController.recover);

carsRouter.get("/", carsController.list);

carsRouter.get("/:_id", carsController.find);

carsRouter.get("/trashed", carsController.listTrashed);

export default carsRouter;
