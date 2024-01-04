import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from '../order.types';
import { CartEntity, ShippingAddressEntity, PaymentResultEntity, UserEntity } from '@/db/entities';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  paymentMethod!: string;

  @Column({ type: 'float' })
  itemsPrice!: number;

  @Column({ type: 'float' })
  taxPrice!: number;

  @Column({ type: 'float' })
  shippingPrice!: number;

  @Column({ type: 'float' })
  totalPrice!: number;

  @Column({ type: 'boolean' })
  isPaid!: boolean;

  @Column({ type: 'date', nullable: true })
  paidAt?: Date;

  @Column({ type: 'boolean' })
  isDelivered!: boolean;

  @Column({ type: 'date', nullable: true })
  deliveredAt?: Date;

  @Column({
    type: 'varchar',
    enum: OrderStatus,
    default: OrderStatus.CART,
  })
  status!: OrderStatus;

  /* Relations */
  @OneToMany(() => CartEntity, (orderItem) => orderItem.order, { cascade: true })
  orderItems!: CartEntity[];

  @OneToOne(() => ShippingAddressEntity, (shippingAddress) => shippingAddress.order, { cascade: true })
  @JoinColumn()
  shippingAddress!: ShippingAddressEntity;

  @OneToOne(() => PaymentResultEntity, (paymentResult) => paymentResult.order, { cascade: true })
  @JoinColumn()
  paymentResult!: PaymentResultEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user!: UserEntity;

  /* Timestamps */
  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
