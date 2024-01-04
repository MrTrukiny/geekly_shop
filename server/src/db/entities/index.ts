import { ProductEntity } from '@/product/product.entity';
import { OrderEntity } from '@/order/entities/order.entity';
import { CartEntity } from '@/order/entities/cart.entity';
import { PaymentResultEntity } from '@/order/entities/payment-result.entity';
import { ShippingAddressEntity } from '@/order/entities/shipping-address.entity';
import { UserEntity } from '@/user/user.entity';
import { ReviewEntity } from '@/user/review/review.entity';

export const entities = [
  ProductEntity,
  OrderEntity,
  CartEntity,
  UserEntity,
  ShippingAddressEntity,
  PaymentResultEntity,
  ReviewEntity,
];

export { ProductEntity, OrderEntity, CartEntity, PaymentResultEntity, ShippingAddressEntity, UserEntity, ReviewEntity };
