import express from 'express'
import {adminAddItem,
    adminEditInventory,
    adminEditItem,
    adminDeleteItem,
    adminDeleteCategory,
    adminGetAllCategories,
    adminGetCaregoryByName,
    adminGetItemByName
} from "../controllers/admin.js";

const router = express.Router()


/* CREATE */
router.post('/add-item',adminAddItem)

/* READ */
router.get('/get-all-categories', adminGetAllCategories) //returns all category names and array of items id's
router.get('/get-category-by-name',adminGetCaregoryByName ) //return all items of category by name
router.get('/get-item-by-name',adminGetItemByName ) //return item by name


/* UPDATE */
router.patch('/edit-item/:itemId', adminEditItem)
router.patch('/edit-inventory/:itemId', adminEditInventory)


/* DELETE */
router.delete('/delete-item', adminDeleteItem)
router.delete('/delete-category', adminDeleteCategory)


export default router