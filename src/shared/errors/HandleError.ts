import AppError from "./AppError";

import { NextFunction, Request, Response } from "express";

export default {
  handleError: (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
  ): Response => {
    console.log(error);

    if (error instanceof AppError) {
      return response.status(error.statusCode).json(error);
    }

    return response.status(500).json({ message: "Internal Server Error." });
  },
};
