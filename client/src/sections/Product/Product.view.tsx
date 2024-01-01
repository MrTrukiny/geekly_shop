import Rating from '@/components/Rating.component.';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PRODUCT: any = {};

const ProductView = () => {
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={PRODUCT.image} alt={PRODUCT.name} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{PRODUCT.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={PRODUCT.rating}
                text={`${PRODUCT.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${PRODUCT.price}</ListGroup.Item>
            <ListGroup.Item>Description: {PRODUCT.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${PRODUCT.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      ${PRODUCT.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={PRODUCT.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductView;
