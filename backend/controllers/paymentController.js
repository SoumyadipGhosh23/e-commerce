import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import { Receipt } from "../models/receiptDetailsModel.js";

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
  
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send("checkout server error")
  }
};

export const getPaymentDetails= async (req, res) => {
  try {
    const  razorpay_payment_id  = req.body.razorpay_payment_id;
    console.log(req.body.razorpay_payment_id);
    const payment = await Payment.findOne({razorpay_payment_id : razorpay_payment_id} );
    if (!payment) {
      console.log("Paini re bhai!");
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json({
      razorpay_order_id: payment.razorpay_order_id,
      razorpay_signature: payment.razorpay_signature,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const saveOrder = async (req,res)=>{
  try {
    const {name, price, shippingFee} = req.body;
    const receipt = await Receipt.create({
      name, 
      price, 
      shippingFee
    })
    res.status(200).send("Order Saved Succesfully!")
  } catch (error) {
    console.error(error);
    res.status(500).json({error : "Internal Server Error whilw saving order details"})
  }
}

export const getOrderDetails = async (req,res)=>{
  try {
    const name = req.body.name;
    const orderDetails = await Receipt.find({name: name}).sort({createdAt : -1}).limit(1)
    if(orderDetails.length === 0){
      console.log("Paini re bhai Order Details!");
      return res.status(404).json({ error: "Order not found" });
    }
    const singleOrder = orderDetails[0]
    res.json({
      price: singleOrder.price,
      shippingFee: singleOrder.shippingFee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error : "Internal Server Error while getting order details"})
  }
}


export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    //need to change
    res.redirect(
      `https://e-commerce-qshop-delta.vercel.app/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
