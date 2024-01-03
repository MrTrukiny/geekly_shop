import { SerializedError } from '@reduxjs/toolkit';
import { Row, Col } from 'react-bootstrap';
import Product from './Product.component';
import { useGetProductsQuery } from '@/state/slices/products-api.slice';

import Loader from './Loader.component';
import Message from './Message.component';

const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{(error as SerializedError).message}</Message>
      ) : (
        <Row>
          {products &&
            products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product {...product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  );
};

export default ProductList;
