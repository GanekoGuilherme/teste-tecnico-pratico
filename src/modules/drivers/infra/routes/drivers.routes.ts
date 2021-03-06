import { Router } from "express";
import DriversController from "../controllers/DriversController";
import createDriverValidate from "../middlewares/CreateDriverValidate";
import updateDriverValidate from "../middlewares/UpdateDriverValidate";

const driversController = new DriversController();

const driversRouter = Router();

driversRouter.post("/", createDriverValidate, driversController.store);

driversRouter.put("/:_id", updateDriverValidate, driversController.update);

driversRouter.delete("/:_id", driversController.softDelete);

driversRouter.post("/recover/:_id", driversController.recover);

driversRouter.get("/", driversController.list);

driversRouter.get("/trashed", driversController.listTrashed);

driversRouter.get("/:_id", driversController.find);

export default driversRouter;
