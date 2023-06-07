import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({

        firstName: {
            type: String,
            min: 2,
            max: 25,
            required: true
        },
        lastName: {
            type: String,
            min: 2,
            max: 25,
            required: true
        },
        email:{
            type: String,
            max: 50,
            required: true
        },
        address:{
            type: String,
            max: 50,
            required: true
        },
        phone: {
            type: String,
            max: 50,
            required: true
        },
        birthDate: {
            type: Date,
        },
        password:{
            type: String,
            min: 6,
            max: 50,
            required: true
        },
        cart: {
            type: Schema.Types.ObjectId,
            ref: "Cart"
        },
        transaction: [
            {
                type: Schema.Types.ObjectId,
                ref: "Transaction"
            }
        ]
        
        



    }, { timestamps: true }
);


const User = mongoose.model("User", UserSchema);

export default User;

