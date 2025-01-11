"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const seed_1 = require("./seed");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const prefix = "/api";
app.use(prefix, userRoutes_1.default);
app.use(prefix, categoryRoutes_1.default);
app.use(prefix, transactionRoutes_1.default);
app.use(prefix, dashboardRoutes_1.default);
(0, database_1.default)();
(0, seed_1.seedData)();
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
