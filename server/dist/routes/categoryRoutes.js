"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const router = express_1.default.Router();
const prefix = "/category";
router.get(prefix + "/getAllByUserId/:userId", CategoryController_1.default.getAllByUserId);
exports.default = router;
