import express, { Router } from "express"
import { signIn, createAdmin } from "../controllers"
import { verifyToken } from "../middlewares"

const BASE_ROUTE: string = '/admin'
const router: Router = express.Router()

router.post('/sign-in', signIn)
router.post('/sign-up', verifyToken, createAdmin)

export default { BASE_ROUTE, router }
