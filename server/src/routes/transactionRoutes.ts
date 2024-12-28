import express from "express";
import TransactionController from "../controllers/TransactionController";

const router = express.Router();
const prefix = "/transaction";

router.post(prefix + "/create", TransactionController.create);

export default router;
