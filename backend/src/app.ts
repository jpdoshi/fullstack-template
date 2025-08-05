import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { authenticate } from "./middleware/auth";
import sequelize from "./config/db";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/protected", authenticate, (req: any, res) => {
  res.json({ message: "Protected route access granted", userId: req.user.id });
});

try {
  sequelize
    .authenticate()
    .then(() =>
      console.log("✅ Connection has been established successfully.")
    );
} catch (error) {
  console.error("❌ Unable to connect to the database:", error);
}

sequelize.sync();

export default app;
