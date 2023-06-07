import express from 'express'
import {adminAddItem, adminEditInventory, adminEditItem} from "../controllers/admin.js";

const router = express.Router()


/* CREATE */
router.post('/add-item',adminAddItem)


/* UPDATE */
router.patch('/edit-item/:itemId', adminEditItem)
router.patch('/edit-inventory/:itemId', adminEditInventory)


export default router