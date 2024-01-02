import { Router } from 'express';
import { getProductById, getProducts } from './product.controller';

const productRouter = Router();

productRouter.route('/').get(getProducts);
productRouter.route('/:productId').get(getProductById);

export default productRouter;
