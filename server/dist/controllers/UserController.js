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
const UserShema_1 = require("../schema/UserShema");
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    // Create new user
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                UserShema_1.userCreateSchema.parse(data);
                yield UserService_1.default.create(data);
                res.status(201).json({ message: "Usuário criado com sucesso!" });
            }
            catch (error) {
                (0, handleError_1.default)(error, res);
            }
        });
    }
}
exports.default = new UserController();
