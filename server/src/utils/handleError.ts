import { Response } from "express";
import { ZodError } from "zod";
import { MongoError } from "mongodb";
import mongoose from "mongoose";

const handleError = (error: unknown, res: Response) => {
  // Erro de validação do Zod
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      path: err.path.join("."),
      message:
        err.message === "Required"
          ? `O campo '${err.path.join(".")}' é obrigatório.`
          : err.message,
    }));

    res.status(400).json({
      message: formattedErrors[0].message,
      error: formattedErrors,
    });
  }

  // Erro de validação do Mongoose
  else if (error instanceof mongoose.Error.ValidationError) {
    const formattedErrors = Object.keys(error.errors).map((key) => {
      const fieldError = error.errors[key];
      return {
        path: fieldError.path,
        message:
          fieldError instanceof mongoose.Error.ValidatorError
            ? fieldError.properties.message || "Erro desconhecido"
            : "Erro desconhecido",
      };
    });

    res.status(400).json({
      message: formattedErrors[0].message,
      error: formattedErrors,
    });
  }

  // Erro de duplicidade de chave do MongoDB
  else if (error instanceof MongoError && error.code === 11000) {
    const mongoError = error as MongoError & { keyValue: Record<string, any> };
    const field = Object.keys(mongoError.keyValue)[0];
    const value = mongoError.keyValue[field];

    res.status(400).json({
      message: `O valor '${value}' para o campo '${field}' já existe. Escolha outro valor.`,
      error: mongoError,
    });
  }

  // Erro genérico
  else if (error instanceof Error) {
    res.status(500).json({ message: error.message, error });
  }

  // Erro desconhecido
  else {
    res.status(500).json({ message: "An unknown error occurred", error });
  }
};

export default handleError;
