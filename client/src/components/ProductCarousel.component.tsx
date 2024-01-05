import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message.component';
import { useGetTopProductsQuery } from '@/state/slices/product-api.slice';
import { ApiError } from '@/types/shared.types';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery(undefined);

  return isLoading ? null : error ? (
    <Message variant="danger">
      {(error as ApiError).data.message || 'Unexpected problem ocurred loading top Products'}
    </Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products?.map((product) => (
        <Carousel.Item key={product.id}>
          <Link to={`/product/${product.id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white text-right">
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
