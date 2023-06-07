import express from 'express'
import {login, register, signout} from "../controllers/auth.js";

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/signout', signout)


export default router