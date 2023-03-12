import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    Unique,
    OneToOne,
    ManyToOne,

} from "typeorm";
import {Min,Length,IsEmail} from "class-validator";
import {Payment} from "./Payment";
import { OrderStatus } from "./OrderStatus";

@Entity()
// @Unique(['orderId'])
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderNo:number;

    @Column({nullable:true})
    @Length(1,200)
    @IsEmail()
    userEmail: string;

    @Column()
    // @Length(0,500)
    address:string;

    @Column()
    orderProducts: string;

    @Column('decimal',{precision:5,scale:2,default:1})
    @Min(1)
    taxRate: number;

    @Column('decimal',{precision:5,scale:2})
    @Min(0)
    totalPrice: number;

    @Column({nullable:true,default:false})
    isActive:boolean;

    @Column({nullable:true,default:false})
    isDelete:boolean;

    @Column()
    @CreateDateColumn()
    createdAt:Date;

    @Column()
    @UpdateDateColumn()
    updatedAt:Date;

    @OneToOne(()=>Payment,payment=>payment.order)
    payment:Payment
     
    @ManyToOne(()=>OrderStatus, orderstatus=>orderstatus.order)
    orderStatus:OrderStatus
}
