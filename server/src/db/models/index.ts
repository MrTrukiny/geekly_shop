import { AppDataSource } from '../data-source';
import {
  ProductEntity,
  OrderEntity,
  UserEntity,
  CartEntity,
  ShippingAddressEntity,
  PaymentResultEntity,
  ReviewEntity,
} from '../entities';

const productModel = AppDataSource.getRepository(ProductEntity);
const orderModel = AppDataSource.getRepository(OrderEntity);
const userModel = AppDataSource.getRepository(UserEntity);
const cartModel = AppDataSource.getRepository(CartEntity);
const shippingAddressModel = AppDataSource.getRepository(ShippingAddressEntity);
const paymentResultModel = AppDataSource.getRepository(PaymentResultEntity);
const reviewModel = AppDataSource.getRepository(ReviewEntity);

export { productModel, orderModel, userModel, cartModel, shippingAddressModel, paymentResultModel, reviewModel };
