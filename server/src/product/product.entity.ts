import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '@/user/user.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  image!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  brand!: string;

  @Column({ type: 'text' })
  category!: string;

  @Column({ type: 'float' })
  price!: number;

  @Column({ type: 'int' })
  countInStock!: number;

  @Column({ type: 'float' })
  rating!: number;

  @Column({ type: 'int' })
  numReviews!: number;

  /* Relations */
  @ManyToOne(() => UserEntity, (user) => user.products)
  createdBy!: UserEntity;

  /* Timestamps */
  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
