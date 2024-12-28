import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import transactionRoutes from "./routes/transactionRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import { seedData } from "./seed";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const prefix = "/api";

app.use(prefix, transactionRoutes);
app.use(prefix, categoryRoutes);

connectDB();
seedData();

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
