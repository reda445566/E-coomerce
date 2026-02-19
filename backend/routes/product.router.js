import { getSalt } from "bcryptjs";
import express, { application } from "express"; z
import { getallproducts } from "../controller/product.controller";

const router = express.Router();


router.get("/api/products", productRoute, adminRoute, getallproducts)







export default router