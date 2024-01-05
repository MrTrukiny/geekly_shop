import { useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';

/* Hooks & State */
import { useAppDispatch } from '@/hooks';
import { useGetProductDetailsQuery } from '@/state/slices/product-api.slice';
import { addToCart } from '@/state/slices/cart.slice';

/* Components */
import Rating from '@/components/Rating.component.';
import Loader from '@/components/Loader.component';
import Message from '@/components/Message.component';

const ProductView = () => {
  const dispatch = useAppDispatch();
  const { id: productId } = useParams<{ id: string }>();
  const [qty, setQty] = useState(1);

  const { data: product, isLoading, error } = useGetProductDetailsQuery(Number(productId));

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity: qty }));
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{(error as SerializedError).message}</Message>
      ) : (
        <>
          {product && (
            <Row>
              <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong>${product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {/* Qty Select */}
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control as="select" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                              {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                        type="button"
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default ProductView;
