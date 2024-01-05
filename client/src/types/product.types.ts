export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: ProductReview[];
};

export type ProductReview = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

export type PaginatedProducts = {
  products: Product[];
  page: number;
  limit: number;
  pages: number;
  totalPages: number;
  totalProducts: number;
};
