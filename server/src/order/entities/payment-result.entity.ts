import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('payment_results')
export class PaymentResultEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', nullable: true })
  paymentId?: string;

  @Column({ type: 'text', nullable: true })
  status?: string;

  @Column({ type: 'text', nullable: true })
  updateTime?: string;

  @Column({ type: 'text', nullable: true })
  email?: string;

  @OneToOne(() => OrderEntity, (order) => order.paymentResult)
  order!: OrderEntity;
}
