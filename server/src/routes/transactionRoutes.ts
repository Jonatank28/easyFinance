import express from "express";
import transactionController from "../controllers/TransactionController";

const router = express.Router();
const prefix = "/transaction";

router.post(prefix + "/create", transactionController.create);

export default router;
