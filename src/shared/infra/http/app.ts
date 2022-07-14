import "reflect-metadata";
import "express-async-errors";

import express from "express";
import cors from "cors";

import "@shared/container";
import "@shared/infra/database/mongoose";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
