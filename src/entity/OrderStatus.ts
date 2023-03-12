import { ManyToOne, PrimaryGeneratedColumn, Column, Entity, OneToMany} from "typeorm";
import { Order } from "./Order";

@Entity()
export class OrderStatus {

@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;

@OneToMany(()=>Order,order=>order.orderStatus)
order:Order
}


