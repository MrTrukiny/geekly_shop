import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('shipping_addresses')
export class ShippingAddressEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  address!: string;

  @Column({ type: 'text' })
  city!: string;

  @Column({ type: 'text' })
  postalCode!: string;

  @Column({ type: 'text' })
  country!: string;

  @OneToOne(() => OrderEntity, (order) => order.shippingAddress)
  order!: OrderEntity;
}
