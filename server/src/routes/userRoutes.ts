import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();
const prefix = "/user";

router.post(prefix + "/create", UserController.create);

export default router;
