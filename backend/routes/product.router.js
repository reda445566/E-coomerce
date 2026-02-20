import express from "express";
import {
    getallproducts,
    getfeaturedproducts,
    createproduct
} from "../controller/product.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🟢 Get all products
router.get("/", protectRoute, getallproducts);

// 🟢 Get featured products
router.get("/featured", protectRoute, getfeaturedproducts);

// 🔵 Create product (Admin only لو عندك ميدل وير أدمن ضيفه هنا)
router.post("/", protectRoute, createproduct);

export default router;