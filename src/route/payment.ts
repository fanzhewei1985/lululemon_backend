import {Router} from "express";
import {PaymentController} from '../controller/PaymentController'
const router=Router()


router.post("/",PaymentController.create)

export default router
