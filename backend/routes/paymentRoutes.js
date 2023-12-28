import express from "express";
import {
  checkout,
  paymentVerification,
  getPaymentDetails, 
  saveOrder,
  getOrderDetails
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

router.route("/getPaymentDetails").post(getPaymentDetails);

router.route("/saveOrder").post(saveOrder);

router.route("/getOrderDetails").post(getOrderDetails);

export default router;
