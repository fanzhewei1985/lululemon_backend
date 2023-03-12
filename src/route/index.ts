import {Router} from 'express';
import order from './order'
import payment from "./payment";

const routes=Router()
routes.use('/payment',payment)
routes.use('/order',order)


export default routes