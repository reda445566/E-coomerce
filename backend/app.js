import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.router.js";
import productRoutes from "./routes/product.router.js";
import { connectDB } from "./config/db.js";
const app = express();
//
app.use(express.json())
dotenv.config();


connectDB();



//auth
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

// listen port
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






