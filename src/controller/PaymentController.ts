import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Payment} from "../entity/Payment";
import {validate} from "class-validator";
import {Err,errCode,errMsg} from '../helper/Err'
import { PaymentStatus } from "../entity/PaymentStatus";
import { PaymentType } from "../entity/PaymentType";
import Stripe from "stripe";
import { Order } from "../entity/Order";

export class PaymentController {
    
    
    public static get repo(){
        return getRepository(Payment)
    }

    public static get payTypeRepo(){
        return getRepository(PaymentType)
    }

    public static get payStatusRepo(){
        return getRepository(PaymentStatus)
    }

    public static get orderRepo(){
        return getRepository(Order)
    } 
    static async create(request: Request, response: Response, next: NextFunction) {
      
        console.log(request.body)
        let {amount,orderNo,payStatus}=request.body
        let payment = new Payment()
       payment.amount=amount || 100
       payment.orderNo=orderNo
//        console.log(1111111111111111111,payStatus)
       let paymentIntent=null
       const Stripe = require('stripe');
       const stripe = Stripe('sk_test_51MWulfFfhF5AxI6FMPFRGKOZyhhpdRbrD8gpeUtMBvNcUMBuMUe7Qk7uKgPXOmwPUlClxkbPRwncCKhYt6WVKu5x00d0zg9iMp');
         paymentIntent = await stripe.paymentIntents.create({
             amount: payment.amount,
             currency:'usd'
           });
           if(payStatus){
        try{
            const payType=await PaymentController.payTypeRepo.findOne({name:'Card'})
            payment.paymentType=payType
            const order=await PaymentController.orderRepo.findOne({orderNo:orderNo})
            payment.order=order
//             console.log(111,payment)
            const errors =await validate(payment)
            console.log(errors)
            if (errors.length>0)
            {
                let err= new Err(errCode.E400,errMsg.Missing,null)
                return response.status(400).send(err)
            }
//             console.log(222,payment)    
          
            const paymentStatusT=await PaymentController.payStatusRepo.findOne({name:'Success'}) 
            payment.paymentStatus=paymentStatusT
            await PaymentController.repo.save(payment)
        }catch(e){
            console.log('error,write to db',e)
            return response.status(401).send(new Err(errCode.E400,errMsg.Fail,e))
        }}
        // return response.status(200).send(new Err(errCode.E200,errMsg.OK,payment))
        response.send({
            clientSecret: paymentIntent.client_secret
          });
    }}

   
