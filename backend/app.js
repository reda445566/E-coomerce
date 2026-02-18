import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.router.js";

import { connectdb } from "./config/D_B.JS";

const app = express();
//
app.use(express.json())
dotenv.config();





//auth
app.use('/api/auth', authRoutes)
const port = process.env.PORT || 5000
// listen port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






