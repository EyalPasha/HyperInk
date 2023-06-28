import express from 'express'
import {adminAddItem,
    adminEditInventory,
    adminEditItem,
    adminDeleteItem,
    adminDeleteCategory
} from "../controllers/admin.js";

const router = express.Router()


/* CREATE */
router.post('/add-item',adminAddItem)

/* READ */



/* UPDATE */
router.patch('/edit-item/', adminEditItem)
router.patch('/edit-inventory', adminEditInventory)


/* DELETE */
router.delete('/delete-item', adminDeleteItem)
router.delete('/delete-category', adminDeleteCategory)


export default router