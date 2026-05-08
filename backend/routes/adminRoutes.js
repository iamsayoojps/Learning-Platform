import express from "express";
import { loginAdmin, addAdmin } from "../controllers/adminController.js";

import { adminProtect } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

// router.post("/create-first-admin", addAdmin);

router.post("/add-admin", adminProtect, addAdmin);

export default router;
