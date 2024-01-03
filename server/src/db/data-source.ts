import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { ProductEntity } from '@/product/product.entity';
import { ReviewEntity } from '@/user/review/review.entity';
import { OrderEntity } from '@/order/entities/order.entity';
import { ShippingAddressEntity } from '@/order/entities/shipping-address.entity';
import { PaymentResultEntity } from '@/order/entities/payment-result.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db/data/geekly_shop.sqlite',
  synchronize: true, // TODO: Disable in production because it drops the database
  logging: true,
  entities: [UserEntity, ProductEntity, ReviewEntity, OrderEntity, ShippingAddressEntity, PaymentResultEntity],
  migrations: ['src/db/migrations/**/*.ts'],
  subscribers: [],
});
