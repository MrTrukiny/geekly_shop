import { Like } from 'typeorm';
import { asyncHandler } from '@/middlewares/async-handler.middleware';
import { productModel, reviewModel } from '@/db/models';
import { RequestWithUser } from '@/types/api.types';

const getProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, keyword } = req.query;

  const pageNumber = parseInt(page as string);
  const limitNumber = parseInt(limit as string);

  const skip = (pageNumber - 1) * limitNumber;

  let filterCondition = {};

  if (keyword) {
    filterCondition = [
      { name: Like(`%${keyword}%`) },
      { brand: Like(`%${keyword}%`) },
      { description: Like(`%${keyword}%`) },
      { category: Like(`%${keyword}%`) },
    ];
  }

  const [products, totalProducts] = await productModel.findAndCount({
    where: filterCondition,
    skip: skip,
    take: limitNumber,
  });

  const totalPages = Math.ceil(totalProducts / limitNumber);

  return res.status(200).json({
    products,
    page: pageNumber,
    limit: limitNumber,
    totalPages,
    totalProducts,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await productModel.findOne({ where: { id: Number(productId) } });

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const reviews = await reviewModel.find({ where: { product: { id: product.id } } });
  const productWithReviews = { ...product, reviews };

  return res.status(200).json(productWithReviews);
});

const getTopProducts = asyncHandler(async (_req, res) => {
  const products = await productModel.find({ order: { rating: 'DESC' }, take: 3 });

  res.status(200).json(products);
});

const createProductReview = asyncHandler(async (req, res) => {
  const { user } = req as RequestWithUser;
  const { productId } = req.params;
  const { rating, comment } = req.body;

  const product = await productModel.findOneBy({ id: Number(productId) });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const alreadyReviewed = await reviewModel.findOneBy({ user: { id: user.id }, product: { id: product.id } });

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed by this user');
  }

  await reviewModel.save({ rating, comment, user, product });

  const reviews = await reviewModel.find({ where: { product: { id: product.id } } });

  const productRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await productModel.save({
    ...product,
    rating: Number(productRating.toFixed(1)),
    numReviews: reviews.length,
  });

  res.status(201).json({ message: 'Review added' });
});

/* Admin */
const createProduct = asyncHandler(async (req, res) => {
  const { user } = req as RequestWithUser;

  const product = await productModel.save({
    name: 'Sample name',
    price: 0,
    user,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await productModel.findOneBy({ id: Number(productId) });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const updatedProduct = await productModel.save({
    ...product,
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  });

  res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await productModel.findOneBy({ id: Number(productId) });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await productModel.remove(product);

  res.status(200).json({ message: 'Product removed' });
});

export {
  getProducts,
  getProductById,
  getTopProducts,
  createProductReview,
  createProduct,
  updateProduct,
  deleteProduct,
};
