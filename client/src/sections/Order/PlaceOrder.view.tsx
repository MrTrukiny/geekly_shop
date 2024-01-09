import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ApiError } from '@/types/shared.types';

/* Components */
import CheckoutSteps from '@/components/CheckoutSteps.component';
import Loader from '@/components/Loader.component';
import Message from '@/components/Message.component';

/* Hooks & State */
import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearCartItems } from '@/state/slices/cart.slice';
import { useCreateOrderMutation } from '@/state/slices/order-api.slice';

const PlaceOrderView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const order = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${order.id}`);
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status === 400 || apiError.status === 401 || apiError.status === 404) {
        return toast.error(apiError.data.message);
      }
      toast.error('Unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.productId}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = ${(item.quantity * (item.price * 100)) / 100}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant="danger">
                    {(error as ApiError).data?.message || 'Unexpected error ocurred. Please try again.'}
                  </Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block btn-center"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderView;
