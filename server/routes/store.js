import express from 'express'

import {storeGetAllCategories, storeGetCaregoryByName, storeGetItemByName} from '../controllers/store.js'


const router = express.Router()

/* READ */
router.get('/get-all-categories', storeGetAllCategories) //returns all category names and array of items id's
router.get('/get-category-by-name',storeGetCaregoryByName ) //return all items of category by name
router.get('/get-item-by-name',storeGetItemByName ) //return item by name


export default router