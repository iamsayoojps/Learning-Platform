import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import courseRoutes from "./routes/courseRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import { connectDB } from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/purchase", purchaseRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
