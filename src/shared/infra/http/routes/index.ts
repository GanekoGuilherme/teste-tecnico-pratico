import carsRouter from "@modules/cars/infra/http/routes/cars.routes";
import { Router } from "express";

const routes = Router();

routes.use("/cars", carsRouter);
routes.get("/", (_request, response) => response.json({ msg: "Hello World." }));

export default routes;
