import "reflect-metadata";
import "express-async-errors";

import express from "express";
import cors from "cors";
import { errors } from "celebrate";

import "@shared/container";
import "@shared/infra/database/mongoose";

import HandleError from "@shared/errors/HandleError";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(HandleError.handleError);

module.exports = app;
