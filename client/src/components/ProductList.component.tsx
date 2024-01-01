import { Row, Col } from "react-bootstrap";
import Product from "./Product.component";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PRODUCTS: any[] = [];

const ProductList = () => {
  return (
    <Row>
      {PRODUCTS.map((product) => (
        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
          <Product {...product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
