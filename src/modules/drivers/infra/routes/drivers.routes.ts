import { Router } from "express";
import DriversController from "../controllers/DriversController";
import createDriverValidate from "../middlewares/CreateDriverValidate";
import updateDriverValidate from "../middlewares/UpdateDriverValidate";

const driversController = new DriversController();

const driversRouter = Router();

driversRouter.post("/", createDriverValidate, driversController.store);

driversRouter.patch("/:_id", updateDriverValidate, driversController.update);

export default driversRouter;
