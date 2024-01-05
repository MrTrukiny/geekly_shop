import { ProductEntity } from '@/product/product.entity';
import { OrderEntity } from '@/order/entities/order.entity';
import { OrderItemEntity } from '@/order/entities/order-items.entity';
import { PaymentResultEntity } from '@/order/entities/payment-result.entity';
import { ShippingAddressEntity } from '@/order/entities/shipping-address.entity';
import { UserEntity } from '@/user/user.entity';
import { ReviewEntity } from '@/product/review/review.entity';

export const entities = [
  ProductEntity,
  OrderEntity,
  OrderItemEntity,
  UserEntity,
  ShippingAddressEntity,
  PaymentResultEntity,
  ReviewEntity,
];

export {
  ProductEntity,
  OrderEntity,
  OrderItemEntity,
  PaymentResultEntity,
  ShippingAddressEntity,
  UserEntity,
  ReviewEntity,
};
