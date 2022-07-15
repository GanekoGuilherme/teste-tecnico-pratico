import { Router } from "express";
import DriversController from "../controllers/DriversController";
import createDriverValidate from "../middlewares/CreateDriverValidate";

const driversController = new DriversController();

const driversRouter = Router();

driversRouter.post("/", createDriverValidate, driversController.store);

export default driversRouter;
