import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { ProductEntity } from '@/product/product.entity';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  rating!: number;

  @Column({ type: 'text' })
  comment!: string;

  /* Relations */
  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user!: UserEntity;

  @ManyToOne(() => ProductEntity)
  product!: ProductEntity;

  /* Timestamps */
  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
