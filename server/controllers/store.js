import Item from "../models/Item.js";
import Store from "../models/Store.js";

const storeId = '64804288b9a6f4d69455104f'



/* READ */
export const storeGetAllCategories = async (req,res) => {

    try {

        //find the store
        const store = await Store.findById(storeId)
        //if store not exist return
        if (!store) {
            return res.status(404).json({message: "Store not found"})
        }



        return res.status(200).json(store.categories)


    }catch(error){
        return res.status(500).json({error})
    }
}

export const storeGetCaregoryByName = async (req,res) =>{
    try {

        const {categoryName} = req.body
        //find the store
        const store = await Store.findById(storeId)
        //if store not exist return
        if (!store) {
            return res.status(404).json({message: "Store not found"})
        }

        const category = await store.categories.find(cat => cat.name === categoryName)

        if(!category){
            return res.status(404).json({message: "Category not found"})
        }

        const allItems = await Promise.all(
            category.items.map(itemId=> Item.findById(itemId))
        )


        return res.status(200).json(allItems)


    }catch(error){
        return res.status(500).json({error})
    }
}

export const storeGetItemByName = async (req, res) =>{

    try{

        const {itemName} = req.body
        //find the store
        const store = await Store.findById(storeId)
        //if store not exist return
        if (!store) {
            return res.status(404).json({message: "Store not found"})
        }


        const item = await Item.findOne({name: itemName})

        return res.status(200).json(item)

    }catch(error){
        return res.status(500).json({error})
    }

}