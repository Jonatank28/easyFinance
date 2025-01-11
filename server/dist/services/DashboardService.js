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
const DashboardRepository_1 = __importDefault(require("../repositories/DashboardRepository"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
class DashboardService {
    getDashboardData(dataRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultResponse = {
                lastTransactions: [],
                spendingCategory: [],
                valuesInformation: {
                    revenue: 0,
                    expense: 0,
                    investment: 0,
                    balance: 0,
                },
                existUser: false,
            };
            try {
                const existUser = yield UserRepository_1.default.verifyExists(dataRequest.userId);
                if (!existUser)
                    return defaultResponse;
                const [lastTransactions, spendingCategory, valuesInformation] = yield Promise.all([
                    DashboardRepository_1.default.latestTransactions(dataRequest),
                    DashboardRepository_1.default.spendingCategory(dataRequest),
                    DashboardRepository_1.default.valuesInformation(dataRequest),
                ]);
                return {
                    lastTransactions,
                    spendingCategory,
                    valuesInformation,
                    existUser,
                };
            }
            catch (error) {
                console.error("Error fetching dashboard data:", error);
                throw error;
            }
        });
    }
}
exports.default = new DashboardService();
