"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleError_1 = __importDefault(require("../utils/handleError"));
const DashboardShema_1 = require("../schema/DashboardShema");
const DashboardService_1 = __importDefault(require("../services/DashboardService"));
class dashboardController {
    // Get Data Dashboard by user, month and year
    getDashboardData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, month, year } = req.params;
            DashboardShema_1.getDataDashboardSchema.parse({ userId, month, year });
            const result = yield DashboardService_1.default.getDashboardData(req.params);
            res.status(200).json(result);
            try {
            }
            catch (error) {
                (0, handleError_1.default)(error, res);
            }
        });
    }
}
exports.default = new dashboardController();
