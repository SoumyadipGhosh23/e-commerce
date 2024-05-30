import mongoose from "mongoose";

const receiptDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    shippingFee: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true 
});

export const Receipt = mongoose.model("Receipt", receiptDetailsSchema);