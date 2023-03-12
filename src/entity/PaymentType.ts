import { ManyToOne, PrimaryGeneratedColumn, Column, Entity, OneToMany} from "typeorm";
import {Payment} from './Payment'

@Entity()
export class PaymentType {

@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;

@OneToMany(()=>Payment,payment=>payment.paymentType)
payment:Payment
}



