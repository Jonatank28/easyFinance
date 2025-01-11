"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TransactionController_1 = __importDefault(require("../controllers/TransactionController"));
const router = express_1.default.Router();
const prefix = "/transaction";
router.post(prefix + "/create", TransactionController_1.default.create);
router.get(prefix + "/getAllByMonthAndYear/:userId/:month/:year", TransactionController_1.default.getAllByMonthAndYear);
router.put(prefix + "/update/:transactionId", TransactionController_1.default.update);
router.delete(prefix + "/delete/:transactionId", TransactionController_1.default.delete);
exports.default = router;
