import express from "express";
import { config } from "dotenv";
import paymentRoute from "./routes/paymentRoutes.js";
import cors from "cors";



export const app = express();

app.use(cors(
  {
    origin: ["https://e-commerce-qshop-delta.vercel.app", "http://localhost:5713", "http://localhost:5174/"],
    methods: ["POST", "GET"], // Corrected spelling of 'methods'
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json("Hello")
})

app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

