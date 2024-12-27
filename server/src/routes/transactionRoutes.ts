import express from "express";
import transactionController from "../controllers/TransactionController";

const router = express.Router();

router.get("/create", transactionController.create);

export default router;
