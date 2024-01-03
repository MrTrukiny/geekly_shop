import { Row, Col } from 'react-bootstrap';
import Product from './Product.component';
import { useGetProductsQuery } from '@/state/slices/products-api.slice';
import { SerializedError } from '@reduxjs/toolkit';

const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  console.log(products);

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{(error as SerializedError).message}</div>
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
