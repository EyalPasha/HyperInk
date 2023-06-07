import mongoose from "mongoose";
const {Schema} = mongoose;

const CartSchema = new Schema({

        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        items: [
            {
                type: Schema.Types.ObjectId,
                ref: "Item",
                count:{
                    type: Number,
                    min: 0,
                    max: 10
                }
            }
        ],
        totalCost:{
            type: Number,
            min: 0
        },
        notes:{
            type: String,
            min: 0,
            max: 256
        }


    }, { timestamps: true }
);


const Cart = mongoose.model("Cart", CartSchema);

export default Cart;

