import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { PayPalButtons, SCRIPT_LOADING_STATE, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { ApiError } from '@/types/shared.types';

/* Components */
import Loader from '@/components/Loader.component';
import Message from '@/components/Message.component';

/* Hooks & State */
import { useAppSelector } from '@/hooks';
import { useGetOrderDetailsQuery, usePayOrderMutation, useDeliverOrderMutation } from '@/state/slices/order-api.slice';
import { Order, PaymentDetails } from '@/types/order.types';
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
  OrderResponseBody,
} from '@paypal/paypal-js';

const OrderView = () => {
  const { id: orderId } = useParams();

  const { userInfo } = useAppSelector((state) => state.auth);

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId as string);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const loadPaypalScript = async () => {
      paypalDispatch({ type: 'setLoadingStatus', value: SCRIPT_LOADING_STATE.PENDING });
    };

    if (order && !order.isPaid) {
      if (!window.paypal) {
        loadPaypalScript();
      }
    }
  }, [order, paypalDispatch]);

  const onApprove = (_data: OnApproveData, actions: OnApproveActions) => {
    if (actions.order && actions.order.capture) {
      return actions.order
        .capture()
        .then(async function (value: OrderResponseBody) {
          const paymentDetails: PaymentDetails = {
            paymentId: value.id,
            status: value.status,
            updateTime: value.update_time,
            email: value.payer.email_address || '',
          };

          try {
            await payOrder({ orderId: orderId as string, paymentDetails });

            refetch();
            toast.success('Order is paid');
          } catch (error) {
            const apiError = error as ApiError;
            if (apiError.status === 401 || apiError.status === 404) {
              toast.error(apiError.data.message);
            } else {
              toast.error('Unexpected error occurred. Please try again.');
            }
          }
        })
        .catch(() => {
          toast.error('Payment capture failed. Please try again.');
        });
    } else {
      return Promise.reject('Payment capture method not available.');
    }
  };

  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();

  //   toast.success('Order is paid');
  // }

  function onError(error: Record<string, unknown>) {
    toast.error((error?.message as string) || 'Unexpected error occurred processing payment. Please try again.');
  }

  function createOrder(_data: CreateOrderData, actions: CreateOrderActions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: (order as Order).totalPrice?.toString() || '0.00' },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId as string);

    refetch();
  };

  if (isLoading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        {(error as ApiError).data.message || 'Unexpected error occurred. Please try again.'}
      </Message>
    );

  if (!order) return <Message variant="warning">Order details not available.</Message>;

  return (
    <>
      <h1>Order {order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {new Date(order.deliveredAt as Date).toLocaleDateString()}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {new Date(order.paidAt as Date).toLocaleDateString()}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.product.image} alt={item.product.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = ${item.quantity * item.price}
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
                      {/* <Button
                        style={{ marginBottom: '10px' }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button> */}

                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}

              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderView;
