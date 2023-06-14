import Item from "../models/Item.js";
import Store from "../models/Store.js";

const storeId = '64804288b9a6f4d69455104f' //Store id is hard coded to the code

export const adminAddItem = async (req,res) =>{

    try{


        const {name, category, colors, imageUrl, description} = req.body //colors is an array of sizes and stock



        //fnd the store
        const store = await Store.findById(storeId)



        //if store not exist return
        if(!store){
            return res.status(404).json({message: "Store not found"})
        }



        //check if item is already exist
        const exist = await Item.findOne({name: name})


        if(exist){
            return res.status(409).json({message: "already exists",category:exist.category, id: exist._id})
        }


        //if not exist create one
        const item = await Item.create({
            name,
            category,
            colors,
            imageUrl,
            description

        })

        //find the category of the item
        const storeCategory = await store.categories.find(cat => cat.name === category)


        //if category not exist - create one
        if(!storeCategory){

            store.categories.push({
                name: category,
                items: [item]
            })


            await store.save()

            return res.status(200).json({message: "success"})

        }


        const storeItems = storeCategory.items

        //push new item to the store category items array
        storeItems.push(item._id)

        //save store
        await store.save()

        return res.status(200).json({message: "success"})




    }catch(error){
        return res.status(500).json({error})
    }

}

export const adminEditItem = async (req,res) =>{


    try{

        const {itemId} = req.params
        const{newName, newImageUrl, newDescription} = req.body

        //find the store
        const store = await Store.findById(storeId)


        //if store not exist return
        if(!store){
            return res.status(404).json({message: "Store not found"})
        }


        const savedItem = await Item.findByIdAndUpdate(itemId, {
            name: newName,
            imageUrl: newImageUrl,
            description: newDescription
        })


        await savedItem.save()

        return res.status(200).json({message: "success"})







    }catch(error){
        return res.status(500).json({error})
    }
}

export const adminEditInventory = async (req, res) =>{

    try{

        const {itemId} = req.params
        const{color, size, newStock} = req.body

        //find the store
        const store = await Store.findById(storeId)


        //if store not exist return
        if(!store){
            return res.status(404).json({message: "Store not found"})
        }

        const item = await Item.findById(itemId)

        //console.log("1")

        const itemColor = await item.colors.find(col => col.colorName.name === color)

        //console.log(itemColor.colorName)

        const itemSize =  itemColor.colorName.size.find(si => si.name === size)

        console.log(itemSize)

        itemSize.stock = newStock

        item.save()

        return res.status(200).json({message: "success"})



    }catch(error){
        return res.status(500).json({error})
    }

}

export const adminDeleteItem = async (req,res) =>{

    try{

        const {itemId, categoryName} = req.body


        //fnd the store
        const store = await Store.findById(storeId)


        //if store not exist return
        if(!store){
            return res.status(404).json({message: "Store not found"})
        }

        //delte item doc
        await Item.findByIdAndDelete(itemId)

        //find category name
        const category = await store.categories.find(cat=> cat.name === categoryName)


        const newArray = await category.items.filter(item => item._id === itemId)

        category.items = await newArray

        store.save()

        return res.status(200).json({message: "success"})


    }catch(error){
        return res.status(500).json({error})
    }
}

export const adminDeleteCategory = async (req, res) =>{

    try{

        const {categoryName} = req.body


        //fnd the store
        const store = await Store.findById(storeId)


        //if store not exist return
        if(!store){
            return res.status(404).json({message: "Store not found"})
        }


        //delete category items
        const category = await store.categories.find(cat=>cat.name === categoryName)


        await category.items.forEach(item=> Item.findByIdAndDelete(item._id))


        const newCategoryArray = await store.categories.filter(cat=> cat.name !== categoryName)

        store.categories = await newCategoryArray


        store.save()

        return res.status(200).json({message: "success"})


    }catch(error){
        return res.status(500).json({error})
    }
}
