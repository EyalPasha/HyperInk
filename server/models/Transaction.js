import mongoose from "mongoose";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Item from "../models/Item.js";
const {Schema} = mongoose;

const TransactionSchema = new Schema({

        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: "Store"
        },
        items: [
            {
                type: Schema.Types.ObjectId,
                ref: "Item",

            }
        ],
        totalCost:{
            type: Number,
            min: 0
        }



    }, { timestamps: true }
);


const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;

