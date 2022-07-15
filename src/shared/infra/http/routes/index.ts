import carsRouter from "@modules/cars/infra/http/routes/cars.routes";
import driversRouter from "@modules/drivers/infra/routes/drivers.routes";
import rentsRouter from "@modules/rents/infra/routes/rents.routes";
import { Router } from "express";

const routes = Router();

routes.use("/cars", carsRouter);
routes.use("/drivers", driversRouter);
routes.use("/rents", rentsRouter);
routes.get("/", (_request, response) => response.json({ msg: "Hello World." }));

export default routes;
