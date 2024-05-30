import { app } from "./app.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/database.js";
import dotenv from "dotenv";

dotenv.config({})

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`Server is working on ${process.env.PORT}`)
);
