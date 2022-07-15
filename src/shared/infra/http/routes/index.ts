import carsRouter from "@modules/cars/infra/http/routes/cars.routes";
import driversRouter from "@modules/drivers/infra/routes/drivers.routes";
import { Router } from "express";

const routes = Router();

routes.use("/cars", carsRouter);
routes.use("/drivers", driversRouter);
routes.get("/", (_request, response) => response.json({ msg: "Hello World." }));

export default routes;
