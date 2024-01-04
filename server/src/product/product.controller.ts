import { asyncHandler } from '@/middlewares/async-handler.middleware';
import { productModel } from '@/db/models';

const getProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find();

  return res.status(200).json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await productModel.findOne({ where: { id: Number(productId) } });

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
});

export { getProducts, getProductById };
