import express from "express";
import {
  getOrders,
  deleteOrder,
  clearOrders,
  getRevenue,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getOrders);
router.delete("/:id", deleteOrder);
router.delete("/", clearOrders);
router.get("/revenue", getRevenue);

export default router;
