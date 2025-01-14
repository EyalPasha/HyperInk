import express from 'express';
import { getUser, getUserHistory, addToCart, makePurchase, removeFromCart } from "../controllers/user.js";

const router = express.Router();

router.get('/get-user', getUser)
router.get('/get-user-history', getUserHistory)


router.patch('/add-to-cart', addToCart)
router.patch('/make-purchase', makePurchase)
router.patch('/remove-from-cart', removeFromCart)

export default router;
