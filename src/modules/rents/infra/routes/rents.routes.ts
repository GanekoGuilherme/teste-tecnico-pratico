import { Router } from "express";
import RentsController from "../controllers/RentsController";
import createRentValidate from "../middlewares/CreateRentValidate";

const rentsController = new RentsController();

const rentsRouter = Router();

rentsRouter.post("/", createRentValidate, rentsController.store);

export default rentsRouter;
