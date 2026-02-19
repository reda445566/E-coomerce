import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.router.js";

import { connectdb } from "./config/db.js";
const app = express();
//
app.use(express.json())
dotenv.config();





//auth
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

// listen port
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






