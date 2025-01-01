import express from "express";
import TransactionController from "../controllers/TransactionController";

const router = express.Router();
const prefix = "/transaction";

router.post(prefix + "/create", TransactionController.create);
router.get(
  prefix + "/transactions/byMonthAndYear/:userId/:month/:year",
  TransactionController.getTransactionsByMonthAndYear
);

export default router;
