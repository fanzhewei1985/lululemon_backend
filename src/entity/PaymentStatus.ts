import { ManyToOne, PrimaryGeneratedColumn, Column, Entity, OneToMany} from "typeorm";
import {Payment} from './Payment'

@Entity()
export class PaymentStatus {

@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;

@OneToMany(()=>Payment,payment=>payment.paymentStatus)
payment:Payment
}


