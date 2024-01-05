import { AppDataSource } from '../data-source';
import {
  ProductEntity,
  OrderEntity,
  UserEntity,
  OrderItemEntity,
  ShippingAddressEntity,
  PaymentResultEntity,
  ReviewEntity,
} from '../entities';

const productModel = AppDataSource.getRepository(ProductEntity);
const orderModel = AppDataSource.getRepository(OrderEntity);
const userModel = AppDataSource.getRepository(UserEntity);
const orderItemsModel = AppDataSource.getRepository(OrderItemEntity);
const shippingAddressModel = AppDataSource.getRepository(ShippingAddressEntity);
const paymentResultModel = AppDataSource.getRepository(PaymentResultEntity);
const reviewModel = AppDataSource.getRepository(ReviewEntity);

export { productModel, orderModel, userModel, orderItemsModel, shippingAddressModel, paymentResultModel, reviewModel };
