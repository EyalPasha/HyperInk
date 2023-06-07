import mongoose from "mongoose";
const {Schema} = mongoose;

const StoreSchema = new Schema({

    name:{
        type: String
    },
    categories: [
        {
          name: {
              type: String
          },
          items: [
              {
                  type: Schema.Types.ObjectId,
                  ref: "Item"
              }
          ]
        }
    ],
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]


    }, { timestamps: true }
);


const Store = mongoose.model("Store", StoreSchema);

export default Store;

