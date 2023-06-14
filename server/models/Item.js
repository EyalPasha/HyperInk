import mongoose from "mongoose";
const {Schema} = mongoose;

const ItemSchema = new Schema({

        name:{
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
        },
        colors: [
            {
                colorName: {
                    type: String
                },
                size:[
                    {
                        sizeName: {
                            type: String
                        },
                        stock: {
                            type: Number,
                            min: 0
                                }
                    }
                    ]
                }

        ],

        imageUrl: {
            type: String
        },
        description:{
            type: String
        }

    }, { timestamps: true }
);


const Item = mongoose.model("Item", ItemSchema);

export default Item;

