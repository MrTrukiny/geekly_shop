import { Link, useParams } from 'react-router-dom';
import { SerializedError } from '@reduxjs/toolkit';
import { Row, Col } from 'react-bootstrap';

/* Components */
import Product from './Product.component';
import Loader from './Loader.component';
import Message from './Message.component';
import Paginate from './Paginate.component';
import ProductCarousel from './ProductCarousel.component';

/* Hooks & State */
import { useGetProductsQuery } from '@/state/slices/product-api.slice';

const ProductList = () => {
  const { page = 1, keyword = '' } = useParams<{ page: string; keyword: string }>();
  const { data, isLoading, error } = useGetProductsQuery({ page: Number(page), keyword });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{(error as SerializedError).message}</Message>
      ) : (
        <>
          <Row>
            {data?.products &&
              data.products.map((product) => (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                  <Product {...product} />
                </Col>
              ))}
          </Row>

          <Paginate pages={Number(data?.totalPages)} page={Number(data?.page)} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default ProductList;
