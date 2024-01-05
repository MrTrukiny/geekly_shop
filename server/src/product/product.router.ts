import { Router } from 'express';
import {
  getProductById,
  getProducts,
  getTopProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from './product.controller';
import { isAdmin, isAuthenticated } from '@/middlewares/auth.middleware';

const productRouter = Router();

productRouter.route('/').get(getProducts);
productRouter.route('/top').get(getTopProducts);
productRouter.route('/:productId').get(getProductById);

/* Admin */
productRouter.route('/').post(isAuthenticated, isAdmin, createProduct);
productRouter
  .route('/:productId')
  .put(isAuthenticated, isAdmin, updateProduct)
  .delete(isAuthenticated, isAdmin, deleteProduct);
productRouter.route('/:productId/reviews').post(isAuthenticated, createProductReview);

export default productRouter;
