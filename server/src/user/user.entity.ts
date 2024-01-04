import bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderEntity } from '@/order/entities/order.entity';
import { ReviewEntity } from '@/user/review/review.entity';
import { ProductEntity } from '@/product/product.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar', select: false })
  password!: string;

  @Column({ type: 'boolean', default: false })
  isAdmin!: boolean;

  /* Relations */
  @OneToMany(() => ProductEntity, (product) => product.createdBy)
  products!: ProductEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders!: OrderEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews!: ReviewEntity[];

  /* Timestamps */
  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;

  async matchPassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
