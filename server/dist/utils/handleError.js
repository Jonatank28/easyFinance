"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const handleError = (error, res) => {
    // Erro de validação do Zod
    if (error instanceof zod_1.ZodError) {
        const formattedErrors = error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message === "Required"
                ? `O campo '${err.path.join(".")}' é obrigatório.`
                : err.message,
        }));
        res.status(400).json({
            message: formattedErrors[0].message,
            error: formattedErrors,
        });
    }
    // Erro de validação do Mongoose
    else if (error instanceof mongoose_1.default.Error.ValidationError) {
        const formattedErrors = Object.keys(error.errors).map((key) => {
            const fieldError = error.errors[key];
            return {
                path: fieldError.path,
                message: fieldError instanceof mongoose_1.default.Error.ValidatorError
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
    else if (error instanceof mongodb_1.MongoError && error.code === 11000) {
        const mongoError = error;
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
exports.default = handleError;
