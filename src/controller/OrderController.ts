import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Order} from "../entity/Order";
import {Err,errCode, errMsg} from "../helper/Err";
import {validate} from "class-validator";
import { OrderStatus } from "../entity/OrderStatus";

export class OrderController {
    public static get repo(){
        return getRepository(Order)
    }

    public static get orderStatusRepo(){
        return getRepository(OrderStatus)
    }

    static async all(request: Request, response: Response, next: NextFunction) {
        let orders=[]
        try{
            orders=await OrderController.repo.find()

        }catch(e){
            return response.status(400).send(new Err(errCode.E400,errMsg.Fail,e))
        }
        return response.status(200).send(new Err(errCode.E200,errMsg.OK,orders))
    }

  static  async one(request: Request, response: Response, next: NextFunction) {
    let {orderNo}=request.params
    if(!orderNo){
        return response.status(404).send(new Err(errCode.E404,errMsg.Missing,null))
    }
    let order=null
    try{
        order= await OrderController.repo.findOneOrFail({where:{orderNo:orderNo}})
    }catch(e){
        return response.status(400).send(new Err(errCode.E400,errMsg.Fail,e))
    }
      return response.status(200).send(new Err(errCode.E200,errMsg.OK,order))
    }

   static async create(request: Request, response: Response, next: NextFunction) {
    const orderstatus=await OrderController.orderStatusRepo.findOne({name:'New'})
       const {orderProducts, totalPrice, userEmail, taxRate,orderNo,address} = request.body
       let order = new Order()
       order.orderProducts =orderProducts
       order.totalPrice = totalPrice
       order.taxRate = taxRate
       order.userEmail=userEmail
       order.orderStatus=orderstatus
       order.orderNo=orderNo
       order.address=address
       let errors = await validate(order)
//        console.log(111111111,order)
       if (errors.length > 0) {
           return response.status(400).send(new Err(errCode.E404, errMsg.Missing, null))
       }

      try{ await OrderController.repo.save(order)}catch(e){
          return response.status(404).send(new Err(errCode.E400, errMsg.Fail, e))
      }
       return response.status(200).send(new Err(errCode.E200,errMsg.OK,order))
   }

   static async update(request: Request, response: Response, next: NextFunction) {
    let {orderNo}=request.params
    if(!orderNo){
        return response.status(404).send(new Err(errCode.E404,errMsg.Missing,null))
    }
    let order=null
    try{
        let order= await OrderController.repo.findOne({where:{orderNo:orderNo}})
        // console.log(111111111111111111111111111111,order)
        const orderstatus=await OrderController.orderStatusRepo.findOne({name:'Paid'})
        order.orderStatus=orderstatus
        // console.log(2222222222222222222222222,order)
        await OrderController.repo.save(order)
    }catch(e){
        return response.status(400).send(new Err(errCode.E400,errMsg.Fail,e))
    }
    return response.status(200).send(new Err(errCode.E200,errMsg.OK,order)) 
    }

   static async delete(request: Request, response: Response, next: NextFunction) {
       return response.status(200).send('good')
    }



}
