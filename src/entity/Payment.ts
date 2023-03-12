import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,PrimaryColumn, Unique, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import {IsEmail, Length, Max, Min} from "class-validator";
import {Order} from './Order'
import {PaymentStatus} from './PaymentStatus'
import { PaymentType } from "./PaymentType";

@Entity()
// @Unique(['paymentId'])
export class Payment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    orderNo: number;

    @Column('decimal',{precision:5,scale:2,nullable:true})
    @Min(0)
    amount: number;


    @Column({nullable:true,default:false})
    isActive:boolean;

    @Column({nullable:true,default:false})
    isDelete:boolean;

    @Column()
    @CreateDateColumn()
    createdAt:Date

    @Column()
    @UpdateDateColumn()
    updatedAt:Date

    @OneToOne(()=>Order,order=>order.payment)
    @JoinColumn()
    order:Order

    @ManyToOne(()=>PaymentStatus,paymentStatus=>paymentStatus.payment)
    paymentStatus:PaymentStatus

    @ManyToOne(()=>PaymentType,paymenttype=>paymenttype.payment)
    paymentType:PaymentType
}
