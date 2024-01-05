import { useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ApiError } from '@/types/shared.types';

/* Components */
import Rating from '@/components/Rating.component.';
import Loader from '@/components/Loader.component';
import Message from '@/components/Message.component';

/* Hooks & State */
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '@/state/slices/product-api.slice';
import { addToCart } from '@/state/slices/cart.slice';
import Meta from '@/components/Meta.component';

const ProductView = () => {
  const dispatch = useAppDispatch();

  const { id: productId } = useParams<{ id: string }>();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId as string);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity: qty }));
    }
  };

  const submitReviewHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        reviewData: { rating, comment },
      }).unwrap();

      refetch();
      toast.success('Review created successfully');
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status === 400 || apiError.status === 401 || apiError.status === 404) {
        return toast.error(apiError.data.message);
      }
      toast.error('Unexpected error occurred creating review. Please try again.');
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
            <>
              <Meta title={product.name} />
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
            </>
          )}

          {/* Reviews */}
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product?.reviews?.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product?.reviews.map((review) => (
                  <ListGroup.Item key={review.id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{new Date(review.createdAt as Date).toLocaleString()}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group className="my-2" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="my-2" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button disabled={loadingProductReview} type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductView;
