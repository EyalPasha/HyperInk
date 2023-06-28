import mongoose from "mongoose";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Item from "../models/Item.js";
const {Schema} = mongoose;

const transactionSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    },
  ],
  totalCost: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;