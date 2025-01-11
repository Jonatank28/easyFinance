"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DashboardController_1 = __importDefault(require("../controllers/DashboardController"));
const router = express_1.default.Router();
const prefix = "/dashboard";
router.get(prefix + "/getDashboardData/:userId/:month/:year", DashboardController_1.default.getDashboardData);
exports.default = router;
