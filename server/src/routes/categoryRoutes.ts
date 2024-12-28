import express from "express";
import CategoryController from "../controllers/CategoryController";

const router = express.Router();
const prefix = "/category";

router.get(
  prefix + "/getAllByUserId/:userId",
  CategoryController.getAllByUserId
);

export default router;
